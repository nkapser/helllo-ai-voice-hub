import { useEffect, useState } from "react";
import { detectPricingRegion, type PricingRegion } from "@/lib/spark-pricing";

export function usePricingRegion(): PricingRegion {
  const [region, setRegion] = useState<PricingRegion>("INTL");

  useEffect(() => {
    setRegion(detectPricingRegion());
  }, []);

  return region;
}
