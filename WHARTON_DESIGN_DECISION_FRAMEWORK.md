# Wharton Web Prototype Framework
# Design Decision & Component Selection Framework

**Status:** Living specification  
**Version:** 0.1  
**Applies to:** Wharton Web Prototype Framework and websites implemented with it  
**Audience:** Designers, developers, content strategists, Codex, Claude Code, and other AI development agents

---

## 1. Purpose

This document defines how website strategy, content, information architecture, and user needs are translated into Wharton interface patterns and components.

It exists so that a developer or AI agent does not have to guess which component to use. Component selection must be grounded in user intent, content relationships, hierarchy, accessibility, responsive behavior, editorial needs, and the actual framework inventory.

The governing sequence is:

**User Goal → Content Purpose → Content Type → Content Relationship → Information Hierarchy → Interaction Need → Pattern → Component → Variant → Responsive Behavior → Accessibility Behavior**

The framework should prefer existing registered components and compositions over new components or variants.

This is a living specification. It should evolve whenever the shared framework gains or changes a component, pattern, template, interaction model, or page recipe.

---

## 2. Source of truth

This document explains **how to choose** framework elements.

The machine-readable source of truth for **what exists** is:

`src/registry/framework-elements.ts`

The implemented source directories are:

- `src/tokens/`
- `src/entities/`
- `src/components/`
- `src/patterns/`
- `src/global/`
- `src/templates/`
- `src/utilities/`
- `src/integrations/`

The registry already stores category, purpose, required and optional fields, variants, states, behavior, relationships, accessibility requirements, responsive intent, and traceability. This document adds decision logic and editorial guidance around that registry.

If this document and the implemented registry disagree about whether an element exists, the registry and source code win. The documentation must then be corrected.

---

## 3. Core design principles

### 3.1 Design follows user task

Do not begin with a component. Begin with what the user needs to understand, find, compare, decide, or do.

### 3.2 Content structure precedes visual treatment

Determine the relationship among content items before selecting presentation. Parallel content, hierarchical content, sequential content, and comparative content should not all be represented the same way.

### 3.3 Interaction must earn its complexity

Tabs, disclosure, filtering, carousels, and other interactions should only be introduced when they materially improve comprehension or task completion.

A long page is not, by itself, a reason to hide content.

### 3.4 Prefer composition over proliferation

Before creating a new component, determine whether existing components and patterns can be composed to solve the need.

### 3.5 Reuse requires semantic fit

Do not force content into a component merely because the shape is visually convenient. A reusable component should match the content's meaning and expected behavior.

### 3.6 Accessibility and responsive behavior are part of the component contract

They are not post-build cleanup stages.

---

## 4. Framework taxonomy

All reusable framework elements follow the established taxonomy:

**Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations**

### Tokens
Primitive and semantic design decisions such as color, typography, spacing, size, border, elevation, motion, and breakpoints.

### Entities
Structured content objects independent from presentation, such as Story, Event, Person, Course, NavigationItem, Action, and Asset.

### Components
Reusable interface primitives and entity presentations such as Button, Card, StoryCard, EventCard, PersonCard, Disclosure, FormControl, Message, and Stat.

### Patterns
Compositions that solve recurring interface problems such as Hero, CardGrid, FAQ, Tabs, EventList, PersonList, Form, Breadcrumbs, and SectionNavigation.

### Global Elements
Persistent systems such as GlobalHeader, GlobalFooter, GlobalSearch, PrimaryNavigation, ProgramNavigation, MobileNavigation, SiteHeader, and SiteIdentity.

### Templates
Page-level structures including Homepage, Landing, Standard, Topic, Article, Directory, Search, Sidebar, and BaseTemplate.

### Utilities
Reusable implementation helpers that should not own editorial meaning.

### Integrations
Provider boundaries for external systems. Integrations must remain behind typed interfaces and should not leak provider-specific assumptions into components.

---

## 5. Current implemented inventory

The following inventory is derived from the repository as of version 0.1 of this document.

