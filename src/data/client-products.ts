import type { ClientProduct } from './product-types';

function readProducts(): ClientProduct[] {
  if (typeof document === 'undefined') return [];
  const json = document.getElementById('product-catalog')?.textContent;
  if (!json) return [];
  const value: unknown = JSON.parse(json);
  return Array.isArray(value) ? value as ClientProduct[] : [];
}

export const products = readProducts();
