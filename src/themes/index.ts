import oldThemeStylesheet from "./old-theme/index.css?url";
import newThemeStylesheet from "./new-theme/index.css?url";
import { DEFAULT_THEME, type ThemeId, resolveTheme } from "./contracts";

export interface ThemeDefinition {
  id: ThemeId;
  status: "implemented" | "scaffold";
  stylesheet: string;
}

export const themeRegistry: Record<ThemeId, ThemeDefinition> = {
  "old-theme": {
    id: "old-theme",
    status: "implemented",
    stylesheet: oldThemeStylesheet
  },
  "new-theme": {
    id: "new-theme",
    status: "scaffold",
    stylesheet: newThemeStylesheet
  }
};

export function resolveThemeDefinition(value: unknown): ThemeDefinition {
  const theme = resolveTheme(value);
  return themeRegistry[theme] ?? themeRegistry[DEFAULT_THEME];
}

export { DEFAULT_THEME, resolveTheme, type ThemeId } from "./contracts";
