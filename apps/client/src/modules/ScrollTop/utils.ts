export type PreviousOverscrollBehaviorYRef = { current: string | null };

// Global, module-scoped ownership tracking for <html> overscrollBehaviorY.
// This prevents multiple mounted ScrollTop instances from corrupting the
// "previous value" capture/restore lifecycle.
let overscrollOwnersCount = 0;
let overscrollPreviousValue: string | null = null;

export function applyHtmlOverscrollBehaviorYNone(
  previousOverscrollBehaviorYRef: PreviousOverscrollBehaviorYRef,
) {
  const html = document.documentElement;

  // Back-compat: keep the ref updated for callers, but the source of truth is global.
  if (overscrollOwnersCount === 0) {
    overscrollPreviousValue = html.style.overscrollBehaviorY || "";
  }

  overscrollOwnersCount += 1;
  previousOverscrollBehaviorYRef.current = "none";

  html.style.overscrollBehaviorY = "none";
}

export function restoreHtmlOverscrollBehaviorY(
  previousOverscrollBehaviorYRef: PreviousOverscrollBehaviorYRef,
) {
  if (overscrollOwnersCount === 0) return;

  overscrollOwnersCount -= 1;

  if (overscrollOwnersCount > 0) return;

  const previous = overscrollPreviousValue;
  overscrollPreviousValue = null;
  previousOverscrollBehaviorYRef.current = null;

  // previous should never be null here, but keep this safe against unexpected states.
  if (previous === null) return;

  const html = document.documentElement;
  if (previous === "") html.style.removeProperty("overscroll-behavior-y");
  else html.style.overscrollBehaviorY = previous;
}
