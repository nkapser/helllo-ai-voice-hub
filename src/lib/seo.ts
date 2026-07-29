/**
 * SEO Utility for Dynamic Meta Tag Management
 * Handles meta tags, Open Graph, Twitter Cards, and structured data
 */

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>[];
}

// RevEngg now lives at the root domain — this is the fallback baseline
// used whenever a page doesn't fully override SEO data. Helllo Voice and
// Spark always pass their own complete SEOData (see helllo-seo.ts /
// spark-seo.ts) so they never fall through to these values.
export const REVENGG_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/Screenshot%202026-07-28%20at%2021.30.12.png?tr=f-webp,q-auto";

const defaultSEO: SEOData = {
  title: "RevEngg — AI Revenue Engineering Platform for B2C Brands | Helllo.ai",
  description: "Engineer every customer interaction into measurable revenue. RevEngg's AI agents discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
  keywords: "revenue engineering, AI revenue platform, B2C AI agents, autonomous customer engagement, WhatsApp AI agent, voice AI agent, lead qualification AI, CRM automation",
  canonical: "https://www.helllo.ai/",
  ogTitle: "RevEngg — AI Revenue Engineering Platform for B2C Brands",
  ogDescription: "AI agents that discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
  ogImage: REVENGG_OG_IMAGE,
  ogImageAlt: "RevEngg — AI Revenue Engineering Platform dashboard",
  ogType: "website",
  ogUrl: "https://www.helllo.ai/",
  twitterCard: "summary_large_image",
  twitterTitle: "RevEngg — AI Revenue Engineering Platform for B2C Brands",
  twitterDescription: "AI agents that discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
  twitterImage: REVENGG_OG_IMAGE,
  noindex: false,
};

/**
 * Updates or creates a meta tag
 */
function updateMetaTag(name: string, content: string, attribute: string = "name"): void {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

/**
 * Updates or creates a link tag
 */
function updateLinkTag(rel: string, href: string, attributes?: Record<string, string>): void {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
  }
}

/**
 * Updates structured data (JSON-LD).
 *
 * Only scripts tagged `data-route-seo="true"` are touched — the static
 * schema baked into index.html (Organization, WebSite) is left alone.
 * Route-specific scripts are cleared before re-adding so client-side
 * navigation between pages never accumulates stale/duplicate JSON-LD
 * (which would otherwise confuse crawlers and AI answer engines reading
 * the live DOM).
 */
function updateStructuredData(data: Record<string, any>[]): void {
  document
    .querySelectorAll('script[data-route-seo="true"]')
    .forEach((el) => el.remove());

  data.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.routeSeo = "true";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

/**
 * Sets SEO meta tags for a page
 */
export function setSEO(data: SEOData): void {
  const seo = { ...defaultSEO, ...data };

  // Update title
  if (seo.title) {
    document.title = seo.title;
    updateMetaTag("title", seo.title);
  }

  // Update meta tags
  if (seo.description) {
    updateMetaTag("description", seo.description);
  }
  if (seo.keywords) {
    updateMetaTag("keywords", seo.keywords);
  }

  // Robots meta
  if (seo.noindex) {
    updateMetaTag("robots", "noindex, nofollow");
  } else {
    updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  }

  // Canonical URL
  if (seo.canonical) {
    updateLinkTag("canonical", seo.canonical);
  }

  // Open Graph tags
  if (seo.ogTitle) {
    updateMetaTag("og:title", seo.ogTitle, "property");
  }
  if (seo.ogDescription) {
    updateMetaTag("og:description", seo.ogDescription, "property");
  }
  if (seo.ogImage) {
    updateMetaTag("og:image", seo.ogImage, "property");
  }
  if (seo.ogImageAlt) {
    updateMetaTag("og:image:alt", seo.ogImageAlt, "property");
  }
  if (seo.ogType) {
    updateMetaTag("og:type", seo.ogType, "property");
  }
  if (seo.ogUrl) {
    updateMetaTag("og:url", seo.ogUrl, "property");
    updateMetaTag("twitter:url", seo.ogUrl, "property");
  }
  // Update og:updated_time
  updateMetaTag("og:updated_time", new Date().toISOString(), "property");

  // Twitter Card tags
  if (seo.twitterCard) {
    updateMetaTag("twitter:card", seo.twitterCard, "property");
  }
  if (seo.twitterTitle) {
    updateMetaTag("twitter:title", seo.twitterTitle, "property");
  }
  if (seo.twitterDescription) {
    updateMetaTag("twitter:description", seo.twitterDescription, "property");
  }
  if (seo.twitterImage) {
    updateMetaTag("twitter:image", seo.twitterImage, "property");
  }

  // Structured data
  if (seo.structuredData && seo.structuredData.length > 0) {
    updateStructuredData(seo.structuredData);
  }
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates WebPage structured data
 */
export function generateWebPageSchema(data: {
  name: string;
  description: string;
  url: string;
  image?: string;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    isPartOf: {
      "@type": "WebSite",
      name: "Helllo.ai",
      url: "https://www.helllo.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Helllo.ai",
      url: "https://www.helllo.ai",
    },
  };
}

/**
 * Generates SoftwareApplication structured data
 */
export function generateSoftwareApplicationSchema(data: {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  brandName?: string;
  brandUrl?: string;
  featureList?: string[];
  offers?: Array<{ price: string; priceCurrency: string; description: string }>;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    ...(data.alternateName ? { alternateName: data.alternateName } : {}),
    applicationCategory: data.applicationCategory ?? "BusinessApplication",
    operatingSystem: data.operatingSystem ?? "Web",
    description: data.description,
    url: data.url,
    image: data.image,
    brand: {
      "@type": "Brand",
      name: data.brandName ?? "Helllo.ai",
      url: data.brandUrl ?? "https://www.helllo.ai",
    },
    ...(data.featureList?.length
      ? { featureList: data.featureList }
      : {}),
    ...(data.offers?.length
      ? {
          offers: data.offers.map((offer) => ({
            "@type": "Offer",
            price: offer.price,
            priceCurrency: offer.priceCurrency,
            description: offer.description,
          })),
        }
      : {}),
  };
}

/**
 * Generates HowTo structured data
 */
export function generateHowToSchema(data: {
  name: string;
  description: string;
  url?: string;
  steps: Array<{ name: string; text: string }>;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    ...(data.url ? { url: data.url } : {}),
    step: data.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generates OfferCatalog structured data
 */
export function generateOfferCatalogSchema(data: {
  name: string;
  url: string;
  offers: Array<{
    name: string;
    price: string;
    priceCurrency: string;
    description?: string;
    billingDuration?: string;
  }>;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: data.name,
    url: data.url,
    itemListElement: data.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      ...(offer.description ? { description: offer.description } : {}),
      ...(offer.billingDuration
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: offer.price,
              priceCurrency: offer.priceCurrency,
              unitText: offer.billingDuration,
            },
          }
        : {}),
      url: data.url,
      seller: {
        "@type": "Organization",
        name: "Helllo.ai",
        url: "https://www.helllo.ai",
      },
    })),
  };
}

