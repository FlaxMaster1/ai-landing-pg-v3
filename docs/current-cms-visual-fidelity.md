# Current Wharton CMS visual fidelity

## Scope and decision

This pass makes the framework’s `current` theme visually and behaviorally representative of the existing Wharton WordPress CMS. It does not redesign Wharton, add the future Figma system, migrate Undergraduate content, or alter the approved template/renderer architecture.

The evidence review occurred on August 16, 2026. Primary sources were the approved canonical CMS audit, the live [Wharton Martech Development pattern library](https://martechdev.wharton.upenn.edu/), the official [Wharton web guide](https://marcomm.wharton.upenn.edu/web-guide/), and representative current Wharton-managed sites including [Wharton Operations](https://operations.wharton.upenn.edu/) and [Wharton Global](https://global.wharton.upenn.edu/).

## Discrepancies found

The original reference implementation used generic Arial/Georgia typography, an invented dark navy/gold/red palette, a 1,152px content boundary, large fluid display type, rounded/shadowed cards and controls, a split-column Hero, loose section spacing, and a dark generic program bar. Those choices proved the architecture but did not reproduce the current CMS.

The live CMS instead showed:

- a 50px white institutional/program row above a 132px Wharton-blue local shell at desktop widths;
- the Wharton wordmark, condensed Acumin navigation, Minion site identity, and a circular search control;
- Acumin Pro body/control faces, Acumin Pro Condensed Black page titles, and Minion Pro section headings;
- live colors centered on `#004785`, `#A90533`, `#002C77`, `#06AAFC`, `#EDEFF2`, `#FAFAFA`, and `#111B27`;
- a measured 1,225px maximum content region with approximately 15–40px edge gutters depending on the pattern;
- square, flat controls; two-pixel buttons; three-pixel form borders; restrained separators; and little/no card elevation;
- 300px short and 580px tall/media Hero treatments with centered content, background media, and a dark overlay;
- 360px classic tiles with background media or solid brand color and bottom-aligned inverse content;
- compact bordered tab controls, 65px FAQ rows, and a blue institutional footer with collapsed additional links.

## Implemented corrections

### Tokens and foundations

- Replaced the generic color aliases with the observed current CMS palette.
- Added semantic Acumin Pro, Acumin Pro Condensed, and Minion Pro family roles with webfont sources taken from the live Martech plugin and system fallbacks.
- Set current page-title, section-heading, subheading, lead, and stat scales to the measured hierarchy.
- Increased the content token to 76.5625rem (1,225px), changed the shared navigation transition to 62rem (992px), tightened section spacing, removed the default radius, and changed focus to the observed bright Wharton blue.
- Kept DTCG JSON as the source and regenerated CSS; no token dependency was added.

### Components and patterns

- Corrected links, buttons, eyebrows, dividers, cards, story/person/event presentations, stats, disclosures, form controls, and BackToTop typography.
- Restyled promotional/navigation Cards as current classic tiles and retained flatter editorial/entity cards for their distinct semantics.
- Changed Hero media from a split column to a full-background layer with overlay, measured height variants, centered content, and current button treatments.
- Corrected CardGrid gaps, FeatureRow rhythm, Callout surfaces, FAQ rows/panels, Tabs, forms, Breadcrumbs styling, section navigation, and section spacing.
- Preserved native disclosure semantics, the accessible Tabs keyboard model, native form validation, one-H1 enforcement, and reduced-motion behavior.

### Global shell and templates

- Rebuilt the desktop shell proportions and current responsive transition while preserving configured navigation and accessible dialog-based mobile drill-down.
- Added optional configured institutional header/footer brand assets so shared globals do not contain site identity copy.
- Replaced the neutral program links with the current Wharton network destinations in the reference site configuration.
- Replaced the text presentation of the Knowledge at Wharton program link with the supplied Knowledge at Wharton SVG while preserving the configured label as the link's accessible name.
- Corrected the current blue footer, collapsed additional-links treatment, Penn mark, legal row, and typography.
- Corrected centered default page titles, left-aligned Sidebar titles, content/reading widths, and Sidebar title placement without adding templates.

## Evidence measurements used

At a 1,280px desktop viewport the live Martech library produced a 182px total header, a 50px institutional row, an 80px site-identity row, a 52px local-navigation row, and a 1,225px main boundary. Its desktop navigation transition was 992px. Computed type values included 50/50px H1, 38/38px H2, 30/30px H3, 28/28px H4, 20/20px H5, 20/30px H6, and 18/27px body copy. Live form controls measured 42px high with a 3px `#B3B7BD` border. Current horizontal tabs used 18/27px labels with 9px/18px padding. Closed FAQ rows measured approximately 65px.

These values describe the reviewed current Martech plugin output, not a promise that every independently maintained Wharton site or legacy plugin version is pixel-identical.

## Unresolved fidelity limits

- The current production stylesheet exposes both `#A90533` and legacy `#981E32` reds. The default current theme uses the newer live component value `#A90533`; legacy exceptions are not generalized into a second theme.
- Webfonts and institutional logo files are loaded from the official live Martech asset host because repository licensing and redistribution rights were not established. They have system fallbacks, but long-term vendoring/CDN ownership remains a production decision.
- Classic, Rowhouse, Page Tile, Story Tile, and provider-owned form variations use several aspect ratios and local exceptions. The implemented canonical variants represent the reviewed dominant treatments; exhaustive legacy subclass reproduction is not claimed.
- The neutral reference intentionally uses abstract fixture art, so production photography, crops, focal points, and editorial art direction cannot be validated until a real site is configured.
- The Breadcrumbs pattern is visually corrected, but templates do not invent ancestry from URL strings. Automatic breadcrumb population awaits structured hierarchy in a real site configuration.
- The current footer’s social destinations and “Support Wharton” action do not have semantic fields in the approved footer contract. They were not hardcoded into shared UI merely for resemblance.
- Exact focus treatments across all older plugins and exact long-form reading widths were not consistently observable. The framework retains its documented visible-focus convention and 48rem narrative width.
- The framework keeps its accessible modal mobile navigation and explicit focus return. Its behavior is functionally equivalent to the audited hierarchy, but it is not a line-for-line copy of the production plugin’s DOM or animation.

## Architecture assessment

No approved Step 5 architecture decision changed. The only contract extension is optional institutional-brand metadata in site configuration, which enforces the existing rule that global elements receive site data and shared code contains no site-specific editorial content.

The corrected neutral implementation can reasonably serve as a representation of the current Wharton CMS visual system for the implemented framework inventory. It should not be described as a complete reproduction of every legacy template/plugin variation or as validation of Undergraduate-specific content.
