import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateOfferCatalogSchema,
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

export const SPARK_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/spark-image-banner.png?tr=f-webp,q-auto";

export const SPARK_CANONICAL = "https://www.helllo.ai/spark";

export const SPARK_META_DESCRIPTION =
  `AI assistant for website owners that acts as an intelligent customer support agent. Answers visitors, navigates pages and books meetings — available in ${TARGET_REGIONS_PHRASE}. Embed with one script tag. Free forever.`;

export const SPARK_HOW_IT_WORKS_STEPS = [
  {
    name: "Paste your URL",
    text: "Spark reads your pages and builds an assistant that knows your business — services, prices, hours, policies. No setup wizard, no code, no copy-pasting content.",
  },
  {
    name: "Teach it the rest",
    text: "Add PDFs, price lists and Q&A pairs for anything your site doesn't say. When things change, retrain in one click — your assistant never falls behind.",
  },
  {
    name: "Embed with one line",
    text: "Drop a single script tag in your footer — or paste it into WordPress, Wix, Webflow or Shopify settings. The widget is live the moment you save.",
  },
  {
    name: "Watch visits become leads",
    text: "Spark answers questions by voice or chat, walks visitors to the right page, books meetings and captures contact details — around the clock, in any language.",
  },
] as const;

export const SPARK_PLATFORM_FEATURES = [
  "Trained on your site — answers grounded in approved pages and uploaded files",
  "Voice + chat in one embeddable widget",
  "Guided navigation — opens pages mid-conversation",
  "Meeting booking via Google Calendar, Calendly, and Cal.com",
  "Lightweight lead CRM with searchable conversations and contacts",
  "Answer control and guardrails with one-click revisions",
  "Live monitoring and analytics",
  "50+ language auto-detection",
  "Brand customization for colors, avatar, tone, and welcome screen",
] as const;

export const SPARK_PRICING_OFFERS = [
  {
    name: "Free forever",
    price: "0",
    priceCurrency: "USD",
    description: "500 credits, 10 pages crawled, 30 min voice, 100 chat conversations. No credit card.",
  },
  {
    name: "Starter",
    price: "49",
    priceCurrency: "USD",
    description: "Best for a single marketing site. Up to 1,000 pages, calendar integrations, guided navigation.",
    billingDuration: "MONTH",
  },
  {
    name: "Growth",
    price: "99",
    priceCurrency: "USD",
    description: "Best for growing businesses. Up to 2,000 pages, CRM integrations, file uploads.",
    billingDuration: "MONTH",
  },
  {
    name: "Scale",
    price: "299",
    priceCurrency: "USD",
    description: "Best for high-traffic sites and agencies. Up to 6,000 pages, custom integrations, priority support.",
    billingDuration: "MONTH",
  },
  {
    name: "Enterprise",
    price: "0",
    priceCurrency: "USD",
    description: "Custom pricing for high-volume sites, agencies, and regulated teams.",
  },
] as const;

export const SPARK_FAQS = [
  {
    q: "Do I need a developer?",
    a: "No. Copy one script tag into your site footer. If you use Webflow or Framer, paste it in site settings under \"Custom Code.\" Any non-technical site owner can do this in 2 minutes.",
  },
  {
    q: "Will it hallucinate about my business?",
    a: "Answers are grounded in pages you approve and files you upload — not the open internet. If Spark doesn't know something, it says so instead of making it up.",
  },
  {
    q: "Is my data used to train other AI models?",
    a: "No. Your content trains only your assistant — it's never used to train foundation models or shared with other customers. You see and approve every page before it's crawled, and can delete your data anytime. Full details in our Privacy Policy.",
  },
  {
    q: "Can I try it before signing up?",
    a: "Yes. Paste your URL and immediately chat with a homepage-trained assistant — no account, no credit card. Sign up only when you want to save and embed.",
  },
  {
    q: "Why do I need to verify my domain?",
    a: "So only you can train an assistant on your site. It's a standard ownership check (DNS TXT record or HTML meta tag) — the same way Google Search Console works.",
  },
  {
    q: "Chat or voice — which does it support?",
    a: "Both, in the same widget. Visitors can type or tap the mic to talk. No app download, no phone call system — it's all browser-native.",
  },
  {
    q: "What makes Spark different from Intercom or Drift?",
    a: "Three things: guided navigation (Spark takes visitors to the right page mid-conversation), in-browser voice, and training from your actual site content. Spark is built for SMB websites.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The widget is fully responsive and touch-optimised — tap to chat, tap to talk, swipe to close.",
  },
  {
    q: "Is Spark available in India, the US, Southeast Asia, Australia and Europe?",
    a: `Yes. Spark is an AI customer support agent for website owners in ${TARGET_REGIONS_PHRASE}. It auto-detects 50+ languages, so visitors can get help in English, Hindi, SEA languages, and major European languages.`,
  },
  {
    q: "Can Spark replace a customer support agent on my website?",
    a: "Spark acts as an intelligent customer support agent on your site: it answers questions from your approved content, navigates visitors to the right page, captures leads, and books meetings — 24/7, by chat or voice. Human teams stay in control with answer guardrails and conversation logs.",
  },
  {
    q: "What happens when my free credits run out?",
    a: "The assistant stops responding until you upgrade or add credits. We'll email you before they run out so you're never caught off guard.",
  },
] as const;

