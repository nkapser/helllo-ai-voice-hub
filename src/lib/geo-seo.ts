/**
 * Shared geographic + generative-engine targeting for Helllo.ai.
 *
 * The product is one English site (no localized copies). We still declare
 * the markets we sell into so search and AI crawlers do not treat HQ
 * (Bengaluru) as the only service area.
 */

export const GEO_HQ = {
  locality: "Bengaluru",
  region: "Karnataka",
  postalCode: "560001",
  country: "IN",
  latitude: "12.9716",
  longitude: "77.5946",
} as const;

/** Primary English markets: India, US, SEA, Australia, Europe. */
export const TARGET_COUNTRIES = [
  { name: "India", iso: "IN", hreflang: "en-IN", ogLocale: "en_IN" },
  { name: "United States", iso: "US", hreflang: "en-US", ogLocale: "en_US" },
  { name: "Australia", iso: "AU", hreflang: "en-AU", ogLocale: "en_AU" },
  { name: "United Kingdom", iso: "GB", hreflang: "en-GB", ogLocale: "en_GB" },
  { name: "Ireland", iso: "IE", hreflang: "en-IE", ogLocale: "en_IE" },
  { name: "Germany", iso: "DE", hreflang: "en-DE", ogLocale: "en_DE" },
  { name: "France", iso: "FR", hreflang: "en-FR", ogLocale: "en_FR" },
  { name: "Netherlands", iso: "NL", hreflang: "en-NL", ogLocale: "en_NL" },
  { name: "Spain", iso: "ES", hreflang: "en-ES", ogLocale: "en_ES" },
  { name: "Italy", iso: "IT", hreflang: "en-IT", ogLocale: "en_IT" },
  { name: "Singapore", iso: "SG", hreflang: "en-SG", ogLocale: "en_SG" },
  { name: "Malaysia", iso: "MY", hreflang: "en-MY", ogLocale: "en_MY" },
  { name: "Indonesia", iso: "ID", hreflang: "en-ID", ogLocale: "en_ID" },
  { name: "Philippines", iso: "PH", hreflang: "en-PH", ogLocale: "en_PH" },
  { name: "Thailand", iso: "TH", hreflang: "en-TH", ogLocale: "en_TH" },
  { name: "Vietnam", iso: "VN", hreflang: "en-VN", ogLocale: "en_VN" },
  { name: "New Zealand", iso: "NZ", hreflang: "en-NZ", ogLocale: "en_NZ" },
] as const;

export const TARGET_REGION_NAMES = [
  "India",
  "United States",
  "Southeast Asia",
  "Australia",
  "Europe",
] as const;

export const TARGET_REGIONS_PHRASE =
  "India, the United States, Southeast Asia, Australia and Europe";

export const HREFLANG_VALUES = [
  "en",
  ...TARGET_COUNTRIES.map((c) => c.hreflang),
  "x-default",
] as const;

export const OG_LOCALE_PRIMARY = "en_US";

export const OG_LOCALE_ALTERNATES = Array.from(
  new Set(TARGET_COUNTRIES.map((c) => c.ogLocale).filter((l) => l !== OG_LOCALE_PRIMARY)),
);

export const COUNTRIES_SUPPORTED = TARGET_COUNTRIES.map((c) => c.iso);

export const AVAILABLE_LANGUAGES = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Marathi",
  "Malayalam",
  "Kannada",
  "Gujarati",
  "Spanish",
  "French",
  "German",
  "Dutch",
  "Italian",
  "Portuguese",
  "Malay",
  "Indonesian",
  "Thai",
  "Vietnamese",
  "Filipino",
  "Arabic",
] as const;

export function getAreaServedSchema(): Array<Record<string, string>> {
  return [
    ...TARGET_COUNTRIES.map((c) => ({
      "@type": "Country",
      name: c.name,
    })),
    { "@type": "Place", name: "Southeast Asia" },
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "Oceania" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Asia" },
  ];
}

export function getEligibleRegionsSchema(): Array<Record<string, string>> {
  return TARGET_COUNTRIES.map((c) => ({
    "@type": "Country",
    name: c.name,
  }));
}

export function getAudienceSchema(audienceType: string): Record<string, string> {
  return {
    "@type": "BusinessAudience",
    audienceType,
  };
}
