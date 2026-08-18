# Department Site Blueprint

Use for academic departments whose core identity is built around faculty, research, teaching, students, and departmental activity.

## Primary user journeys

- understand the department's academic/intellectual focus;
- find faculty and experts;
- explore research areas;
- understand courses/programs and academic opportunities;
- find seminars, events, news, and departmental resources;
- contact department administration.

## Default sitemap

- Home
- About / Department Overview
- Research / Research Areas
- Faculty / People
- Programs / Courses / Academics
- Seminars / Events
- News / Stories
- Students / Resources when justified
- Contact

## Template mapping

- Home: `Landing` or `Homepage`.
- Research overview/themes: `Topic`.
- Faculty: `Directory`.
- Course/program information: `Standard`, `Topic`, or `Directory` depending on lookup needs.
- Individual editorial stories: `Article`.
- Events: `Standard`/`Landing` with EventList.
- Administrative/reference pages: `Standard`.

## Core entities

Likely: Person, Story, Event, Course, NavigationItem, Action, Asset.

## Department landing composition

1. department identity and intellectual focus;
2. major pathways such as Research, Faculty, Academics;
3. featured research theme or current priority;
4. faculty/expert preview;
5. recent stories/research;
6. seminars/events when core to the audience;
7. contact or academic next step.

## Content model questions before build

- Is the primary audience prospective students, current students, researchers, faculty peers, media, or several groups?
- Are research areas durable navigation categories or editorial priorities?
- Is course information browseable content or reference data?
- Does the people experience need visual discovery, dense lookup, or both?
- Which content is department-owned versus centrally managed elsewhere?

## Common component/pattern choices

- Topic template for research themes.
- PersonList directory variant for large faculty/staff collections.
- PersonCard card variant for curated faculty features.
- StoryCollection for research/news.
- EventList for seminars and talks.
- CardGrid/navigation cards for durable major pathways.
- FeatureRow for one significant research area or academic distinction.
- SearchForm only when the amount of content creates a real search task.

## Avoid

- rendering a full department directory as large image cards;
- mixing courses, people, and stories into one generic CardGrid;
- using editorial promotion patterns for routine administrative information;
- repeating the same research links in primary navigation and several card grids without purpose;
- making transient news topics part of durable site IA.

## First working prototype acceptance criteria

- approved department IA is reflected in navigation;
- faculty/people use structured Person data;
- research themes map to Topic/appropriate page recipes;
- course/entity data remains separate from presentation;
- event/story feeds are distinguishable from static navigation;
- administrative content remains easy to scan;
- the complete site works with the current functional theme before any `new-theme` styling begins.