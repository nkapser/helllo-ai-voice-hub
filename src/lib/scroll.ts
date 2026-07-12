const HEADER_OFFSET = 80;
const SPARK_HEADER_OFFSET = 16;

export function scrollToHash(
  hash: string = window.location.hash,
  behavior: ScrollBehavior = "auto",
  headerOffset: number = HEADER_OFFSET,
): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const element = document.getElementById(id);
  if (!element) return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : behavior;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  const html = document.documentElement;

  // Scroll snap can override hash navigation and leave the page at the wrong section.
  html.style.scrollSnapType = "none";
  window.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior });

  return true;
}

/** Spark landing section hash fragments. */
export const SPARK_SECTIONS = {
  features: "features",
  pricing: "pricing",
  faq: "faq",
} as const;

/** Scroll to a Spark landing section by hash fragment. */
export function scrollToSparkHash(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = hash.replace(/^#/, "");
  const targetId = id === "superpowers" ? SPARK_SECTIONS.features : id;
  return scrollToHash(`#${targetId}`, behavior, SPARK_HEADER_OFFSET);
}
