# Wharton Web Prototype Framework
## Canonical Build Specification for Codex

**Status:** Governing implementation document
**Project:** Wharton Web Prototype Framework
**First validation site:** Wharton Undergraduate
**Scope:** Reusable high-fidelity prototype framework for Wharton websites
**Canonical taxonomy:** Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations

---

# 1. Purpose

The Wharton Web Prototype Framework is a reusable system for planning, designing, building, and reviewing high-fidelity website prototypes that closely reflect Wharton’s production WordPress CMS while remaining independent of WordPress implementation details.

The framework must:

- Reflect the current Wharton CMS as accurately as practical.
- Support the redesigned Wharton UX and future Figma system.
- Give Codex a stable technical foundation for future Wharton prototypes.
- Keep content separate from layout and presentation wherever practical.
- Support realistic responsive behavior and interaction.
- Produce prototypes suitable for stakeholder review and ChatGPT Sites publishing.
- Support many future Wharton sites, not only Undergraduate.
- Avoid reproducing current WordPress technical debt.
- Remain traceable to current CMS concepts for migration and handoff.

The first validation implementation is the Wharton Undergraduate website. Undergraduate validates the framework; it must not dictate the architecture.


# 2. Governing Principles

1. **Functional concepts are canonical.** Model what an element does, not how WordPress currently implements it.
2. **Content and presentation remain separate.** Site copy, navigation, stories, events, people, and most page composition live outside shared component code.
3. **WordPress is a mapping target, not the architecture.**
4. **Figma is a mapping target, not the architecture.**
5. **Composition is preferred over duplication.**
6. **Structured entities are separate from presentation.**
7. **Static HTML is the default output.**
8. **JavaScript is added only where interaction requires it.**
9. **Accessibility is part of component contracts.**
10. **Architecture changes require documentation.**
11. **Sites consume one shared framework.**
12. **A new site should primarily require configuration, content, assets, and page composition, not new framework code.**


# 3. Completed Project Steps

## Step 1 — Framework Charter

The framework was established as a reusable prototype system that mirrors Wharton production behavior sufficiently for realistic review, supports a growing library of Wharton patterns and templates, keeps content separate from layout, supports multiple sites, evolves with the redesigned Wharton UX/Figma system, and gives Codex a repeatable implementation foundation.

## Step 2 — Repository and Architecture Preparation

The repository foundation was organized around documentation, CMS mapping, design tokens, components, patterns, templates, utilities, content, public assets, site-specific folders, and tests. Preserve that intent as the implementation matures.

## Step 3 — Current Wharton CMS Audit

The CMS was audited systematically using Martech Development, the main Wharton site, major managed program sites, and Wharton WordPress documentation.

The audit covered:

- global styles and foundations;
- shared header/footer shell;
- navigation;
- page-builder components;
- custom components;
- patterns and sections;
- 18 current WordPress templates;
- interactions;
- responsive behavior;
- faculty/course structured data;
- events;
- forms;
- search;
- content aggregation;
- integrations;
- legacy/deprecated elements.

## Step 4 — Functional Component Model

The CMS audit was rationalized into:

**Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations**

The framework models functional concepts rather than WordPress artifacts.

## Step 5 — Technical Architecture

The architecture was defined as Astro + TypeScript, static-first rendering, native CSS, DTCG-compatible design tokens, validated structured content, generic route/page rendering, multi-site configuration, integration adapters, Playwright/Vitest testing, WCAG 2.2 AA accessibility, Git/Codex workflow, and a ChatGPT Sites compatibility gate.


# 4. Current CMS System Model

The audited Wharton system can be understood as:

```text
WHARTON MANAGED WORDPRESS SYSTEM
│
├── Global Theme / Shell
├── Page Templates
├── Visual Composer Layout System
│   ├── Rows
│   └── Columns
├── General Content Elements
├── Wharton / Martech Custom Elements
├── VC Ultimate Addons
├── Dynamic Content / Shortcodes
├── Faculty Data Platform
├── Events Platform
├── Forms / Search / Third-Party Integrations
├── Content Aggregation Systems
└── Legacy / Test / Migration Components
```

The framework must reproduce the **functional capability** of this system, not recreate its historical implementation.

## Audited foundations

- H1–H6
- paragraphs
- links
- strong/emphasis
- ordered/unordered/nested lists
- blockquotes
- tables
- images
- separators
- separators with text
- rows and columns
- spacing/gap behaviors
- charts/content visualization examples

Visual Composer rows and columns should map to generic layout utilities, not be recreated directly.


