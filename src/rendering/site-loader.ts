import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Asset, Course, Event, NavigationItem, Person, Story } from "@entities/index";
import {
  assetSchema,
  courseSchema,
  eventSchema,
  footerSchema,
  navigationSchema,
  pageSchema,
  personSchema,
  siteConfigSchema,
  storySchema,
  type PageConfig
} from "@schemas/index";
import { z } from "zod";

const siteIdPattern = /^[a-z0-9-]+$/;
const assetBasePath = (import.meta.env.BASE_URL ?? "/").replace(/\/?$/, "/");

export interface LoadedSite {
  id: string;
  root: string;
  config: z.infer<typeof siteConfigSchema>;
  navigation: {
    program: NavigationItem[];
    primary: NavigationItem[];
  };
  footer: z.infer<typeof footerSchema>;
  pages: PageConfig[];
  assets: Asset[];
  entities: {
    stories: Story[];
    events: Event[];
    people: Person[];
    courses: Course[];
  };
}

function readJson(file: string): unknown {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`Unable to read JSON at ${path.relative(process.cwd(), file)}: ${String(error)}`);
  }
}

function parseFile<T>(file: string, schema: z.ZodType<T>): T {
  const result = schema.safeParse(readJson(file));
  if (!result.success) {
    throw new Error(`Invalid ${path.relative(process.cwd(), file)}\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function parseDirectory<T>(directory: string, schema: z.ZodType<T>): T[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .flatMap((file) => parseFile(path.join(directory, file), z.array(schema)));
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  if (duplicates.size > 0) throw new Error(`Duplicate ${label}: ${[...duplicates].join(", ")}`);
}

function validateReferences(site: LoadedSite): void {
  const assetIds = new Set(site.assets.map((asset) => asset.id));
  const storyIds = new Set(site.entities.stories.map((entity) => entity.id));
  const eventIds = new Set(site.entities.events.map((entity) => entity.id));
  const personIds = new Set(site.entities.people.map((entity) => entity.id));

  const requireIds = (ids: string[], available: Set<string>, label: string, route: string) => {
    const missing = ids.filter((id) => !available.has(id));
    if (missing.length) throw new Error(`${route} references unknown ${label}: ${missing.join(", ")}`);
  };

  for (const asset of site.assets) {
    if (!existsSync(path.join(site.root, "assets", asset.file))) {
      throw new Error(`Asset '${asset.id}' points to missing file: ${asset.file}`);
    }
  }

  for (const entity of [...site.entities.stories, ...site.entities.people]) {
    if (entity.image) requireIds([entity.image], assetIds, "asset IDs", `Entity '${entity.id}'`);
  }

  for (const page of site.pages) {
    if (page.contentId) {
      const markdownFile = path.join(site.root, "content", `${page.contentId}.md`);
      if (!existsSync(markdownFile)) throw new Error(`${page.route} references missing Markdown content: ${page.contentId}`);
    }
    for (const section of page.sections) {
      if (section.type === "hero" || section.type === "featureRow") {
        if (section.image) requireIds([section.image.assetId], assetIds, "asset IDs", page.route);
        if (section.type === "featureRow" && section.mobileImage) requireIds([section.mobileImage.assetId], assetIds, "asset IDs", page.route);
      }
      if (section.type === "cardGrid") {
        requireIds(section.items.flatMap((item) => item.image ? [item.image.assetId] : []), assetIds, "asset IDs", page.route);
      }
      if (section.type === "storyCollection") requireIds(section.entityIds, storyIds, "story IDs", page.route);
      if (section.type === "eventList") requireIds(section.entityIds, eventIds, "event IDs", page.route);
      if (section.type === "personList") requireIds(section.entityIds, personIds, "person IDs", page.route);
    }
  }
}

export function selectedSiteId(): string {
  const id = process.env.SITE ?? import.meta.env.SITE_ID ?? "reference";
  if (!siteIdPattern.test(id)) throw new Error(`Invalid SITE '${id}'. Use lowercase letters, numbers, and hyphens.`);
  return id;
}

export function loadSite(siteId = selectedSiteId(), repositoryRoot = process.cwd()): LoadedSite {
  if (!siteIdPattern.test(siteId)) throw new Error(`Invalid site ID '${siteId}'`);
  const root = path.join(repositoryRoot, "sites", siteId);
  if (!existsSync(root)) throw new Error(`Unknown site '${siteId}'. Expected ${path.relative(repositoryRoot, root)}`);

  const parsedAssets = parseFile(path.join(root, "assets.json"), z.array(assetSchema));
  const site: LoadedSite = {
    id: siteId,
    root,
    config: parseFile(path.join(root, "site.config.json"), siteConfigSchema),
    navigation: parseFile(path.join(root, "navigation.json"), navigationSchema) as LoadedSite["navigation"],
    footer: parseFile(path.join(root, "footer.json"), footerSchema),
    pages: parseDirectory(path.join(root, "pages"), pageSchema),
    assets: parsedAssets.map((asset) => ({
      ...asset,
      src: `${assetBasePath}site-assets/${siteId}/${asset.file}`,
      mobileSrc: asset.mobileFile ? `${assetBasePath}site-assets/${siteId}/${asset.mobileFile}` : undefined
    })),
    entities: {
      stories: parseDirectory(path.join(root, "entities", "stories"), storySchema),
      events: parseDirectory(path.join(root, "entities", "events"), eventSchema),
      people: parseDirectory(path.join(root, "entities", "people"), personSchema),
      courses: parseDirectory(path.join(root, "entities", "courses"), courseSchema)
    }
  };

  if (site.config.id !== siteId) throw new Error(`Site config ID '${site.config.id}' does not match selected site '${siteId}'`);
  assertUnique(site.pages.map((page) => page.route), "routes");
  assertUnique(site.assets.map((asset) => asset.id), "asset IDs");
  assertUnique(
    [...site.entities.stories, ...site.entities.events, ...site.entities.people, ...site.entities.courses].map((entity) => entity.id),
    "entity IDs"
  );
  validateReferences(site);
  return site;
}

export function findPage(site: LoadedSite, route: string): PageConfig {
  const page = site.pages.find((candidate) => candidate.route === route);
  if (!page) throw new Error(`No page is configured for route '${route}' in site '${site.id}'`);
  return page;
}

export function resolveAsset(site: LoadedSite, id: string): Asset {
  const asset = site.assets.find((candidate) => candidate.id === id);
  if (!asset) throw new Error(`Unknown asset ID '${id}' in site '${site.id}'`);
  return asset;
}
