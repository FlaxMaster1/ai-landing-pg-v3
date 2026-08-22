# Wharton Web Prototype Framework Component Handbook

**Status:** Living documentation  
**Version:** 0.1  
**Source of truth for inventory:** `src/registry/framework-elements.ts`  
**Decision framework:** `WHARTON_DESIGN_DECISION_FRAMEWORK.md`

This handbook documents how the registered Wharton framework elements should be used in practice. The typed registry defines what exists and its implementation contract. This handbook defines the editorial, design, UX, responsive, and selection guidance needed to choose among those elements consistently.

When this handbook and the registry disagree about whether an element, field, state, or variant exists, the registry and implementation win. The handbook must then be corrected.

---

## 1. How to use this handbook

Before selecting a component or pattern:

1. Define the user goal.
2. Define the content purpose and relationship.
3. Consult `WHARTON_DESIGN_DECISION_FRAMEWORK.md` for the decision path.
4. Inspect the relevant entry in `src/registry/framework-elements.ts`.
5. Use this handbook to distinguish the candidate from adjacent choices.
6. Prefer the smallest existing semantic solution that satisfies the task.
7. Create a new shared element only after existing composition and variants are proven insufficient.

This handbook is not a visual menu. A component should be selected because its semantics and behavior match the content, not because its appearance is convenient.

---

# 2. Components

## Heading

**Registry ID:** `CMP-heading`  
**Purpose:** Semantic heading-level primitive.  
**Required:** `content`  
**Variants:** `h1`, `h2`, `h3`, `h4`, `h5`, `h6`

### Use when

Use Heading when the content establishes a real document or section heading in the page outline.

### Avoid when

Do not select a heading level for visual size alone. Do not create multiple H1 owners on a page. Do not use Heading for decorative labels, metadata, or button-like text.

### Selection notes

Heading level follows document hierarchy. Visual treatment should come from tokens/styles rather than changing semantic level.

### Accessibility

Preserve logical heading order. The page must have exactly one H1 owner unless a documented exception is approved.

---

## Text

**Registry ID:** `CMP-text`  
**Purpose:** Semantic short-text primitive.  
**Required:** `content`

### Use when

Use for short explanatory or supporting text that does not require richer editorial structure.

### Avoid when

Do not use Text as a substitute for headings, labels, long-form rich content, or structured metadata.

### Related choices

Use Heading for hierarchy, Link for navigation, and entity-specific fields when content belongs to an entity contract.

---

## Link

**Registry ID:** `CMP-link`  
**Purpose:** Navigation control with external-destination disclosure.  
**Required:** `href`, `content`

### Use when

Use when activation navigates the user to another URL, route, document, anchor, or external destination.

### Avoid when

Do not use a link for an action that changes local application state without navigation. Do not use Button simply because a link needs visual prominence.

### Link vs Button

Use **Link** when the result is navigation. Use **Button** when the result is an action or when the registered Button variant intentionally presents a prominent destination while preserving correct underlying semantics.

### Accessibility

Link text should make sense in context and avoid vague labels such as “click here.” External-destination behavior should remain understandable.

---

## Button

**Registry ID:** `CMP-button`  
**Purpose:** Action or prominent destination control.  
**Required:** `content`  
**Variants:** `primary`, `secondary`, `text`

### Use when

Use for a high-value action, submission, state change, or intentionally prominent call to action.

### Variant guidance

- **primary:** one dominant action within the current decision context.
- **secondary:** an important alternative that should not compete with the primary action.
- **text:** low-visual-weight action where button semantics remain appropriate.

### Avoid when

Do not create several primary buttons in one decision area. Do not use buttons to style ordinary navigation lists. Do not use Button where a plain Link better communicates navigation.

### Content guidance

Use concise verb-led labels when possible: “Apply,” “Register,” “Explore Programs,” “Contact Us.” Avoid ambiguous labels such as “Submit” when a more specific action is available.

---

## Image

**Registry ID:** `CMP-image`  
**Purpose:** Asset-backed responsive image presentation.  
**Required:** `asset`