# 5. Global Shell

## Header

```text
GLOBAL PROGRAM NAVIGATION
        ↓
SITE IDENTITY
        ↓
LOCAL PRIMARY NAVIGATION
        ↓
PAGE
```

Canonical shell capabilities:

- Global Program Navigation
- Site Identity
- Local Primary Navigation
- Hierarchical child navigation
- Search Wharton trigger
- Active property context
- Main Wharton institutional variant
- Mobile menu
- Hierarchical drill-down/back navigation

Navigation content belongs to site configuration, not hardcoded header markup.

## Footer

```text
PAGE CONTENT
    ↓
OPTIONAL SECTION / SIBLING NAVIGATION
    ↓
BACK TO TOP
    ↓
LOCAL "ADDITIONAL LINKS"
    ↓
INSTITUTIONAL WHARTON FOOTER
```

Institutional footer groupings include:

- Programs
- Locations
- The Power of Wharton
- Featured
- Wharton
- Resources
- Social
- Support Wharton
- institutional/legal signature


# 6. Current CMS Capability Inventory

## Core/current capabilities

- Buttons
- Horizontal Tabs
- Vertical Tabs
- FAQ Toggle / Accordion
- Message Box
- Separator
- Separator with Text
- Hero Header
- Classic Tiles
- Rowhouse Tiles
- Page Tiles
- Story Tiles
- Bio Cards
- Video
- Callout Block
- Counter / Stat
- Search
- Forms
- Story feeds
- Event lists
- Faculty/course structured data
- Back to Top
- Section navigation

## Documented add-on capabilities

- Advanced Carousel
- Expandable Section
- Countdown
- Flip Box
- Info Box
- Floating Buttons

## Explicit legacy/deprecated

- Wharton Legacy Patterns
- Tabs (Deprecated)

## Test/reference/integration examples

- SSO Locked Page
- Pardot Test Layout
- Rocket.Chat Embed
- Video tracking tests
- Accessibility modification tests
- Promo block tests
- Comparison layouts
- Long-form editorial layouts
- Marketing landing page compositions

Test pages demonstrate capability but do not automatically become reusable framework components.


# 7. Hero and Page-Title Rules

The current CMS distinguishes:

- template-generated page titles;
- page-intro compositions;
- authored Hero components.

The Hero may assume H1 ownership.

**Hard rule:** Every rendered page has exactly one canonical H1 owner.

Possible H1 owners:

- template page title;
- Hero;
- another explicitly designated page-opening pattern.

Hero anatomy:

```text
Hero
├── eyebrow
├── heading
├── supporting content
├── media/background
├── primary action
└── secondary action
```

Current CMS evidence includes short/thin and tall hero variants plus optional CTAs and background media.

Title/no-title behavior becomes configuration rather than separate framework templates.


# 8. Content, Event, Faculty, and Integration Findings

## Content/story systems

Current overlapping CMS mechanisms include RSS, Embed Posts, Top Stories variants, Topic Pages, Search Modules, Content Hub, WRAD, K@W article lists, and Wharton In the News.

Canonical model:

```text
Content Source
    ↓
Query / Filter
    ↓
Collection
    ↓
Presentation Variant
```

## Events

Canonical Event entity:

```text
Event
├── title
├── url
├── start
├── end
├── location
├── format
├── description
├── category
└── series
```

Event UI must remain independent of Events HQ implementation.

## Faculty/structured data

Current structured-data views include:

- Publications
- In the News
- Awards
- Course List
- Course Schedule
- Staff Listings
- Faculty Index

Canonical model:

```text
Structured Data
    ↓
Query / Filter
    ↓
Presentation
```

## Forms and integrations

Current systems include:

- Gravity Forms
- Campaign Monitor
- Pardot
- SSO/PennKey
- Rocket.Chat
- video providers
- analytics/tracking
- search providers
- Events HQ
- Content Hub/WRAD

Separate:

```text
Presentation
    ↓
State / Validation
    ↓
Provider / Integration
```


# 9. Current WordPress Template Inventory

The current CMS documents 18 template combinations:

1. Default Page Template with Title
2. Default Page Template No Title
3. Full Window Page w/Header with Title
4. Full Window Page w/Header No Title
5. Full Window Home Page
6. Full Width Page with Title
7. Full Width Page No Title
8. Sidebar Content with Title
9. Sidebar Content No Title
10. Topic Landing Page with Title
11. Topic Landing Page No Title
12. Landing Page with Title
13. Landing Page No Title
14. Full Window Landing Page with Title
15. Full Window Landing Page No Title
16. Full Window Text Page with Title
17. Custom Search Page
18. Full Window Text Page No Title

