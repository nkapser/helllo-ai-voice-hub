import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Building2 } from "lucide-react";
import { useState } from "react";
import { getDashboardAuthSignInUrl } from "@/lib/dashboard";
import {
  SPARK_FREE_STATS,
  SPARK_PLANS,
  getPlanPricing,
  getPricingRegionLabel,
  type BillingInterval,
} from "@/lib/spark-pricing";
import { usePricingRegion } from "@/hooks/use-pricing-region";

const CONSOLE_SIGNIN_URL = getDashboardAuthSignInUrl("/console");
const ENTERPRISE_URL = "mailto:hello@helllo.ai?subject=Enterprise%20inquiry";

const Pricing = () => {
  const [billing, setBilling] = useState<BillingInterval>("monthly");
  const region = usePricingRegion();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees — choose the plan that fits your business.
          </p>
          <p className="text-sm text-gray-500 mt-4">{getPricingRegionLabel(region)}</p>
        </div>

        <Card className="mb-10 border-2 border-gray-200 bg-muted/30">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="secondary" className="mb-3">
                  Free forever
                </Badge>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {region === "IN" ? "₹0" : "$0"}
                  </span>
                  <span className="text-gray-500">/ forever</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Try AI voice and chat on your site — no credit card, no expiry.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex-1 lg:max-w-2xl">
                {SPARK_FREE_STATS.map(({ value, label }) => (
                  <div key={label} className="text-center sm:text-left">
                    <div className="text-lg font-semibold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="shrink-0" asChild>
                <a href={CONSOLE_SIGNIN_URL}>Start free</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 flex justify-center">
          <div
            className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 p-1"
            role="group"
            aria-label="Billing interval"
          >
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billing === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billing === "annual"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Annual
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Save up to 33%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SPARK_PLANS.map((plan) => {
            const { name, tagline, cta, featured, features } = plan;
            const { price, period, savingsBadge } = getPlanPricing(plan, billing, region);

            return (
              <Card
                key={name}
                className={`relative flex flex-col border-2 transition-colors ${
                  featured
                    ? "border-primary shadow-lg hover:shadow-xl"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1 text-sm font-semibold">
                      <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                      Most popular
                    </Badge>
                  </div>
                )}

                <CardHeader className={`text-center pb-4 ${featured ? "pt-6" : ""}`}>
                  <CardTitle className="text-xl mb-1">{name}</CardTitle>
                  <CardDescription>{tagline}</CardDescription>
                  <div className="mt-4 flex flex-wrap items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">{price}</span>
                    <span className="text-lg text-gray-600">{period}</span>
                    {savingsBadge && (
                      <Badge variant="secondary" className="text-primary">
                        {savingsBadge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6">
                  <ul className="space-y-3 flex-1">
                    {features.map(({ text, highlighted }) => (
                      <li key={text} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span
                          className={`text-sm ${
                            highlighted ? "font-medium text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={featured ? "default" : "outline"} className="w-full" size="lg" asChild>
                    <a href={CONSOLE_SIGNIN_URL}>{cta}</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 max-w-6xl mx-auto border-2 border-gray-200">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
                <p className="mt-1 text-sm text-gray-600">
                  For high-volume sites, agencies, and regulated teams — custom integrations,
                  premium voices, and dedicated support.
                </p>
              </div>
            </div>
            <Button variant="outline" size="lg" className="shrink-0" asChild>
              <a href={ENTERPRISE_URL}>Talk to sales</a>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Trusted by 500+ businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>DPDP Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
