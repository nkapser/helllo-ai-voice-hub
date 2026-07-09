#!/usr/bin/env python3
"""Knowledge base dump for helllo.ai voice hub."""

from textwrap import dedent


KNOWLEDGE_BASE_SUMMARY = dedent(
    """
    helllo.ai Knowledge Base (July 2026)

    1. Product Narrative
       • Hero section positions helllo.ai as a way to "Supercharge your Front Desk Services / Customer Experience / Revenue Operations with AI Voice Agents + Agentic Flows," reinforced by a live demo CTA that lets visitors trigger an outbound AI call with country-aware dialing, authentication, and consent gating.
       • Trusted-partner marquee highlights logos such as ESSEM18, Distacart, Delta Hospitals, DSR Infra, Nambiar, and other early adopters to anchor social proof.

    2. Experience & Differentiators (Home Page)
       • Why Choose helllo.ai: 5-minute setup, 50+ integrations, multi-LLM stack (GPT-4, Claude, Gemini), 25+ languages, scale to 10k+ daily calls, and enterprise security (SOC 2 Type II, GDPR, DPDP, end-to-end encryption, 99.9% uptime).
       • Deep Integrations narrative: conversational data flows from telephony, WhatsApp, and web chat into Salesforce, Zendesk, HubSpot, Shopify, Google Workspace, and other tools via helllo.ai’s “action layer” that books appointments, looks up orders, and updates CRM objects.
       • Feature catalog (24 tiles) spans call recording/transcription/summary, sentiment tracking, WhatsApp & WebChat embeds, CRM/Zapier/custom API connectors, automated post-call summaries, human handoff, outbound campaign tooling, Google search + nearby lookups, cross-channel context continuity, and automations like intelligent follow-ups.

    3. Pricing & Monetization
       • Primary Pricing component markets a free-forever tier (500 credits, 10 crawled pages, 30 min voice, 100 chats) and paid plans pulled from spark-pricing.ts (Starter $49/mo or ₹4,900/mo, Growth $99/₹9,900 featured, Scale $299/₹29,900) with annual savings up to 20%. Plans specify credit-to-minutes math, concurrent call limits, page caps, calendar/CRM integrations, and support tiers. Enterprise CTA routes to hello@helllo.ai.
       • Regionalization: usePricingRegion hook fetches `/api/pricing-region` to show "Prices in USD via Stripe" vs. "Prices in INR via Razorpay."

    4. Spark Microsite (helllo.ai/spark)
       • SEO copy: "Paste your URL → 30 seconds → talk to an AI assistant trained on your site → drop one line of code." Sections include Hero, Magic Moment, How It Works, Superpowers, Site Discovery, Install guides, Pricing, FAQ, and Data Privacy strip emphasizing on-device consent toggles.
       • Spark-specific pricing inherits the same plan objects, promising voice/chat credit bundles, Calendar/Cal.com support, Shopify CRM sync, file-upload knowledge, custom integrations, and priority support for Scale.

    5. Legal, Privacy, and Billing Policies
       • Terms of Service (June 2026) cover service description (AI voice assistants, call routing, analytics, CRM integrations), account obligations, acceptable use (no spam/fraud/unlawful activity), payments (monthly/annual prepaid, non-refundable, 30-day notice on price changes), IP ownership, data/privacy handoff, availability disclaimers, liability caps, termination rights, Indian governing law, and legal@helllo.ai contact.
       • Privacy Policy (June 15, 2026) identifies Perceptory AI Labs Pvt Ltd as the data fiduciary with DPDP + GDPR alignment, grievance officer SLA (48h acknowledgement/30-day resolution), detailed data inventory (identity, contact, voice/transcripts, CRM payloads, metadata, cookies, device info) mapped to purpose/necessity/shared processors/retention, AI-assisted processing disclosures, recording/transcription uses, subprocessors (OpenAI, Google Cloud), GDPR legal bases, cross-border transfer safeguards, consent + opt-out flows, and cookie preference controls via Cookiebot.
       • Cancellation & Refund Policy (March 2026) explains Stripe (USD) vs. Razorpay (INR) billing, monthly subscription credits, signup grants, in-app cancellation path (Console → Profile → Billing), end-of-period access, inability to undo cancellation, resubscribe/change-plan flows, 2-month credit carry-forward buckets, and strict no-refund stance for self-serve payments (escalations handled via support@helllo.ai).

    6. Operational Playbooks & Docs
       • Deployment Troubleshooting guide documents the switch from esbuild to terser for portability, recommends `npm run build:clean` before deploys, highlights wrangler workflows for Cloudflare Workers, and lists remediation steps (clear cache, npm ci, node version checks, log review).
       • Email Newsletter Service Recommendations file compares Brevo, Resend, Mailchimp, ConvertKit, and Buttondown, ultimately prescribing Brevo for GDPR-compliant transactional + marketing mail with setup instructions (`VITE_BREVO_API_KEY`, `VITE_BREVO_LIST_ID`).

    7. Supporting Libraries & Utilities
       • `lib/seo.ts` orchestrates social metadata and breadcrumb schema for every route (Home, Spark, Terms, Privacy, Cancellation) ensuring consistent OG/Twitter tags.
       • Authenticated experiences hook into Supabase (`src/lib/supabase.ts`) with env-driven URL/anon keys, enabling session-aware features like the demo outbound call header injection.
       • Pricing logic, calendaring widgets, contact forms, startup recognition ribbons, agent chat widgets, and spark-only CSS/Reveal animations round out the knowledge base of UI/UX patterns the marketing site relies on.
    """
).strip()


def main() -> None:
    print(KNOWLEDGE_BASE_SUMMARY)


if __name__ == "__main__":
    main()
