export interface TextLink {
  text: string;
  url: string;
  external?: boolean;
}

export type TextSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; value: string; url: string; external?: boolean };

/**
 * Links configured phrases inside a plain-text copy block, so editorial copy
 * stays escaped text rather than raw HTML. Each phrase links its first
 * occurrence; a phrase that is not present is a configuration error, and
 * throwing keeps a silent typo from quietly dropping the link.
 */
export function linkifyText(text: string, links: TextLink[] = []): TextSegment[] {
  let segments: TextSegment[] = [{ kind: "text", value: text }];

  for (const link of links) {
    let linked = false;
    const next: TextSegment[] = [];

    for (const segment of segments) {
      if (linked || segment.kind !== "text") {
        next.push(segment);
        continue;
      }
      const index = segment.value.indexOf(link.text);
      if (index === -1) {
        next.push(segment);
        continue;
      }
      const before = segment.value.slice(0, index);
      const after = segment.value.slice(index + link.text.length);
      if (before) next.push({ kind: "text", value: before });
      next.push({ kind: "link", value: link.text, url: link.url, external: link.external });
      if (after) next.push({ kind: "text", value: after });
      linked = true;
    }

    if (!linked) throw new Error(`Link phrase not found in copy: "${link.text}"`);
    segments = next;
  }

  return segments;
}