### Use when

Use when an image has editorial, informational, identity, or meaningful visual-support value.

### Avoid when

Do not add imagery solely to occupy layout space. Decorative assets should be explicitly represented as decorative rather than given misleading alternative text.

### Accessibility

Meaningful images require meaningful alternative text. Decorative images require an explicitly empty alternative. Do not repeat nearby visible text in the alt unless that repetition is needed to convey the image meaning.

### Responsive behavior

Preserve focal content and intended aspect behavior. Avoid cropping that removes the subject or changes editorial meaning.

---

## Divider

**Registry ID:** `CMP-divider`  
**Purpose:** Semantic or labeled content separator.  
**Variants:** `plain`, `with-text`

### Use when

Use when a real conceptual break exists between groups of content and spacing alone is insufficient to communicate the separation.

### Avoid when

Do not use repeated dividers as decoration between every section. Prefer spacing and hierarchy first.

### Variant guidance

Use `with-text` only when the divider label carries useful meaning. A decorative word between sections is not sufficient justification.

---

## Disclosure

**Registry ID:** `CMP-disclosure`  
**Purpose:** Native expandable content control.  
**Required:** `summary`, `content`  
**States:** `closed`, `open`

### Use when

Use for independent secondary content where users benefit from scanning labels and opening only the details relevant to them.

### Avoid when

Do not use when users need to compare sections, when most users must read all sections, when the hidden content is central to the page argument, or simply to make a page appear shorter.

### Disclosure vs FAQ

Disclosure is the primitive. Use the **FAQ pattern** when several disclosures specifically form a question-and-answer group.

### Accessibility

Use native disclosure semantics where implemented. The trigger must be keyboard-operable and expose expanded/collapsed state.

---

## FormControl

**Registry ID:** `CMP-form-control`  
**Purpose:** Labeled text, email, or textarea control with hint association.  
**Required:** `id`, `label`, `type`  
**Variants:** `text`, `email`, `textarea`

### Use when

Use as the input primitive inside a structured Form pattern.

### Avoid when

Do not construct an entire form from isolated controls without form-level validation, result handling, and provider behavior. Do not use placeholders as replacements for labels.

### Accessibility

Every control requires a visible/programmatic label. Hints and errors must be associated with the corresponding field.

---

## SearchInput

**Registry ID:** `CMP-search-input`  
**Purpose:** Labeled native search input.  
**Required:** `id`, `label`

### Use when

Use only when the field is specifically a search query input.

### Avoid when

Do not use as a generic text input. Use FormControl for ordinary form data.

### Related choices

Use **SearchForm** for page or section search behavior. Use **GlobalSearch** when search belongs to the persistent site shell.

---

## MenuToggle

**Registry ID:** `CMP-menu-toggle`  
**Purpose:** Control that exposes mobile navigation state.  
**Required:** `controls`, `label`  
**States:** `collapsed`, `expanded`

### Use when

Use as part of the mobile/navigation system where a menu region is shown or hidden.

### Avoid when

Do not use as a generic disclosure trigger. Use Disclosure for content expansion.

### Accessibility

The control must have an accessible name and communicate whether the controlled region is expanded.

---

## CloseControl

**Registry ID:** `CMP-close-control`  
**Purpose:** Named close control for dialogs.  
**Required:** `label`

### Use when

Use to dismiss a dialog, overlay, search panel, or comparable transient UI that has a clear close action.

### Avoid when

Do not use an unlabeled icon-only close affordance without an accessible name.

---

## BackControl

**Registry ID:** `CMP-back-control`  
**Purpose:** Named hierarchical navigation back control.  
**Required:** `label`

### Use when

Use inside hierarchical navigation experiences when users drill into a nested level and need to return one level.

### Avoid when

Do not use as a browser-history replacement or as an ambiguous “Back” button detached from a known hierarchy.

---

## BackToTop

**Registry ID:** `CMP-back-to-top`  
**Purpose:** In-page return link to document start.  
**Required:** `label`

### Use when

Use on long pages where returning to the top materially improves navigation efficiency.