### 5.1 Components

Implemented in `src/components/`:

- BackControl
- BackToTop
- Button
- Card
- CloseControl
- Disclosure
- Divider
- EventCard
- FormControl
- Heading
- Image
- Link
- MenuToggle
- Message
- PersonCard
- SearchInput
- Stat
- StoryCard
- Text

### 5.2 Patterns

Implemented and/or registered in `src/patterns/` and `src/registry/framework-elements.ts`:

- Breadcrumbs
- Callout
- CardGrid
- EventList
- FAQ
- FeatureRow
- Form
- Hero
- PageIntro
- PersonList
- SearchForm
- SectionNavigation
- StatsGroup
- StoryCollection
- Tabs

### 5.3 Global elements

Implemented in `src/global/`:

- GlobalFooter
- GlobalHeader
- GlobalSearch
- MobileNavigation
- PrimaryNavigation
- ProgramNavigation
- SiteHeader
- SiteIdentity

### 5.4 Templates

Implemented in `src/templates/`:

- Article
- BaseTemplate
- Directory
- Homepage
- Landing
- Search
- Sidebar
- Standard
- Topic

### 5.5 Core entities

Registered entities currently include:

- Story
- Event
- Person
- Course
- NavigationItem
- Action
- Asset

This inventory is not an invitation to use every element on every site. Selection must still pass the decision framework below.

---

## 6. Decision pipeline

### Step 1: Identify the user goal

Common goals include:

- learn
- explore
- compare
- decide
- find
- navigate
- complete a task
- understand a concept
- discover related information
- contact someone
- register, apply, or inquire

### Step 2: Identify the content purpose

| Purpose | Typical need |
|---|---|
| Inform | Communicate facts or explanation |
| Orient | Explain where the user is and what a section contains |
| Explore | Browse among multiple possibilities |
| Compare | Understand differences between related options |
| Decide | Choose an option or next action |
| Navigate | Reach another destination |
| Explain | Understand a complex topic or process |
| Promote | Give selected content additional prominence |
| Prove | Establish credibility through evidence |
| Convert | Encourage a specific action |
| Reference | Retrieve structured information efficiently |

### Step 3: Identify the content relationship

#### Sequential
Content should be consumed in order.

Prefer steps, process layouts, timeline-like compositions, or ordinary stacked sections. Use disclosure only when details are optional.

#### Parallel
Items have equivalent hierarchy.

Consider cards, tabs, columns, or structured lists depending on whether users browse, switch views, or scan all items.

#### Hierarchical
Items have parent-child relationships.

Prefer navigation, nested lists, breadcrumbs, section navigation, or disclosure where appropriate.

#### Comparative
Users need to understand differences across items.

Prefer side-by-side comparison or table-like structures. Do not use tabs when comparison requires remembering hidden content.

#### Independent
Items are related but can be consumed separately.

Consider CardGrid, FAQ, lists, or related-content compositions.

#### Featured + supporting
One item has greater editorial importance.

Consider Hero, FeatureRow, a feature Card variant, or a featured StoryCollection layout.

### Step 4: Decide whether interaction is necessary

Ask:

- Does interaction reduce cognitive load?
- Does it support the user's task?
- Does hidden content remain discoverable?
- Would visible stacked content be clearer?
- Does the interaction remain understandable and operable on mobile and with keyboard/assistive technology?

If the answer is uncertain, prefer the simpler non-interactive structure.

### Step 5: Select from the registry

Before creating anything new:

1. inspect `src/registry/framework-elements.ts`;
2. identify candidate patterns/components;
3. compare their required fields, variants, intended context, accessibility, and responsive intent;
4. choose the smallest existing pattern that accurately represents the content relationship.

---

## 7. Pattern selection matrix

