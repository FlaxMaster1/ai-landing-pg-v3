import { z } from "zod";
import { navigationItemSchema } from "./entities";
import { DEFAULT_THEME, themeIds } from "../themes/contracts";

export const featureFlagsSchema = z.object({
  search: z.boolean().default(true),
  mobileNavigation: z.boolean().default(true),
  themePreview: z.boolean().default(false)
});

export const siteConfigSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  referenceDomain: z.url().optional(),
  prototypeTitle: z.string().min(1),
  theme: z.enum(themeIds).default(DEFAULT_THEME),
  institutionalBrand: z
    .object({
      homeUrl: z.url(),
      headerLogo: z.object({ src: z.url(), alt: z.string().min(1) }),
      footerLogo: z.object({ src: z.url(), alt: z.string().min(1) })
    })
    .optional(),
  featureFlags: featureFlagsSchema.default({ search: true, mobileNavigation: true, themePreview: false }),
  defaultSeo: z.object({ titleSuffix: z.string(), description: z.string() }),
  ui: z.object({
    skipToContent: z.string().min(1),
    menu: z.string().min(1),
    closeMenu: z.string().min(1),
    back: z.string().min(1),
    search: z.string().min(1),
    searchSubmit: z.string().min(1),
    backToTop: z.string().min(1),
    eventEmpty: z.string().min(1),
    formSuccess: z.string().min(1),
    programNavigationLabel: z.string().min(1),
    primaryNavigationLabel: z.string().min(1),
    footerLabel: z.string().min(1),
    footerAdditionalLinks: z.string().min(1).default("Additional Links"),
    themeSelector: z.string().min(1).default("Preview theme"),
    oldTheme: z.string().min(1).default("Old theme"),
    newTheme: z.string().min(1).default("New theme — Step 7 scaffold"),
    configuredTheme: z.string().min(1).default("Configured theme")
  }),
  integrations: z.record(z.string(), z.object({ provider: z.string() })).default({})
});

export const navigationSchema = z.object({
  program: z.array(navigationItemSchema),
  primary: z.array(navigationItemSchema)
});

export const footerSchema = z.object({
  additionalLinks: z.array(navigationItemSchema).default([]),
  institutionalGroups: z.array(
    z.object({
      heading: z.string().min(1),
      links: z.array(navigationItemSchema)
    })
  ),
  legal: z.array(navigationItemSchema).default([])
});