/**
 * Generates FAQPage structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* ────────────────────────────────────────────────────────────────
 * Bot-facing static-HTML patching (GEO)
 *
 * The site is a client-rendered SPA — real browsers and JS-executing
 * crawlers (Googlebot, Bingbot) get correct per-route SEO via setSEO()
 * above. But social-preview scrapers and most AI/LLM crawlers
 * (GPTBot, ClaudeBot, PerplexityBot, facebookexternalhit, Twitterbot,
 * LinkedInBot, WhatsApp, …) fetch index.html and never run JS, so they
 * only ever see whatever is baked into the static file. The Cloudflare
 * Worker (src/index.ts) detects these bots and rewrites index.html
 * per-route using the helpers below before returning it.
 * ──────────────────────────────────────────────────────────────── */

export const BOT_USER_AGENT =
  /bot|crawler|spider|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|discord|embedly|preview|gptbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|google-extended|bingpreview/i;

export function isBotUserAgent(userAgent: string | null): boolean {
  return BOT_USER_AGENT.test(userAgent ?? "");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function replaceMetaContent(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string,
): string {
  const pattern = new RegExp(
    `(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*("\\s*/?>)`,
    "i",
  );
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeHtml(content)}$2`);
  }
  return html;
}

export function replaceLinkHref(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`, "i");
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeHtml(href)}$2`);
  }
  return html;
}

/**
 * Patches every crawler-relevant tag in index.html for one route, then
 * appends the route's JSON-LD (tagged `data-route-seo` so it's easy to
 * spot in a view-source diff). Shared by every product's *-seo.ts module.
 */
export function patchIndexHtmlSEO(
  html: string,
  seo: Required<
    Pick<
      SEOData,
      | "title"
      | "description"
      | "keywords"
      | "canonical"
      | "ogType"
      | "ogUrl"
      | "ogTitle"
      | "ogDescription"
      | "ogImage"
      | "ogImageAlt"
      | "twitterCard"
      | "twitterTitle"
      | "twitterDescription"
      | "twitterImage"
    >
  >,
  structuredData: Record<string, any>[] = [],
): string {
  let patched = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`,
  );

  patched = replaceMetaContent(patched, "name", "title", seo.title);
  patched = replaceMetaContent(patched, "name", "description", seo.description);
  patched = replaceMetaContent(patched, "name", "keywords", seo.keywords);
  patched = replaceLinkHref(patched, "canonical", seo.canonical);

  patched = replaceMetaContent(patched, "property", "og:type", seo.ogType);
  patched = replaceMetaContent(patched, "property", "og:url", seo.ogUrl);
  patched = replaceMetaContent(patched, "property", "og:title", seo.ogTitle);
  patched = replaceMetaContent(patched, "property", "og:description", seo.ogDescription);
  patched = replaceMetaContent(patched, "property", "og:image", seo.ogImage);
  patched = replaceMetaContent(patched, "property", "og:image:alt", seo.ogImageAlt);

  patched = replaceMetaContent(patched, "property", "twitter:card", seo.twitterCard);
  patched = replaceMetaContent(patched, "property", "twitter:url", seo.ogUrl);
  patched = replaceMetaContent(patched, "property", "twitter:title", seo.twitterTitle);
  patched = replaceMetaContent(patched, "property", "twitter:description", seo.twitterDescription);
  patched = replaceMetaContent(patched, "property", "twitter:image", seo.twitterImage);
  patched = replaceMetaContent(patched, "property", "twitter:image:alt", seo.ogImageAlt);

  if (structuredData.length > 0) {
    const scripts = structuredData
      .map(
        (schema) =>
          `<script type="application/ld+json" data-route-seo="true">${JSON.stringify(schema)}</script>`,
      )
      .join("\n    ");
    patched = patched.replace("</head>", `    ${scripts}\n  </head>`);
  }

  return patched;
}

/**
 * Generates Article structured data
 */
export function generateArticleSchema(data: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.image || defaultSEO.ogImage,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: data.author
      ? {
          "@type": "Person",
          name: data.author,
        }
      : {
          "@type": "Organization",
          name: "Helllo.ai",
        },
    publisher: {
      "@type": "Organization",
      name: "Helllo.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.helllo.ai/assets/logo-wide.svg",
      },
    },
  };
}

