# Program Site Blueprint

Use for degree programs, certificates, executive education offerings, and comparable academic/program experiences.

## Primary user journeys

- understand what the program is and whether it fits;
- explore curriculum and experience;
- evaluate outcomes and differentiators;
- understand admissions, requirements, cost, and timing;
- meet faculty/community;
- attend an event or request information;
- apply.

## Default sitemap

- Home / Overview
- Academics or Curriculum
- Admissions / Requirements
- Student Experience
- Career / Outcomes
- Faculty
- Tuition / Financial Information
- Events / Visit
- Stories / News when justified
- Contact / Request Information
- Apply

Adapt this to the real program. Do not preserve pages that lack a user need.

## Template mapping

- Home: `Landing` or `Homepage` when the program has a broader discovery role.
- Curriculum: `Standard` or `Topic` for complex academic structures.
- Admissions: `Standard`; use `Sidebar` only when persistent secondary navigation genuinely helps.
- Faculty: `Directory` or `Standard` with PersonList.
- Stories: `Article` for individual stories and `Topic`/`Landing` for collections.
- Events: `Standard` or `Landing` with EventList.
- Search: `Search` only when corpus size/use cases justify it.

## Core entities

Likely: Person, Story, Event, Course, NavigationItem, Action, Asset.

## Homepage/landing composition

Recommended sequence:

1. Hero or strong template title + PageIntro;
2. primary CTA model such as Apply / Request Information / Attend an Event;
3. audience-fit/value explanation;
4. program pathways using navigation CardGrid where appropriate;
5. evidence via StatsGroup or FeatureRow;
6. curriculum/experience preview;
7. faculty/community proof;
8. stories/events when strategically relevant;
9. focused conversion Callout.

## Content model questions before build

- Is there one program or a family of programs/options?
- What decisions do prospective students make before applying?
- Which outcomes can be substantiated with source/timeframe?
- Are curriculum structures sequential, parallel, or reference-oriented?
- What admissions information must remain visible rather than hidden in Disclosure/Tabs?
- Which CTAs represent different stages of readiness?

## Common component/pattern choices

- Hero for a true program-level opening, not every interior page.
- CardGrid/navigation Card for durable program pathways.
- Tabs only for genuinely parallel views such as program format options.
- Disclosure for optional detail, not required admissions information.
- StatsGroup for sourced outcomes.
- PersonList for faculty.
- EventList for admissions/visit experiences.
- StoryCollection for student/alumni/editorial proof.
- Callout for a focused next action.

## Avoid

- multiple competing primary CTAs;
- hiding core requirements in accordions;
- turning all curriculum content into cards;
- unsourced statistics;
- duplicating faculty data as hand-authored cards;
- creating a separate component family for one program's branding.

## First working prototype acceptance criteria

- global/site navigation reflects approved IA;
- all primary journey pages are routable;
- one H1 owner per page;
- program content is site-owned, not hardcoded into shared components;
- structured people/events/stories/courses use entities where appropriate;
- primary conversion paths work with keyboard and mobile layouts;
- current theme renders the complete site without requiring `new-theme` changes.