These largely combine:

```text
WIDTH
+
PURPOSE
+
TITLE BEHAVIOR
+
HEADER BEHAVIOR
```

Do not implement 18 separate framework templates merely to mirror WordPress.


# 10. Canonical Functional Taxonomy

```text
WHARTON PROTOTYPE FRAMEWORK
│
├── TOKENS
├── ENTITIES
├── COMPONENTS
├── PATTERNS
├── GLOBAL ELEMENTS
├── TEMPLATES
├── UTILITIES
└── INTEGRATIONS
```

## Tokens — `TOK-`

Token families:

- color
- typography
- spacing
- size
- border
- elevation
- motion
- breakpoints

Use primitive → semantic → optional component token relationships.

## Entities — `ENT-`

Canonical entities:

### Story

```text
title
url
excerpt
image
date
author
topic
source
```

### Event

```text
title
url
start
end
location
format
description
category
series
```

### Person

```text
name
title
affiliation
image
bio
contact
links
```

### Course

```text
courseId
title
description
term
semesterType
faculty
```

### NavigationItem

```text
label
url
children[]
external
active
```

### Action

```text
label
url/action
type
```


# 11. Components — `CMP-`

Canonical atomic/reusable components:

- Heading
- Text
- Link
- Button
- Image
- Icon
- Divider
- Video
- FormControl
- FormLabel
- FormMessage
- Disclosure
- Tab
- Pagination
- LoadMore
- SearchInput
- FilterControl
- CloseControl
- MenuToggle
- BackControl
- BackToTop
- Card
- PersonCard
- EventCard
- StoryCard
- Stat
- Message

A component should:

- have a coherent functional identity;
- be reusable across multiple contexts;
- not depend on a specific page;
- expose an explicit contract;
- define accessibility behavior;
- not exist merely because of visual variation.

## Card rationalization

Legacy concepts such as Classic Tile, Rowhouse Tile, Page Tile, Info Box, and promo blocks should map into a smaller Card system when semantics allow.

Canonical Card anatomy:

```text
Card
├── media
├── eyebrow/meta
├── title
├── description
├── metadata
├── CTA
└── destination
```

Possible variants:

- editorial
- promotional
- navigation
- feature
- compact
- media-led
- text-led

Keep PersonCard, EventCard, and StoryCard distinct when semantic/data requirements justify it.


# 12. Patterns and Sections — `PAT-`

Patterns combine components into purposeful arrangements.

## Page-opening

- Hero
- PageIntro

## Promotional

- CardGrid
- FeatureRow
- Callout
- StatsGroup
- Comparison

## Navigation

- PrimaryNavigation
- ProgramNavigation
- MobileNavigation
- SectionNavigation
- Breadcrumbs
- LinkList

## Content discovery

- StoryCollection
- TopicCollection
- SearchResults
- FilterBar
- PaginationControls

## Disclosure

- AccordionGroup
- FAQ
- Tabs

## People/data

- PersonList
- FacultyIndex
- StaffDirectory
- PublicationList
- AwardList
- CourseList
- CourseSchedule

## Events

- EventList
- EventGrid
- EventCalendar
- FeaturedEvents
- EventFilters
- EventEmptyState

## Forms

- Form
- NewsletterSignup
- LeadGenerationForm
- SearchForm


# 13. Global Elements — `GBL-`

Canonical global elements:

- GlobalHeader
- ProgramNavigation
- SiteHeader
- SiteIdentity
- PrimaryNavigation
- MobileNavigation
- GlobalSearch
- GlobalFooter
- BackToTop

Global elements may compose components and patterns.

# 14. Canonical Templates — `TPL-`

Use a rationalized functional set:

- Homepage
- Standard
- Landing
- Article
- Topic
- Directory
- Search
- Sidebar

Current concepts such as Full Width, Full Window, With Title, No Title, and sidebar presence become configuration properties.

Example:

```text
templateType: landing
width: full-window
titleMode: hero
sidebar: none
```

# 15. Utilities — `UTL-`

Canonical utilities:

- Container
- Layout
- Visibility
- AspectRatio
- Surface
- AnchorTarget
- ScreenReaderText
- FocusManagement
- ResponsiveMedia

Utilities must not carry site-specific editorial meaning.

# 16. Integrations — `INT-`

Canonical integration interfaces:

- EventsProvider
- FacultyData
- ContentFeed
- FormProvider
- VideoProvider
- Authentication
- SearchProvider
- Analytics


# 17. Naming, Variants, Metadata, and Status

## Naming

Names describe function, not appearance or legacy technology.

Preferred:

- Hero
- StoryCard
- EventList
- SectionNavigation
- Callout
- PersonCard
- StoryCollection

Avoid:

- BlueBox
- Rowhouse2
- VCInfoBox
- MartechButton
- HomepageBlock4
- FullWindowNoTitleComponent

## Variants

A variant changes presentation or behavior within the same functional concept.

```text
Card
  variant: editorial
  variant: promotional
  variant: navigation
```

Do not create new components solely for color, alignment, spacing, width, image position, or size.

A new component is justified when there is materially different semantic content, interaction, accessibility behavior, independent reuse, or when forcing it into an existing component creates excessive conditional logic.

## Required registry metadata

Identity:

```text
id
name
category
description
```

Lifecycle:

```text
status
version
source
```

Functional definition:

```text
purpose
anatomy
requiredFields
optionalFields
variants
states
behaviors
```

Relationships:

```text
contains
mayContain
dependsOn
usedBy
relatedTo
replaces
```

Usage:

```text
allowedContexts
disallowedContexts
contentGuidance
accessibilityRequirements
responsiveIntent
```

Traceability:

```text
cmsSource
cmsNames
productionExamples
legacyEquivalents
figmaMappings
futureWordPressMapping
```

## Status values

- core
- supported
- specialized
- provisional
- legacy
- deprecated
- experimental
- integration-only

## Relationship types

- contains
- mayContain
- composes
- specializes
- consumes
- providedBy
- usedBy
- replaces


# 18. Reusability Admission Rules

Something belongs in the shared framework only if it passes these tests:

1. **Repeatability** — it appears multiple times or has a clear repeatable function.
2. **Functional identity** — it can be described without referring to one page.
3. **Stable content model** — its fields make sense across repeated use.
4. **Independence from styling accident** — it survives changes to color, typography, or spacing.
5. **Independence from CMS implementation** — it still makes sense without Visual Composer.
6. **Composition over duplication** — use existing pieces if they express the function cleanly.
7. **Accessibility identity** — distinct keyboard/focus/state/ARIA needs justify explicit modeling.
8. **Data identity** — structured entities are modeled separately from rendering.

Do not promote automatically:

- Visual Composer terminology;
- PHP template names;
- plugin names;
- one-off campaign layouts;
- color-only variations;
- spacing-only variations;
- one-off pages;
- analytics experiments;
- temporary embeds;
- deprecated components;
- isolated test pages.


# 19. Technical Architecture Decision

Use:

- **Astro**
- **TypeScript**
- **Static-first rendering**
- **Native CSS**
- **DTCG-compatible design tokens**
- **Structured JSON + Markdown content**
- **Schema validation**
- **Generic page renderer**
- **Multi-site site configuration**
- **Selective client JavaScript**
- **Vitest**
- **Playwright**
- **Playwright + axe**
- **Git + Codex**
- **ChatGPT Sites publishing after early compatibility validation**

Do not install React, Vue, Svelte, Tailwind, Redux, Zustand, Storybook, Bootstrap, animation frameworks, CSS-in-JS, or general UI kits initially.

## Why Astro

Astro best fits a content-heavy institutional website because it produces static HTML by default, adds JavaScript only where necessary, supports TypeScript and content validation, offers file-based routing, and remains portable.

Next.js/React is viable but introduces unnecessary application and client/server complexity.

A Vite/React SPA is rejected because client-side application rendering is the wrong default.

A minimal static generator is conceptually sound but would require more custom infrastructure than Astro.


# 20. Rendering and Source Architecture

Default rendering flow:

```text
Structured Content
       ↓
Schema Validation
       ↓
Page Configuration
       ↓
Template
       ↓
Patterns
       ↓
Components
       ↓
Static HTML + CSS
       ↓
Selective Interaction JavaScript
```

Do not use server rendering unless required by authentication, personalization, genuinely live server-only data, or similar application behavior.

Source folders:

```text
src/
├── tokens/
├── entities/
├── components/
├── patterns/
├── global/
├── templates/
├── utilities/
├── integrations/
├── schemas/
├── rendering/
└── styles/
```

Templates contain page structure only and never site-specific copy.


# 21. Component Contracts and Token/CSS Architecture

All components and patterns require explicit TypeScript contracts.

Each contract defines:

