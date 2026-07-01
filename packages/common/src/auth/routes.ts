/** Public landing page; authenticated users are bounced off it. */
export const PUBLIC_LANDING_PATH = "/";

/** Default destination after a successful log in / sign up. */
export const DEFAULT_AUTHED_PATH = "/home/modules";

/** Paths that authenticated users should be redirected away from. */
export const PUBLIC_ONLY_PATHS = [PUBLIC_LANDING_PATH];

const PROTECTED_PREFIXES = [
  "/home",
  "/module",
  "/flashcards",
  "/edit",
  "/write",
  "/settings",
];

/**
 * Whether a pathname requires authentication. This prefix list is the
 * server-side source of truth for the redirect guard and must be kept in step
 * with the authenticated routes under apps/client/pages.
 */
export const isProtectedPath = (pathname: string): boolean =>
  PROTECTED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
