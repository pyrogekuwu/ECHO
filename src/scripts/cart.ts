import { products } from '../data/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: 'ECHO10' | null;
}

const STORAGE_KEY = 'echo:cart:v1';
const MAX_QUANTITY = 99;
const DELIVERY_CENTS = 500;
const catalog = new Map(products.map((product) => [product.id, product]));
const currency = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// Two example products on the first visit. An explicitly emptied cart stays empty.
const exampleCart = (): CartState => ({
  items: [
    { productId: 'product-lumia-white', quantity: 1 },
    { productId: 'product-aerospace-silver', quantity: 1 },
  ],
  coupon: null,
});


function normalizeCart(value: unknown): CartState {
  const empty: CartState = { items: [], coupon: null };
  if (!value || typeof value !== 'object') return empty;
  const candidate = value as { items?: unknown; coupon?: unknown };
  if (!Array.isArray(candidate.items)) return empty;
  const quantities = new Map<string, number>();

  for (const item of candidate.items) {
    if (!item || typeof item !== 'object') continue;
    const { productId, quantity } = item as { productId?: unknown; quantity?: unknown };
    if (typeof productId !== 'string' || typeof quantity !== 'number') continue;
    if (!Number.isInteger(quantity) || quantity < 1) continue;
    const product = catalog.get(productId);
    if (!product || product.inStock === false) continue;
    quantities.set(productId, Math.min(MAX_QUANTITY, (quantities.get(productId) ?? 0) + quantity));
  }

  const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
  return { items, coupon: items.length && candidate.coupon === 'ECHO10' ? 'ECHO10' : null };
}

export function readCart(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? normalizeCart(exampleCart()) : normalizeCart(JSON.parse(saved));
  } catch {
    return { items: [], coupon: null };
  }
}


export function saveCart(state: CartState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function getCartTotals(state: CartState) {
  const subtotal = state.items.reduce((sum, item) => {
    const product = catalog.get(item.productId);
    return sum + (product ? Math.round(product.price * 100) * item.quantity : 0);
  }, 0);
  const discount = state.coupon === 'ECHO10' ? Math.round(subtotal * 0.1) : 0;
  const delivery = state.items.length ? DELIVERY_CENTS : 0;
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
    count: state.items.reduce((sum, item) => sum + item.quantity, 0),
  };
}


const money = (cents: number) => currency.format(cents / 100);

