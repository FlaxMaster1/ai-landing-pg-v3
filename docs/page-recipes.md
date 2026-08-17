# Wharton Web Prototype Framework Page Recipes

**Status:** Living documentation  
**Version:** 0.1  
**Decision framework:** `WHARTON_DESIGN_DECISION_FRAMEWORK.md`  
**Component usage handbook:** `docs/component-handbook.md`  
**Inventory source of truth:** `src/registry/framework-elements.ts`

This document explains how to compose complete Wharton website experiences from the registered framework components, patterns, global elements, templates, and entities.

A recipe is not a fixed page design. It is a decision framework for common page types and website contexts. Recipes define the likely information hierarchy, recommended patterns, useful alternatives, discouraged choices, content requirements, responsive behavior, accessibility concerns, and review questions.

The purpose is to help Codex, Claude Code, designers, developers, and content strategists assemble coherent websites without treating the component library as a visual menu.

---

## 1. How to use page recipes

Use recipes after strategy, sitemap, content model, and primary user tasks are understood.

The expected workflow is:

**Site strategy → User goals → Content model → Sitemap → Page purpose → Recipe → Pattern selection → Component selection → Variant selection → Responsive/accessibility review**

Before composing a page:

1. identify the page's primary audience;
2. identify the page's primary user goal;
3. identify the page's primary content relationship;
4. select the closest recipe;
5. adapt the recipe rather than copying it literally;
6. consult `WHARTON_DESIGN_DECISION_FRAMEWORK.md` for pattern decisions;
7. consult `docs/component-handbook.md` for component-level distinctions;
8. inspect `src/registry/framework-elements.ts` to confirm the selected element exists;
9. preserve semantic hierarchy and one H1 owner;
10. document any deliberate departure from the recipe when it introduces a new reusable pattern.

Recipes should reduce guesswork, not eliminate design judgment.

---

# 2. Site-level composition principles

## 2.1 Start with user journeys, not page inventory

A site should not be designed as a collection of independent pages. Identify the major journeys first.

Examples:

- prospective student → understand program → compare options → requirements → apply;
- executive → understand offering → assess fit → view outcomes → contact/admit;
- researcher → explore topic → find faculty → read research → discover related work;
- visitor → understand initiative → see evidence → meet people → participate/support;
- journalist → understand topic → locate expert → review recent research → contact.

Page recipes should support these journeys across multiple pages.

## 2.2 Global navigation reflects durable information architecture

Use global/site navigation for durable high-level categories, not every campaign or editorial priority.

FeatureRow, CardGrid, Callout, and StoryCollection should handle changing editorial emphasis inside pages rather than repeatedly restructuring navigation.

## 2.3 Page sections should have distinct jobs

Each page section should primarily do one of the following:

- orient;
- explain;
- prove;
- compare;
- route;
- promote;
- convert;
- provide reference/detail;
- surface related content.

If a section tries to do several unrelated jobs, split it or simplify it.

## 2.4 Strong hierarchy is preferable to uniform component density

Do not give every section equal visual weight. A useful page typically has a clear opening, a small number of priority sections, supporting information, and a next action.

## 2.5 Not every page needs a Hero

Use Hero when a strong page-opening composition is warranted. Standard informational pages may use a template-owned title plus PageIntro.

## 2.6 Do not use cards as default layout containers

Cards are for discrete browseable objects or destinations. Long-form explanatory content should usually remain ordinary content sections.

## 2.7 Conversion should match intent

A program page may appropriately emphasize Apply or Request Information. A research article should usually prioritize reading and related discovery rather than repeated conversion CTAs.

---

# 3. Homepage recipe

**Recommended template:** `Homepage`  
**Primary purpose:** Establish site identity, communicate highest-priority value, and route users into major journeys.  
**Typical user goals:** orient, explore, identify relevance, discover current priorities.

## Recommended information hierarchy

1. site identity and global/site navigation;
2. primary value proposition or priority message;
3. major pathways/destinations;
4. proof or differentiating evidence;
5. current/editorial content;
6. upcoming events or people where strategically relevant;
7. focused CTA/next action;
8. footer/global utility.

## Recommended patterns

### Opening

Use `Hero` when the site has a strong primary identity/message. Prefer `short` by default. Use `media` when the image materially carries meaning. Reserve `tall` for deliberately high-impact sites/campaigns.

### Primary pathways

Use `CardGrid` with `navigation` cards when users must choose among major site destinations.