- required properties;
- optional properties;
- variants;
- states;
- semantic behavior;
- relationships;
- accessibility responsibilities;
- defaults.

Avoid arbitrary design values in content.

Bad:

```text
backgroundColor: "#990000"
fontSize: "72px"
paddingTop: "87px"
```

Preferred:

```text
variant: "featured"
surface: "brand-primary"
spacing: "section-large"
```

## Design tokens

Use DTCG-compatible JSON.

```text
tokens/
├── primitive/
├── semantic/
├── component/
└── generated/
```

Relationship:

```text
Primitive
    ↓
Semantic
    ↓
Component
```

## CSS

Use native CSS and CSS custom properties.

Use cascade layers:

```text
reset
tokens
base
utilities
components
patterns
globals
site
```

The `site` layer is for legitimate property differences, not uncontrolled overrides.


# 22. Responsive Architecture

Use mobile-first, content-driven responsive behavior.

Do not create separate conceptual desktop/tablet/mobile components.

Prefer:

- fluid typography;
- flexible grids;
- intrinsic sizing;
- responsive media;
- content-driven layout breakpoints;
- container queries where context matters;
- shared breakpoint tokens only when multiple components use the same transition.

Do not assume Bootstrap or other standard breakpoint values.


# 23. Content Architecture and Page Composition

Content must not live inside shared component source.

Use JSON for:

- site configuration;
- navigation;
- page composition;
- entities;
- cards;
- CTAs;
- events;
- people;
- structured reusable content.

Use Markdown for:

- articles;
- long biographies;
- long narrative content.

Do not use MDX as the default because embedding components directly into content weakens content/presentation separation.

Pages should be configuration/data rather than custom `.astro` implementations.

Example:

```json
{
  "route": "/academics/",
  "template": "landing",
  "title": "Academics",
  "sections": [
    { "type": "pageIntro", "id": "intro" },
    { "type": "cardGrid", "id": "programs" },
    { "type": "storyCollection", "id": "stories" }
  ]
}
```

A controlled registry resolves section `type`.

Unknown types must fail validation.

Routine changes to copy, links, buttons, images, navigation, stories, events, people, courses, and approved section ordering must not require editing shared `.astro` component source.


# 24. Site Configuration and Multi-Site Model

Each site has a configuration root:

```text
sites/
└── undergraduate/
    ├── site.config.json
    ├── navigation.json
    ├── footer.json
    ├── pages/
    ├── content/
    ├── entities/
    ├── assets/
    └── fixtures/
```

Future sites follow the same model.

`site.config.json` may include:

- site ID;
- site name;
- reference/canonical domain;
- prototype title;
- theme/token selection;
- feature flags;
- default SEO;
- integration configuration.

It must not contain component implementations.

One shared framework supports many sites.

A site may provide configuration, content, navigation, assets, valid token overrides, fixtures, and legitimate extensions.

A site should not duplicate shared components.

If a site requires something new:

1. determine whether it is reusable;
2. if reusable, promote it into the framework;
3. if truly site-specific, keep it in a site extension area;
4. document the reason.


# 25. Rendering Registry, Routing, and Builds

Create a controlled rendering registry:

```text
hero → Hero
pageIntro → PageIntro
cardGrid → CardGrid
callout → Callout
faq → FAQ
storyCollection → StoryCollection
eventList → EventList
```

Use a generic Astro route layer rather than one page file per route.

Conceptually:

```text
src/pages/
├── index.astro
└── [...slug].astro
```

The route layer should:

1. identify the selected site;
2. read its page registry;
3. validate the page;
4. resolve the template;
5. render through the generic page renderer;
6. generate static routes.

One repository supports independent site builds:

```text
build site=undergraduate
build site=mba
build site=doctoral
```

The selected site determines routes, navigation, content, entities, assets, theme configuration, and integration configuration.


# 26. Asset Management

Shared assets:

```text
public/shared/
├── logos/
├── icons/
└── institutional/
```

Site assets:

```text
sites/{site}/assets/
├── images/
├── video/
└── documents/
```

Prefer stable asset IDs rather than repeated relative paths.

Asset metadata should support:

- ID;
- file;
- alt text;
- caption;
- credit;
- focal point where relevant.


# 27. Accessibility and Interaction

Target **WCAG 2.2 AA**.

Accessibility rules:

