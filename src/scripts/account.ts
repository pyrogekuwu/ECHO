import { products } from '../data/products';

const ORDERS_KEY = 'echo:orders:v1';
const PROFILE_KEY = 'echo:profile:v1';
const ADDRESS_KEY = 'echo:address:v1';
const LOGOUT_KEY = 'echo:account:signed-out';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const profileKeys = [
  'firstName', 'lastName', 'email', 'phone',
] as const;

const addressKeys = ['street', 'postalCode', 'city'] as const;

type Profile = Record<typeof profileKeys[number], string>;
type Address = Record<typeof addressKeys[number], string>;

type OrderItem = {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

interface Order {
  id: string;
  createdAt: string;
  status: string;
  customer: Profile;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  delivery: { label: string; cents: number };
  payment: string;
  invoice: { company: string; nip: string } | null;
}

const currency = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
});

const dates = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Europe/Warsaw',
});

const money = (cents: number) => currency.format(cents / 100);

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const isMoney = (value: unknown): value is number =>
  typeof value === 'number'
  && Number.isSafeInteger(value)
  && value >= 0;

function fields<K extends string>(
  value: unknown,
  keys: readonly K[]
): Record<K, string> {
  const object: Record<string, unknown> =
    isRecord(value) ? value : {};

  return Object.fromEntries(
    keys.map((key) => [
      key,
      typeof object[key] === 'string' ? object[key] : '',
    ])
  ) as Record<K, string>;
}

function read(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null');
  } catch {
    return null;
  }
}

function parseOrder(value: unknown): Order | null {
  if (
    !isRecord(value)
    || typeof value.id !== 'string'
    || typeof value.createdAt !== 'string'
    || !Number.isFinite(Date.parse(value.createdAt))
    || !isMoney(value.subtotal)
    || !isMoney(value.discount)
    || !isMoney(value.total)
    || !Array.isArray(value.items)
  ) return null;

  const items: OrderItem[] = [];

  for (const item of value.items) {
    if (
      !isRecord(item)
      || typeof item.productId !== 'string'
      || typeof item.name !== 'string'
      || !isMoney(item.unitPrice)
      || typeof item.quantity !== 'number'
      || !Number.isSafeInteger(item.quantity)
      || item.quantity < 1
    ) return null;

    items.push({
      productId: item.productId,
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    });
  }

  if (!items.length) return null;

  const shipping: Record<string, unknown> =
    isRecord(value.delivery) ? value.delivery : {};

  return {
    id: value.id,
    createdAt: value.createdAt,
    status: typeof value.status === 'string'
      ? value.status
      : 'Processing',
    customer: fields(value.customer, profileKeys),
    address: fields(value.address, addressKeys),
    items,
    subtotal: value.subtotal,
    discount: value.discount,
    total: value.total,
    delivery: {
      label: typeof shipping.label === 'string'
        ? shipping.label
        : 'Delivery',
      cents: isMoney(shipping.cents) ? shipping.cents : 0,
    },
    payment: typeof value.payment === 'string'
      ? value.payment
      : 'Demo payment',
    invoice: isRecord(value.invoice)
      ? fields(value.invoice, ['company', 'nip'])
      : null,
  };
}

