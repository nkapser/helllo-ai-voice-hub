import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateOfferCatalogSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  type SEOData,
} from "@/lib/seo";

export const SPARK_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/spark-image-banner.png?tr=f-webp,q-auto";

export const SPARK_CANONICAL = "https://www.helllo.ai/spark";

export const SPARK_META_DESCRIPTION =
  "Paste your URL and get an AI assistant trained on your site in 30 seconds. Answers questions, navigates pages, and books meetings — embed with one script tag, free forever.";

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
    q: "What happens when my free credits run out?",
    a: "The assistant stops responding until you upgrade or add credits. We'll email you before they run out so you're never caught off guard.",
  },
] as const;

export const SPARK_SEO: SEOData = {
  title: "Spark — Give Your Website an AI Assistant | Helllo.ai",
  description: SPARK_META_DESCRIPTION,
  keywords:
    "Spark, AI website assistant, paste URL chatbot, website chatbot, voice AI for websites, Helllo.ai, no-code chatbot, one script tag embed, guided navigation chatbot, calendar booking assistant, SMB website AI",
  canonical: SPARK_CANONICAL,
  ogType: "website",
  ogTitle: "Spark — Give Your Website an AI Assistant",
  ogDescription: SPARK_META_DESCRIPTION,
  ogUrl: SPARK_CANONICAL,
  ogImage: SPARK_OG_IMAGE,
  ogImageAlt: "Spark by Helllo.ai — AI assistant for your website",
  twitterCard: "summary_large_image",
  twitterTitle: "Spark — Give Your Website an AI Assistant",
  twitterDescription:
    "Paste your URL → AI assistant in 30 seconds → answers, navigates, books meetings → one script tag, free forever.",
  twitterImage: SPARK_OG_IMAGE,
};

export function getSparkStructuredData(): Record<string, unknown>[] {
  return [
    generateWebPageSchema({
      name: "Spark — AI Website Assistant",
      description: SPARK_SEO.description!,
      url: SPARK_CANONICAL,
      image: SPARK_OG_IMAGE,
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://www.helllo.ai/" },
      { name: "Spark", url: SPARK_CANONICAL },
    ]),
    generateSoftwareApplicationSchema({
      name: "Spark",
      alternateName: "Spark by Helllo.ai",
      description:
        "AI website assistant that trains on your site content, answers visitor questions by chat or voice, navigates pages mid-conversation, and books meetings on your calendar.",
      url: SPARK_CANONICAL,
      image: SPARK_OG_IMAGE,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      brandName: "Helllo.ai",
      brandUrl: "https://www.helllo.ai",
      featureList: [...SPARK_PLATFORM_FEATURES],
      offers: [
        {
          price: "0",
          priceCurrency: "USD",
          description: SPARK_PRICING_OFFERS[0].description,
        },
      ],
    }),
    generateHowToSchema({
      name: "How to add Spark to your website",
      description:
        "Paste your URL, train an AI assistant on your site, and embed it with one script tag in about 30 seconds.",
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

const BOT_USER_AGENT =
  /bot|crawler|spider|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegram|discord|embedly|preview|gptbot|chatgpt-user|claudebot|anthropic-ai|perplexitybot|google-extended|bingpreview/i;

export function isBotUserAgent(userAgent: string | null): boolean {
  return BOT_USER_AGENT.test(userAgent ?? "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceMetaContent(
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

function replaceLinkHref(html: string, rel: string, href: string): string {
  const pattern = new RegExp(`(<link\\s+rel="${rel}"\\s+href=")[^"]*(")`, "i");
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escapeHtml(href)}$2`);
  }
  return html;
}

/** Patch index.html meta tags for Spark crawlers that do not execute client-side JS. */
export function patchSparkIndexHtml(html: string): string {
  let patched = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(SPARK_SEO.title!)}</title>`,
  );

  patched = replaceMetaContent(patched, "name", "title", SPARK_SEO.title!);
  patched = replaceMetaContent(patched, "name", "description", SPARK_SEO.description!);
  patched = replaceMetaContent(patched, "name", "keywords", SPARK_SEO.keywords!);
  patched = replaceLinkHref(patched, "canonical", SPARK_SEO.canonical!);

  patched = replaceMetaContent(patched, "property", "og:type", SPARK_SEO.ogType!);
  patched = replaceMetaContent(patched, "property", "og:url", SPARK_SEO.ogUrl!);
  patched = replaceMetaContent(patched, "property", "og:title", SPARK_SEO.ogTitle!);
  patched = replaceMetaContent(
    patched,
    "property",
    "og:description",
    SPARK_SEO.ogDescription!,
  );
  patched = replaceMetaContent(patched, "property", "og:image", SPARK_SEO.ogImage!);
  patched = replaceMetaContent(patched, "property", "og:image:alt", SPARK_SEO.ogImageAlt!);
  patched = replaceMetaContent(patched, "property", "twitter:card", SPARK_SEO.twitterCard!);
  patched = replaceMetaContent(patched, "property", "twitter:url", SPARK_SEO.ogUrl!);
  patched = replaceMetaContent(patched, "property", "twitter:title", SPARK_SEO.twitterTitle!);
  patched = replaceMetaContent(
    patched,
    "property",
    "twitter:description",
    SPARK_SEO.twitterDescription!,
  );
  patched = replaceMetaContent(patched, "property", "twitter:image", SPARK_SEO.twitterImage!);
  patched = replaceMetaContent(
    patched,
    "property",
    "twitter:image:alt",
    SPARK_SEO.ogImageAlt!,
  );

  const structuredDataScripts = getSparkStructuredData()
    .map(
      (schema) =>
        `<script type="application/ld+json" data-spark-seo="true">${JSON.stringify(schema)}</script>`,
    )
    .join("\n    ");

  return patched.replace("</head>", `    ${structuredDataScripts}\n  </head>`);
}
