import {
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  patchIndexHtmlSEO,
  type SEOData,
} from "@/lib/seo";

export const HELLLO_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/helllo-ai-voice-agentic-agentic-flows?tr=f-webp,q-auto";

export const HELLLO_CANONICAL = "https://www.helllo.ai/helllo";

export const HELLLO_META_DESCRIPTION =
  "Enterprise-grade AI voice agents for businesses of all sizes. Deploy and scale production-ready voice automation powered by agentic orchestration. Easy setup, CRM integration, and multi-language support. Start your free trial today.";

export const HELLLO_FEATURE_LIST = [
  "Agentic flows and orchestration",
  "Production-ready AI voice agents",
  "Customer experience automation",
  "CRM integration",
  "Multi-language support",
  "Enterprise-grade security",
  "Real-time analytics",
] as const;

export const HELLLO_SEO: SEOData = {
  title: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows | Helllo.ai",
  description: HELLLO_META_DESCRIPTION,
  keywords:
    "AI voice agents, small business automation, customer service AI, voice bots, business phone automation, CRM integration, multi-language support, SMB AI solutions, agentic flows, voice AI orchestration",
  canonical: HELLLO_CANONICAL,
  ogType: "website",
  ogTitle: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows",
  ogDescription:
    "Deploy and scale production-ready AI voice agents powered by agentic orchestration. Easy setup, CRM integration, and multi-language support.",
  ogUrl: HELLLO_CANONICAL,
  ogImage: HELLLO_OG_IMAGE,
  ogImageAlt: "Helllo.ai AI Voice Agents — agentic customer experience platform",
  twitterCard: "summary_large_image",
  twitterTitle: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows",
  twitterDescription:
    "Production-ready AI voice agents powered by agentic orchestration. CRM integration and multi-language support.",
  twitterImage: HELLLO_OG_IMAGE,
};

export function getHellloStructuredData(): Record<string, unknown>[] {
  return [
    generateWebPageSchema({
      name: "Helllo.ai Voice Agents",
      description: HELLLO_SEO.description!,
      url: HELLLO_CANONICAL,
      image: HELLLO_OG_IMAGE,
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.helllo.ai/" },
      { name: "Voice Agents", url: HELLLO_CANONICAL },
    ]),
    generateSoftwareApplicationSchema({
      name: "Helllo.ai Voice Agents",
      description:
        "Production-ready AI voice agents powered by agentic orchestration. Supercharge customer experience with intelligent voice automation, CRM integration, and multi-language support.",
      url: HELLLO_CANONICAL,
      image: HELLLO_OG_IMAGE,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      brandName: "Helllo.ai",
      brandUrl: "https://www.helllo.ai",
      featureList: [...HELLLO_FEATURE_LIST],
      offers: [
        {
          price: "0",
          priceCurrency: "USD",
          description: "Free trial with 30 minutes monthly",
        },
      ],
    }),
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
