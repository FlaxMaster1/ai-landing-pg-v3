import type { Course, Event, Person, Story } from "@entities/index";

export interface QueryOptions {
  ids?: string[];
  query?: string;
  limit?: number;
}

export interface EventsProvider {
  list(options?: QueryOptions): Promise<Event[]>;
}

export interface FacultyData {
  people(options?: QueryOptions): Promise<Person[]>;
  courses(options?: QueryOptions): Promise<Course[]>;
}

export interface ContentFeed {
  stories(options?: QueryOptions): Promise<Story[]>;
}

export interface FormSubmission {
  formId: string;
  values: Record<string, string>;
}

export interface FormResult {
  ok: boolean;
  message: string;
}

export interface FormProvider {
  submit(submission: FormSubmission): Promise<FormResult>;
}

export interface VideoProvider {
  getEmbedUrl(id: string): Promise<string>;
}

export interface Authentication {
  isAuthenticated(): Promise<boolean>;
}

export interface SearchResult {
  title: string;
  url: string;
  excerpt?: string;
}

export interface SearchProvider {
  search(query: string): Promise<SearchResult[]>;
}

export interface Analytics {
  track(event: string, properties?: Record<string, string | number | boolean>): void;
}

export interface IntegrationProviders {
  events: EventsProvider;
  faculty: FacultyData;
  content: ContentFeed;
  forms: FormProvider;
  video: VideoProvider;
  authentication: Authentication;
  search: SearchProvider;
  analytics: Analytics;
}