### Avoid when

Do not add by default to short pages or as a decorative convention.

---

## Card

**Registry ID:** `CMP-card`  
**Purpose:** Composable media, metadata, title, description, and action card.  
**Required:** `title`  
**Variants:** `editorial`, `promotional`, `navigation`, `feature`, `compact`, `media-led`, `text-led`

### Use when

Use when one discrete item must be recognized and understood as a browseable destination, content object, or promoted item, and no more semantic entity-specific card applies.

### Avoid when

Do not use Card as a generic visual box. Do not put every paragraph, CTA, or content section in a card. Do not use generic Card for Story, Event, or Person data when their semantic cards apply.

### Variant guidance

- **editorial:** general editorial content/destination with balanced text/media.
- **promotional:** action-oriented content where emphasis and conversion are stronger.
- **navigation:** destination-first card whose primary job is wayfinding.
- **feature:** one item receives stronger hierarchy than its peers.
- **compact:** reduced-detail presentation for denser collections.
- **media-led:** image/media is the primary recognition cue.
- **text-led:** text is the primary recognition cue and imagery is absent or secondary.

### Card vs Callout vs FeatureRow

Use Card for a discrete item. Use Callout to emphasize a message. Use FeatureRow for a substantial media-plus-content section.

---

## StoryCard

**Registry ID:** `CMP-story-card`  
**Purpose:** Semantic Story entity presentation.  
**Required:** `story`  
**Variants:** `editorial`, `compact`, `feature`

### Use when

Use for article, story, news, research-story, or editorial-feed items represented by the Story entity.

StoryCard exposes the Story topic as a normalized `data-content-category` value on its card. Site-scoped styles may use that semantic hook for a documented content-type color system; topic meaning must remain in the content model rather than being inferred from card position.

### Avoid when

Do not duplicate Story metadata into a generic Card just to achieve a different visual style. If the needed treatment is broadly reusable, extend the StoryCard variant system deliberately.

### Variant guidance

- **editorial:** standard story browsing.
- **compact:** dense lists/secondary story collections.
- **feature:** one story is editorially prioritized.

---

## EventCard

**Registry ID:** `CMP-event-card`  
**Purpose:** Semantic Event entity presentation with machine-readable time.  
**Required:** `event`  
**Variants:** `list`, `grid`, `featured`

### Use when

Use whenever an Event entity is presented and date/time/location context contributes meaning.

### Avoid when

Do not model a timeless promotional destination as an event card. Do not discard structured time semantics in favor of manually formatted card text.

### Variant guidance

- **list:** scanning and chronological density.
- **grid:** browsing a moderate set of events visually.
- **featured:** one event receives editorial prominence.

---

## PersonCard

**Registry ID:** `CMP-person-card`  
**Purpose:** Semantic Person entity presentation.  
**Required:** `person`  
**Variants:** `card`, `directory`

### Use when

Use for faculty, staff, leadership, speakers, or other Person entities.

### Avoid when

Do not manually rebuild people content in generic cards. For large reference-oriented directories, prefer the directory presentation rather than image-heavy cards.

### Variant guidance

- **card:** visual browsing and recognition.
- **directory:** denser lookup and reference behavior.

---

## Stat

**Registry ID:** `CMP-stat`  
**Purpose:** Structured value, label, and supporting detail.  
**Required:** `value`, `label`

### Use when

Use when a number or concise metric is meaningful evidence and can be understood with a short label/context.

### Avoid when

Do not isolate numbers that lack source, timeframe, unit, or interpretive value. Do not turn arbitrary marketing claims into “statistics.”

### Content guidance

Make units and timeframe explicit where needed. Supporting context should clarify, not bury, the metric.

---

## Message

**Registry ID:** `CMP-message`  
**Purpose:** Named status or alert feedback region.  
**Variants:** `info`, `success`, `warning`, `error`

### Use when

Use for system state, form feedback, important operational information, or user-action outcomes.

### Avoid when

Do not use Message as an editorial callout or decorative colored box. Use Callout for content emphasis.

