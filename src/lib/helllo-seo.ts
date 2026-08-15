import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  patchIndexHtmlSEO,
  type SEOData,
} from "@/lib/seo";
import {
  AVAILABLE_LANGUAGES,
  COUNTRIES_SUPPORTED,
  getAreaServedSchema,
  getEligibleRegionsSchema,
  TARGET_REGIONS_PHRASE,
} from "@/lib/geo-seo";

export const HELLLO_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/helllo-ai-voice-agentic-agentic-flows?tr=f-webp,q-auto";

export const HELLLO_CANONICAL = "https://www.helllo.ai/";

export const HELLLO_META_DESCRIPTION =
  `Conversational AI agentic platform for customer experience. Deploy voice and conversation agents with agentic flows across ${TARGET_REGIONS_PHRASE}. CRM-ready, multilingual. Start free.`;

export const HELLLO_FEATURE_LIST = [
  "Conversational AI agentic platform",
  "Agentic flows and orchestration",
  "Production-ready AI voice agents",
  "Customer experience automation",
  "CRM integration",
  "Multi-language support for India, US, SEA, Australia and Europe",
  "Enterprise-grade security",
  "Real-time analytics",
] as const;

export const HELLLO_FAQS = [
  {
    q: "What is Helllo.ai's conversational AI agentic platform?",
    a: "Helllo.ai is a conversational AI agentic platform that deploys voice and conversation agents with agentic orchestration. Agents handle multi-step customer journeys — not just scripted replies — across phone and digital channels, with CRM integration and multilingual support.",
  },
  {
    q: "Where is Helllo.ai available?",
    a: `Helllo.ai serves businesses in ${TARGET_REGIONS_PHRASE}. The platform is English-first and supports 50+ languages for customer conversations, including Hindi and other Indian languages, SEA languages, and major European languages.`,
  },
  {
    q: "Does Helllo.ai work for companies in India, the US, Southeast Asia, Australia and Europe?",
    a: "Yes. Helllo.ai is built for teams in India, the United States, Southeast Asia (including Singapore, Malaysia, Indonesia, the Philippines, Thailand and Vietnam), Australia and Europe. One platform, regional languages, and CRM integrations used in those markets.",
  },
  {
    q: "How is this different from a basic chatbot or IVR?",
    a: "Agentic flows let the AI reason, take the next best action, and complete tasks — qualify, route, update CRM, and continue the conversation — instead of following a rigid decision tree.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Start with a free trial that includes 30 minutes of voice usage each month. No long setup required.",
  },
] as const;

export const HELLLO_SEO: SEOData = {
  title: "Conversational AI Agentic Platform | Voice Agents — Helllo.ai",
  description: HELLLO_META_DESCRIPTION,
  keywords:
    "conversational AI agentic platform, conversational AI agents, AI voice agents, agentic AI, agentic flows, customer experience AI, voice AI India, conversational AI USA, AI agents Singapore, conversational AI Australia, conversational AI Europe, multilingual voice agents, CRM voice automation",
  canonical: HELLLO_CANONICAL,
  ogType: "website",
  ogTitle: "Conversational AI Agentic Platform | Helllo.ai",
  ogDescription:
    `Voice and conversation agents with agentic orchestration for businesses in ${TARGET_REGIONS_PHRASE}.`,
  ogUrl: HELLLO_CANONICAL,
  ogImage: HELLLO_OG_IMAGE,
  ogImageAlt: "Helllo.ai conversational AI agentic platform — voice agents and agentic flows",
  twitterCard: "summary_large_image",
  twitterTitle: "Conversational AI Agentic Platform | Helllo.ai",
  twitterDescription:
    `Deploy production-ready conversational AI agents across ${TARGET_REGIONS_PHRASE}.`,
  twitterImage: HELLLO_OG_IMAGE,
};

export function getHellloStructuredData(): Record<string, unknown>[] {
  const areaServed = getAreaServedSchema();
  const eligibleRegion = getEligibleRegionsSchema();

  return [
    generateWebPageSchema({
      name: "Helllo.ai Conversational AI Agentic Platform",
      description: HELLLO_SEO.description!,
      url: HELLLO_CANONICAL,
      image: HELLLO_OG_IMAGE,
      about: "Conversational AI agentic platform",
    }),
    generateBreadcrumbSchema([{ name: "Home", url: HELLLO_CANONICAL }]),
    generateSoftwareApplicationSchema({
      name: "Helllo.ai Conversational AI Agentic Platform",
      alternateName: ["Helllo Voice", "Helllo.ai Voice Agents"],
      description:
        `Conversational AI agentic platform with production-ready voice agents and agentic orchestration. Serves businesses in ${TARGET_REGIONS_PHRASE}.`,
      url: HELLLO_CANONICAL,
      image: HELLLO_OG_IMAGE,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Conversational AI / Voice Agents",
      operatingSystem: "Web",
      brandName: "Helllo.ai",
      brandUrl: "https://www.helllo.ai",
      featureList: [...HELLLO_FEATURE_LIST],
      countriesSupported: [...COUNTRIES_SUPPORTED],
      inLanguage: [...AVAILABLE_LANGUAGES],
      audienceType: "Businesses deploying conversational AI agents",
      areaServed,
      eligibleRegion,
      offers: [
        {
          price: "0",
          priceCurrency: "USD",
          description: "Free trial with 30 minutes monthly — available in India, US, SEA, Australia and Europe",
        },
      ],
    }),
    generateServiceSchema({
      name: "Conversational AI Agentic Platform",
      serviceType: "Conversational AI / Agentic Voice Agents",
      description:
        `AI voice and conversation agents with agentic flows for customer experience automation in ${TARGET_REGIONS_PHRASE}.`,
      url: HELLLO_CANONICAL,
      areaServed,
      audienceType: "Businesses of all sizes in India, US, Southeast Asia, Australia and Europe",
      offers: [
        {
          name: "AI Voice Agents",
          description: "Production-ready conversational AI voice agents for phone and customer experience",
        },
        {
          name: "Agentic Flows",
          description: "Agentic orchestration for multi-step customer conversations",
        },
        {
          name: "CRM Integration",
          description: "Connect conversation agents to CRM systems used across target markets",
        },
      ],
    }),
    generateFAQSchema(HELLLO_FAQS.map(({ q, a }) => ({ question: q, answer: a }))),
  ];
}

/** Patch index.html meta tags + JSON-LD for Helllo Voice crawlers that don't execute client-side JS. */
export function patchHellloIndexHtml(html: string): string {
  return patchIndexHtmlSEO(
    html,
    {
      title: HELLLO_SEO.title!,
      description: HELLLO_SEO.description!,
      keywords: HELLLO_SEO.keywords!,
      canonical: HELLLO_SEO.canonical!,
      ogType: HELLLO_SEO.ogType!,
      ogUrl: HELLLO_SEO.ogUrl!,
      ogTitle: HELLLO_SEO.ogTitle!,
      ogDescription: HELLLO_SEO.ogDescription!,
      ogImage: HELLLO_SEO.ogImage!,
      ogImageAlt: HELLLO_SEO.ogImageAlt!,
      twitterCard: HELLLO_SEO.twitterCard!,
      twitterTitle: HELLLO_SEO.twitterTitle!,
      twitterDescription: HELLLO_SEO.twitterDescription!,
      twitterImage: HELLLO_SEO.twitterImage!,
    },
    getHellloStructuredData(),
  );
}