- semantic HTML first;
- native controls before custom controls;
- keyboard operability;
- visible focus;
- logical DOM and focus order;
- accessible names/descriptions;
- properly associated form errors;
- reduced-motion support;
- correct image alternative text;
- sufficient contrast;
- exactly one canonical H1 owner;
- correct tab/disclosure/menu semantics;
- focus management for mobile navigation and overlays.

## State management

Use native behavior first.

Use local state for:

- accordion state;
- tab selection;
- mobile nav state;
- carousel state.

Use URL state for meaningful filter/search state where appropriate.

Do not introduce a global state library without a concrete cross-component requirement.


# 28. Integration Architecture

External systems sit behind interfaces/adapters.

Example:

```text
EventList
    ↓
EventsProvider
    ↓
├── FixtureEventsProvider
└── FutureEventsHQProvider
```

Forms:

```text
Form
    ↓
FormProvider
    ↓
├── PrototypeProvider
├── GravityForms
├── CampaignMonitor
└── Pardot
```

Prototype components should not know which production provider fulfills the contract.

Default to fixtures and simulated behavior unless live integration is specifically required.


# 29. Testing Strategy

## Schema validation

Validate:

- site configuration;
- pages;
- entities;
- component/pattern types;
- variants;
- navigation;
- asset references where practical.

Invalid data fails the build.

## Type checking

Use strict TypeScript and Astro checks.

## Unit testing

Use Vitest for:

- schema logic;
- content transformations;
- utilities;
- adapters;
- variant logic.

## End-to-end

Use Playwright for:

- navigation;
- mobile navigation;
- tabs;
- accordions;
- filters;
- forms;
- links;
- critical page flows;
- responsive behavior.

## Accessibility automation

Use Playwright + axe.

Use ARIA snapshots selectively for:

- navigation;
- tabs;
- accordions;
- search;
- forms.

## Visual regression

Capture representative baselines for:

- global shell;
- core components;
- patterns;
- templates;
- key responsive widths.

Provide a top-level validation command such as:

```text
npm run validate
```

It should cover schema validation, TypeScript/Astro checking, build, unit tests, accessibility smoke tests, and key e2e tests.


# 30. Documentation and Registry Strategy

Maintain:

```text
docs/
├── framework-charter.md
├── architecture.md
├── component-model.md
├── cms-mapping.md
├── cms-audit/
└── decisions/
```

Use Architecture Decision Records for significant decisions.

Initial ADRs should include:

- Astro;
- static-first rendering;
- DTCG design tokens;
- content/presentation separation;
- multi-site architecture;
- native CSS;
- provider adapter pattern;
- generic page renderer.

Maintain a machine-readable component registry with identity, status, contracts, relationships, accessibility requirements, CMS mappings, production examples, Figma mappings, and future WordPress mappings.

Build a lightweight framework-native development catalog. Do not add Storybook initially.


# 31. Codex Workflow and AGENTS.md Rules

Create a root `AGENTS.md` that instructs Codex:

1. Do not place site copy in shared components.
2. Do not create new components when composition or variants are sufficient.
3. Do not add arbitrary design values when tokens exist.
4. Validate additions against the functional taxonomy.
5. Preserve accessibility contracts.
6. Keep site-specific work inside the site unless genuinely reusable.
7. Do not add dependencies without documented justification.
8. Run validation before completion.
9. Update registry/docs when contracts change.
10. Do not alter architecture without an ADR.
11. Do not duplicate shared components into site folders.
12. Do not encode WordPress terminology into canonical component names.
13. Do not add a client framework without documented need.
14. Do not couple UI directly to external providers.
15. Do not create Undergraduate-specific architectural shortcuts.

Git workflow:

```text
main
 ↓
feature/task branch
 ↓
implementation
 ↓
validation
 ↓
review
 ↓
merge
```


# 32. ChatGPT Work and ChatGPT Sites

## ChatGPT Work

Routine work should primarily change:

- site content;
- page configuration;
- navigation;
- entity data;
- asset metadata;
- documentation.

Framework/component behavior changes are Codex development tasks.

## ChatGPT Sites

Publishing flow:

```text
Git/Codex project
        ↓
Validated build
        ↓
Save Sites version
        ↓
Review
        ↓
Deploy approved version
```

Before deep Undergraduate implementation, create a minimal Astro proof with:

- one route;
- global shell;
- shared CSS;
- one local asset;
- one simple interaction.

Test ChatGPT Sites compatibility.

If the project shape is rejected, stop and document the incompatibility rather than silently redesigning the architecture.

Do not provision persistent storage unless a prototype genuinely needs durable visitor data.


# 33. Figma and WordPress Mapping

## Figma