Prefer a structured link list instead of cards when there are many destinations or the choices are primarily utilitarian.

### Evidence

Use `StatsGroup` when metrics directly reinforce the site's value proposition and have clear context.

Use `FeatureRow` when a major story, initiative, capability, or outcome requires narrative plus media.

### Current content

Use `StoryCollection` for current stories/research/news.

Use `EventList` only if events are genuinely important to the site's audience. Do not include an events block simply because events exist.

### CTA

Use `Callout` for a focused next step such as Apply, Explore Programs, Partner With Us, Contact, or Support.

## Useful alternatives

- PageIntro under a restrained Hero when more context is needed.
- Featured StoryCard followed by a compact StoryCollection.
- FeatureRow before navigation cards when one strategic initiative dominates.

## Avoid

- five or more visually equal promotional sections;
- repeated alternating FeatureRows with no hierarchy;
- multiple primary CTA bands competing with each other;
- an event/news feed simply to make the page feel active;
- giant navigation card grids that duplicate the header navigation.

## Responsive guidance

- preserve priority order on mobile;
- navigation cards should stack/wrap without changing semantic order;
- do not hide lower-priority homepage content solely because of viewport size;
- ensure hero media cropping preserves the subject;
- keep primary CTA reachable without excessive scroll when conversion is a major site goal.

## Accessibility review

- exactly one H1 owner;
- meaningful Hero media alternatives;
- card headings form a sensible outline;
- all route choices are available by keyboard;
- avoid redundant link labels such as repeated “Learn More” without contextual naming.

---

# 4. Program site / program landing recipe

**Recommended template:** `Landing` for program overview; `Standard` or specialized content pages underneath.  
**Primary purpose:** Help prospective participants understand fit, offering, outcomes, requirements, and next action.  
**Typical user goals:** assess fit, explore curriculum, understand outcomes, compare options, apply/contact.

## Recommended program-site information architecture

Common durable sections:

- Overview
- Academics / Curriculum
- Admissions / Requirements
- Student Experience
- Career / Outcomes
- Faculty
- Tuition / Financial Information
- Events / Visit
- Apply / Request Information

Do not force this exact IA. Use the program's user research and content model.

## Program landing hierarchy

1. program identity and value proposition;
2. key next actions;
3. audience-fit / what the program offers;
4. differentiators or outcomes;
5. curriculum/experience pathways;
6. faculty/community proof;
7. stories/events;
8. admissions next step.

## Recommended patterns

### Hero

Use Hero for program name plus concise value proposition. Use a primary CTA only when appropriate to user readiness. Avoid stuffing admissions deadlines, ranking claims, several buttons, and long body copy into the Hero.

### Program pathways

Use navigation CardGrid for major sections such as Curriculum, Admissions, Student Experience, and Careers when those sections benefit from visual discovery.

### Outcomes

Use StatsGroup for meaningful outcomes such as employment, cohort size, global reach, or program duration only when context and source are available.

Use FeatureRow for a major experiential differentiator.

### Curriculum

Use visible stacked content for core curriculum explanation.

Use Tabs only for truly parallel curriculum views, such as Full-Time / Part-Time or Year 1 / Year 2 when users switch between views.

Use Disclosure for optional course detail, not to hide all curriculum content.

### Faculty

Use PersonList with cards for a curated faculty set. Use directory presentation when lookup is more important than visual recognition.

### Stories

Use StoryCollection for student, alumni, research, or program stories.

### Events

Use EventList for information sessions, admissions events, webinars, or visits when they are part of the conversion journey.

### Conversion

Use Callout near decision-relevant points for Apply, Request Information, Attend an Event, or Contact Admissions.

## Avoid

- treating every section as a promotional card grid;
- repeated application CTAs after every paragraph;
- hiding admissions requirements behind tabs;
- using Stats without clear context/timeframe/source;
- using faculty photos as decoration when the content does not help users evaluate the program.

## Responsive guidance

- preserve application/request-info actions without making them sticky unless justified;
- curriculum structures must remain understandable without horizontal scrolling;
- directory presentations should become denser rather than forcing large cards on small screens;
- event date/time must remain scannable.

## Accessibility review

- admissions forms must have visible labels and error associations;
- program-navigation labels must remain understandable out of context;
- any Tabs must support complete keyboard interaction;
- application CTAs should have specific labels.

---

# 5. Department site recipe

