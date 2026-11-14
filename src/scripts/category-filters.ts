export function initCategoryFilters() {
  const element = document.querySelector<HTMLElement>(
    '[data-category-catalog]'
  );

  if (!element) return;

  const root: HTMLElement = element;

  const form = root.querySelector<HTMLFormElement>(
    '[data-filter-form]'
  )!;

  const grid = root.querySelector<HTMLElement>(
    '[data-product-grid]'
  )!;

  const sort = root.querySelector<HTMLSelectElement>(
    '[data-sort-products]'
  )!;

  const minInput = form.querySelector<HTMLInputElement>(
    '[data-min-price]'
  )!;

  const maxInput = form.querySelector<HTMLInputElement>(
    '[data-max-price]'
  )!;

  const minRange = form.querySelector<HTMLInputElement>(
    '[data-min-range]'
  )!;

  const maxRange = form.querySelector<HTMLInputElement>(
    '[data-max-range]'
  )!;

  const track = form.querySelector<HTMLElement>(
    '[data-price-track]'
  )!;

  const lower = Number(form.dataset.priceLower);
  const upper = Number(form.dataset.priceUpper);

  let minimum = lower;
  let maximum = upper;

  const cards = [
    ...grid.querySelectorAll<HTMLElement>('[data-filter-item]')
  ].map((element) => ({
    element,
    name: element.dataset.name ?? '',
    price: Math.round(Number(element.dataset.price) * 100),
    color: element.dataset.color ?? '',
    collection: element.dataset.collection ?? '',
    inStock: element.dataset.inStock === 'true',
    order: Number(element.dataset.order),
  }));

  function selected(name: string) {
    return [
      ...form.querySelectorAll<HTMLInputElement>(
        `input[name="${name}"]:checked`
      )
    ].map((input) => input.value);
  }

  function render() {
    const availability = selected('availability');
    const collections = selected('collection');
    const colors = selected('color');

    let count = 0;

    for (const card of cards) {
      const visible =
        (
          !availability.length ||
          availability.includes(card.inStock ? 'in' : 'out')
        ) &&
        (
          !collections.length ||
          collections.includes(card.collection)
        ) &&
        (
          !colors.length ||
          colors.includes(card.color)
        ) &&
        card.price >= Math.round(minimum * 100) &&
        card.price <= Math.round(maximum * 100);

      card.element.hidden = !visible;

      if (visible) count++;
    }

    const ordered = [...cards].sort((a, b) => {
      if (sort.value === 'price-asc') {
        return a.price - b.price || a.order - b.order;
      }

      if (sort.value === 'price-desc') {
        return b.price - a.price || a.order - b.order;
      }

      if (sort.value === 'name') {
        return (
          a.name.localeCompare(b.name, 'en') ||
          a.order - b.order
        );
      }

      return a.order - b.order;
    });

    grid.append(...ordered.map((card) => card.element));

    grid.hidden = count === 0;

    root.querySelector<HTMLElement>(
      '[data-no-results]'
    )!.hidden = count !== 0;

    const label = `${count} ${
      count === 1 ? 'product' : 'products'
    }`;

    root.querySelector<HTMLElement>(
      '[data-result-count]'
    )!.textContent = label;

    root.querySelector<HTMLElement>(
      '[data-show-results]'
    )!.textContent = `Show ${label}`;

    const active =
      availability.length +
      collections.length +
      colors.length +
      Number(minimum !== lower || maximum !== upper);

    const badge = root.querySelector<HTMLElement>(
      '[data-active-filter-count]'
    )!;

    badge.hidden = active === 0;
    badge.textContent = `(${active})`;

    root.querySelectorAll<HTMLButtonElement>(
      '[data-clear-filters]'
    ).forEach((button) => {
      button.disabled = active === 0;
    });
  }

  function syncPrice() {
    minInput.value = minRange.value = String(minimum);
    maxInput.value = maxRange.value = String(maximum);

    track.style.setProperty(
      '--range-start',
      `${(minimum - lower) / (upper - lower) * 100}%`
    );

    track.style.setProperty(
      '--range-end',
      `${(maximum - lower) / (upper - lower) * 100}%`
    );

    minRange.style.zIndex =
      minimum > lower + (upper - lower) * 0.9 ? '4' : '2';

    maxRange.style.zIndex = '3';
  }

  function changePrice(input: HTMLInputElement) {
    const value = input.valueAsNumber;

    if (Number.isFinite(value)) {
      const bounded = Math.round(
        Math.min(upper, Math.max(lower, value)) * 100
      ) / 100;

      if (input === minInput || input === minRange) {
        minimum = Math.min(bounded, maximum);
      } else {
        maximum = Math.max(bounded, minimum);
      }
    }

    syncPrice();
    render();
  }

  form.addEventListener('input', (event) => {
    if (
      event.target === minRange ||
      event.target === maxRange
    ) {
      changePrice(event.target as HTMLInputElement);
    }
  });

  form.addEventListener('change', (event) => {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) return;

    if (input === minInput || input === maxInput) {
      changePrice(input);
    } else if (input.type === 'checkbox') {
      render();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    changePrice(
      document.activeElement === maxInput
        ? maxInput
        : minInput
    );
  });

  sort.addEventListener('change', render);

  root.querySelectorAll<HTMLButtonElement>(
    '[data-clear-filters]'
  ).forEach((button) => {
    button.addEventListener('click', () => {
      form.reset();

      minimum = lower;
      maximum = upper;

      syncPrice();
      render();
    });
  });

  syncPrice();
  render();
}