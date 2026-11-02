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

export const collections = {
    magazine,
};

