import type { LoadedSite } from "@rendering/site-loader";
import type {
  Analytics,
  Authentication,
  ContentFeed,
  EventsProvider,
  FacultyData,
  FormProvider,
  IntegrationProviders,
  QueryOptions,
  SearchProvider,
  VideoProvider
} from "./contracts";

function selectByOptions<T extends { id: string }>(items: T[], options: QueryOptions = {}): T[] {
  let selected = options.ids ? options.ids.flatMap((id) => items.find((item) => item.id === id) ?? []) : [...items];
  if (options.query) {
    const query = options.query.toLocaleLowerCase();
    selected = selected.filter((item) => JSON.stringify(item).toLocaleLowerCase().includes(query));
  }
  return typeof options.limit === "number" ? selected.slice(0, options.limit) : selected;
}

export class FixtureEventsProvider implements EventsProvider {
  constructor(private readonly site: LoadedSite) {}
  async list(options?: QueryOptions) {
    return selectByOptions(this.site.entities.events, options);
  }
}

export class FixtureFacultyData implements FacultyData {
  constructor(private readonly site: LoadedSite) {}
  async people(options?: QueryOptions) {
    return selectByOptions(this.site.entities.people, options);
  }
  async courses(options?: QueryOptions) {
    return selectByOptions(this.site.entities.courses, options);
  }
}

export class FixtureContentFeed implements ContentFeed {
  constructor(private readonly site: LoadedSite) {}
  async stories(options?: QueryOptions) {
    return selectByOptions(this.site.entities.stories, options);
  }
}

export class PrototypeFormProvider implements FormProvider {
  async submit(submission: { formId: string; values: Record<string, string> }) {
    return {
      ok: Object.values(submission.values).some(Boolean),
      message: "Prototype submission accepted; no data was sent to an external service."
    };
  }
}

class FixtureVideoProvider implements VideoProvider {
  async getEmbedUrl(id: string) {
    return `https://video.example.invalid/${encodeURIComponent(id)}`;
  }
}

class AnonymousAuthentication implements Authentication {
  async isAuthenticated() {
    return false;
  }
}

class FixtureSearchProvider implements SearchProvider {
  constructor(private readonly site: LoadedSite) {}
  async search(query: string) {
    const stories = await new FixtureContentFeed(this.site).stories({ query });
    return stories.map(({ title, url, excerpt }) => ({ title, url, excerpt }));
  }
}

class NoopAnalytics implements Analytics {
  track(_event: string, _properties?: Record<string, string | number | boolean>) {}
}

export function createFixtureProviders(site: LoadedSite): IntegrationProviders {
  return {
    events: new FixtureEventsProvider(site),
    faculty: new FixtureFacultyData(site),
    content: new FixtureContentFeed(site),
    forms: new PrototypeFormProvider(),
    video: new FixtureVideoProvider(),
    authentication: new AnonymousAuthentication(),
    search: new FixtureSearchProvider(site),
    analytics: new NoopAnalytics()
  };
}
