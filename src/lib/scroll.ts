const HEADER_OFFSET = 80;

export function scrollToHash(
  hash: string = window.location.hash,
  behavior: ScrollBehavior = "auto"
): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : behavior;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  const html = document.documentElement;

  // Scroll snap can override hash navigation and leave the page at the wrong section.
  html.style.scrollSnapType = "none";
  window.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior });

  return true;
}