**Recommended template:** `Landing` for department homepage; `Standard`, `Directory`, `Article`, and `Topic` for interior pages.  
**Primary purpose:** Represent academic identity, people, research, teaching, and departmental activity.  
**Typical user goals:** understand field, find faculty, explore research, locate courses/programs, find news/events/contact.

## Department landing hierarchy

1. department identity / intellectual focus;
2. major pathways: research, people, programs/courses;
3. selected research or intellectual themes;
4. people/faculty;
5. current stories;
6. events;
7. contact or administrative next action.

## Recommended patterns

- Hero or template title + PageIntro depending on desired emphasis;
- navigation CardGrid for Research, Faculty, Programs/Courses, Seminars/Events;
- FeatureRow for a major research theme or department distinction;
- PersonList for featured faculty;
- StoryCollection for research/news;
- EventList for seminars and talks;
- Callout for prospective students, visitors, or departmental contact.

## Research theme pages

Use `Topic` template when content aggregates a field or theme across people, stories, and related work.

Recommended sequence:

1. title + PageIntro;
2. explanatory content;
3. related faculty via PersonList;
4. related research/stories via StoryCollection;
5. related programs/courses or destinations via CardGrid/list;
6. events when relevant.

## Avoid

- making every faculty member a large visual card on long directories;
- treating department administration content as editorial promotion;
- mixing course lookup and marketing copy in one card grid;
- giving research stories, events, and navigation identical card treatments.

---

# 6. Initiative / center / institute site recipe

**Recommended template:** `Landing` for overview; `Topic`, `Standard`, `Article`, `Directory` underneath.  
**Primary purpose:** Explain mission, demonstrate impact, surface research/people/programming, and encourage participation or support.  
**Typical user goals:** understand mission, see evidence, find experts/research, participate, partner, attend, support.

## Landing hierarchy

1. mission/value proposition;
2. current strategic priorities;
3. evidence/impact;
4. research or programs;
5. people;
6. stories/events;
7. partnership/support/engagement action.

## Recommended patterns

- Hero for mission-led opening;
- StatsGroup for credible impact evidence;
- FeatureRow for strategic priorities or flagship work;
- CardGrid for program/research-area navigation;
- PersonList for leadership/fellows/faculty;
- StoryCollection for research and impact stories;
- EventList when convening is core to the initiative;
- Callout for partner/support/contact actions.

## Avoid

- vague mission language with no evidence immediately below;
- excessive Stats used as decoration;
- treating every initiative/project as equal if priorities differ;
- using Callout repeatedly for routine body sections.

---

# 7. Research site / research hub recipe

**Recommended template:** `Landing` or `Topic` for hub pages; `Article` for individual editorial/research stories; `Directory` for experts/authors when needed.  
**Primary purpose:** Help users discover research by topic, person, publication, or current relevance.  
**Typical user goals:** browse topics, find recent research, locate experts, understand implications, follow related work.

## Hub hierarchy

1. research identity / scope;
2. topic pathways;
3. featured research;
4. recent research/stories;
5. experts/faculty;
6. events or related resources;
7. subscription/contact if relevant.

## Recommended patterns

- Hero or PageIntro;
- navigation CardGrid for major topic areas;
- StoryCollection using feature + grid/list variants;
- PersonList for experts;
- SearchForm when the corpus is large enough to justify search;
- SectionNavigation for topic subsections;
- EventList for research seminars/events;
- Callout for newsletter/subscription/contact only when genuinely useful.

## Search and filtering

Use search when users have a meaningful known-item or keyword task. Do not add a search field solely because the site contains research.

If filtering is introduced later, it must be treated as a new registered interaction pattern with documented accessibility and URL-state behavior.

## Avoid

- generic cards when Story entity presentation exists;
- featured research that lacks title/date/author/topic context;
- hiding all topic content inside Tabs;
- mixing research stories and static navigation links in one undifferentiated CardGrid.

---

# 8. Campaign landing page recipe

**Recommended template:** `Landing`  
**Primary purpose:** Communicate one focused proposition and encourage one primary action.  
**Typical user goals:** understand offer/message, assess relevance, act.

## Recommended hierarchy

1. clear proposition;
2. primary action;
3. supporting explanation;
4. proof/evidence;
5. benefits or stories;
6. objections/details;
7. final CTA.

## Recommended patterns

