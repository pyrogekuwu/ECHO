import { getCollection } from 'astro:content';
import type { Product } from './product-types';

export type { Product, ProductImage } from './product-types';

// Read Markdown for each page/build so content edits also appear during local development.
export async function getProducts(): Promise<Product[]> {
  const entries = await getCollection('products');
  const products: Product[] = entries
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
    .map(({ data, body }) => {
      const { order, ...product } = data;
      return { ...product, fullDescription: body?.trim() || product.description };
    });

  const ids = new Set(products.map((product) => product.id));
  for (const product of products) {
    for (const variant of product.variants ?? []) {
      if (!ids.has(variant.productId)) {
        throw new Error(`Unknown variant "${variant.productId}" in product "${product.id}".`);
      }
    }
  }
  return products;
}