| Content need | Preferred pattern/component | Consider | Avoid when |
|---|---|---|---|
| Page-opening primary message | Hero | PageIntro beneath template title | Another element already owns the H1 |
| Introductory support copy | PageIntro | Stacked prose | Content should be the primary page title |
| Browse equivalent destinations | CardGrid + Card | Structured link list | Cards add decoration but no browse value |
| Editorial story discovery | StoryCollection / StoryCard | Feature Card or CardGrid | Content is reference data rather than editorial |
| Events | EventList / EventCard | Featured event treatment | Date/time is irrelevant to the user task |
| People | PersonList / PersonCard | Directory variant | Dense lookup is better served by a table/list |
| Independent expandable Q&A | FAQ + Disclosure | Stacked Q&A | Users need to compare answers simultaneously |
| Parallel content views | Tabs | Stacked sections | Important content must remain visible together |
| Supporting promotional message | Callout | FeatureRow | Message is routine body copy |
| Media + editorial emphasis | FeatureRow | Card feature variant | Multiple peer items need equal hierarchy |
| Metrics/evidence | StatsGroup + Stat | Supporting prose | Numbers lack context or meaning |
| Search | SearchForm + SearchInput | GlobalSearch | Search is not an actual user need |
| Structured form task | Form + FormControl | External provider integration | A simple link is sufficient |
| Route context | Breadcrumbs | SectionNavigation | Path is shallow or obvious and adds no value |
| Sibling/in-page movement | SectionNavigation | PrimaryNavigation | Links belong to global/site navigation |
| Feedback/status | Message | Inline validation | Message is decorative rather than stateful |

---

## 8. Tabs vs. Disclosure vs. Stacked Content

### Tabs
Use Tabs when:

- content categories are genuinely parallel;
- users are likely to switch between them;
- only one view needs to be visible at a time;
- labels are short and distinct;
- hiding inactive content does not undermine comprehension.

Avoid Tabs when:

- users need side-by-side comparison;
- most users need all sections;
- the number of tabs is large;
- labels become unwieldy on small screens;
- tabs are being used only to shorten a page.

Registered variants currently include horizontal and vertical.

### Disclosure / FAQ
Use Disclosure when:

- sections are independent;
- users may only need a subset;
- headings can be scanned meaningfully;
- expanded content is secondary to the page overview.

FAQ is the preferred grouped pattern when content is explicitly question-and-answer.

Avoid Disclosure when:

- users need to compare sections;
- most sections should be read;
- hidden content is critical to the page's main argument;
- the interaction would conceal primary navigation.

### Stacked content
Prefer visible stacked sections when most content should be consumed, order matters, or hiding information adds no real value.

---

## 9. Card decision framework

Cards are for browsing, discovery, and discrete content objects. They are not the default container for every block of content.

### Base Card
Current registered variants:

- editorial
- promotional
- navigation
- feature
- compact
- media-led
- text-led

Use the generic Card when the content does not belong to a stronger semantic entity component.

### StoryCard
Use for Story entities. Registered variants:

- editorial
- compact
- feature

Prefer StoryCard over generic Card when the content is a story/article object.

### EventCard
Use for Event entities where machine-readable date/time matters. Registered variants:

- list
- grid
- featured

### PersonCard
Use for Person entities. Registered variants:

- card
- directory
- quote — a testimonial treatment: a compact photo/name/title header row followed by the person's `bio` rendered as a blockquote. Use when a set of named people are being presented as an editorial perspective/testimonial rather than a bio listing. `PersonList` renders this variant in a grid that stays two columns at every breakpoint (does not collapse to one column on narrow viewports) because the content is a small, fixed set of parallel quotes rather than an open-ended browsable collection.

### CardGrid
Use when several Card-like items are peers and browsing is the primary behavior. Registered variants currently include editorial, promotional, and navigation.

Do not convert a simple list of text links into cards solely for visual weight.

---

## 10. Hero and introductory content

### Hero
Hero is a page-opening composition and may own the page H1. Current variants include:

- short
- tall
- media

Use Hero when the page requires a strong primary identity or editorial opening.

Do not use Hero merely because a page has a title.

### PageIntro
Use PageIntro for supporting introduction beneath a title owned by the template or another pattern.

A page should have exactly one H1 owner.