### Accessibility

Use status semantics for non-urgent feedback and alert semantics only for urgent errors or conditions requiring immediate attention.

---

# 3. Patterns

## Hero

**Registry ID:** `PAT-hero`  
**Purpose:** Page-opening composition that owns the page H1.  
**Required:** `id`, `heading`  
**Variants:** `short`, `tall`, `media`

### Use when

Use when a page requires a strong opening identity, orientation, campaign/editorial emphasis, or page-level media relationship.

### Avoid when

Do not use simply because a page needs a title. Do not use when another template/pattern already owns the H1.

### Variant guidance

- **short:** efficient orientation; best default when strong height is unnecessary.
- **tall:** deliberate high-impact opening for priority landing/campaign experiences.
- **media:** image/media is materially part of the opening message.

### Accessibility

Hero is the H1 owner when configured as the title mode. A page must not create a second H1 elsewhere.

---

## PageIntro

**Registry ID:** `PAT-page-intro`  
**Purpose:** Introductory supporting content beneath a template-owned title.  
**Required:** `id`, `text`

### Use when

Use to summarize or orient the user immediately below a title that is already owned by the template or another pattern.

### Avoid when

Do not use as a substitute for the primary page heading or for a long body section.

---

## CardGrid

**Registry ID:** `PAT-card-grid`  
**Purpose:** Responsive collection of Card components.  
**Required:** `id`, `items`  
**Variants:** `editorial`, `promotional`, `navigation`

### Use when

Use when several peer cards should be browsed as a collection and responsive wrapping is appropriate.

### Avoid when

Do not use when a simple text list is faster to scan, when items need precise comparison, or when one item should dominate without a feature treatment.

### Variant guidance

- **editorial:** content/story-oriented browsing.
- **promotional:** action-oriented destinations or offers.
- **navigation:** primary purpose is route discovery.

---

## FeatureRow

**Registry ID:** `PAT-feature-row`  
**Purpose:** Promotional media and content composition.  
**Required:** `id`, `heading`, `text`  
**Variants:** `media-start`, `media-end`

### Use when

Use for a substantial section where media and narrative content work together and deserve more space than a card.

### Avoid when

Do not use repeatedly in alternating left/right sequence merely as decoration. Do not use for peer browse items that belong in a CardGrid.

### Variant guidance

Choose media position based on page flow and composition, not a rigid zebra-striping pattern.

---

## Callout

**Registry ID:** `PAT-callout`  
**Purpose:** Prominent supporting message and optional action.  
**Required:** `id`, `heading`, `text`  
**Variants:** `brand-primary`, `brand-accent`, `subtle`

### Use when

Use when a supporting message, deadline, next step, contextual promotion, or focused CTA deserves emphasis within the page.

### Avoid when

Do not use as ordinary body copy, status feedback, or repeated decoration.

### Variant guidance

Use brand intensity according to information priority, not personal color preference. `subtle` should be the default when strong brand emphasis is unnecessary.

---

## StatsGroup

**Registry ID:** `PAT-stats-group`  
**Purpose:** Responsive group of Stat components.  
**Required:** `id`, `items`

### Use when

Use when several metrics collectively support a meaningful claim or provide an at-a-glance evidence set.

### Avoid when

Do not combine unrelated numbers just because they look visually balanced. Avoid overwhelming the user with too many metrics.

### Editorial guidance

Each metric should have a clear unit/timeframe where relevant. The group should communicate one coherent message.

---

## FAQ

**Registry ID:** `PAT-faq`  
**Purpose:** Question-and-answer group composed from native Disclosure components.  
**Required:** `id`, `items`

### Use when

Use for real frequently asked questions or question-shaped supporting information where users typically seek a subset of answers.

### Avoid when

Do not turn ordinary page sections into fake questions simply to justify accordions. Do not hide core information that most visitors need.

### Accessibility

Each question must remain a keyboard-operable native summary/disclosure trigger.

---

## Tabs

