import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const hostFlagIndex = process.argv.indexOf("--host");
const host = hostFlagIndex >= 0 ? process.argv[hostFlagIndex + 1] : "127.0.0.1";
const portFlagIndex = process.argv.indexOf("--port");
const port = Number(portFlagIndex >= 0 ? process.argv[portFlagIndex + 1] : 4321);
const outputRoot = path.resolve(process.cwd(), "dist");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp" };

const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", `http://${request.headers.host ?? host}`).pathname);
  let file = path.resolve(outputRoot, `.${pathname}`);
  if (!file.startsWith(`${outputRoot}${path.sep}`) && file !== outputRoot) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!existsSync(file) && !path.extname(file)) file = path.join(file, "index.html");
  if (!existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => console.log(`Serving dist at http://${host}:${port}`));
