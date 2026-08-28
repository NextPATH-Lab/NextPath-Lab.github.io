import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  date: z.date().or(z.string()),
  image: z.string().optional(),
  layout: z.string().optional(),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: baseSchema,
});

const wikiCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
  schema: baseSchema,
});

export const collections = {
  'posts': postsCollection,
  'wiki': wikiCollection,
};