- Hero, potentially `tall` or `media` when the campaign warrants high impact;
- FeatureRow for key benefits/stories;
- StatsGroup for proof;
- StoryCard/StoryCollection for testimonials or editorial proof when modeled as stories;
- FAQ for genuine objections/questions;
- Callout for final conversion action;
- Form for on-page conversion only when required.

## CTA discipline

A campaign should usually have one dominant conversion goal. Secondary links may exist, but they should not compete equally.

## Avoid

- multiple unrelated primary CTAs;
- long global-navigation detours if the campaign context does not need them;
- adding tabs to compress essential campaign information;
- decorative testimonials without source/context;
- huge forms before the proposition is understood.

## Responsive guidance

- primary CTA should remain prominent without obscuring content;
- media should not consume excessive mobile viewport height;
- forms should remain one-column and readable;
- proof metrics should stack cleanly.

---

# 9. Standard informational page recipe

**Recommended template:** `Standard`  
**Primary purpose:** Explain a topic clearly with minimal interaction.  
**Typical user goals:** learn, reference, understand requirements/process/policy.

## Recommended hierarchy

1. template-owned title;
2. PageIntro when useful;
3. body content with semantic headings;
4. optional supporting patterns;
5. related links/next action.

## Recommended patterns

Use ordinary content first.

Add:

- Disclosure for optional independent details;
- Callout for a genuinely important supporting message;
- StatsGroup for meaningful evidence;
- SectionNavigation for long structured pages;
- CardGrid only when the page transitions into browsing multiple destinations.

## Avoid

- adding a Hero to every standard page;
- turning body sections into cards;
- accordions solely to shorten the page;
- multiple promotional callouts interrupting reading flow.

---

# 10. Topic / subject hub recipe

**Recommended template:** `Topic`  
**Primary purpose:** Explain and aggregate content around a subject area.  
**Typical user goals:** learn, browse subtopics, find experts/stories/events, continue exploration.

## Recommended hierarchy

1. title + concise framing;
2. key subtopic routes;
3. core explanation;
4. featured/current content;
5. people/experts;
6. related events/resources.

## Recommended patterns

- PageIntro;
- navigation CardGrid or SectionNavigation for subtopics;
- FeatureRow for a major feature;
- StoryCollection;
- PersonList;
- EventList;
- Callout for a useful next step.

## Avoid

- making the page merely a feed with no explanatory framing;
- duplicating primary navigation;
- mixing permanent topic routes and temporary editorial stories in one visual hierarchy without distinction.

---

# 11. Article / editorial page recipe

**Recommended template:** `Article`  
**Primary purpose:** Support focused reading and contextual discovery.  
**Typical user goals:** read, understand, identify author/source/date, discover related content.

## Recommended hierarchy

1. title;
2. metadata/byline/date;
3. optional lead/deck;
4. primary media if meaningful;
5. article body;
6. supporting Callout/Stat/Quote-like content only when editorially justified;
7. related stories/topics/people;
8. next navigation.

## Recommended patterns

- Story entity data where appropriate;
- PageIntro-like deck treatment when implemented through article contract;
- StoryCollection for related stories;
- PersonCard/PersonList for relevant experts/authors only when valuable;
- Callout for editorial side-note, not promotional interruption.

## Avoid

- inserting large navigation CardGrids mid-article;
- repeated conversion CTAs interrupting reading;
- using accordion for core article sections;
- treating metadata as decorative text with no semantic structure.

## Responsive guidance

Reading measure should remain comfortable. Media should not force horizontal overflow. Related content can shift beneath the article rather than compressing the reading column.

---

# 12. Directory recipe

**Recommended template:** `Directory`  
**Primary purpose:** Support efficient lookup and scanning of structured entities.  
**Typical user goals:** find person/item, browse alphabetically or by group, inspect concise metadata, open detail.

## Recommended patterns

- PageIntro for directory scope/instructions;
- SearchForm only when the dataset size supports a real search need;
- PersonList `directory` for people;
- EventList `list` for chronological event directories;
- structured list presentation for other entities when no semantic card exists.

## Card vs directory presentation

Use cards when recognition and editorial browsing matter. Use directory/list treatment when density, lookup speed, and comparison matter more.

## Avoid

- large image-heavy cards for hundreds of entries;
- hidden directory data inside accordions;
- unclear sorting/grouping;
- a search field with no meaningful dataset search behavior.

## Accessibility review