**Registry ID:** `PAT-tabs`  
**Purpose:** Locally stateful tablist and panel composition.  
**Required:** `id`, `items`  
**Variants:** `horizontal`, `vertical`  
**States:** `selected`, `unselected`

### Use when

Use when a limited set of parallel views share one context and users benefit from switching without leaving the page.

### Avoid when

Do not use for sequential steps, large navigation taxonomies, content users must compare simultaneously, or simply to reduce page height.

### Variant guidance

- **horizontal:** default for a small number of concise labels.
- **vertical:** consider when labels are longer or the relationship benefits from a side-by-side navigation/panel layout, provided responsive behavior remains clear.

### Accessibility

Maintain tablist/tab/tabpanel relationships and keyboard behavior including arrow keys plus Home/End where implemented.

---

## StoryCollection

**Registry ID:** `PAT-story-collection`  
**Purpose:** ContentFeed-backed Story collection.  
**Required:** `id`, `entityIds`  
**Variants:** `grid`, `list`, `featured`

### Use when

Use when multiple Story entities are rendered as a purposeful editorial collection.

### Avoid when

Do not use a story collection for generic navigation destinations or unrelated promotional cards.

### Variant guidance

- **grid:** browseable editorial discovery.
- **list:** denser recency/reference scanning.
- **featured:** intentional hierarchy with one or more prioritized stories.

---

## EventList

**Registry ID:** `PAT-event-list`  
**Purpose:** EventsProvider-backed Event collection.  
**Required:** `id`, `entityIds`  
**Variants:** `list`, `grid`, `featured`

### Use when

Use for a coherent set of events, typically upcoming or contextually related.

### Avoid when

Do not use if chronology/date has no relevance or if content is really a generic list of destinations.

### Variant guidance

Prefer list for efficient scanning of dates; grid for moderate discovery sets; featured when editorial priority is intentionally unequal.

---

## PersonList

**Registry ID:** `PAT-person-list`  
**Purpose:** FacultyData-backed Person collection.  
**Required:** `id`, `entityIds`  
**Variants:** `cards`, `directory`

### Use when

Use for groups of people from the Person entity/provider model.

### Avoid when

Do not manually construct staff/faculty lists with arbitrary markup that bypasses the entity model.

### Variant guidance

Use `cards` for recognition/browsing; `directory` for lookup efficiency and denser information.

---

## Form

**Registry ID:** `PAT-form`  
**Purpose:** Validated form presentation configured for a provider boundary.  
**Required:** `id`, `heading`, `fields`  
**States:** `idle`, `invalid`, `success`

### Use when

Use when the user must provide structured input to complete a meaningful task such as inquiry, registration, or subscription.

### Avoid when

Do not create a form where a mailto/contact link or destination button is enough. Do not embed provider-specific implementation assumptions into shared form components.

### Accessibility

Labels, hints, validation messages, and result states must be programmatically associated and announced appropriately.

---

## SearchForm

**Registry ID:** `PAT-search-form`  
**Purpose:** GET form that stores meaningful search state in the URL.  
**Required:** `action`, `label`, `submitLabel`

### Use when

Use for site/section search where the query should be shareable, bookmarkable, and represented in URL state.

### Avoid when

Do not use for filtering interactions whose state model differs from search unless explicitly designed and registered.

---

## Breadcrumbs

**Registry ID:** `PAT-breadcrumbs`  
**Purpose:** Ordered hierarchical route context.  
**Required:** `label`, `items`

### Use when

Use when the site hierarchy is deep enough that showing ancestry helps orientation and lateral recovery.

### Avoid when

Do not include breadcrumbs on extremely shallow structures where they duplicate obvious navigation without adding context.

### Accessibility

Use a named navigation landmark and indicate the current page correctly.

---

## SectionNavigation

**Registry ID:** `PAT-section-navigation`  
**Purpose:** Configured sibling or in-page navigation.  
**Required:** `label`, `items`

### Use when

Use for navigation among sibling pages in a local section or among meaningful in-page sections.

### Avoid when

Do not use as a substitute for PrimaryNavigation or ProgramNavigation. Do not duplicate global navigation inside the content area.

