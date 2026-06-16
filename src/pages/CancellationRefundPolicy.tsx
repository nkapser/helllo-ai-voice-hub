import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setSEO, generateBreadcrumbSchema } from "@/lib/seo";

const CancellationRefundPolicy = () => {
  useEffect(() => {
    setSEO({
      title: "Cancellation & Refund Policy | helllo.ai",
      description:
        "Learn how subscriptions and cancellations work for Helllo AI paid plans. Monthly billing via Razorpay, cancel anytime, no refunds — credits remain for 2-month carry-forward.",
      keywords:
        "cancellation policy, refund policy, helllo.ai billing, subscription cancellation, Razorpay billing",
      canonical: "https://www.helllo.ai/cancellation-refund",
      ogUrl: "https://www.helllo.ai/cancellation-refund",
      ogTitle: "Cancellation & Refund Policy | helllo.ai",
      ogDescription:
        "How subscriptions and cancellations work for Helllo AI paid plans billed through Razorpay. No refunds — use credits during the 2-month carry-forward period.",
      twitterTitle: "Cancellation & Refund Policy | helllo.ai",
      twitterDescription:
        "How subscriptions and cancellations work for Helllo AI paid plans billed through Razorpay. No refunds — use credits during the 2-month carry-forward period.",
      structuredData: [
        generateBreadcrumbSchema([
          { name: "Home", url: "https://www.helllo.ai/" },
          {
            name: "Cancellation & Refund Policy",
            url: "https://www.helllo.ai/cancellation-refund",
          },
        ]),
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Cancellation & Refund Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: June 15, 2026
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <section className="mb-8">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This policy describes how subscriptions and cancellations work for
                      Helllo AI ("we", "us", "our") when you purchase a paid plan through our
                      application. <strong>No monetary refunds are offered</strong> for
                      self-serve subscription payments.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Subscriptions
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Paid plans are <strong>monthly subscriptions</strong>{" "}
                        billed in <strong>Indian Rupees (INR)</strong> through{" "}
                        <strong>Razorpay</strong>.
                      </li>
                      <li>
                        Self-serve checkout is currently available for accounts
                        with <strong>India</strong> as the billing country.
                      </li>
                      <li>
                        Each successful payment grants <strong>plan credits</strong>{" "}
                        for that billing cycle (for example, Starter: 30,000
                        credits per month; Growth: 50,000; Scale: 80,000). Custom
                        plans follow the credits shown on your Billing page.
                      </li>
                      <li>
                        New accounts may receive a{" "}
                        <strong>one-time signup credit</strong> grant (currently{" "}
                        <strong>500 credits</strong>), separate from subscription
                        credits.
                      </li>
                      <li>
                        <strong>Enterprise</strong> and custom commercial terms
                        are agreed separately with our sales team.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      How to cancel
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can cancel from the application:
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4 font-medium">
                      Console → Profile → Billing → Current subscription → Cancel
                      subscription
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When you cancel:
                    </p>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Your subscription <strong>remains active until the end of
                        your current billing period</strong> (shown as{" "}
                        <strong>Access until</strong> in the app).
                      </li>
                      <li>
                        <strong>You will not be charged again</strong> after that
                        date.
                      </li>
                      <li>
                        <strong>Credits already added to your account for the
                        current period remain available</strong> until they expire
                        under our credit carry-forward rules (see{" "}
                        <a
                          href="#credit-expiry"
                          className="text-primary hover:underline"
                        >
                          Credit expiry
                        </a>
                        ).
                      </li>
                      <li>
                        Cancellation does <strong>not</strong> delete your account
                        or remove access to historical invoices in the Billing →
                        Invoices tab.
                      </li>
                      <li>
                        <strong>Issued tax invoices are not voided</strong> by
                        cancellation. Invoice details reflect what was captured at
                        issue time.
                      </li>
                    </ol>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do <strong>not</strong> currently offer self-serve{" "}
                      <strong>immediate cancellation</strong> (stop access now) for
                      voluntary cancellation. If you need your subscription ended
                      immediately, contact us at{" "}
                      <a
                        href="mailto:support@helllo.ai"
                        className="text-primary hover:underline"
                      >
                        support@helllo.ai
                      </a>
                      .
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                      What you cannot do in the app today
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        <strong>Undo cancel</strong> — there is no "resume
                        subscription" button. You can <strong>subscribe again</strong>{" "}
                        from the Billing page.
                      </li>
                      <li>
                        <strong>Change plan</strong> while a cancellation is
                        scheduled — use <strong>Subscribe</strong> on the new plan
                        instead. <strong>Change plan</strong> is only available for
                        an active renewing subscription.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Resubscribing and plan changes
                    </h2>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Resubscribe after cancel
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you scheduled cancellation, you may{" "}
                      <strong>subscribe again at any time</strong> from the Billing
                      page, including <strong>before</strong> your current access
                      period ends.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When a new subscription payment succeeds:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                      <li>
                        Your new plan and billing period start from that payment
                        date.
                      </li>
                      <li>
                        Your previous subscription will not renew and is retired
                        according to our billing integration with Razorpay.
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Change plan (while subscribed)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have an active renewing subscription, you may{" "}
                      <strong>Change plan</strong> on the Billing page.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Your <strong>current plan stays active until payment for the
                        new plan succeeds</strong>.
                      </li>
                      <li>
                        You are <strong>not charged for both plans</strong> in
                        parallel for the same period.
                      </li>
                      <li>
                        Plan changes are <strong>not prorated</strong> in the
                        application — the new plan's full monthly price applies on
                        successful checkout.
                      </li>
                      <li>
                        On successful payment for the new plan, the previous
                        subscription is cancelled in Razorpay (this is an immediate
                        cancellation of the old subscription, not end-of-period
                        cancellation).
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section id="credit-expiry" className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Credit expiry (not a refund)
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Subscription payments add credits to your account wallet via
                      our credit ledger.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Credits are stored in <strong>grant buckets</strong> with an
                        expiry date.
                      </li>
                      <li>
                        By default, credits expire after <strong>2 months</strong>{" "}
                        from the date they are granted (
                        <code className="text-sm bg-muted px-1 py-0.5 rounded">
                          credit_carry_forward_months
                        </code>{" "}
                        on your account). Some accounts may have a different
                        carry-forward setting set by us.
                      </li>
                      <li>
                        <strong>Cancelling your subscription does not remove
                        credits</strong> already granted for the paid period.
                      </li>
                      <li>
                        <strong>Cancelling does not extend</strong> credit expiry.
                        Unused credits expire automatically after the carry-forward
                        window.
                      </li>
                      <li>
                        After your subscription ends, you may continue using{" "}
                        <strong>remaining credits</strong> until they expire or are
                        consumed by usage.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Refunds
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>No refund will be made</strong> for self-serve subscription
                      payments billed through Razorpay. All subscription charges are{" "}
                      <strong>final and non-refundable</strong>.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The application does <strong>not</strong> process refunds. Refunds are not
                      available through the Billing UI, self-serve APIs, or by email request.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Credits instead of refunds
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When you pay for a plan, the corresponding <strong>plan credits</strong> are
                      added to your account. Instead of a refund, you are expected to{" "}
                      <strong>use those credits</strong> during the{" "}
                      <strong>2-month carry-forward period</strong> described in{" "}
                      <a href="#credit-expiry" className="text-primary hover:underline">
                        Credit expiry
                      </a>
                      .
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Credits from each successful payment remain available until they expire
                        (default: <strong>2 months</strong> from the grant date)
                      </li>
                      <li>
                        Cancelling your subscription does <strong>not</strong> remove credits
                        already granted — you may continue using them until they expire or are
                        consumed
                      </li>
                      <li>
                        Unused credits expire automatically after the carry-forward window; they
                        are not converted to cash or refunded
                      </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This applies regardless of whether you cancel, change plans, or stop using
                      the service before credits are fully consumed. Enterprise and custom
                      contracts may follow separate agreement terms via{" "}
                      <a href="mailto:sales@helllo.ai" className="text-primary hover:underline">
                        sales@helllo.ai
                      </a>
                      .
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For billing questions (invoices, payment status, or account access), contact{" "}
                      <a href="mailto:support@helllo.ai" className="text-primary hover:underline">
                        support@helllo.ai
                      </a>
                      . Billing support does <strong>not</strong> include refund processing.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Failed payments
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If a <strong>renewal payment fails</strong>, your subscription
                      may enter a <strong>past due</strong> state while Razorpay
                      retries collection according to its rules.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        You may still <strong>cancel</strong> from the Billing page
                        while past due.
                      </li>
                      <li>
                        <strong>New cycle credits are not granted</strong> until a
                        payment succeeds.
                      </li>
                      <li>
                        Credits from the <strong>last successful</strong> charge are
                        not automatically removed when a renewal fails.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Billing details and invoices
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Complete <strong>Billing & invoicing details</strong> (legal
                        name, address, GSTIN where applicable, email, phone) before
                        subscribing so Razorpay invoices reflect your business
                        information.
                      </li>
                      <li>
                        Updates to billing details apply to <strong>future</strong>{" "}
                        invoices and charges, not invoices already issued.
                      </li>
                      <li>
                        Hosted invoices and PDFs are provided through Razorpay.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Enterprise plans
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Custom and Enterprise plans are sold through{" "}
                      <a
                        href="mailto:sales@helllo.ai"
                        className="text-primary hover:underline"
                      >
                        sales@helllo.ai
                      </a>
                      . Cancellation, refunds, and contract terms for those
                      agreements are governed by your <strong>order form or
                      contract</strong>, not this self-serve policy.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Product access after cancellation
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      While your subscription status is <strong>active</strong> or{" "}
                      <strong>past due</strong>, your account is treated as having a
                      paid subscription for certain product limits (for example,
                      Spark website scan quotas).
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      After the subscription status becomes <strong>cancelled</strong>{" "}
                      at the end of your paid period:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        <strong>Monthly credit grants stop</strong>.
                      </li>
                      <li>
                        <strong>Free-tier or credit-based limits</strong> apply where
                        configured (for example, usage gated by available credits or
                        free-plan quotas).
                      </li>
                      <li>
                        Your <strong>account and data</strong> remain unless you
                        request account deletion separately.
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Changes to this policy
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may update this policy from time to time. The version
                      published on our website applies to billing after the update
                      date. Material changes may also be communicated by email or
                      in-app notice where appropriate.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Contact
                    </h2>
                    <div className="bg-muted p-4 rounded-lg">
                      <table className="w-full text-muted-foreground">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 pr-4 font-semibold text-foreground">
                              Topic
                            </th>
                            <th className="text-left py-2 font-semibold text-foreground">
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-2 pr-4">Billing support</td>
                            <td className="py-2">
                              <a
                                href="mailto:support@helllo.ai"
                                className="text-primary hover:underline"
                              >
                                support@helllo.ai
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">Enterprise sales</td>
                            <td className="py-2">
                              <a
                                href="mailto:sales@helllo.ai"
                                className="text-primary hover:underline"
                              >
                                sales@helllo.ai
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Summary
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        <strong>Monthly billing</strong> via Razorpay (India, INR).
                      </li>
                      <li>
                        <strong>Cancel anytime</strong> — access continues until the
                        end of the paid period; no renewal after that.
                      </li>
                      <li>
                        <strong>Credits</strong> from each payment remain until they
                        expire under carry-forward rules (default: 2 months).
                      </li>
                      <li>
                        <strong>No refunds</strong> — use plan credits during the 2-month
                        carry-forward period; unused credits expire and are not refunded.
                      </li>
                      <li>
                        <strong>Enterprise</strong> — custom terms via sales.
                      </li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationRefundPolicy;