- directory headings/groups must be semantic;
- search results should announce meaningful result state if dynamically updated;
- links must clearly identify the target person/item;
- keyboard users must be able to traverse entries in logical order.

---

# 13. Search results recipe

**Recommended template:** `Search`  
**Primary purpose:** Return relevant results from explicit user queries.  
**Typical user goals:** refine query, scan result relevance, open destination.

## Recommended hierarchy

1. search query/form;
2. result count/status;
3. results list;
4. optional refinement controls if a registered filter pattern exists;
5. empty-state guidance.

## Recommended patterns

- SearchForm;
- Message for no-results or operational feedback;
- semantic result list using the appropriate entity component when possible.

## Avoid

- visually heavy card grids for dense search results unless imagery is essential to relevance;
- adding filtering without documenting it as a supported interaction pattern;
- hiding result count/state from assistive technology.

---

# 14. Event detail / event hub guidance

There is currently an Event entity and EventCard/EventList pattern. A dedicated Event template is not yet registered.

Until a dedicated Event template is justified, compose event detail pages using `Standard` or another appropriate template and preserve the Event entity contract.

## Event detail hierarchy

1. event title;
2. date/time/location;
3. registration/action;
4. description;
5. speakers/people;
6. logistics/accessibility information;
7. related events/content.

## Recommended elements

- PersonList/PersonCard for speakers;
- Callout for registration/deadline information;
- EventList for related/upcoming events;
- Message only for status such as cancellation or sold-out state.

Do not create a shared Event template until enough recurring requirements exist to define its contract clearly.

---

# 15. Person profile guidance

There is currently a Person entity and PersonCard/PersonList, but no dedicated PersonProfile template in the registered template set.

Until one is admitted, use `Standard` or another semantically appropriate template.

## Suggested hierarchy

1. person name/title;
2. affiliation/role;
3. image/contact information;
4. biography;
5. expertise/research/interests;
6. related stories/research/courses/events.

Use StoryCollection or relevant lists for related content. Avoid inventing new profile modules when ordinary semantic content suffices.

---

# 16. Sidebar page recipe

**Recommended template:** `Sidebar`  
**Primary purpose:** Present primary content alongside persistent secondary navigation/reference information.  
**Typical user goals:** read main content while retaining access to sibling/section context.

## Appropriate sidebar content

- SectionNavigation;
- short reference metadata;
- limited related links;
- concise contextual contact information.

## Avoid

- promotional card stacks;
- long independent narratives competing with the main content;
- duplicating global navigation;
- sidebars added merely to make a page feel less empty.

## Responsive behavior

The secondary region should move into a logical position in DOM flow on smaller screens. Do not preserve a two-column desktop relationship by shrinking both columns beyond readable widths.

---

# 17. Common section recipes

## 17.1 Primary destination chooser

Use when users must choose among 3–8 meaningful peer destinations.

Preferred: `CardGrid` + navigation Card.

Consider: structured link list when choices are numerous or simple.

Avoid: Tabs, because destination choices are navigation rather than alternate content views.

## 17.2 Evidence block

Use when claims need concise proof.

Preferred: `StatsGroup` + Stat.

Consider: FeatureRow or visible prose when context is more important than numeric emphasis.

Avoid: unsourced metrics or vanity numbers.

## 17.3 Featured story

Use when one Story entity is editorially dominant.

Preferred: StoryCard `feature` or StoryCollection `featured`.

Avoid: converting a Story into generic Card solely for styling.

## 17.4 FAQ / objections

Use when users have independent recurring questions.

Preferred: FAQ + Disclosure.

Avoid: using FAQ for primary narrative or admissions requirements that most users must read.

## 17.5 Related content

Use when the primary content is complete and users benefit from continued exploration.

Preferred: StoryCollection, CardGrid, EventList, PersonList depending on entity type.

Avoid: unrelated promotional content chosen only to fill the page bottom.

## 17.6 Final CTA

Use when a clear next action follows from the page's purpose.

Preferred: Callout with one primary action and optional secondary link.

Avoid: a generic CTA automatically appended to every page.

---

# 18. AI page-composition protocol

Before Codex or Claude composes a page, the agent should explicitly establish:

