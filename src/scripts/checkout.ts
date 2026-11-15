import { products } from '../data/products';
import { readCart, getCartTotals, saveCart } from './cart';

const ORDERS_KEY = 'echo:orders:v1';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const catalog = new Map(
  products.map((product) => [product.id, product])
);

const currency = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
});

const money = (cents: number) => currency.format(cents / 100);

// Kwoty zapisujemy w centach: 500 = €5.00.
const deliveryMethods = {
  courier: { label: 'Courier', cents: 500 },
  locker: { label: 'Parcel locker', cents: 350 },
  pickup: { label: 'Personal pickup', cents: 0 },
};

const paymentMethods = {
  blik: 'BLIK',
  card: 'Payment card',
  transfer: 'Instant bank transfer',
};

export function initCheckout() {
  const page = document.querySelector<HTMLElement>(
    '[data-checkout-page]'
  );

  const form = document.querySelector<HTMLFormElement>(
    '#checkout-form'
  );

  if (!page || !form) return;

  const submit = form.querySelector<HTMLButtonElement>(
    '[type="submit"]'
  )!;

  const invoice = form.querySelector<HTMLInputElement>(
    '#checkout-invoice'
  )!;

  const invoiceFields = form.querySelector<HTMLElement>(
    '#checkout-invoice-fields'
  )!;

  const feedback = page.querySelector<HTMLElement>(
    '[data-checkout-feedback]'
  )!;

  let cart = readCart();
  let submitting = false;

  function message(text: string) {
    feedback.textContent = text;
    feedback.hidden = false;
    feedback.focus();
  }

  function delivery() {
    const value = new FormData(form!).get('delivery');

    return (
      deliveryMethods[value as keyof typeof deliveryMethods]
      ?? deliveryMethods.courier
    );
  }

  function toggleInvoice() {
    invoiceFields.hidden = !invoice.checked;

    invoice.setAttribute(
      'aria-expanded',
      String(invoice.checked)
    );

    invoiceFields
      .querySelectorAll<HTMLInputElement>('input')
      .forEach((input) => {
        input.disabled = !invoice.checked;
        input.required = invoice.checked;
      });
  }

  function render() {
    cart = readCart();

    const totals = getCartTotals(cart);

    page!.querySelector<HTMLElement>(
      '[data-checkout-loading]'
    )!.hidden = true;

    page!.querySelector<HTMLElement>(
      '[data-checkout-empty]'
    )!.hidden = cart.items.length !== 0;

    form!.hidden = cart.items.length === 0;
    submit.disabled = !cart.items.length || submitting;

    const template = page!.querySelector<HTMLTemplateElement>(
      '#checkout-item-template'
    )!;

    const fragment = document.createDocumentFragment();

    for (const item of cart.items) {
      const product = catalog.get(item.productId)!;

      const row = template.content.firstElementChild!
        .cloneNode(true) as HTMLLIElement;

      const image = row.querySelector<HTMLImageElement>('img')!;

      image.src = `${base}${product.image}`;
      image.alt = product.alt;

      const link = row.querySelector<HTMLAnchorElement>(
        '[data-checkout-product-link]'
      )!;

      link.href = `${base}/product/${product.id}/`;
      link.textContent = product.name;

      row.querySelector<HTMLElement>(
        '[data-checkout-quantity]'
      )!.textContent = `Quantity: ${item.quantity}`;

      row.querySelector<HTMLElement>(
        '[data-checkout-line-total]'
      )!.textContent = money(
        Math.round(product.price * 100) * item.quantity
      );

      fragment.append(row);
    }

    page!.querySelector(
      '[data-checkout-items]'
    )!.replaceChildren(fragment);

    for (const [selector, value] of [
      [
        '[data-checkout-count]',
        `${totals.count} ${totals.count === 1 ? 'item' : 'items'}`,
      ],
      ['[data-checkout-subtotal]', money(totals.subtotal)],
      ['[data-checkout-discount]', `−${money(totals.discount)}`],
      ['[data-checkout-delivery]', money(delivery().cents)],
      [
        '[data-checkout-total]',
        money(
          totals.subtotal - totals.discount + delivery().cents
        ),
      ],
    ]) {
      page!.querySelector<HTMLElement>(
        selector
      )!.textContent = value;
    }

    page!.querySelector<HTMLElement>(
      '[data-checkout-discount-row]'
    )!.hidden = !totals.discount;

    page!.querySelectorAll<HTMLElement>(
      '[data-delivery-price]'
    ).forEach((label) => {
      const method = deliveryMethods[
        label.dataset.deliveryPrice as keyof typeof deliveryMethods
      ];

      label.textContent = method.cents === 0
        ? 'Free'
        : money(method.cents);
    });
  }

  invoice.addEventListener('change', toggleInvoice);

  form.addEventListener('change', (event) => {
    if (
      event.target instanceof HTMLInputElement
      && event.target.name === 'delivery'
    ) {
      render();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (submitting) return;

    // Same spacje nie wystarczą jako imię lub adres.
    form.querySelectorAll<HTMLInputElement>(
      'input:not([type="radio"]):not([type="checkbox"])'
    ).forEach((input) => {
      input.value = input.value.trim();
    });

    if (!form.reportValidity()) return;

    const latest = readCart();

    if (JSON.stringify(latest) !== JSON.stringify(cart)) {
      render();

      message(
        'Your cart changed. Review the updated order before continuing.'
      );

      return;
    }

    if (!latest.items.length) {
      render();
      return;
    }

    submitting = true;
    submit.disabled = true;

    const data = new FormData(form);

    const text = (name: string) =>
      String(data.get(name) ?? '').trim();

    const totals = getCartTotals(latest);
    const shipping = delivery();

    const order = {
      id: `ECHO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: 'Processing',

      customer: {
        firstName: text('firstName'),
        lastName: text('lastName'),
        email: text('email'),
        phone: text('phone'),
      },

      address: {
        street: text('street'),
        postalCode: text('postalCode'),
        city: text('city'),
      },

      invoice: invoice.checked
        ? {
            company: text('company'),
            nip: text('nip'),
          }
        : null,

      items: latest.items.map((item) => {
        const product = catalog.get(item.productId)!;

        return {
          productId: product.id,
          name: product.name,
          image: product.image,
          unitPrice: Math.round(product.price * 100),
          quantity: item.quantity,
        };
      }),

      coupon: latest.coupon,
      subtotal: totals.subtotal,
      discount: totals.discount,

      delivery: {
        method: text('delivery'),
        label: shipping.label,
        cents: shipping.cents,
      },

      payment: paymentMethods[
        text('payment') as keyof typeof paymentMethods
      ],

      total: totals.subtotal - totals.discount + shipping.cents,
    };

    try {
      const previous = localStorage.getItem(ORDERS_KEY);

      const orders: unknown = previous === null
        ? []
        : JSON.parse(previous);

      if (!Array.isArray(orders)) {
        throw new Error('Invalid order history');
      }

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([...orders, order])
      );

      if (!saveCart({ items: [], coupon: null })) {
        if (previous === null) {
          localStorage.removeItem(ORDERS_KEY);
        } else {
          localStorage.setItem(ORDERS_KEY, previous);
        }

        throw new Error('Cart could not be cleared');
      }
    } catch {
      submitting = false;
      submit.disabled = false;

      message(
        'The demo order could not be saved. Check that browser storage is available and try again.'
      );

      return;
    }

    window.location.assign(
      `${base}/my-account/?order=${encodeURIComponent(order.id)}`
    );
  });

  window.addEventListener('storage', () => render());

  window.addEventListener('pageshow', () => {
    submitting = false;
    toggleInvoice();
    render();
  });

  toggleInvoice();
  render();
}