---
title: Structured content without embedded presentation
description: Representative Markdown narrative for the Article template.
author: Framework Team
date: 2026-08-01
---

Long-form narrative content belongs in Markdown when JSON would make editing awkward. This file contains no component imports and no layout instructions.

## A controlled boundary

The page registry selects the Article template and references this content by ID. The renderer validates that the file exists, asks Astro to render the Markdown, and places the resulting semantic HTML inside the shared template.

### What remains structured

- The page route and template selection
- Search metadata and title ownership
- Promotional sections before or after the narrative
- Stories, events, people, courses, navigation, and asset metadata

This boundary preserves ordinary Markdown authoring without making MDX the default composition system.
