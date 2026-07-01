import { useEffect, useState } from "react";
import { fetchPricingRegion, type PricingRegion } from "@/lib/spark-pricing";

export function usePricingRegion(): PricingRegion {
  const [region, setRegion] = useState<PricingRegion>("INTL");

  useEffect(() => {
    let cancelled = false;

    fetchPricingRegion().then((resolvedRegion) => {
      if (!cancelled) {
        setRegion(resolvedRegion);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return region;
}
