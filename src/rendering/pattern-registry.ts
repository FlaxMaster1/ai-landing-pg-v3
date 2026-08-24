import Hero from "@patterns/Hero.astro";
import PageIntro from "@patterns/PageIntro.astro";
import CardGrid from "@patterns/CardGrid.astro";
import FeatureRow from "@patterns/FeatureRow.astro";
import VideoEmbed from "@patterns/VideoEmbed.astro";
import Callout from "@patterns/Callout.astro";
import StatsGroup from "@patterns/StatsGroup.astro";
import FAQ from "@patterns/FAQ.astro";
import Tabs from "@patterns/Tabs.astro";
import StoryCollection from "@patterns/StoryCollection.astro";
import EventList from "@patterns/EventList.astro";
import PersonList from "@patterns/PersonList.astro";
import Form from "@patterns/Form.astro";
import type { SectionConfig } from "@schemas/page";

export const patternRegistry = {
  hero: Hero,
  pageIntro: PageIntro,
  cardGrid: CardGrid,
  featureRow: FeatureRow,
  videoEmbed: VideoEmbed,
  callout: Callout,
  statsGroup: StatsGroup,
  faq: FAQ,
  tabs: Tabs,
  storyCollection: StoryCollection,
  eventList: EventList,
  personList: PersonList,
  form: Form
} satisfies Record<SectionConfig["type"], unknown>;

export function resolvePattern(type: SectionConfig["type"]) {
  const pattern = patternRegistry[type];
  if (!pattern) throw new Error(`Unknown pattern type '${type}'`);
  return pattern;
}