---

## 11. Callout vs. FeatureRow vs. Card

### Callout
Use when supporting content requires temporary prominence, brand emphasis, and optionally a focused action. Current variants:

- brand-primary
- brand-accent
- subtle

### FeatureRow
Use when media and editorial text together form a major content section. Current variants:

- media-start
- media-end

### Card
Use for discrete browseable items, not for a large narrative section.

A useful distinction:

- **Callout:** emphasize a message.
- **FeatureRow:** feature a substantial content story/section.
- **Card:** represent one item among a set or a discrete destination.

---

## 12. Navigation selection

Use the narrowest navigation system that matches the information hierarchy.

- **GlobalHeader / GlobalFooter:** institutional/global shell.
- **PrimaryNavigation:** major site-level destinations.
- **ProgramNavigation:** configured program-level navigation.
- **MobileNavigation:** responsive presentation of site navigation, not a separate IA.
- **SiteHeader / SiteIdentity:** site identity and local framing.
- **Breadcrumbs:** path/hierarchy context.
- **SectionNavigation:** siblings or in-page/section movement.

Do not duplicate the same navigation hierarchy across several systems without a clear user need.

---

## 13. Forms and search

### FormControl
Use for labeled text, email, or textarea input fields. Current variants include text, email, and textarea.

### Form
Use when multiple fields form a validated task and a provider boundary may be required.

### SearchInput / SearchForm
Use SearchInput as the input primitive and SearchForm when meaningful query state should be submitted in the URL.

### GlobalSearch
Use when search is part of the persistent global/site shell.

A simple CTA should remain a link or button rather than being modeled as a form.

---

## 14. Status and feedback

### Message
Current variants:

- info
- success
- warning
- error

Use Message for meaningful system/user feedback. Use `status` semantics for non-urgent feedback and `alert` only for urgent errors, consistent with the registry requirement.

Do not use Message as a decorative promotional box. Use Callout for editorial emphasis.

---

## 15. Template selection

Templates define page-level structure, not finished editorial composition.

### Homepage
Use for the primary entry page of a site, where discovery and prioritization across several content areas are expected.

### Landing
Use for section/program landing experiences intended to orient and route users into deeper content.

### Standard
Use for ordinary informational pages with a straightforward content hierarchy.

### Topic
Use when a page aggregates or explains a subject area rather than representing a single article or directory.

### Article
Use for editorial/story-like long-form content.

### Directory
Use for structured lookup/browse collections such as people or other entities.

### Search
Use for search result experiences.

### Sidebar
Use when persistent secondary content/navigation requires a parallel page region. Do not add sidebars merely to fill whitespace.

### BaseTemplate
BaseTemplate is structural infrastructure and should not be selected as an editorial page type by content authors.

---

## 16. Page composition model

A page should be composed according to hierarchy, not by filling a canvas with components.

Typical sequence:

**Page Purpose → Primary User Task → Primary Message → Orientation → Supporting Information → Evidence → Exploration → Related Content → Next Action**

Not every page needs every stage.

A useful construction check for each section is:

1. Why does this content exist?
2. What relationship does it have to the content around it?
3. What action or understanding should result?
4. Which existing pattern expresses that relationship most clearly?

---

## 17. AI component selection protocol

Codex, Claude Code, and other AI agents must not select components solely from general web-design knowledge.

Before implementing a page section, the agent should answer:

1. What is the user's goal?
2. What is the content's purpose?
3. What entity/content type is represented?
4. What relationship exists among the items?
5. Is interaction necessary?
6. Which registry elements are candidates?
7. Which candidate adds the least unnecessary complexity?
8. Does an existing variant satisfy the need?
9. What is the mobile behavior?
10. What accessibility behavior applies?

Then select an existing registered element whenever possible.

If no registered element fits, evaluate solutions in this order:

1. compose existing components;
2. use an existing variant;
3. add a justified variant;
4. create a new component/pattern.

Creating a new shared element is the last option.

---

## 18. New component admission criteria

