const THEME_COOKIE_NAME = "flashcards_theme";

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

export type ResolvedTheme = "light" | "dark";

/**
 * Parse resolved theme from Cookie header (server-side).
 * Returns the stored "light" | "dark" or null if missing/invalid.
 */
export function parseThemeFromCookie(cookieHeader: string | undefined): ResolvedTheme | null {
  if (!cookieHeader || typeof cookieHeader !== "string") return null;
  const match = cookieHeader.match(new RegExp(`${THEME_COOKIE_NAME}=(light|dark)`));
  const value = match?.[1];
  return value === "light" || value === "dark" ? value : null;
}

/**
 * Set theme cookie (client-side). Call when resolved theme changes.
 */
export function setThemeCookie(theme: ResolvedTheme): void {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}
