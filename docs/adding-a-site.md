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

Declare `"theme": "old-theme"` or `"theme": "new-theme"` in `site.config.json`. The property defaults to `old-theme`; `new-theme` is only a Step 7 scaffold until its Figma-derived visual implementation is approved. Site content and page composition must not branch by theme. See `themes.md` for the development override and theme-specific markup rules.

Run the site directly:

```sh
SITE=my-site npm run dev
SITE=my-site npm run build
```

Keep shared components out of the site root. If a real use case cannot be expressed, document the evidence and decide whether it is a reusable framework addition or a legitimate site extension before writing code.
