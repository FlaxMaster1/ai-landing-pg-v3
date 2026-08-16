import type { APIRoute, GetStaticPaths } from "astro";
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadSite } from "../../rendering/site-loader";

const mimeTypes: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4"
};

export const getStaticPaths = (() => {
  const site = loadSite();
  return site.assets.map((asset) => ({
    params: { path: `${site.id}/${asset.file}` },
    props: { file: path.join(site.root, "assets", asset.file), extension: path.extname(asset.file).toLowerCase() }
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const file = String(props.file);
  const extension = String(props.extension);
  return new Response(readFileSync(file), {
    headers: {
      "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
};