1. **Page type:** Which recipe most closely applies?
2. **Audience:** Who is the primary user?
3. **Primary goal:** What must that user accomplish?
4. **Page promise:** What should the user understand after the opening section?
5. **Content hierarchy:** Which content is primary, supporting, evidence, discovery, and conversion?
6. **Entity types:** Story, Event, Person, Course, NavigationItem, Action, Asset, or plain content?
7. **Patterns:** Which registered patterns express those relationships?
8. **Alternatives:** Is a simpler visible structure better than interaction?
9. **Responsive behavior:** Does the page preserve priority and reading order on mobile?
10. **Accessibility:** Is there one H1 owner, valid heading hierarchy, keyboard operation, accessible names, and meaningful media text?
11. **Duplication:** Does any proposed section duplicate global/site navigation or existing content?
12. **New-element check:** Is the agent inventing a component that could be handled by composition?

The agent should be able to explain the composition in terms of these decisions, not aesthetic preference alone.

---

# 19. Site planning handoff format

When strategy/wireframing is complete and a new site is ready to enter implementation, the handoff should include:

## Site identity

- working site name;
- site type (program, department, initiative, research, campaign, other);
- primary audiences;
- primary user goals;
- primary conversion or completion goal, if any.

## Information architecture

- sitemap;
- global/site navigation;
- utility navigation;
- page hierarchy;
- known cross-links.

## Content model

- entities required;
- structured content sources;
- editorial content types;
- media/assets;
- forms/integrations.

## Page inventory

For each page:

- page purpose;
- recipe/template;
- primary audience;
- primary goal;
- required content sections;
- candidate registered patterns;
- CTA/next action;
- special responsive/accessibility concerns.

## Design implementation note

Do not prescribe arbitrary visual components in the handoff unless the component choice has already been intentionally decided. Prefer describing the content relationship and user need so the Design Decision Framework can select the appropriate registered pattern.

---

# 20. Review checklist for complete pages

Before a page is considered ready for visual/production review, verify:

### Purpose and hierarchy

- Does the page have one clear primary purpose?
- Is the most important content visibly prioritized?
- Does every section have a distinct job?
- Are supporting sections ordered according to user need rather than internal organizational structure?

### Component selection

- Does every component correspond to an actual registry entry?
- Were semantic entity components used instead of generic cards where available?
- Are Cards being used for browseable objects rather than generic boxes?
- Does interaction earn its complexity?

### Navigation

- Is local/section navigation distinct from global navigation?
- Are route choices duplicated unnecessarily?
- Do breadcrumbs add meaningful hierarchy context?

### Content

- Are headings descriptive?
- Are CTA labels specific?
- Are statistics contextualized?
- Is imagery meaningful?
- Is critical content visible rather than unnecessarily hidden?

### Responsive

- Does mobile preserve content priority and semantic order?
- Are touch targets usable?
- Do grids collapse naturally?
- Are tables/comparisons usable without inaccessible overflow?
- Is media cropping intentional?

### Accessibility

- Exactly one H1 owner?
- Logical heading order?
- Accessible names for controls?
- Keyboard-operable interactions?
- Visible focus?
- Correct status/alert behavior?
- Correct alt treatment for images?

### Governance

- Did the work introduce a new reusable pattern or variant?
- If yes, was the registry, handbook, decision framework, and tests updated?
- Is site-specific work kept in the site layer rather than leaking into shared components?

---

# 21. Recipe governance

Page recipes are living guidance.

A recipe should be updated when:

- repeated project work reveals a stable new composition;
- a new registered template changes page-level capabilities;
- a recurring user journey requires clearer guidance;
- component/pattern changes alter recommended composition;
- accessibility or responsive testing reveals a systemic issue.

A single unusual page should not automatically create a new recipe. Recipes should represent repeatable site-building knowledge.

When a new recipe is proposed, document:

- the recurring site/page problem;
- the typical audience and user goal;
- why existing recipes are insufficient;
- expected information hierarchy;
- registered elements used;
- accessibility/responsive considerations;
- at least two plausible contexts where the recipe applies.

---

# 22. Relationship to future site generation

The long-term goal is that a new Wharton website can be planned independently at the strategy/content level and then implemented through the framework without redesigning the interface from scratch.

The implementation sequence should become:

**Strategy → Sitemap → Content model → Wireframe/content relationships → Page recipes → Registered components/patterns → Wharton theme/tokens → Site-specific content/configuration → QA → GitHub Pages deployment**

The shared framework supplies visual language, behavior, accessibility, responsive rules, and reusable composition logic. The new site supplies its strategy, information architecture, content, data, and justified site-specific needs.

This separation is essential. It allows new sites to share the Wharton system without becoming copies of one another.