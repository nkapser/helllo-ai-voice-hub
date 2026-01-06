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
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>[];
}

const defaultSEO: SEOData = {
  title: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows | Helllo.ai",
  description: "Deploy and scale production-ready AI voice agents powered by agentic orchestration. Supercharge your customer experience with intelligent voice automation. Easy setup, CRM integration, and multi-language support. Start your free trial today.",
  keywords: "AI voice agents, agentic flows, customer experience automation, voice AI orchestration, production-ready AI agents, intelligent voice automation, CRM integration, multi-language support, agentic AI, voice agent platform",
  canonical: "https://www.helllo.ai/",
  ogTitle: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows | Helllo.ai",
  ogDescription: "Deploy and scale production-ready AI voice agents powered by agentic orchestration. Supercharge your customer experience with intelligent voice automation. Start your free trial today.",
  ogImage: "https://ik.imagekit.io/ise7sbyg9/helllo-ai-voice-agentic-agentic-flows?tr=f-webp,q-auto",
  ogType: "website",
  ogUrl: "https://www.helllo.ai/",
  twitterCard: "summary_large_image",
  twitterTitle: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows | Helllo.ai",
  twitterDescription: "Deploy and scale production-ready AI voice agents powered by agentic orchestration. Supercharge your customer experience with intelligent voice automation.",
  twitterImage: "https://ik.imagekit.io/ise7sbyg9/helllo-ai-voice-agentic-agentic-flows?tr=f-webp,q-auto",
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
 * Updates structured data (JSON-LD)
 */
function updateStructuredData(data: Record<string, any>[]): void {
  // Remove existing structured data scripts (optional - you may want to keep some)
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  // Keep first 3 scripts (Organization, WebSite, SoftwareApplication from index.html)
  // Remove only dynamically added ones if needed
  
  // Add new structured data
  data.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
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
  if (seo.ogType) {
    updateMetaTag("og:type", seo.ogType, "property");
  }
  if (seo.ogUrl) {
    updateMetaTag("og:url", seo.ogUrl, "property");
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