function savedOrders(): Order[] {
  const value = read(ORDERS_KEY);

  return (Array.isArray(value) ? value : [])
    .map(parseOrder)
    .filter((order): order is Order => order !== null)
    .sort(
      (a, b) =>
        Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
}

function exampleOrders(): Order[] {
  return [
    {
      id: 'EXAMPLE-002',
      productId: 'product-lumia-white',
      date: '2026-11-03T12:00:00Z',
      status: 'Processing',
    },
    {
      id: 'EXAMPLE-001',
      productId: 'product-aerospace-silver',
      date: '2026-10-28T12:00:00Z',
      status: 'Shipped',
    },
  ].flatMap((example): Order[] => {
    const product = products.find(
      (item) => item.id === example.productId
    );

    if (!product) return [];

    const subtotal = Math.round(product.price * 100);

    return [{
      id: example.id,
      createdAt: example.date,
      status: example.status,
      customer: {
        firstName: 'Demo',
        lastName: 'Customer',
        email: 'demo@example.com',
        phone: '',
      },
      address: {
        street: 'Example Street 12',
        postalCode: '00-001',
        city: 'Warsaw',
      },
      items: [{
        productId: product.id,
        name: product.name,
        unitPrice: subtotal,
        quantity: 1,
      }],
      subtotal,
      discount: 0,
      total: subtotal + 500,
      delivery: { label: 'Courier', cents: 500 },
      payment: 'Demo payment',
      invoice: null,
    }];
  });
}

export function initAccount() {
  const page = document.querySelector<HTMLElement>(
    '[data-account-page]'
  );

  if (!page) return;

  const find = <T extends HTMLElement = HTMLElement>(
    selector: string
  ) => page.querySelector<T>(selector)!;

  const text = (selector: string, value: string) =>
    page.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.textContent = value;
    });

  const profileForm = find<HTMLFormElement>(
    '#account-profile-form'
  );

  const addressForm = find<HTMLFormElement>(
    '#account-address-form'
  );

  let history = savedOrders();

  let profile = fields(
    read(PROFILE_KEY) ?? history[0]?.customer,
    profileKeys
  );

  let address = fields(
    read(ADDRESS_KEY) ?? history[0]?.address,
    addressKeys
  );

  let orders: Order[] = [];
  let loggedOut = false;

  function message(value: string) {
    const output = find('[data-account-feedback]');
    output.textContent = value;
    output.hidden = false;
    output.focus();
  }

  function save(key: string, value: unknown): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      message(
        'Your changes could not be saved. Check that browser storage is available.'
      );
      return false;
    }
  }

  function fillForm(
    form: HTMLFormElement,
    values: Record<string, string>
  ) {
    for (const [key, value] of Object.entries(values)) {
      const input = form.elements.namedItem(key);

      if (input instanceof HTMLInputElement) {
        input.value = value;
      }
    }
  }

  function valid(form: HTMLFormElement): boolean {
    form.querySelectorAll<HTMLInputElement>('input')
      .forEach((input) => {
        input.value = input.value.trim();
      });

    return form.reportValidity();
  }

  function values<K extends string>(
    form: HTMLFormElement,
    keys: readonly K[]
  ): Record<K, string> {
    return Object.fromEntries(
      keys.map((key) => [
        key,
        String(new FormData(form).get(key) ?? '').trim(),
      ])
    ) as Record<K, string>;
  }

  function section(id: string, focus = true) {
    const selected = [
      'dashboard', 'orders', 'addresses', 'settings',
    ].includes(id) ? id : 'dashboard';

    page!.querySelectorAll<HTMLElement>(
      '[data-account-panel]'
    ).forEach((panel) => {
      panel.hidden = panel.dataset.accountPanel !== selected;
    });

    page!.querySelectorAll<HTMLElement>(
      '[data-account-nav]'
    ).forEach((link) => {
      const active = link.dataset.accountNav === selected;
      link.classList.toggle('active', active);

      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    if (focus) {
      find(`#account-${selected} [data-panel-heading]`).focus();
    }
  }

  function addressView() {
    text('[data-account-name]', profile.firstName || 'there');

    const name = [
      profile.firstName, profile.lastName,
    ].filter(Boolean).join(' ');

    const summary = address.street && address.city
      ? [
          name,
          address.street,
          `${address.postalCode} ${address.city}`.trim(),
        ].filter(Boolean).join('\n')
      : 'No saved delivery address yet.';

    text('[data-address-summary]', summary);
  }

  function renderHistory() {
    history = savedOrders();

    const examples = history.length === 0;
    orders = examples ? exampleOrders() : history;

    page!.querySelectorAll<HTMLElement>(
      '[data-example-note]'
    ).forEach((note) => {
      note.hidden = !examples;
    });

    text('[data-account-order-count]', String(orders.length));

    text(
      '[data-account-processing-count]',
      String(
        orders.filter(
          (order) => order.status === 'Processing'
        ).length
      )
    );

    text(
      '[data-account-spent]',
      money(orders.reduce((sum, order) => sum + order.total, 0))
    );

    const latest = orders[0];

    text(
      '[data-account-latest]',
      latest
        ? `${latest.id} · ${dates.format(new Date(latest.createdAt))} · ${money(latest.total)} · ${latest.status}`
        : 'No orders yet.'
    );

    find('[data-open-latest]').hidden = !latest;

    const fragment = document.createDocumentFragment();

    for (const order of orders) {
      const template = find<HTMLTemplateElement>(
        '#account-order-row'
      );

      const row = template.content.firstElementChild!
        .cloneNode(true) as HTMLTableRowElement;

      for (const [selector, value] of [
        ['[data-order-number]', order.id],
        ['[data-order-date]', dates.format(new Date(order.createdAt))],
        ['[data-order-total]', money(order.total)],
        ['[data-order-status]', order.status],
      ]) {
        row.querySelector<HTMLElement>(selector)!.textContent = value;
      }

      const button = row.querySelector<HTMLButtonElement>(
        '[data-order-id]'
      )!;

      button.dataset.orderId = order.id;
      button.setAttribute(
        'aria-label',
        `Details for order ${order.id}`
      );

      fragment.append(row);
    }

    find('[data-account-orders]').replaceChildren(fragment);

    const id = new URLSearchParams(
      window.location.search
    ).get('order');

    const placed = history.find((order) => order.id === id);
    const confirmation = find('[data-order-confirmation]');

    confirmation.hidden = !placed || loggedOut;

    if (placed) {
      confirmation.textContent =
        `Thank you! Demo order ${placed.id} has been placed. `
        + `Total: ${money(placed.total)}. No payment has been taken.`;
    }
  }

  function details(order: Order) {
    text('#account-order-title', `Order ${order.id}`);

    text(
      '[data-order-detail-meta]',
      `${dates.format(new Date(order.createdAt))} · ${order.status}${history.length ? '' : ' · Example order'}`
    );

    const fragment = document.createDocumentFragment();

    for (const item of order.items) {
      const row = find<HTMLTemplateElement>(
        '#account-order-item'
      ).content.firstElementChild!
        .cloneNode(true) as HTMLLIElement;

      const link = row.querySelector<HTMLAnchorElement>(
        '[data-detail-product]'
      )!;

      link.textContent = item.name;

      if (products.some((product) => product.id === item.productId)) {
        link.href = `${base}/product/${item.productId}/`;
      }

      row.querySelector<HTMLElement>(
        '[data-detail-quantity]'
      )!.textContent = `${item.quantity} × ${money(item.unitPrice)}`;

      row.querySelector<HTMLElement>(
        '[data-detail-line-total]'
      )!.textContent = money(item.unitPrice * item.quantity);

      fragment.append(row);
    }

    find('[data-order-detail-items]').replaceChildren(fragment);

    for (const [selector, value] of [
      ['[data-detail-subtotal]', money(order.subtotal)],
      ['[data-detail-discount]', `−${money(order.discount)}`],
      ['[data-detail-delivery]', money(order.delivery.cents)],
      ['[data-detail-total]', money(order.total)],
    ]) {
      text(selector, value);
    }

    find('[data-detail-discount-row]').hidden = !order.discount;

    text(
      '[data-order-detail-address]',
      [
        order.customer.firstName + ' ' + order.customer.lastName,
        order.address.street,
        `${order.address.postalCode} ${order.address.city}`,
      ].join('\n')
    );

    text(
      '[data-order-detail-payment]',
      `${order.delivery.label}\n${order.payment}`
    );

    const invoice = find('[data-order-detail-invoice]');
    invoice.hidden = !order.invoice;

    if (order.invoice) {
      invoice.textContent =
        `Invoice: ${order.invoice.company}\nNIP: ${order.invoice.nip}`;
    }
  }

  function signedOut(value: boolean) {
    loggedOut = value;

    find('[data-account-content]').hidden = value;
    find('[data-account-signed-out]').hidden = !value;

    find('[data-order-confirmation]').hidden =
      value || !history.some(
        (order) =>
          order.id === new URLSearchParams(location.search).get('order')
      );
  }

  function historyReplace(id: string) {
    window.history.replaceState(
      null,
      '',
      `${location.pathname}${location.search}#account-${id}`
    );
  }

  page.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const nav = event.target.closest<HTMLElement>(
      '[data-account-nav]'
    );

    if (nav) {
      event.preventDefault();
      historyReplace(nav.dataset.accountNav!);
      section(nav.dataset.accountNav!);
    }

    const button = event.target.closest<HTMLElement>(
      '[data-order-id], [data-open-latest]'
    );

    if (button) {
      const order = button.hasAttribute('data-open-latest')
        ? orders[0]
        : orders.find(
            (item) => item.id === button.dataset.orderId
          );

      if (order) details(order);
    }

    if (event.target.closest('[data-go-address]')) {
      historyReplace('addresses');
      section('addresses');
    }

    if (event.target.closest('[data-edit-address]')) {
      fillForm(addressForm, address);
      addressForm.hidden = false;
      find('[data-address-display]').hidden = true;
      find<HTMLInputElement>('#account-street').focus();
    }

    if (event.target.closest('[data-cancel-address]')) {
      addressForm.hidden = true;
      find('[data-address-display]').hidden = false;
      find('[data-edit-address]').focus();
    }

    if (event.target.closest('[data-account-logout]')) {
      try {
        sessionStorage.setItem(LOGOUT_KEY, '1');
      } catch {
        // Nadal można wyjść z bieżącego widoku.
      }

      const url = new URL(location.href);
      url.searchParams.delete('order');

      window.history.replaceState(
        null, '', url.pathname + url.search + url.hash
      );

      find('[data-account-feedback]').hidden = true;
      signedOut(true);
      find('[data-account-login]').focus();
    }

    if (event.target.closest('[data-account-login]')) {
      try {
        sessionStorage.removeItem(LOGOUT_KEY);
      } catch {
        // Nawigacja demonstracyjna pozostaje dostępna.
      }

      signedOut(false);
      section('dashboard');
      historyReplace('dashboard');
    }
  });

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!valid(profileForm)) return;

    const next = values(profileForm, profileKeys);

    if (save(PROFILE_KEY, next)) {
      profile = next;
      addressView();
      message('Account details saved.');
    }
  });

  addressForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!valid(addressForm)) return;

    const next = values(addressForm, addressKeys);

    if (save(ADDRESS_KEY, next)) {
      address = next;
      addressView();
      addressForm.hidden = true;
      find('[data-address-display]').hidden = false;
      message('Default delivery address saved.');
    }
  });

  window.addEventListener('hashchange', () =>
    section(location.hash.replace('#account-', ''))
  );

  window.addEventListener('storage', () => renderHistory());

  fillForm(profileForm, profile);
  fillForm(addressForm, address);
  addressView();
  renderHistory();

  section(location.hash.replace('#account-', ''), false);

  try {
    loggedOut = sessionStorage.getItem(LOGOUT_KEY) === '1';
  } catch {
    // Domyślnie pokazujemy konto demonstracyjne.
  }

  // Po checkoutcie konto pokazuje potwierdzenie zamówienia.
  if (
    history.some(
      (order) =>
        order.id === new URLSearchParams(location.search).get('order')
    )
  ) {
    loggedOut = false;

    try {
      sessionStorage.removeItem(LOGOUT_KEY);
    } catch {
      // Widok pozostaje dostępny.
    }
  }

  signedOut(loggedOut);
}