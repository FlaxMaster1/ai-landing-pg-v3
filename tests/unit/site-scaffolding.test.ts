import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const script = path.join(repoRoot, "scripts/create-site.mjs");
const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function tempRoot() {
  const root = await mkdtemp(path.join(os.tmpdir(), "wharton-site-scaffold-"));
  tempRoots.push(root);
  return root;
}

function run(root: string, args: string[]) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8"
  });
}

describe("site scaffold generator", () => {
  it.each(["program", "department", "initiative", "research", "campaign"])(
    "creates a %s scaffold with the required site files",
    async (type) => {
      const root = await tempRoot();
      const id = `${type}-demo`;
      const result = run(root, [`--type=${type}`, `--id=${id}`, `--name=${type} Demo`]);

      expect(result.status).toBe(0);
      const siteRoot = path.join(root, "sites", id);
      await expect(stat(path.join(siteRoot, "site.config.json"))).resolves.toBeTruthy();
      await expect(stat(path.join(siteRoot, "navigation.json"))).resolves.toBeTruthy();
      await expect(stat(path.join(siteRoot, "footer.json"))).resolves.toBeTruthy();
      await expect(stat(path.join(siteRoot, "assets.json"))).resolves.toBeTruthy();
      await expect(stat(path.join(siteRoot, "pages", "home.json"))).resolves.toBeTruthy();
      await expect(stat(path.join(siteRoot, "PLAN.md"))).resolves.toBeTruthy();

      const config = JSON.parse(await readFile(path.join(siteRoot, "site.config.json"), "utf8"));
      expect(config.id).toBe(id);
      expect(config.theme).toBe("old-theme");
      expect(config.featureFlags.themePreview).toBe(false);
    }
  );

  it("refuses invalid site IDs", async () => {
    const root = await tempRoot();
    const result = run(root, ["--type=program", "--id=Bad_ID"]);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("lowercase letters, numbers, and hyphens");
  });

  it("refuses to overwrite an existing site", async () => {
    const root = await tempRoot();
    const args = ["--type=program", "--id=demo-site"];
    expect(run(root, args).status).toBe(0);
    const second = run(root, args);
    expect(second.status).not.toBe(0);
    expect(second.stderr).toContain("never overwrites");
  });
});
