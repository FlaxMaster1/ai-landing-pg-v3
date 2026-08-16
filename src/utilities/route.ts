export function normalizeRoute(pathname: string): string {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (withLeadingSlash === "/") return "/";
  return `${withLeadingSlash.replace(/\/+$/, "")}/`;
}

export function routeToSlug(route: string): string | undefined {
  const normalized = normalizeRoute(route);
  return normalized === "/" ? undefined : normalized.slice(1, -1);
}
