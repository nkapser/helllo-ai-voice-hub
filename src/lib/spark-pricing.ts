export type BillingInterval = "monthly" | "annual";
export type PricingRegion = "IN" | "INTL";

export interface SparkPlanFeature {
  text: string;
  highlighted?: boolean;
}

export interface SparkPlan {
  name: string;
  monthlyPriceUsd: number;
  monthlyPriceInr: number;
  annualDiscountPercent: number;
  tagline: string;
  cta: string;
  featured?: boolean;
  features: SparkPlanFeature[];
}

export const SPARK_FREE_STATS = [
  { value: "500", label: "credits included" },
  { value: "10", label: "pages to crawl" },
  { value: "30 min", label: "voice conversations" },
  { value: "100", label: "chat conversations" },
] as const;

export const SPARK_PLANS: SparkPlan[] = [
  {
    name: "Starter",
    monthlyPriceUsd: 49,
    monthlyPriceInr: 4900,
    annualDiscountPercent: 15,
    tagline: "Best for a single marketing site",
    cta: "Start Starter",
    features: [
      { text: "Voice: 16 credits/min (~300 mins/mo)", highlighted: true },
      { text: "Chat: 6 credits/conversation (~800/mo)" },
      { text: "3 concurrent voice conversations" },
      { text: "Up to 1,000 pages" },
      { text: "Google Calendar & Calendly" },
      { text: "Chat + voice widget" },
      { text: "Guided navigation" },
    ],
  },
  {
    name: "Growth",
    monthlyPriceUsd: 99,
    monthlyPriceInr: 9900,
    annualDiscountPercent: 20,
    tagline: "Best for growing businesses",
    cta: "Get Growth",
    featured: true,
    features: [
      { text: "Voice: 12 credits/min (~800 mins/mo)", highlighted: true },
      { text: "Chat: 5 credits/conversation (~2,000/mo)" },
      { text: "5 concurrent voice conversations" },
      { text: "Up to 2,000 pages" },
      { text: "Google Calendar, Calendly & Cal.com" },
      { text: "CRM integrations (Shopify)", highlighted: true },
      { text: "File uploads (FAQ, PDF)" },
    ],
  },
  {
    name: "Scale",
    monthlyPriceUsd: 299,
    monthlyPriceInr: 29900,
    annualDiscountPercent: 33,
    tagline: "Best for high-traffic sites & agencies",
    cta: "Get Scale",
    features: [
      { text: "Voice: 10 credits/min (~3,000 mins/mo)", highlighted: true },
      { text: "Chat: 3 credits/conversation (~10,000/mo)" },
      { text: "10 concurrent voice conversations" },
      { text: "Up to 6,000 pages" },
      { text: "Google Calendar, Calendly & Cal.com" },
      { text: "Custom integrations", highlighted: true },
      { text: "Priority support" },
    ],
  },
];

export function detectPricingRegion(): PricingRegion {
  if (typeof window === "undefined") return "INTL";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone === "Asia/Kolkata" || timezone === "Asia/Calcutta") {
    return "IN";
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  const isIndiaLocale = languages.some((lang) => {
    const normalized = lang.toLowerCase();
    return (
      normalized.endsWith("-in") ||
      normalized === "hi" ||
      normalized.startsWith("hi-")
    );
  });

  return isIndiaLocale ? "IN" : "INTL";
}

export function getPlanMonthlyPrice(plan: SparkPlan, region: PricingRegion): number {
  return region === "IN" ? plan.monthlyPriceInr : plan.monthlyPriceUsd;
}

export function formatUsd(amount: number): string {
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}

export function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function formatPlanPrice(amount: number, region: PricingRegion): string {
  return region === "IN" ? formatInr(amount) : formatUsd(amount);
}

export function getAnnualTotal(monthlyPrice: number, discountPercent: number): number {
  return Math.round(monthlyPrice * 12 * (1 - discountPercent / 100));
}

export function getPlanPricing(
  plan: SparkPlan,
  billing: BillingInterval,
  region: PricingRegion
): { price: string; period: string; savingsBadge?: string } {
  const monthlyPrice = getPlanMonthlyPrice(plan, region);

  if (billing === "monthly") {
    return {
      price: formatPlanPrice(monthlyPrice, region),
      period: "/month",
    };
  }

  const annualTotal = getAnnualTotal(monthlyPrice, plan.annualDiscountPercent);
  const monthlyEquivalent = annualTotal / 12;

  return {
    price: formatPlanPrice(monthlyEquivalent, region),
    period: "/month",
    savingsBadge: `Save ${plan.annualDiscountPercent}%`,
  };
}

export function getPricingRegionLabel(region: PricingRegion): string {
  return region === "IN"
    ? "Prices in INR via Razorpay"
    : "Prices in USD via Stripe";
}