Tokens map through:

```text
Figma Variables
        ↕
DTCG Tokens
        ↕
CSS Custom Properties
```

Registry metadata should reserve:

```text
figmaComponent
figmaVariantMapping
figmaProperties
figmaStatus
```

Do not place Figma node IDs in component source.

## WordPress

Registry metadata should support:

```text
cmsMappings:
    currentWordPress
    futureWordPress
```

Examples:

```text
Card
Current WordPress:
    Classic Tile
    Rowhouse Tile
    Page Tile
```

```text
Landing
Current WordPress:
    Landing Page
    Full Width Page
    Full Window Landing Page
```

Future WordPress should map to the canonical functional framework rather than force the framework to mirror Visual Composer.


# 34. CMS-to-Framework Mapping Reference

| Current CMS concept | Canonical framework concept |
|---|---|
| Classic Tile | Card / CardGrid |
| Rowhouse Tile | Card / CardGrid |
| Page Tile | Card |
| Story Tile | StoryCard |
| Bio Card | PersonCard |
| Hero Header | Hero |
| FAQ Toggle | Disclosure + FAQ |
| Accordion | Disclosure + AccordionGroup |
| New Tabs | Tabs |
| Vertical Tabs | Tabs variant |
| Deprecated Tabs | Legacy mapping only |
| Message Box | Message |
| Callout Block | Callout |
| Info Box | Card or Callout depending on function |
| Counter | Stat |
| Top Stories Default | StoryCollection variant |
| Top Stories Blog List | StoryCollection variant |
| Top Stories Tiles | StoryCollection variant |
| Embed Posts | StoryCollection + ContentFeed |
| Faculty Index | FacultyIndex |
| Staff Listing | PersonList / StaffDirectory |
| Course Schedule | CourseSchedule |
| Events HQ Embed | EventList + EventsProvider |
| Campaign Monitor Form | Form + FormProvider |
| Gravity Form | Form + FormProvider |
| Pardot Form | Form + FormProvider |
| Full Window | template/layout property |
| With/No Title | titleMode property |
| VC Row | Layout utility |
| VC Columns | Layout utility |
| Separator | Divider |
| Full Window Home | Homepage template configuration |


# 35. Proposed Repository Structure

```text
wharton-prototype-framework/
│
├── README.md
├── AGENTS.md
├── package.json
├── astro.config.ts
├── tsconfig.json
│
├── docs/
│   ├── framework-charter.md
│   ├── architecture.md
│   ├── component-model.md
│   ├── cms-mapping.md
│   ├── cms-audit/
│   └── decisions/
│       ├── 001-astro.md
│       ├── 002-static-rendering.md
│       ├── 003-design-tokens.md
│       ├── 004-content-separation.md
│       ├── 005-multisite.md
│       ├── 006-native-css.md
│       └── 007-provider-adapters.md
│
├── src/
│   ├── tokens/
│   │   ├── primitive/
│   │   ├── semantic/
│   │   ├── component/
│   │   └── generated/
│   ├── entities/
│   ├── schemas/
│   ├── components/
│   ├── patterns/
│   ├── global/
│   ├── templates/
│   ├── utilities/
│   ├── integrations/
│   ├── rendering/
│   │   ├── component-registry.ts
│   │   ├── pattern-registry.ts
│   │   └── PageRenderer.astro
│   ├── styles/
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── utilities.css
│   └── pages/
│       ├── index.astro
│       └── [...slug].astro
│
├── sites/
│   └── undergraduate/
│       ├── site.config.json
│       ├── navigation.json
│       ├── footer.json
│       ├── pages/
│       ├── content/
│       ├── entities/
│       │   ├── stories/
│       │   ├── events/
│       │   ├── people/
│       │   └── courses/
│       ├── assets/
│       └── fixtures/
│
├── public/
│   └── shared/
│       ├── logos/
│       ├── icons/
│       └── institutional/
│
└── tests/
    ├── unit/
    ├── accessibility/
    ├── visual/
    └── e2e/
```


# 36. Dependency Policy

Initial core dependencies:

- Astro
- TypeScript
- Astro/Zod schema validation
- Vitest
- Playwright
- axe integration

Do not add initially:

- React
- Vue
- Svelte
- Tailwind
- Bootstrap
- Redux
- Zustand
- animation frameworks
- component libraries
- Storybook
- CSS-in-JS

A new dependency requires a concrete need and documented rationale.


# 37. Architecture Guardrails

Treat as hard rules:

