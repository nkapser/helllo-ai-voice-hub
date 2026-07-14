import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateWebPageSchema,
  type SEOData,
} from "@/lib/seo";

export const SPARK_OG_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/spark-image-banner.png?tr=f-webp,q-auto";

export const SPARK_CANONICAL = "https://www.helllo.ai/spark";

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
    q: "What happens when the free trial credits run out?",
    a: "The assistant stops responding until you upgrade or add credits. We'll email you before they run out so you're never caught off guard.",
  },
] as const;

export const SPARK_SEO: SEOData = {
  title: "Spark — Give Your Website an AI Assistant | Helllo.ai",
  description:
    "Give your website an AI assistant trained on your data. Answers questions, navigates pages, and books meetings on your calendar — live in 30 seconds, free to start.",
  keywords:
    "Spark, AI website assistant, website chatbot, voice AI for websites, Helllo.ai, no-code chatbot, guided navigation chatbot, calendar booking assistant, SMB website AI, embed website assistant",
  canonical: SPARK_CANONICAL,
  ogType: "website",
  ogTitle: "Spark — Give Your Website an AI Assistant",
  ogDescription:
    "Give your website an AI assistant trained on your data. Answers questions, navigates pages, and books meetings on your calendar — live in 30 seconds, free to start.",
  ogUrl: SPARK_CANONICAL,
  ogImage: SPARK_OG_IMAGE,
  ogImageAlt: "Spark by Helllo.ai — AI assistant for your website",
  twitterCard: "summary_large_image",
  twitterTitle: "Spark — Give Your Website an AI Assistant",
  twitterDescription:
    "AI assistant trained on your website in 30 seconds. Answers questions, navigates pages, and books meetings — free to start.",
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
      featureList: [
        "Trained on approved website pages and uploaded files",
        "Voice and chat in one embeddable widget",
        "Guided navigation to pages mid-conversation",
        "Google Calendar, Calendly, and Cal.com booking",
        "50+ language auto-detection",
        "No-code setup with one script tag",
        "Free forever plan with 500 credits",
      ],
      offers: [
        {
          price: "0",
          priceCurrency: "USD",
          description:
            "Free forever — 500 credits, 10 pages, 30 min voice, 100 chat conversations",
        },
        {
          price: "49",
          priceCurrency: "USD",
          description: "Starter plan from $49/month",
        },
      ],
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
