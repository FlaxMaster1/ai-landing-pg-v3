import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const narratives = defineCollection({
  loader: glob({ pattern: "*/content/**/*.md", base: "./sites" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    date: z.coerce.date().optional()
  })
});

export const collections = { narratives };
