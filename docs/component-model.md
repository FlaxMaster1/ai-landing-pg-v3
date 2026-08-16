# Functional component model

The canonical taxonomy is:

```text
Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations
```

`src/registry/framework-elements.ts` is the machine-readable source of truth for implemented elements. Every entry is normalized with identity, lifecycle, contract, relationships, usage, accessibility, responsive intent, current CMS traceability, reserved Figma mapping, and future WordPress mapping metadata.

## Implemented foundation

- Tokens: color, typography, spacing, size, border, elevation, motion, and breakpoints.
- Entities: Story, Event, Person, Course, NavigationItem, Action, and Asset.
- Components: Heading, Text, Link, Button, Image, Divider, Disclosure, form/search controls, menu/close/back controls, BackToTop, Card, StoryCard, EventCard, PersonCard, Stat, and Message.
- Patterns: Hero, PageIntro, CardGrid, FeatureRow, Callout, StatsGroup, FAQ, Tabs, StoryCollection, EventList, PersonList, Form, SearchForm, Breadcrumbs, and SectionNavigation.
- Global elements: GlobalHeader, ProgramNavigation, SiteHeader, SiteIdentity, PrimaryNavigation, MobileNavigation, GlobalSearch, GlobalFooter, and global placement of BackToTop.
- Templates: Homepage, Standard, Landing, Article, Topic, Directory, Search, and Sidebar.
- Utilities: Container, Layout, Visibility, AspectRatio, Surface, AnchorTarget, ScreenReaderText, FocusManagement, and ResponsiveMedia.
- Integrations: EventsProvider, FacultyData, ContentFeed, FormProvider, VideoProvider, Authentication, SearchProvider, and Analytics, with static-safe fixtures/prototypes.

The registry intentionally does not claim that every capability in the audited canonical inventory is implemented. Remaining items are listed in `implementation-status.md` and should be admitted only when a Step 7 use case confirms their contract.

## Adding or changing an element

1. Confirm the functional concept is supported by the CMS audit and passes the reusability admission rules.
2. Prefer composition or a variant over a new component.
3. Define typed required/optional props, variants, states, semantic behavior, accessibility responsibilities, and defaults.
4. Add or update schema support if the element is configuration-renderable.
5. Register the implementation and its traceability metadata.
6. Add unit/browser/accessibility/visual coverage appropriate to its behavior.
7. Update documentation and run `npm run validate`.
