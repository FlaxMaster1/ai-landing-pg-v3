# Adding a site

Create `sites/{site-id}` with:

```text
site.config.json
navigation.json
footer.json
assets.json
pages/*.json
content/*.md
entities/{stories,events,people,courses}/*.json
assets/{images,video,documents}/
fixtures/
```

Use an existing page section type from the controlled registry. The build fails on unknown types, invalid variants, duplicate routes/IDs, unsafe or missing asset files, dangling entity/asset references, missing Article Markdown, or invalid H1 ownership.

Run the site directly:

```sh
SITE=my-site npm run dev
SITE=my-site npm run build
```

Keep shared components out of the site root. If a real use case cannot be expressed, document the evidence and decide whether it is a reusable framework addition or a legitimate site extension before writing code.
