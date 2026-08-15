import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  patchIndexHtmlSEO,
  REVENGG_OG_IMAGE,
  type SEOData,
} from "@/lib/seo";
import {
  AVAILABLE_LANGUAGES,
  COUNTRIES_SUPPORTED,
  getAreaServedSchema,
  TARGET_REGIONS_PHRASE,
} from "@/lib/geo-seo";

export { REVENGG_OG_IMAGE };

export const REVENGG_CANONICAL = "https://www.helllo.ai/orevv-ai";

export const REVENGG_META_DESCRIPTION =
  `Conversational AI agents that discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web. Available in ${TARGET_REGIONS_PHRASE}.`;

export const REVENGG_PLATFORM_FEATURES = [
  "Lead discovery across every acquisition channel",
  "AI creative intelligence for ad variants",
  "Automatic lead enrichment with firmographic and behavioral data",
  "AI qualification with buying-intent scoring",
  "Contextual decision engine for next-best-action planning",
  "Voice, WhatsApp, Email and Website conversation agents",
  "Automatic CRM intelligence sync (HubSpot, Salesforce, Zoho, Freshsales, Pipedrive)",
] as const;

export const REVENGG_SEO: SEOData = {
  title: "RevEngg — AI Revenue Engineering Platform for B2C Brands | Helllo.ai",
  description: REVENGG_META_DESCRIPTION,
  keywords:
    "revenue engineering, conversational AI agents, AI revenue platform, B2C AI agents, autonomous customer engagement, WhatsApp AI agent India, voice AI agent USA, conversational AI Southeast Asia, AI agents Australia, AI agents Europe, CRM automation, agentic commerce",
  canonical: REVENGG_CANONICAL,
  ogType: "website",
  ogTitle: "RevEngg — AI Revenue Engineering Platform for B2C Brands",
  ogDescription:
    "AI agents that discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
  ogUrl: REVENGG_CANONICAL,
  ogImage: REVENGG_OG_IMAGE,
  ogImageAlt: "RevEngg — AI Revenue Engineering Platform revenue dashboard",
  twitterCard: "summary_large_image",
  twitterTitle: "RevEngg — AI Revenue Engineering Platform for B2C Brands",
  twitterDescription:
    "Engineer every customer interaction into measurable revenue — Voice, WhatsApp, Email and Web, one platform.",
  twitterImage: REVENGG_OG_IMAGE,
};

export function getRevEnggStructuredData(): Record<string, unknown>[] {
  return [
    generateWebPageSchema({
      name: "RevEngg — Autonomous Revenue Engineering Platform",
      description: REVENGG_SEO.description!,
      url: REVENGG_CANONICAL,
      image: REVENGG_OG_IMAGE,
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.helllo.ai/" },
      { name: "RevEngg", url: REVENGG_CANONICAL },
    ]),
    generateSoftwareApplicationSchema({
      name: "RevEngg",
      alternateName: "RevEngg by Helllo.ai",
      description:
        `Autonomous revenue engineering with conversational AI agents across Voice, WhatsApp, Email and Web. Serves B2C brands in ${TARGET_REGIONS_PHRASE}.`,
      url: REVENGG_CANONICAL,
      image: REVENGG_OG_IMAGE,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Conversational AI / Revenue Engineering",
      operatingSystem: "Web",
      brandName: "Helllo.ai",
      brandUrl: "https://www.helllo.ai",
      featureList: [...REVENGG_PLATFORM_FEATURES],
      countriesSupported: [...COUNTRIES_SUPPORTED],
      inLanguage: [...AVAILABLE_LANGUAGES],
      audienceType: "B2C e-commerce brands",
      areaServed: getAreaServedSchema(),
    }),
    generateServiceSchema({
      name: "RevEngg Conversational AI Agents",
      serviceType: "Conversational AI / Autonomous Revenue Engineering",
      description:
        `AI agents that discover, qualify and engage customers across Voice, WhatsApp, Email and Web in ${TARGET_REGIONS_PHRASE}.`,
      url: REVENGG_CANONICAL,
      areaServed: getAreaServedSchema(),
      audienceType: "B2C e-commerce brands in India, US, SEA, Australia and Europe",
    }),
  ];
}

/** Patch index.html meta tags + JSON-LD for RevEngg crawlers that don't execute client-side JS. */
export function patchRevEnggIndexHtml(html: string): string {
  return patchIndexHtmlSEO(
    html,
    {
      title: REVENGG_SEO.title!,
      description: REVENGG_SEO.description!,
      keywords: REVENGG_SEO.keywords!,
      canonical: REVENGG_SEO.canonical!,
      ogType: REVENGG_SEO.ogType!,
      ogUrl: REVENGG_SEO.ogUrl!,
      ogTitle: REVENGG_SEO.ogTitle!,
      ogDescription: REVENGG_SEO.ogDescription!,
      ogImage: REVENGG_SEO.ogImage!,
      ogImageAlt: REVENGG_SEO.ogImageAlt!,
      twitterCard: REVENGG_SEO.twitterCard!,
      twitterTitle: REVENGG_SEO.twitterTitle!,
      twitterDescription: REVENGG_SEO.twitterDescription!,
      twitterImage: REVENGG_SEO.twitterImage!,
    },
    getRevEnggStructuredData(),
  );
}
