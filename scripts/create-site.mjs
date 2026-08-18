import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BLUEPRINTS = {
  program: {
    label: "Program",
    pages: [
      ["home", "/", "homepage", "Overview"],
      ["academics", "/academics/", "landing", "Academics"],
      ["admissions", "/admissions/", "landing", "Admissions"],
      ["experience", "/experience/", "landing", "Student Experience"],
      ["outcomes", "/outcomes/", "landing", "Career Outcomes"],
      ["faculty", "/faculty/", "directory", "Faculty"]
    ]
  },
  department: {
    label: "Department",
    pages: [
      ["home", "/", "homepage", "Overview"],
      ["research", "/research/", "topic", "Research"],
      ["people", "/people/", "directory", "People"],
      ["programs", "/programs/", "landing", "Programs and Courses"],
      ["events", "/events/", "landing", "Events"],
      ["about", "/about/", "standard", "About"]
    ]
  },
  initiative: {
    label: "Initiative / Center / Institute",
    pages: [
      ["home", "/", "homepage", "Overview"],
      ["priorities", "/priorities/", "landing", "Strategic Priorities"],
      ["research", "/research/", "topic", "Research"],
      ["people", "/people/", "directory", "People"],
      ["events", "/events/", "landing", "Events"],
      ["engage", "/engage/", "landing", "Engage"]
    ]
  },
  research: {
    label: "Research Hub",
    pages: [
      ["home", "/", "homepage", "Overview"],
      ["topics", "/topics/", "topic", "Research Topics"],
      ["research", "/research/", "landing", "Research"],
      ["experts", "/experts/", "directory", "Experts"],
      ["events", "/events/", "landing", "Events"],
      ["search", "/search/", "search", "Search"]
    ]
  },
  campaign: {
    label: "Campaign",
    pages: [
      ["home", "/", "homepage", "Campaign"],
      ["about", "/about/", "standard", "About"],
      ["stories", "/stories/", "landing", "Stories"],
      ["faq", "/faq/", "standard", "Frequently Asked Questions"],
      ["act", "/act/", "landing", "Take Action"]
    ]
  }
};

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const [rawKey, inlineValue] = token.slice(2).split("=", 2);
    args[rawKey] = inlineValue ?? argv[++index];
  }
  return args;
}

function usage(message) {
  if (message) console.error(`\n${message}\n`);
  console.error("Usage: npm run create:site -- --type=<program|department|initiative|research|campaign> --id=<site-id> [--name=\"Site Name\"]");
  process.exit(1);
}

function titleCaseId(id) {
  return id.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function page(route, template, siteName, title, type) {
  const home = route === "/";
  const pageTitle = home ? siteName : title;
  const sections = home
    ? [
        {
          type: "hero",
          id: "overview",
          eyebrow: type,
          heading: siteName,
          text: "Replace this starter copy with approved strategy and content before design review.",
          variant: "short"
        },
        {
          type: "pageIntro",
          id: "introduction",
          text: "This page was generated from a Wharton site blueprint. Adapt the structure using the Page Recipes and Component Handbook."
        }
      ]
    : [
        {
          type: "pageIntro",
          id: "introduction",
          text: `Starter content for ${title}. Replace this with approved content and adapt the page using the closest documented recipe.`
        }
      ];

  return {
    route,
    template,
    title: pageTitle,
    titleMode: home ? "hero" : "default",
    width: home ? "full-window" : "contained",
    sidebar: "none",
    seo: { title: pageTitle },
    sections
  };
}

const args = parseArgs(process.argv.slice(2));
const type = args.type;
const id = args.id;
if (!type || !BLUEPRINTS[type]) usage("A supported --type is required.");
if (!id || !/^[a-z0-9-]+$/.test(id)) usage("--id must use lowercase letters, numbers, and hyphens only.");

const blueprint = BLUEPRINTS[type];
const siteName = args.name?.trim() || titleCaseId(id);
const root = path.resolve(process.cwd(), "sites", id);

try {
  await access(root);
  usage(`sites/${id} already exists. The scaffold command never overwrites an existing site.`);
} catch {}

const pageEntries = blueprint.pages.map(([file, route, template, title]) => ({ file, route, template, title }));
const primary = pageEntries.filter((entry) => entry.route !== "/").map((entry) => ({ label: entry.title, url: entry.route }));

const files = new Map();
files.set("site.config.json", json({
  id,
  name: siteName,
  prototypeTitle: `${siteName} prototype`,
  theme: "old-theme",
  featureFlags: { search: type === "research", mobileNavigation: true, themePreview: false },
  defaultSeo: { titleSuffix: ` | ${siteName}`, description: `Prototype content for ${siteName}.` },
  ui: {
    skipToContent: "Skip to main content",
    menu: "Menu",
    closeMenu: "Close",
    back: "Back",
    search: `Search ${siteName}`,
    searchSubmit: "Search",
    backToTop: "Back to top",
    eventEmpty: "No events are currently available.",
    formSuccess: "Thanks. This prototype recorded no personal data.",
    programNavigationLabel: "Wharton program navigation",
    primaryNavigationLabel: `${siteName} navigation`,
    footerLabel: "Institutional footer",
    footerAdditionalLinks: "Additional Links",
    themeSelector: "Preview theme",
    oldTheme: "Old theme — current CMS",
    newTheme: "New theme — deferred",
    configuredTheme: "Configured theme"
  },
  integrations: {
    events: { provider: "fixture" },
    content: { provider: "fixture" },
    faculty: { provider: "fixture" },
    forms: { provider: "prototype" },
    search: { provider: "fixture" },
    analytics: { provider: "noop" }
  }
}));
files.set("navigation.json", json({ program: [], primary }));
files.set("footer.json", json({ additionalLinks: [], institutionalGroups: [], legal: [] }));
files.set("assets.json", json([]));

for (const entry of pageEntries) {
  files.set(`pages/${entry.file}.json`, json([page(entry.route, entry.template, siteName, entry.title, blueprint.label)]));
}

for (const entity of ["stories", "events", "people", "courses"]) {
  files.set(`entities/${entity}/${entity}.json`, json([]));
}
files.set("content/.gitkeep", "");
files.set("assets/images/.gitkeep", "");
files.set("assets/video/.gitkeep", "");
files.set("assets/documents/.gitkeep", "");
files.set("fixtures/README.md", `# ${siteName} fixtures\n\nPrototype-only provider fixtures belong here. Do not place production credentials or secrets in this directory.\n`);
files.set("PLAN.md", `# ${siteName} site plan\n\n**Blueprint:** ${blueprint.label}\n**Site ID:** \`${id}\`\n**Theme:** \`old-theme\` until the functional framework is fully validated.\n\n## Before implementation\n\n- Define primary audiences and user goals.\n- Confirm sitemap and navigation.\n- Map content entities and assets.\n- Review \`docs/blueprints/${type}.md\`.\n- Review \`docs/page-recipes.md\`.\n- Use \`WHARTON_DESIGN_DECISION_FRAMEWORK.md\` and \`docs/component-handbook.md\` for component decisions.\n\n## Starter routes\n\n${pageEntries.map((entry) => `- \`${entry.route}\` — ${entry.title} (${entry.template})`).join("\n")}\n\nReplace this planning file as the project strategy becomes authoritative.\n`);

for (const [relativePath, content] of files) {
  const destination = path.join(root, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content, "utf8");
}

console.log(`Created ${blueprint.label} site scaffold at sites/${id}`);
console.log(`Next: SITE=${id} npm run dev`);
console.log(`Validate: SITE=${id} npm run build`);
