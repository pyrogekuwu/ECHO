import { parse } from 'yaml';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  color: string | string[];
  price: number;
  originalPrice?: number;
  badge?: string;
  popularity?: number;
  image: string;
  alt: string;
  sku?: string;
  description?: string;
  fullDescription?: string;
  gallery?: ProductImage[];
  variants?: { label: string; productId: string }[];
  inStock?: boolean;
  specifications?: { label: string; value: string }[];
  reviews?: { author: string; rating: number; text: string }[];
}

const files = import.meta.glob<string>('./products/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

if (Object.keys(files).length === 0) {
  throw new Error(
    'No product .md files found in src/data/products/.'
  );
}

export const products: Product[] = Object.entries(files)
  .map(([file, source]) => {
    const match = source.match(
      /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
    );

    if (!match) {
      throw new Error(`Invalid Markdown frontmatter in ${file}.`);
    }

    const metadata = parse(match[1]);

    if (
      !metadata ||
      typeof metadata !== 'object' ||
      Array.isArray(metadata)
    ) {
      throw new Error(`Invalid product data in ${file}.`);
    }

    for (const key of [
      'id',
      'name',
      'category',
      'collection',
      'image',
      'alt',
    ]) {
      if (
        typeof metadata[key] !== 'string' ||
        !metadata[key].trim()
      ) {
        throw new Error(`Missing or invalid ${key} in ${file}.`);
      }
    }

    if (
      typeof metadata.price !== 'number' ||
      !Number.isFinite(metadata.price) ||
      metadata.price < 0
    ) {
      throw new Error(`Invalid price in ${file}.`);
    }

    const colors = Array.isArray(metadata.color)
      ? metadata.color
      : [metadata.color];

    if (
      !colors.length ||
      colors.some(
        (color: unknown) =>
          typeof color !== 'string' || !color.trim()
      )
    ) {
      throw new Error(`Invalid color in ${file}.`);
    }

    const { order = 999, ...data } = metadata;

    if (!Number.isInteger(order) || order < 0) {
      throw new Error(`Invalid order in ${file}.`);
    }

    const product: Product = {
      ...data,
      fullDescription: match[2].trim() || data.fullDescription,
    };

    return { order, product };
  })
  .sort(
    (a, b) =>
      a.order - b.order ||
      a.product.id.localeCompare(b.product.id)
  )
  .map(({ product }) => product);

const ids = new Set(products.map((product) => product.id));

if (ids.size !== products.length) {
  throw new Error('Product IDs must be unique.');
}

for (const product of products) {
  for (const variant of product.variants ?? []) {
    if (!ids.has(variant.productId)) {
      throw new Error(
        `Unknown variant "${variant.productId}" in product "${product.id}".`
      );
    }
  }
}