---

# 4. Global elements

## GlobalHeader

### Purpose

Institutional/global shell and top-level framing.

### Use when

Use as part of the standard site shell where institutional context is required.

### Avoid when

Do not create page-specific versions inside local page content. Global shell changes require framework-level review.

---

## GlobalFooter

### Purpose

Persistent institutional/global closing navigation and information.

### Use when

Use consistently as part of the shared site shell.

### Avoid when

Do not inject page-specific campaign content into the global footer. Local CTA needs belong in page patterns.

---

## GlobalSearch

### Purpose

Persistent search affordance in the global/site shell.

### Use when

Use when the site provides global search as an expected navigation pathway.

### Avoid when

Do not add a global search affordance when no search experience exists behind it.

---

## PrimaryNavigation

### Purpose

Primary site-level destinations.

### Use when

Use for the small set of destinations that define the site's major information architecture.

### Avoid when

Do not overload primary navigation with every page. Secondary/local links belong in lower-level systems.

---

## ProgramNavigation

### Purpose

Configured program-level navigation.

### Use when

Use when the site participates in a defined Wharton program navigation context represented in site configuration.

### Avoid when

Do not repurpose it for arbitrary local navigation.

---

## MobileNavigation

### Purpose

Responsive presentation of site navigation on smaller viewports.

### Use when

Use as the responsive interaction model for existing navigation IA.

### Avoid when

Do not create a separate mobile information architecture. MobileNavigation should transform presentation, not redefine the site's taxonomy.

---

## SiteHeader

### Purpose

Local site framing and identity region within the shared shell.

### Use when

Use when the site needs a distinct local identity under the institutional/global context.

### Avoid when

Do not duplicate the institutional header or add unrelated promotional content into the site identity area.

---

## SiteIdentity

### Purpose

The site's configured local identity/name presentation.

### Use when

Use consistently to name the local site or program within the framework shell.

### Avoid when

Do not treat SiteIdentity as an editable campaign headline.

---

# 5. Templates

## Homepage

### Use when

Use for the root entry page of a site where users need orientation, discovery, prioritization, and multiple routes into deeper content.

### Typical composition

Hero or template-owned title → orientation/intro → priority destinations → proof/evidence → stories/events/people as relevant → focused next actions.

### Avoid

Do not treat the homepage as a dump of every available component or every content feed.

---

## Landing

### Use when

Use for section, program, initiative, or topic entry pages that orient users and route them to deeper pages.

### Typical composition

Title/Hero → concise purpose → primary route choices → supporting proof/content → contextual CTA.

### Avoid

Do not use for simple single-purpose informational pages that fit Standard.

---

## Standard

### Use when

Use for ordinary informational pages with a straightforward reading hierarchy and limited browsing complexity.

### Typical composition

Title → intro → body sections → optional supporting callout/media → next action/related links.

### Avoid

Do not force complex directory, search, or editorial-story behavior into Standard.

---

## Topic

### Use when

Use for a subject-area page that aggregates, interprets, or routes users across multiple content types related to one topic.

### Avoid

Do not use when the content represents a single editorial article or a simple landing page taxonomy.

---

## Article

### Use when

Use for long-form editorial/story content with a clear reading sequence.

### Typical composition

Article title/meta → lead/intro → body → media/quotes/callouts as justified → related Story content.

### Avoid

Do not turn articles into card mosaics or excessive interactive modules that interrupt reading.

---

## Directory

### Use when

Use for lookup/browse collections where users need to find entities such as people efficiently.

### Avoid

Do not use for small promotional groups that are better represented as cards in a landing page.

---

## Search

### Use when

Use for search results and search-state experiences.

### Avoid

Do not use as a generic filtered directory unless the interaction is actually search-driven.

---

## Sidebar

### Use when

Use when persistent secondary navigation, references, or supporting information genuinely benefits from a parallel region.

### Avoid

Do not add a sidebar merely to fill whitespace or create visual complexity. On small screens, secondary content must preserve logical DOM/reading order.

---

