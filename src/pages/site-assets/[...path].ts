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

export const prerender = true;

export const getStaticPaths = (() => {
  const site = loadSite();
  // An asset may carry an art-directed variant, which needs emitting too.
  return site.assets.flatMap((asset) =>
    [asset.file, asset.mobileFile].filter((file): file is string => Boolean(file)).map((file) => ({
      params: { path: `${site.id}/${file}` },
      props: { file: path.join(site.root, "assets", file), extension: path.extname(file).toLowerCase() }
    }))
  );
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
