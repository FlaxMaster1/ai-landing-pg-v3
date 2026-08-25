export type RegistryCategory = "token" | "entity" | "component" | "pattern" | "global" | "template" | "utility" | "integration";
export type RegistryStatus = "core" | "supported" | "specialized" | "provisional" | "integration-only";

export interface RegistryEntry {
  id: string;
  name: string;
  category: RegistryCategory;
  description: string;
  status: RegistryStatus;
  version: string;
  source: string;
  purpose: string;
  anatomy: string[];
  requiredFields: string[];
  optionalFields: string[];
  variants: string[];
  states: string[];
  behaviors: string[];
  relationships: {
    contains: string[];
    mayContain: string[];
    dependsOn: string[];
    usedBy: string[];
    relatedTo: string[];
    replaces: string[];
  };
  usage: {
    allowedContexts: string[];
    disallowedContexts: string[];
    contentGuidance: string;
    accessibilityRequirements: string[];
    responsiveIntent: string;
  };
  traceability: {
    cmsSource: string;
    cmsNames: string[];
    productionExamples: string[];
    legacyEquivalents: string[];
    figmaMappings: string[];
    futureWordPressMapping: string;
  };
}

type EntryInput = Pick<RegistryEntry, "id" | "name" | "category" | "description"> & Partial<Omit<RegistryEntry, "id" | "name" | "category" | "description">> & {
  accessibility?: string[];
  cmsNames?: string[];
  productionExamples?: string[];
};

function register({ accessibility = [], cmsNames = [], productionExamples = [], ...entry }: EntryInput): RegistryEntry {
  return {
    status: entry.category === "integration" ? "integration-only" : "core",
    version: "0.1.0",
    source: "Approved Step 4 functional model and Step 5 technical architecture",
    purpose: entry.description,
    anatomy: [],
    requiredFields: [],
    optionalFields: [],
    variants: [],
    states: ["default"],
    behaviors: [],
    relationships: { contains: [], mayContain: [], dependsOn: [], usedBy: [], relatedTo: [], replaces: [] },
    usage: {
      allowedContexts: ["shared framework", "validated site composition"],
      disallowedContexts: ["hardcoded site copy", "unvalidated arbitrary styling"],
      contentGuidance: "Supply editorial content through site configuration, entities, or Markdown.",
      accessibilityRequirements: accessibility,
      responsiveIntent: "Mobile-first; preserve semantics and DOM order while layout adapts intrinsically."
    },
    traceability: {
      cmsSource: "Canonical CMS audit",
      cmsNames,
      productionExamples,
      legacyEquivalents: [],
      figmaMappings: [],
      futureWordPressMapping: "Reserved for Step 7 mapping"
    },
    ...entry
  } as RegistryEntry;
}

const a11yText = ["Preserve semantic reading order and heading hierarchy."];
const a11yControl = ["Provide an accessible name, visible focus, and keyboard operation."];
const a11yMedia = ["Require meaningful alternative text or an explicitly empty alternative for decorative media."];
const martechPatternLibrary = "https://martechdev.wharton.upenn.edu/";

