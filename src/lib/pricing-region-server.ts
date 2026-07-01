import type { PricingRegion } from "@/lib/spark-pricing";

type CloudflareRequest = Request & {
  cf?: {
    country?: string;
  };
};

export function getRequestCountry(request: Request): string | null {
  const cfCountry = (request as CloudflareRequest).cf?.country;
  if (cfCountry && cfCountry !== "XX") {
    return cfCountry;
  }

  const headerCountry = request.headers.get("CF-IPCountry");
  if (headerCountry && headerCountry !== "XX") {
    return headerCountry;
  }

  return null;
}

export function countryToPricingRegion(country: string | null): PricingRegion {
  return country === "IN" ? "IN" : "INTL";
}

export function resolvePricingRegion(request: Request): PricingRegion {
  return countryToPricingRegion(getRequestCountry(request));
}

export function createPricingRegionResponse(request: Request): Response {
  const region = resolvePricingRegion(request);

  return Response.json(
    { region },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "private, no-store",
      },
    }
  );
}
