# Functional component model

The canonical taxonomy is:

```text
Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations
```

`src/registry/framework-elements.ts` is the machine-readable source of truth for implemented elements. Every entry is normalized with identity, lifecycle, contract, relationships, usage, accessibility, responsive intent, current CMS traceability, reserved Figma mapping, and future WordPress mapping metadata.

The registry answers **what exists and what its contract is**. The surrounding documentation answers **when and why to use it**:

- `../WHARTON_DESIGN_DECISION_FRAMEWORK.md` — selection logic.
- `component-handbook.md` — detailed component/pattern usage and adjacent-choice guidance.
- `page-recipes.md` — page- and site-level composition guidance.

## Implemented foundation

- Tokens: color, typography, spacing, size, border, elevation, motion, and breakpoints.
- Entities: Story, Event, Person, Course, NavigationItem, Action, and Asset.
- Components: Heading, Text, Link, Button, Image, Divider, Disclosure, form/search controls, menu/close/back controls, BackToTop, Card, StoryCard, EventCard, PersonCard, Stat, and Message.
- Patterns: Hero, PageIntro, CardGrid, FeatureRow, Callout, StatsGroup, FAQ, Tabs, StoryCollection, EventList, PersonList, Form, SearchForm, Breadcrumbs, and SectionNavigation.
- Global elements: GlobalHeader, ProgramNavigation, SiteHeader, SiteIdentity, PrimaryNavigation, MobileNavigation, GlobalSearch, GlobalFooter, and global placement of BackToTop.
- Templates: Homepage, Standard, Landing, Article, Topic, Directory, Search, and Sidebar.
- Utilities: Container, Layout, Visibility, AspectRatio, Surface, AnchorTarget, ScreenReaderText, FocusManagement, and ResponsiveMedia.
- Integrations: EventsProvider, FacultyData, ContentFeed, FormProvider, VideoProvider, Authentication, SearchProvider, and Analytics, with static-safe fixtures/prototypes.

The registry intentionally does not claim that every capability in the audited canonical inventory is implemented. Remaining items are listed in `implementation-status.md` and should be admitted only when a real site use case confirms their contract.

ProgramNavigation items remain label-and-destination navigation contracts. An item may optionally configure a logo image; its required label remains the link's accessible name, so visual branding does not replace navigation semantics.

## Selection before implementation

Before choosing or creating an element:

1. identify the user goal and content purpose;
2. identify the relationship among content items;
3. consult the Design Decision Framework;
4. inspect candidate registry entries;
5. consult the Component Handbook to distinguish adjacent choices;
6. consult Page Recipes when composing a whole page or site section;
7. prefer the smallest existing semantic solution.

Do not start from visual appearance alone.

## Adding or changing an element

1. Confirm the functional concept is supported by a real use case and passes the reusability admission rules.
2. Prefer composition or an existing variant over a new component.
3. Define typed required/optional props, variants, states, semantic behavior, accessibility responsibilities, and defaults.
4. Add or update schema support if the element is configuration-renderable.
5. Register the implementation and its traceability metadata.
6. Update the Design Decision Framework if selection logic changes.
7. Add/update the Component Handbook entry.
8. Update Page Recipes when complete-page composition guidance changes.
9. Add unit/browser/accessibility/visual coverage appropriate to behavior.
10. Update other affected documentation and run the appropriate validation gate.

A shared element is not considered fully incorporated until implementation, registry metadata, tests, and selection/composition guidance agree.