export const frameworkRegistry: RegistryEntry[] = [
  register({ id: "TOK-color", name: "Color tokens", category: "token", description: "Primitive and semantic color decisions.", productionExamples: [martechPatternLibrary] }),
  register({ id: "TOK-typography", name: "Typography tokens", category: "token", description: "Font-family, weight, and fluid type foundations.", productionExamples: [`${martechPatternLibrary}typography/`] }),
  register({ id: "TOK-spacing", name: "Spacing tokens", category: "token", description: "Reusable spacing scale and semantic section spacing." }),
  register({ id: "TOK-size", name: "Size tokens", category: "token", description: "Content, text, and touch-target sizes." }),
  register({ id: "TOK-border", name: "Border tokens", category: "token", description: "Reusable border widths and radius." }),
  register({ id: "TOK-elevation", name: "Elevation tokens", category: "token", description: "Reusable raised-surface shadow." }),
  register({ id: "TOK-motion", name: "Motion tokens", category: "token", description: "Short interaction durations with reduced-motion handling." }),
  register({ id: "TOK-breakpoints", name: "Breakpoint tokens", category: "token", description: "Shared content-driven navigation and wide layout transitions.", productionExamples: [martechPatternLibrary] }),

  register({ id: "ENT-story", name: "Story", category: "entity", description: "Provider-independent editorial story data.", requiredFields: ["id", "title", "url"] }),
  register({ id: "ENT-event", name: "Event", category: "entity", description: "Provider-independent event data.", requiredFields: ["id", "title", "url", "start"] }),
  register({ id: "ENT-person", name: "Person", category: "entity", description: "Structured person, affiliation, biography, and contact data.", requiredFields: ["id", "name"] }),
  register({ id: "ENT-course", name: "Course", category: "entity", description: "Structured course data independent from schedule presentation.", requiredFields: ["id", "courseId", "title"] }),
  register({ id: "ENT-navigation-item", name: "NavigationItem", category: "entity", description: "Recursive configured navigation data with optional logo presentation metadata.", requiredFields: ["label", "url"] }),
  register({ id: "ENT-action", name: "Action", category: "entity", description: "A labeled destination and presentation intent.", requiredFields: ["label", "url"] }),
  register({ id: "ENT-asset", name: "Asset", category: "entity", description: "Stable asset ID, source, alternative text, credit, and focal metadata.", requiredFields: ["id", "file", "alt"] }),

  register({ id: "CMP-heading", name: "Heading", category: "component", description: "Semantic heading-level primitive.", requiredFields: ["content"], variants: ["h1", "h2", "h3", "h4", "h5", "h6"], accessibility: a11yText }),
  register({ id: "CMP-text", name: "Text", category: "component", description: "Semantic short-text primitive.", requiredFields: ["content"], accessibility: a11yText }),
  register({ id: "CMP-link", name: "Link", category: "component", description: "Navigation control with external-destination disclosure.", requiredFields: ["href", "content"], accessibility: a11yControl }),
  register({ id: "CMP-button", name: "Button", category: "component", description: "Action or prominent destination control.", requiredFields: ["content"], variants: ["primary", "secondary", "text"], accessibility: a11yControl, cmsNames: ["Button"], productionExamples: [`${martechPatternLibrary}buttons/`] }),
  register({ id: "CMP-image", name: "Image", category: "component", description: "Asset-backed responsive image presentation.", requiredFields: ["asset"], accessibility: a11yMedia }),
  register({ id: "CMP-divider", name: "Divider", category: "component", description: "Semantic or labeled content separator.", variants: ["plain", "with-text"], cmsNames: ["Separator", "Separator with Text"] }),
  register({ id: "CMP-disclosure", name: "Disclosure", category: "component", description: "Native expandable content control.", requiredFields: ["summary", "content"], states: ["closed", "open"], accessibility: a11yControl, cmsNames: ["FAQ Toggle", "Accordion", "Expandable Section"], productionExamples: [`${martechPatternLibrary}faq-toggle/`] }),
  register({ id: "CMP-form-control", name: "FormControl", category: "component", description: "Labeled text, email, or textarea control with hint association.", requiredFields: ["id", "label", "type"], variants: ["text", "email", "textarea"], accessibility: a11yControl, productionExamples: [`${martechPatternLibrary}campaign-monitor-forms/`] }),
  register({ id: "CMP-search-input", name: "SearchInput", category: "component", description: "Labeled native search input.", requiredFields: ["id", "label"], accessibility: a11yControl, cmsNames: ["Search"] }),
  register({ id: "CMP-menu-toggle", name: "MenuToggle", category: "component", description: "Control that exposes mobile navigation state.", requiredFields: ["controls", "label"], states: ["collapsed", "expanded"], accessibility: a11yControl }),
  register({ id: "CMP-close-control", name: "CloseControl", category: "component", description: "Named close control for dialogs.", requiredFields: ["label"], accessibility: a11yControl }),
  register({ id: "CMP-back-control", name: "BackControl", category: "component", description: "Named hierarchical navigation back control.", requiredFields: ["label"], accessibility: a11yControl }),
  register({ id: "CMP-back-to-top", name: "BackToTop", category: "component", description: "In-page return link to the document start.", requiredFields: ["label"], accessibility: a11yControl, cmsNames: ["Back to Top"] }),
  register({ id: "CMP-video-frame", name: "VideoFrame", category: "component", description: "Responsive third-party video player frame with an intrinsic aspect ratio.", requiredFields: ["videoId", "title"], variants: ["autoplay", "on-demand", "presentation"], accessibility: ["Name the embedded player; autoplay stays muted and yields to reduced-motion preferences."], cmsNames: ["Video Embed", "YouTube Embed", "Vimeo Embed"] }),
  register({ id: "CMP-card", name: "Card", category: "component", description: "Composable media, metadata, title, description, and action card.", requiredFields: ["title"], variants: ["editorial", "promotional", "navigation", "feature", "compact", "media-led", "text-led"], cmsNames: ["Classic Tile", "Rowhouse Tile", "Page Tile", "Info Box"], productionExamples: [`${martechPatternLibrary}tiles/`] }),
  register({ id: "CMP-story-card", name: "StoryCard", category: "component", description: "Semantic Story entity presentation with a normalized topic hook for site-scoped content-category styling.", requiredFields: ["story"], variants: ["editorial", "compact", "feature"], cmsNames: ["Story Tile"] }),
  register({ id: "CMP-event-card", name: "EventCard", category: "component", description: "Semantic Event entity presentation with machine-readable time.", requiredFields: ["event"], variants: ["list", "grid", "featured"], cmsNames: ["Events HQ event"] }),
  register({ id: "CMP-person-card", name: "PersonCard", category: "component", description: "Semantic Person entity presentation.", requiredFields: ["person"], variants: ["card", "directory"], accessibility: a11yMedia, cmsNames: ["Bio Card"] }),
  register({ id: "CMP-stat", name: "Stat", category: "component", description: "Structured value, label, and supporting detail.", requiredFields: ["value", "label"], cmsNames: ["Counter", "Stat"] }),
  register({ id: "CMP-message", name: "Message", category: "component", description: "Named status or alert feedback region.", variants: ["info", "success", "warning", "error"], accessibility: ["Use status for non-urgent feedback and alert only for urgent errors."], cmsNames: ["Message Box"] }),

  register({ id: "PAT-hero", name: "Hero", category: "pattern", description: "Page-opening composition that owns the page H1.", requiredFields: ["id", "heading"], variants: ["short", "tall", "media"], accessibility: ["Must be the only H1 owner when titleMode is hero."], cmsNames: ["Hero Header"], productionExamples: [`${martechPatternLibrary}hero-header/`] }),
  register({ id: "PAT-page-intro", name: "PageIntro", category: "pattern", description: "Introductory supporting content beneath a template-owned title.", requiredFields: ["id"], optionalFields: ["text", "eyebrow", "heading", "actions"], accessibility: a11yText }),
  register({ id: "PAT-card-grid", name: "CardGrid", category: "pattern", description: "Responsive collection of Card components.", requiredFields: ["id", "items"], variants: ["editorial", "promotional", "navigation"], cmsNames: ["Classic Tiles", "Rowhouse Tiles"], productionExamples: [`${martechPatternLibrary}tiles/`] }),
  register({ id: "PAT-feature-row", name: "FeatureRow", category: "pattern", description: "Promotional media and content composition; the media slot takes an image or a video.", requiredFields: ["id", "heading", "text"], optionalFields: ["image", "video", "action"], variants: ["media-start", "media-end"], relationships: { contains: ["CMP-image", "CMP-video-frame"], mayContain: [], dependsOn: [], usedBy: [], relatedTo: [], replaces: [] } }),
  register({ id: "PAT-video-embed", name: "VideoEmbed", category: "pattern", description: "Responsive third-party video embed with an intrinsic aspect ratio.", requiredFields: ["id", "videoId", "title"], variants: ["autoplay", "on-demand"], accessibility: ["Name the embedded player and let visitors pause; autoplay stays muted and yields to reduced-motion preferences."], cmsNames: ["Video Embed", "YouTube Embed"] }),
  register({ id: "PAT-callout", name: "Callout", category: "pattern", description: "Prominent supporting message and optional action.", requiredFields: ["id", "heading", "text"], variants: ["brand-primary", "brand-accent", "subtle"], cmsNames: ["Callout Block", "Info Box"] }),
  register({ id: "PAT-stats-group", name: "StatsGroup", category: "pattern", description: "Responsive group of Stat components.", requiredFields: ["id", "items"], cmsNames: ["Counters"] }),
  register({ id: "PAT-faq", name: "FAQ", category: "pattern", description: "Question-and-answer group composed from native Disclosure components.", requiredFields: ["id", "items"], accessibility: ["Each question is a keyboard-operable native summary."], cmsNames: ["FAQ Toggle"], productionExamples: [`${martechPatternLibrary}faq-toggle/`] }),
  register({ id: "PAT-tabs", name: "Tabs", category: "pattern", description: "Locally stateful tablist and panel composition.", requiredFields: ["id", "items"], variants: ["horizontal", "vertical"], states: ["selected", "unselected"], accessibility: ["Maintain tab, tablist, and tabpanel relationships plus arrow/Home/End keyboard behavior."], cmsNames: ["Horizontal Tabs", "Vertical Tabs", "New Tabs"], productionExamples: [`${martechPatternLibrary}new-tabs/`] }),
  register({ id: "PAT-story-collection", name: "StoryCollection", category: "pattern", description: "ContentFeed-backed Story collection.", requiredFields: ["id", "entityIds"], variants: ["grid", "list", "featured"], cmsNames: ["Top Stories", "Embed Posts", "Story feeds"] }),
  register({ id: "PAT-event-list", name: "EventList", category: "pattern", description: "EventsProvider-backed Event collection.", requiredFields: ["id", "entityIds"], variants: ["list", "grid", "featured"], cmsNames: ["Events HQ Embed", "Event lists"] }),
  register({ id: "PAT-person-list", name: "PersonList", category: "pattern", description: "FacultyData-backed Person collection.", requiredFields: ["id", "entityIds"], variants: ["cards", "directory"], cmsNames: ["Faculty Index", "Staff Listing"] }),
  register({ id: "PAT-form", name: "Form", category: "pattern", description: "Validated form presentation configured for a provider boundary.", requiredFields: ["id", "heading", "fields"], states: ["idle", "invalid", "success"], accessibility: ["Associate labels and hints, use native validation, and announce result state."], cmsNames: ["Gravity Form", "Campaign Monitor Form", "Pardot Form"], productionExamples: [`${martechPatternLibrary}campaign-monitor-forms/`] }),
  register({ id: "PAT-search-form", name: "SearchForm", category: "pattern", description: "GET form that stores meaningful search state in the URL.", requiredFields: ["action", "label", "submitLabel"], accessibility: a11yControl, cmsNames: ["Search"] }),
  register({ id: "PAT-breadcrumbs", name: "Breadcrumbs", category: "pattern", description: "Ordered hierarchical route context.", requiredFields: ["label", "items"], accessibility: ["Name the navigation landmark and identify the current page."] }),
  register({ id: "PAT-section-navigation", name: "SectionNavigation", category: "pattern", description: "Configured sibling or in-page navigation.", requiredFields: ["label", "items"], accessibility: ["Name the navigation landmark and identify the active item."] }),

  register({ id: "GBL-program-navigation", name: "ProgramNavigation", category: "global", description: "Global program-level navigation from site configuration, with optional configured logo presentation that retains the item label as its accessible name.", requiredFields: ["items", "label"], accessibility: a11yControl }),
  register({ id: "GBL-site-identity", name: "SiteIdentity", category: "global", description: "Configured site identity and home destination.", requiredFields: ["name"] }),
  register({ id: "GBL-site-header", name: "SiteHeader", category: "global", description: "Configured identity, local navigation, search trigger, and mobile menu trigger.", requiredFields: ["site"] }),
  register({ id: "GBL-primary-navigation", name: "PrimaryNavigation", category: "global", description: "Desktop local navigation with hierarchical disclosure.", requiredFields: ["items", "label"], accessibility: a11yControl }),
  register({ id: "GBL-mobile-navigation", name: "MobileNavigation", category: "global", description: "Dialog-based drill-down local navigation.", requiredFields: ["items", "label"], states: ["closed", "root", "child"], accessibility: ["Use a modal dialog, manage focus on entry, drill-down, back, Escape, and close, then return focus."] }),
  register({ id: "GBL-global-search", name: "GlobalSearch", category: "global", description: "Dialog-based global search entry point.", requiredFields: ["label", "submitLabel"], accessibility: ["Use a named modal dialog and return focus to its trigger."] }),
  register({ id: "GBL-global-header", name: "GlobalHeader", category: "global", description: "Shared program, identity, primary, mobile, and search shell.", requiredFields: ["site"], optionalFields: ["site.config.institutionalBrand"], productionExamples: [martechPatternLibrary] }),
  register({ id: "GBL-global-footer", name: "GlobalFooter", category: "global", description: "Configured additional, institutional, and legal link groups.", requiredFields: ["site"], optionalFields: ["site.config.institutionalBrand"], accessibility: ["Use a named footer landmark and semantic grouped headings."], productionExamples: [martechPatternLibrary] }),
  register({ id: "GBL-back-to-top", name: "BackToTop (global placement)", category: "global", description: "Global-shell placement of the shared BackToTop component.", relationships: { contains: ["CMP-back-to-top"], mayContain: [], dependsOn: ["CMP-back-to-top"], usedBy: [], relatedTo: [], replaces: [] } }),

  ...(["Homepage", "Standard", "Landing", "Article", "Topic", "Directory", "Search", "Sidebar"] as const).map((name, index) => register({
    id: `TPL-${String(index + 1).padStart(2, "0")}-${name.toLowerCase()}`,
    name,
    category: "template",
    description: `${name} functional page structure resolved from validated configuration.`,
    requiredFields: ["page"],
    accessibility: ["Render exactly one canonical H1 owner and one main landmark."],
    cmsNames: name === "Landing" ? ["Landing Page", "Full Width Page", "Full Window Landing Page"] : []
  })),

  register({ id: "UTL-container", name: "Container", category: "utility", description: "Content or reading-width wrapper.", variants: ["content", "text"] }),
  register({ id: "UTL-layout", name: "Layout", category: "utility", description: "Meaning-neutral grid, cluster, and sidebar layout classes.", variants: ["grid", "cluster", "sidebar"], cmsNames: ["VC Row", "VC Columns"] }),
  register({ id: "UTL-visibility", name: "Visibility", category: "utility", description: "Shared breakpoint visibility helpers.", variants: ["wide", "hidden-wide"] }),
  register({ id: "UTL-aspect-ratio", name: "AspectRatio", category: "utility", description: "Meaning-neutral media aspect-ratio helper." }),
  register({ id: "UTL-surface", name: "Surface", category: "utility", description: "Token-selected background and foreground pairing.", variants: ["page", "subtle", "brand-primary", "brand-accent", "inverse"] }),
  register({ id: "UTL-anchor-target", name: "AnchorTarget", category: "utility", description: "Scroll-offset-aware in-page target." }),
  register({ id: "UTL-screen-reader-text", name: "ScreenReaderText", category: "utility", description: "Visually hidden accessible text." }),
  register({ id: "UTL-focus-management", name: "FocusManagement", category: "utility", description: "Local focus entry and return helper.", accessibility: a11yControl }),
  register({ id: "UTL-responsive-media", name: "ResponsiveMedia", category: "utility", description: "Responsive asset figure with optional caption, credit, and focal point.", accessibility: a11yMedia }),

  ...(["EventsProvider", "FacultyData", "ContentFeed", "FormProvider", "VideoProvider", "Authentication", "SearchProvider", "Analytics"] as const).map((name, index) => register({
    id: `INT-${String(index + 1).padStart(2, "0")}-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, "")}`,
    name,
    category: "integration",
    description: `Typed ${name} boundary with fixture or prototype behavior for static demonstrations.`,
    requiredFields: ["interface contract"]
  }))
];
