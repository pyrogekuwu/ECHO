import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const magazine = defineCollection({
    loader: glob({
        base: './src/content/magazine',
        pattern: '**/*.md',
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        category: z.string(),
        author: z.string(),
        image: z.string(),
        imageAlt: z.string(),
        tags: z.array(z.string()),
    }),
});

const products = defineCollection({
  loader: glob({
    base: './src/content/products',
    pattern: '*.md',
    generateId: ({ entry, data }) => {
      if (typeof data.id !== 'string' || !data.id) {
        throw new Error(`Product "${entry}" needs an id in its Markdown frontmatter.`);
      }
      return data.id;
    },
  }),
  schema: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.enum(['headphones', 'earbuds', 'speakers', 'accessories']),
    collection: z.string().min(1),
    color: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
    price: z.number().nonnegative(),
    originalPrice: z.number().nonnegative().optional(),
    badge: z.string().optional(),
    popularity: z.number().nonnegative().optional(),
    image: z.string().min(1),
    alt: z.string().min(1),
    sku: z.string().optional(),
    description: z.string().min(1),
    order: z.number().int().nonnegative().default(999),
    gallery: z.array(z.object({ src: z.string().min(1), alt: z.string() })).optional(),
    variants: z.array(z.object({ label: z.string(), productId: z.string().min(1) })).optional(),
    inStock: z.boolean().optional(),
    specifications: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    reviews: z.array(z.object({
      author: z.string(), rating: z.number().int().min(1).max(5), text: z.string(),
    })).optional(),
  }),
});

export const collections = {
    magazine,
    products,
};