export const SPARK_SEO: SEOData = {
  title: "Spark — AI Customer Support Agent for Your Website | Helllo.ai",
  description: SPARK_META_DESCRIPTION,
  keywords:
    "AI customer support agent, AI assistant for website owners, website AI support, Spark Helllo.ai, intelligent customer support chatbot, website voice assistant, no-code website AI, AI support agent India, website chatbot USA, AI assistant Singapore, website AI Australia, customer support AI Europe, SMB website AI",
  canonical: SPARK_CANONICAL,
  ogType: "website",
  ogTitle: "Spark — AI Customer Support Agent for Website Owners",
  ogDescription: SPARK_META_DESCRIPTION,
  ogUrl: SPARK_CANONICAL,
  ogImage: SPARK_OG_IMAGE,
  ogImageAlt: "Spark by Helllo.ai — AI customer support agent for website owners",
  twitterCard: "summary_large_image",
  twitterTitle: "Spark — AI Customer Support Agent for Your Website",
  twitterDescription:
    `Intelligent AI assistant for website owners in ${TARGET_REGIONS_PHRASE}. Answers, navigates, books meetings — one script tag, free forever.`,
  twitterImage: SPARK_OG_IMAGE,
};

export function getSparkStructuredData(): Record<string, unknown>[] {
  const areaServed = getAreaServedSchema();
  const eligibleRegion = getEligibleRegionsSchema();

  return [
    generateWebPageSchema({
      name: "Spark — AI Customer Support Agent for Website Owners",
      description: SPARK_SEO.description!,
      url: SPARK_CANONICAL,
      image: SPARK_OG_IMAGE,
      about: "AI customer support agent for websites",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.helllo.ai/" },
      { name: "Spark", url: SPARK_CANONICAL },
    ]),
    generateSoftwareApplicationSchema({
      name: "Spark",
      alternateName: [
        "Spark by Helllo.ai",
        "Spark AI Website Assistant",
        "Spark AI Customer Support Agent",
      ],
      description:
        `AI assistant for website owners that acts as an intelligent customer support agent. Trains on your site, answers by chat or voice, navigates pages, and books meetings. Available in ${TARGET_REGIONS_PHRASE}.`,
      url: SPARK_CANONICAL,
      image: SPARK_OG_IMAGE,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer Support / Website AI Assistant",
      operatingSystem: "Web",
      brandName: "Helllo.ai",
      brandUrl: "https://www.helllo.ai",
      featureList: [...SPARK_PLATFORM_FEATURES],
      countriesSupported: [...COUNTRIES_SUPPORTED],
      inLanguage: [...AVAILABLE_LANGUAGES],
      audienceType: "Website owners, SMB marketing teams, and agencies",
      areaServed,
      eligibleRegion,
      offers: [
        {
          price: "0",
          priceCurrency: "USD",
          description: SPARK_PRICING_OFFERS[0].description,
        },
      ],
    }),
    generateServiceSchema({
      name: "Spark AI Customer Support Agent",
      serviceType: "Website AI Assistant / Intelligent Customer Support",
      description:
        `Embeddable AI customer support agent for website owners in ${TARGET_REGIONS_PHRASE}. Answers questions, navigates visitors, and books meetings from your approved content.`,
      url: SPARK_CANONICAL,
      areaServed,
      audienceType: "Website owners and SMB customer support teams",
      offers: [
        {
          name: "Intelligent Customer Support",
          description: "24/7 chat and voice answers grounded in your website and files",
        },
        {
          name: "Guided Navigation",
          description: "Takes visitors to the right page mid-conversation",
        },
        {
          name: "Meeting Booking",
          description: "Books meetings on Google Calendar, Calendly, or Cal.com",
        },
      ],
    }),
    generateHowToSchema({
      name: "How to add Spark to your website",
      description:
        "Paste your URL, train an AI customer support agent on your site, and embed it with one script tag in about 30 seconds.",
      url: `${SPARK_CANONICAL}#how-it-works`,
      steps: SPARK_HOW_IT_WORKS_STEPS.map(({ name, text }) => ({ name, text })),
    }),
    generateOfferCatalogSchema({
      name: "Spark pricing",
      url: `${SPARK_CANONICAL}#pricing`,
      offers: SPARK_PRICING_OFFERS.map((offer) => ({
        name: offer.name,
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        description: offer.description,
        ...("billingDuration" in offer && offer.billingDuration
          ? { billingDuration: offer.billingDuration }
          : {}),
      })),
    }),
    generateFAQSchema(
      SPARK_FAQS.map(({ q, a }) => ({ question: q, answer: a })),
    ),
  ];
}

/** Patch index.html meta tags + JSON-LD for Spark crawlers that don't execute client-side JS. */
export function patchSparkIndexHtml(html: string): string {
  return patchIndexHtmlSEO(
    html,
    {
      title: SPARK_SEO.title!,
      description: SPARK_SEO.description!,
      keywords: SPARK_SEO.keywords!,
      canonical: SPARK_SEO.canonical!,
      ogType: SPARK_SEO.ogType!,
      ogUrl: SPARK_SEO.ogUrl!,
      ogTitle: SPARK_SEO.ogTitle!,
      ogDescription: SPARK_SEO.ogDescription!,
      ogImage: SPARK_SEO.ogImage!,
      ogImageAlt: SPARK_SEO.ogImageAlt!,
      twitterCard: SPARK_SEO.twitterCard!,
      twitterTitle: SPARK_SEO.twitterTitle!,
      twitterDescription: SPARK_SEO.twitterDescription!,
      twitterImage: SPARK_SEO.twitterImage!,
    },
    getSparkStructuredData(),
  );
}
