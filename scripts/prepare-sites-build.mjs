import { access, writeFile } from "node:fs/promises";
import path from "node:path";

const serverDirectory = path.resolve("dist/server");
const adapterEntry = path.join(serverDirectory, "entry.mjs");
const sitesEntry = path.join(serverDirectory, "index.js");

await access(adapterEntry);
await writeFile(
  sitesEntry,
  'export { default } from "./entry.mjs";\n',
  "utf8"
);

console.log("Prepared the Astro Cloudflare worker entry for Sites.");