export function initCart() {
  let state = readCart();
  const cartPage = document.querySelector<HTMLElement>('[data-cart-page]');
  const addButton = document.querySelector<HTMLAnchorElement>('.product-add-to-cart[data-product-id]');
  const productQuantity = document.querySelector<HTMLInputElement>('#product-quantity');

  function feedback(message: string) {
    let output = document.querySelector<HTMLElement>('[data-cart-feedback]');
    if (!output && addButton) {
      output = document.createElement('p');
      output.dataset.cartFeedback = '';
      output.className = 'cart-feedback';
      output.setAttribute('role', 'status');
      addButton.after(output);
    }
    if (output) {
      output.textContent = message;
      output.hidden = false;
    }
  }


  function render() {
    const totals = getCartTotals(state);
    document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((badge) => {
      badge.textContent = totals.count > 99 ? '99+' : String(totals.count);
    });
    document.querySelectorAll<HTMLAnchorElement>('[data-cart-link]').forEach((link) => {
      link.setAttribute('aria-label', `Cart, ${totals.count} items`);
    });
    if (!cartPage) return;

    const loading = cartPage.querySelector<HTMLElement>('[data-cart-loading]');
    const content = cartPage.querySelector<HTMLElement>('[data-cart-content]');
    const empty = cartPage.querySelector<HTMLElement>('[data-cart-empty]');
    if (loading) loading.hidden = true;
    if (content) content.hidden = state.items.length === 0;
    if (empty) empty.hidden = state.items.length !== 0;

    const rows = cartPage.querySelector<HTMLTableSectionElement>('[data-cart-items]');
    const template = cartPage.querySelector<HTMLTemplateElement>('#cart-row-template');
    const active = document.activeElement;
    const focusedProduct = active instanceof HTMLInputElement ? active.dataset.cartQuantity : undefined;
    const fragment = document.createDocumentFragment();


    if (rows && template) {
      for (const item of state.items) {
        const product = catalog.get(item.productId);
        if (!product) continue;
        const row = template.content.firstElementChild!.cloneNode(true) as HTMLTableRowElement;
        row.dataset.cartRow = product.id;
        const link = row.querySelector<HTMLAnchorElement>('[data-cart-product-link]')!;
        link.href = `${base}/product/${product.id}/`;
        const image = row.querySelector<HTMLImageElement>('img')!;
        image.src = `${base}${product.image}`;
        image.alt = product.alt;
        row.querySelector<HTMLElement>('[data-cart-name]')!.textContent = product.name;
        const variant = product.variants?.find((option) => option.productId === product.id)?.label;
        row.querySelector<HTMLElement>('[data-cart-variant]')!.textContent = variant ?? product.category;
        const unitPrice = Math.round(product.price * 100);
        row.querySelector<HTMLElement>('[data-cart-unit-price]')!.textContent = money(unitPrice);
        row.querySelector<HTMLElement>('[data-cart-line-total]')!.textContent = money(unitPrice * item.quantity);
        const quantity = row.querySelector<HTMLInputElement>('[data-cart-quantity]')!;
        quantity.dataset.cartQuantity = product.id;
        quantity.value = String(item.quantity);
        quantity.setAttribute('aria-label', `Quantity for ${product.name}`);
        const remove = row.querySelector<HTMLButtonElement>('[data-cart-remove]')!;
        remove.dataset.cartRemove = product.id;
        remove.setAttribute('aria-label', `Remove ${product.name} from cart`);
        fragment.append(row);
      }
      rows.replaceChildren(fragment);
      if (focusedProduct) {
        [...rows.querySelectorAll<HTMLInputElement>('[data-cart-quantity]')]
          .find((input) => input.dataset.cartQuantity === focusedProduct)?.focus();
      }
    }


    for (const [selector, value] of [
      ['[data-cart-subtotal]', money(totals.subtotal)],
      ['[data-cart-discount]', `−${money(totals.discount)}`],
      ['[data-cart-delivery]', money(totals.delivery)],
      ['[data-cart-total]', money(totals.total)],
      ['[data-cart-item-count]', `${totals.count} ${totals.count === 1 ? 'item' : 'items'}`],
    ]) {
      cartPage.querySelectorAll<HTMLElement>(selector).forEach((element) => { element.textContent = value; });
    }
    const discountRow = cartPage.querySelector<HTMLElement>('[data-cart-discount-row]');
    if (discountRow) discountRow.hidden = state.coupon === null;
    const removeCoupon = cartPage.querySelector<HTMLButtonElement>('[data-cart-remove-coupon]');
    if (removeCoupon) removeCoupon.hidden = state.coupon === null;
    const code = cartPage.querySelector<HTMLInputElement>('#cart-coupon');
    if (code && document.activeElement !== code) code.value = state.coupon ?? '';
  }

  function commit(next: CartState): boolean {
    const normalized = normalizeCart(next);
    if (!saveCart(normalized)) {
      feedback('Your cart could not be saved. Enable site storage and try again.');
      return false;
    }
    state = normalized;
    render();
    return true;
  }


  // Initialise once, without repopulating an empty array saved by the user.
  try {
    if (localStorage.getItem(STORAGE_KEY) === null) saveCart(state);
  } catch { /* Mutations report storage errors through feedback(). */ }
  render();

  if (productQuantity) {
    productQuantity.required = true;
    productQuantity.max = String(MAX_QUANTITY);
    productQuantity.addEventListener('input', () => productQuantity.setCustomValidity(''));
  }

  addButton?.addEventListener('click', (event) => {
    const product = catalog.get(addButton.dataset.productId ?? '');
    if (!product || product.inStock === false || !productQuantity) {
      event.preventDefault();
      return;
    }
    if (!productQuantity.reportValidity()) {
      event.preventDefault();
      return;
    }
    state = readCart();
    const quantity = productQuantity.valueAsNumber;
    const existing = state.items.find((item) => item.productId === product.id);
    if ((existing?.quantity ?? 0) + quantity > MAX_QUANTITY) {
      event.preventDefault();
      feedback(`You can have up to ${MAX_QUANTITY} of this product in your cart.`);
      return;
    }
    const items = state.items.filter((item) => item.productId !== product.id);
    items.push({ productId: product.id, quantity: (existing?.quantity ?? 0) + quantity });
    if (!commit({ ...state, items })) event.preventDefault();
    // On success the existing anchor navigates to /cart/.
  });


  cartPage?.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) event.target.setCustomValidity('');
  });

  cartPage?.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.hasAttribute('data-cart-quantity')) return;
    if (!input.reportValidity()) return;
    state = readCart();
    const items = state.items.map((item) => item.productId === input.dataset.cartQuantity
      ? { ...item, quantity: input.valueAsNumber } : item);
    if (commit({ ...state, items })) feedback('Quantity updated.');
  });

  cartPage?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const remove = event.target.closest<HTMLButtonElement>('[data-cart-remove]');
    if (remove) {
      state = readCart();
      const product = catalog.get(remove.dataset.cartRemove ?? '');
      if (commit({ ...state, items: state.items.filter((item) => item.productId !== remove.dataset.cartRemove) })) {
        feedback(`${product?.name ?? 'Product'} removed from your cart.`);
      }
    }
    if (event.target.closest('[data-cart-remove-coupon]')) {
      state = readCart();
      if (commit({ ...state, coupon: null })) feedback('Discount code removed.');
    }
    if (event.target.closest('[data-cart-restore]')) {
      if (commit(exampleCart())) feedback('Two example products added.');
    }
  });


  cartPage?.querySelector<HTMLFormElement>('#cart-coupon-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = cartPage.querySelector<HTMLInputElement>('#cart-coupon')!;
    if (input.value.trim().toUpperCase() !== 'ECHO10') {
      feedback('That code is not valid. Try ECHO10 for 10% off products.');
      return;
    }
    state = readCart();
    if (commit({ ...state, coupon: 'ECHO10' })) feedback('ECHO10 applied: 10% off products.');
  });

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY || event.key === null) { state = readCart(); render(); }
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) { state = readCart(); render(); }
  });
}
