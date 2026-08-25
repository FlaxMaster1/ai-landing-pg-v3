import { z } from "zod";

export const actionSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
  type: z.enum(["primary", "secondary", "text"]).optional(),
  external: z.boolean().optional()
});

export const navigationItemSchema: z.ZodType<{
  label: string;
  url: string;
  logo?: { src: string; width: number; height: number };
  children?: Array<unknown>;
  external?: boolean;
  active?: boolean;
}> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    url: z.string().min(1),
    logo: z.object({
      src: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive()
    }).optional(),
    children: z.array(navigationItemSchema).optional(),
    external: z.boolean().optional(),
    active: z.boolean().optional()
  })
);

export const assetSchema = z.object({
  id: z.string().min(1),
  file: z.string().min(1).refine((file) => !file.startsWith("/") && !file.split("/").includes(".."), "Asset files must stay inside the site asset root"),
  mobileFile: z.string().min(1).refine((file) => !file.startsWith("/") && !file.split("/").includes(".."), "Asset files must stay inside the site asset root").optional(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  focalPoint: z
    .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
    .optional()
});

export const storySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().min(1),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  date: z.iso.date().optional(),
  author: z.string().optional(),
  topic: z.string().optional(),
  source: z.string().optional()
});

export const eventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().min(1),
  start: z.iso.datetime({ offset: true }),
  end: z.iso.datetime({ offset: true }).optional(),
  location: z.string().optional(),
  format: z.enum(["in-person", "online", "hybrid"]).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  series: z.string().optional()
});

export const personSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().optional(),
  affiliation: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  contact: z.object({ email: z.email().optional(), phone: z.string().optional() }).optional(),
  links: z.array(actionSchema).optional()
});

export const courseSchema = z.object({
  id: z.string().min(1),
  courseId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  term: z.string().optional(),
  semesterType: z.string().optional(),
  faculty: z.array(z.string()).optional()
});