1. Content does not live in shared component source.
2. Sites do not duplicate shared components.
3. Legacy CMS names do not dictate canonical names.
4. Presentation differences do not automatically create components.
5. Structured entities remain separate from presentation.
6. External systems sit behind integration interfaces.
7. JavaScript is opt-in.
8. Templates do not contain site-specific copy.
9. Page composition is configuration/data.
10. Accessibility belongs in contracts.
11. Reusable design values come from tokens.
12. Architecture changes require ADRs.
13. Unknown page component types fail validation.
14. Site-specific CSS is limited and intentional.
15. No client framework is added without documented need.
16. WordPress and Figma mappings remain metadata.
17. Undergraduate must not become a source of site-specific architectural shortcuts.


# 38. Codex Implementation Sequence

## Phase 1 — Foundation

1. Scaffold Astro + TypeScript.
2. Preserve existing repository documentation.
3. Add root `AGENTS.md`.
4. Add npm scripts.
5. Establish taxonomy folders.
6. Create base schemas.
7. Create registry structure.
8. Add initial ADRs.

## Phase 2 — Deployment Proof

9. Implement minimal global shell.
10. Implement one route.
11. Add token-driven CSS.
12. Add one local image.
13. Add one lightweight interaction.
14. Test ChatGPT Sites compatibility.

Do not proceed deeply into Undergraduate before this gate.

## Phase 3 — Framework Foundation

15. Implement token pipeline.
16. Implement canonical entities.
17. Implement atomic components.
18. Implement foundational patterns.
19. Implement global shell.
20. Implement canonical templates.
21. Implement generic page renderer.
22. Implement rendering registry.

## Phase 4 — Content System

23. Implement site configuration.
24. Implement page schemas.
25. Implement entity loading.
26. Implement asset metadata/lookup.
27. Implement route generation.
28. Implement fixtures and provider interfaces.

## Phase 5 — Undergraduate Validation

29. Configure Undergraduate.
30. Recreate global navigation.
31. Recreate local navigation.
32. Recreate global footer.
33. Build representative templates.
34. Populate real content.
35. Match responsive behavior against production.
36. Refine shared components instead of adding site-specific shortcuts.

## Phase 6 — Quality

37. Add unit tests.
38. Add e2e tests.
39. Add accessibility tests.
40. Add visual baselines.
41. Build component catalog.
42. Complete mappings.
43. Review statuses.
44. Run full validation.
45. Save Sites version.
46. Review.
47. Deploy approved version.


# 39. Undergraduate Validation Scope

Undergraduate should validate:

- global program navigation;
- site identity;
- local navigation;
- mobile navigation;
- global footer;
- standard page;
- landing page;
- homepage;
- page intro;
- hero;
- card grid;
- promotional feature rows;
- story collection;
- event list;
- FAQ;
- forms;
- section navigation;
- search entry point;
- responsive behavior;
- accessibility;
- asset handling;
- site configuration;
- content editing without component-source changes.

Do not optimize architecture specifically for Undergraduate.


# 40. Definition of Done

The framework foundation is ready for broader use when:

- a new site can be created mainly through configuration/content/assets;
- global Wharton shell elements are shared;
- core templates are generic;
- content is schema-validated;
- page composition is configuration-driven;
- components use typed contracts;
- design values come from tokens;
- representative interactions pass Playwright;
- automated accessibility checks pass;
- Undergraduate can be reproduced without site-specific framework hacks;
- ChatGPT Sites publishing is validated;
- Figma and WordPress mapping metadata can be attached without changing architecture;
- Codex can complete routine work without making major architectural decisions.

Architectural success condition:

```text
Wharton Framework
       +
Site Configuration
       +
Structured Content
       +
Assets
       =
Prototype Site
```

Creating a future Wharton prototype should require mostly:

```text
new site configuration
+
new content
+
new page compositions
```

and not a new website framework.

---

# 41. Instruction to Codex

Treat this document as the governing build specification.

When implementing:

- follow the architecture as written;
- preserve functional naming;
- keep content separate from presentation;
- use the Functional Component Model to decide where new capabilities belong;
- use the CMS audit for traceability to production;
- create ADRs instead of silently changing architecture;
- prefer shared reusable solutions over site-specific shortcuts;
- keep dependencies lean;
- validate continuously;
- stop and surface true architecture conflicts instead of solving them by introducing incompatible patterns.

The goal is not merely to build an Undergraduate prototype.

The goal is to build the reusable **Wharton Web Prototype Framework** and prove it by successfully implementing Undergraduate as the first site.
