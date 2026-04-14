export type PreviousOverscrollBehaviorYRef = { current: string | null };

export function applyHtmlOverscrollBehaviorYNone(
  previousOverscrollBehaviorYRef: PreviousOverscrollBehaviorYRef,
) {
  const html = document.documentElement;

  if (previousOverscrollBehaviorYRef.current === null) {
    previousOverscrollBehaviorYRef.current = html.style.overscrollBehaviorY || "";
  }

  html.style.overscrollBehaviorY = "none";
}

export function restoreHtmlOverscrollBehaviorY(
  previousOverscrollBehaviorYRef: PreviousOverscrollBehaviorYRef,
) {
  const previous = previousOverscrollBehaviorYRef.current;
  if (previous === null) return;

  const html = document.documentElement;
  if (previous === "") html.style.removeProperty("overscroll-behavior-y");
  else html.style.overscrollBehaviorY = previous;
  previousOverscrollBehaviorYRef.current = null;
}