## BaseTemplate

### Purpose

Shared structural infrastructure for templates.

### Use when

Use internally to implement template behavior.

### Avoid

Do not expose BaseTemplate as an editorial page-type choice.

---

# 6. Common choice conflicts

## Link vs Button

Choose based on behavior first. Navigation means Link. Actions mean Button. Visual prominence does not change semantics.

## Generic Card vs semantic Card

If content is a Story, Event, or Person entity, prefer StoryCard, EventCard, or PersonCard. Generic Card is for content that does not have a stronger semantic representation.

## CardGrid vs simple list

Use CardGrid when recognition, browsing, metadata, or imagery materially helps. Use a simple list when users mainly need fast scanning of labels and destinations.

## Card vs FeatureRow

Card is a discrete item. FeatureRow is a substantial content section with a media/text relationship.

## Callout vs Message

Callout is editorial emphasis. Message is state/feedback/operational information.

## FAQ/Disclosure vs Tabs

Disclosure is for independent optional details. Tabs are for parallel views within one context. Neither should be used merely to shorten a page.

## Breadcrumbs vs SectionNavigation

Breadcrumbs show ancestry/path. SectionNavigation shows sibling/in-page choices.

## PrimaryNavigation vs SectionNavigation

PrimaryNavigation defines the site's major IA. SectionNavigation supports a smaller local scope.

## PageIntro vs Hero

Hero can own the page H1 and primary opening. PageIntro supports a title already owned elsewhere.

---

# 7. Content density guidance

Component selection should account for density and scanning behavior.

- Small sets of high-value destinations: cards may be appropriate.
- Large sets of text-first destinations: use structured lists/directories before cards.
- Long explanatory content: use visible sections before interaction.
- Dense people sets: directory variant before person-card grid.
- Chronological event sets: list before grid unless visual discovery is important.
- Story collections: choose list for scanning/recency, grid for discovery, featured for editorial priority.

Do not use more visual surface area than the user's task needs.

---

# 8. Responsive rules that apply across the handbook

Every component/pattern must preserve semantic meaning and reading order as layout changes.

1. Do not create a separate mobile content model.
2. Preserve meaningful DOM order even if visual positioning changes.
3. Ensure interactive targets remain comfortably operable by touch.
4. Avoid horizontal overflow except where a documented interaction specifically requires it.
5. Do not hide essential content simply because the viewport is small.
6. Reconsider grids as content density increases; fewer columns are not always enough if cards become excessively tall.
7. Navigation transforms must preserve the same underlying IA.
8. Media crops must preserve editorial focal content.

---

# 9. Accessibility rules that apply across the handbook

1. Semantic HTML is the default.
2. One H1 owner per page.
3. Keyboard operation is required for all interactions.
4. Visible focus is required.
5. Controls require clear accessible names.
6. ARIA supplements semantics; it should not replace native semantics unnecessarily.
7. Meaningful images require meaningful alt text; decorative images use empty alt.
8. Dynamic status/state changes must be announced where appropriate.
9. Do not communicate state or hierarchy by color alone.
10. Responsive transformations must preserve reading and focus order.

---

# 10. AI build checklist

Before an AI agent implements a section, it must be able to answer:

- What user task does this section serve?
- What content/entity type is involved?
- What relationship exists among the items?
- Does the section require interaction?
- Which registered elements are candidates?
- Why is the chosen candidate better than the adjacent alternatives documented here?
- Which existing variant fits?
- What happens on mobile?
- What accessibility contract applies?
- Is any proposed new component actually reusable across more than one site?

If the agent cannot answer these questions, it should not create a new component.

---

# 11. Documentation maintenance rule

Whenever a reusable framework element or meaningful variant is added or changed, the same pull request must evaluate updates to:

- `src/registry/framework-elements.ts`
- `WHARTON_DESIGN_DECISION_FRAMEWORK.md`
- this handbook
- related tests
- the canonical specification when governing behavior changes
- an ADR when architecture changes

A shared element is incomplete until both its implementation contract and its selection guidance are documented.