A new shared framework element should only be introduced when it represents a reusable problem.

Before admission, document:

- Why existing components or compositions are insufficient.
- The semantic distinction from adjacent components.
- Expected use across more than one Wharton site/context.
- Required and optional content fields.
- Supported variants and why each variant exists.
- Responsive behavior.
- Accessibility behavior.
- Allowed and disallowed contexts.
- Relationship to existing registry entries.
- Whether it belongs in the shared framework or remains site-specific.

If these cannot be articulated clearly, the element should not enter the shared framework.

---

## 19. Component documentation contract

Each reusable registry entry should eventually contain or link to the following documentation:

### Classification
Token | Entity | Component | Pattern | Global | Template | Utility | Integration

### Purpose
What problem does it solve?

### User need
What behavior/task does it support?

### Use when
Conditions that make it appropriate.

### Do not use when
Conditions that point to another element.

### Content contract
Required and optional fields.

### Variants
Only meaningful semantic, editorial, layout, or interaction variants.

### States and behaviors
Default, hover/focus where relevant, expanded/collapsed, validation, loading, success, error, etc.

### Responsive behavior
Small, medium, large, and content-driven transitions.

### Accessibility
Semantic element, accessible naming, keyboard behavior, focus handling, ARIA only when necessary, media alternatives, and heading ownership.

### Allowed contexts
Where it may appear.

### Prohibited contexts
Where it should not appear.

### Related elements
Adjacent choices and how to distinguish them.

### Examples
Representative implementation/use cases.

---

## 20. Responsive decision rules

Responsive behavior must preserve meaning, hierarchy, and DOM reading order.

Every shared component/pattern should define:

- layout transformation;
- content priority;
- image behavior;
- touch-target behavior;
- wrapping and overflow;
- whether interactions change across breakpoints;
- whether content order changes visually;
- how navigation transforms.

Do not treat mobile as a compressed desktop layout.

---

## 21. Accessibility decision rules

Every shared component/pattern should define:

- semantic HTML ownership;
- heading behavior;
- keyboard interaction;
- focus behavior;
- accessible naming;
- state announcements where applicable;
- image alternative text requirements;
- reduced-motion expectations;
- contrast requirements;
- reading and DOM order.

An inaccessible variant is not a valid framework variant.

---

## 22. Governance

Whenever the framework adds or changes a reusable component, pattern, global element, template, or meaningful variant, the same pull request should evaluate whether to update:

- `src/registry/framework-elements.ts`
- this document
- relevant tests
- the canonical specification
- an ADR, when architecture changes

A reusable element is not fully incorporated into the framework until both implementation and selection guidance exist.

---

## 23. Next expansion areas

Version 0.1 establishes the decision model and audits the current core inventory. Future revisions should add:

1. full use/avoid guidance for every registry entry;
2. content-length and editorial guidance per component;
3. representative visual examples;
4. page recipes for common Wharton site types;
5. a formal comparison pattern/table strategy;
6. richer decision trees for navigation and discovery;
7. machine-checkable links between registry entries and this documentation;
8. automated validation that every registered shared element has selection guidance;
9. explicit site-building recipes for common projects such as program, department, initiative, campaign, and research sites.

---

## 24. Page recipe template

Each future page recipe should document:

- primary audiences;
- primary user goals;
- page purpose;
- recommended template;
- expected information hierarchy;
- recommended patterns;
- optional patterns;
- discouraged patterns;
- CTA strategy;
- content/entity requirements;
- responsive considerations;
- accessibility considerations;
- example compositions.

Recipes guide composition but do not replace judgment or force identical pages.

---

## 25. Working rule for future website projects

When a new website is planned, strategy, content, sitemap, and wireframe decisions may be developed independently of visual styling. When implementation begins, the site should consume this framework by mapping its content model and page purposes onto the registered Wharton entities, components, patterns, globals, and templates.

The design system therefore acts as a reusable presentation and behavior layer around the site's own strategy and content structure rather than as a set of predesigned pages that force every site into the same composition.
