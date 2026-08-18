# Initiative / Center / Institute Site Blueprint

Use for centers, institutes, labs, initiatives, and other mission-led organizations that combine research, programming, people, impact, and participation.

## Primary user journeys

- understand mission and strategic focus;
- see evidence of impact;
- explore programs, research, or initiatives;
- find affiliated people and experts;
- discover events and current work;
- partner, participate, support, subscribe, or contact.

## Default sitemap

- Home
- About / Mission
- Priorities / Focus Areas
- Research / Programs
- People / Leadership / Fellows
- Impact / Outcomes
- Events
- Stories / News
- Get Involved / Partner / Support
- Contact

## Template mapping

- Home: `Landing` or `Homepage`.
- Focus areas: `Topic` or `Landing`.
- Program/research detail: `Standard` or `Topic`.
- People: `Directory`.
- Stories: `Article`.
- Impact/reference pages: `Standard`.

## Core entities

Likely: Person, Story, Event, NavigationItem, Action, Asset. Course may apply to educational centers; additional entities should only be added after a reusable need is proven.

## Landing composition

1. mission/value proposition;
2. strategic priorities;
3. evidence/impact;
4. research/program pathways;
5. people/leadership;
6. current stories/events;
7. partnership/participation/support action.

## Content model questions before build

- What is the clearest statement of mission and intended impact?
- Which priorities are durable enough to be navigation categories?
- What evidence can substantiate impact claims?
- Are programs/research areas peer items or featured + supporting?
- Who are the major participation audiences: faculty, students, industry, alumni, donors, media?
- Which CTA is primary for each audience?

## Common component/pattern choices

- Hero for mission-led opening.
- StatsGroup for sourced impact evidence.
- FeatureRow for flagship work or strategic priorities.
- navigation CardGrid for durable areas/programs.
- PersonList for leadership/fellows/faculty.
- StoryCollection for research/impact stories.
- EventList when convening is strategically important.
- Callout for partner/support/contact actions.

## Avoid

- vague mission statements followed by equally vague promotional cards;
- decorative statistics without source, unit, or timeframe;
- giving every project equal visual hierarchy when priorities differ;
- multiple support/subscribe/contact Callouts competing on one page;
- creating initiative-specific shared components that cannot generalize.

## First working prototype acceptance criteria

- mission, priorities, and evidence hierarchy is clear without relying on final visual styling;
- durable priorities are represented in navigation or Topic pages appropriately;
- people/stories/events use structured entities;
- participation CTAs are explicit and non-competing;
- mobile and keyboard journeys work end-to-end;
- current theme supports all required page structures before `new-theme` work starts.