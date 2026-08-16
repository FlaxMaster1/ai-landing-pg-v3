import Article from "@templates/Article.astro";
import Directory from "@templates/Directory.astro";
import Homepage from "@templates/Homepage.astro";
import Landing from "@templates/Landing.astro";
import Search from "@templates/Search.astro";
import Sidebar from "@templates/Sidebar.astro";
import Standard from "@templates/Standard.astro";
import Topic from "@templates/Topic.astro";
import type { TemplateType } from "@schemas/page";

export const templateRegistry = {
  homepage: Homepage,
  standard: Standard,
  landing: Landing,
  article: Article,
  topic: Topic,
  directory: Directory,
  search: Search,
  sidebar: Sidebar
} satisfies Record<TemplateType, unknown>;

export function resolveTemplate(type: TemplateType) {
  const template = templateRegistry[type];
  if (!template) throw new Error(`Unknown template type '${type}'`);
  return template;
}
