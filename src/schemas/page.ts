import { z } from "zod";
import { actionSchema } from "./entities";
import { navigationItemSchema } from "./entities";

const baseSectionSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().optional(),
  heading: z.string().optional()
});

const imageReferenceSchema = z.object({ assetId: z.string().min(1) });

const videoReferenceSchema = z.object({
  provider: z.enum(["youtube", "vimeo"]).default("youtube"),
  // YouTube IDs are 11 characters; Vimeo IDs are numeric.
  videoId: z.string().regex(/^[A-Za-z0-9_-]{6,20}$/, "videoId must be a YouTube or Vimeo video ID"),
  videoHash: z.string().regex(/^[A-Za-z0-9]+$/).optional(),
  title: z.string().min(1),
  caption: z.string().optional(),
  aspectRatio: z.string().default("16 / 9"),
  sourceAspectRatio: z.string().default("16 / 9"),
  autoplay: z.boolean().default(false),
  controls: z.boolean().default(true),
  veilColor: z.string().optional()
});

const cardItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  eyebrow: z.string().optional(),
  image: imageReferenceSchema.optional(),
  action: actionSchema.optional()
});

export const sectionSchema = z.discriminatedUnion("type", [
  baseSectionSchema.extend({
    type: z.literal("hero"),
    heading: z.string().min(1),
    text: z.string().optional(),
    image: imageReferenceSchema.optional(),
    actions: z.array(actionSchema).max(2).optional(),
    variant: z.enum(["short", "tall", "media"]).default("short")
  }),
  baseSectionSchema.extend({
    type: z.literal("pageIntro"),
    heading: z.string().optional(),
    text: z.string().min(1).optional(),
    actions: z.array(actionSchema).max(2).optional()
  }),
  baseSectionSchema.extend({
    type: z.literal("cardGrid"),
    heading: z.string().optional(),
    items: z.array(cardItemSchema).min(1),
    backgroundImage: imageReferenceSchema.optional(),
    columns: z.union([z.literal(2), z.literal(3)]).default(3),
    variant: z.enum(["editorial", "promotional", "navigation"]).default("promotional")
  }),
  baseSectionSchema.extend({
    type: z.literal("featureRow"),
    heading: z.string().min(1),
    text: z.string().min(1),
    links: z.array(z.object({ text: z.string().min(1), url: z.string().min(1), external: z.boolean().optional() })).optional(),
    image: imageReferenceSchema.optional(),
    mobileImage: imageReferenceSchema.optional(),
    video: videoReferenceSchema.optional(),
    action: actionSchema.optional(),
    mediaPosition: z.enum(["start", "end"]).default("start")
  }),
  baseSectionSchema.extend({
    type: z.literal("videoEmbed"),
    heading: z.string().optional(),
    text: z.string().optional()
  }).extend(videoReferenceSchema.shape),
  baseSectionSchema.extend({
    type: z.literal("callout"),
    heading: z.string().min(1),
    text: z.string().min(1),
    action: actionSchema.optional(),
    surface: z.enum(["brand-primary", "brand-accent", "subtle"]).default("brand-primary")
  }),
  baseSectionSchema.extend({
    type: z.literal("statsGroup"),
    heading: z.string().optional(),
    items: z.array(z.object({ value: z.string().min(1), label: z.string().min(1), detail: z.string().optional() })).min(1)
  }),
  baseSectionSchema.extend({
    type: z.literal("faq"),
    heading: z.string().optional(),
    items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1)
  }),
  baseSectionSchema.extend({
    type: z.literal("tabs"),
    heading: z.string().optional(),
    orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
    items: z.array(z.object({ label: z.string().min(1), content: z.string().min(1) })).min(2)
  }),
  baseSectionSchema.extend({
    type: z.literal("storyCollection"),
    heading: z.string().optional(),
    entityIds: z.array(z.string()).min(1),
    variant: z.enum(["grid", "list", "featured"]).default("grid")
  }),
  baseSectionSchema.extend({
    type: z.literal("eventList"),
    heading: z.string().optional(),
    entityIds: z.array(z.string()).min(1),
    variant: z.enum(["list", "grid", "featured"]).default("list")
  }),
  baseSectionSchema.extend({
    type: z.literal("personList"),
    heading: z.string().optional(),
    entityIds: z.array(z.string()).min(1),
    variant: z.enum(["cards", "directory"]).default("cards")
  }),
  baseSectionSchema.extend({
    type: z.literal("form"),
    heading: z.string().min(1),
    text: z.string().optional(),
    submitLabel: z.string().default("Submit"),
    fields: z.array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        type: z.enum(["text", "email", "textarea"]),
        required: z.boolean().default(false),
        hint: z.string().optional()
      })
    ).min(1)
  })
]);

export const templateTypeSchema = z.enum([
  "homepage",
  "standard",
  "landing",
  "article",
  "topic",
  "directory",
  "search",
  "sidebar"
]);

export const pageSchema = z
  .object({
    route: z.string().startsWith("/"),
    template: templateTypeSchema,
    title: z.string().min(1),
    titleMode: z.enum(["default", "hero"]).default("default"),
    width: z.enum(["contained", "full", "full-window"]).default("contained"),
    sidebar: z.enum(["none", "start", "end"]).default("none"),
    seo: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
    contentId: z.string().optional(),
    sectionNavigation: z.object({ label: z.string().min(1), items: z.array(navigationItemSchema).min(1) }).optional(),
    sections: z.array(sectionSchema).default([])
  })
  .superRefine((page, context) => {
    const heroCount = page.sections.filter((section) => section.type === "hero").length;
    const expectedHeroCount = page.titleMode === "hero" ? 1 : 0;
    if (heroCount !== expectedHeroCount) {
      context.addIssue({
        code: "custom",
        path: ["sections"],
        message: page.titleMode === "hero"
          ? "titleMode 'hero' requires exactly one Hero H1 owner"
          : "titleMode 'default' uses the template H1 and cannot include a Hero"
      });
    }
    if (page.template === "article" && !page.contentId) {
      context.addIssue({ code: "custom", path: ["contentId"], message: "Article templates require a Markdown contentId" });
    }
    if (page.template !== "sidebar" && page.sidebar !== "none") {
      context.addIssue({ code: "custom", path: ["sidebar"], message: "Only the Sidebar template may enable a sidebar region" });
    }
    if (page.template === "sidebar" && page.sidebar !== "none" && !page.sectionNavigation) {
      context.addIssue({ code: "custom", path: ["sectionNavigation"], message: "Enabled Sidebar templates require section navigation data" });
    }
  });

export type PageConfig = z.infer<typeof pageSchema>;
export type SectionConfig = z.infer<typeof sectionSchema>;
export type TemplateType = z.infer<typeof templateTypeSchema>;
