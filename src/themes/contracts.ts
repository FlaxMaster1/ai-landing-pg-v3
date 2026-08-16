export const themeIds = ["old-theme", "new-theme"] as const;

export type ThemeId = (typeof themeIds)[number];

export const DEFAULT_THEME: ThemeId = "old-theme";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && themeIds.includes(value as ThemeId);
}

export function resolveTheme(value: unknown): ThemeId {
  return isThemeId(value) ? value : DEFAULT_THEME;
}
