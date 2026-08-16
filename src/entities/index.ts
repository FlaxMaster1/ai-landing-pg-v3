export interface Action {
  label: string;
  url: string;
  type?: "primary" | "secondary" | "text";
  external?: boolean;
}

export interface NavigationItem {
  label: string;
  url: string;
  children?: NavigationItem[];
  external?: boolean;
  active?: boolean;
}

export interface Asset {
  id: string;
  file: string;
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  focalPoint?: { x: number; y: number };
}

export interface Story {
  id: string;
  title: string;
  url: string;
  excerpt?: string;
  image?: string;
  date?: string;
  author?: string;
  topic?: string;
  source?: string;
}

export interface Event {
  id: string;
  title: string;
  url: string;
  start: string;
  end?: string;
  location?: string;
  format?: "in-person" | "online" | "hybrid";
  description?: string;
  category?: string;
  series?: string;
}

export interface Person {
  id: string;
  name: string;
  title?: string;
  affiliation?: string;
  image?: string;
  bio?: string;
  contact?: { email?: string; phone?: string };
  links?: Action[];
}

export interface Course {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  term?: string;
  semesterType?: string;
  faculty?: string[];
}
