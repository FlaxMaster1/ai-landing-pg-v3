import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const repositoryRoot = process.cwd();
const siteId = process.env.SITE ?? "reference";
const siteRoot = path.join(repositoryRoot, "sites", siteId);
const pages = readdirSync(path.join(siteRoot, "pages"))
  .filter((file) => file.endsWith(".json"))
  .flatMap((file) => JSON.parse(readFileSync(path.join(siteRoot, "pages", file), "utf8")));

const failures = [];
for (const page of pages) {
  const output = page.route === "/"
    ? path.join(repositoryRoot, "dist", "index.html")
    : path.join(repositoryRoot, "dist", page.route.slice(1), "index.html");
  if (!existsSync(output)) {
    failures.push(`${page.route}: missing static output`);
    continue;
  }
  const html = readFileSync(output, "utf8");
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1) failures.push(`${page.route}: expected one H1, found ${h1Count}`);
  for (const marker of ["<main", "<header", "<footer", `data-template=\"${page.template}\"`]) {
    if (!html.includes(marker)) failures.push(`${page.route}: missing ${marker}`);
  }
}

const assets = JSON.parse(readFileSync(path.join(siteRoot, "assets.json"), "utf8"));
for (const asset of assets) {
  // Art-directed variants must be emitted alongside the default file.
  for (const [label, file] of [["", asset.file], [" (mobile variant)", asset.mobileFile]]) {
    if (!file) continue;
    const output = path.join(repositoryRoot, "dist", "site-assets", siteId, file);
    if (!existsSync(output)) failures.push(`Asset '${asset.id}'${label} was not emitted`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Static build audit passed for ${pages.length} routes and ${assets.length} assets.`);
}
