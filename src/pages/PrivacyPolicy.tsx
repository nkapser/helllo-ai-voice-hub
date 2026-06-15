import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { openCookiePreferences } from "@/lib/cookiebot";
import { scrollToHash } from "@/lib/scroll";
import CookieDeclarationScript from "@/components/CookieDeclarationScript";

const DataFiduciaryBlock = () => (
  <div className="bg-muted p-4 rounded-lg not-prose">
    <dl className="space-y-3 text-muted-foreground text-sm sm:text-base">
      <div>
        <dt className="font-semibold text-foreground">Legal Entity Name</dt>
        <dd>Perceptory AI Labs Private Limited</dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">Registered Address</dt>
        <dd>
          Sobha Marvella, 3, Ashoka Ln,
          <br />
          Bellandur,
          <br />
          Bengaluru, Karnataka 560103
          <br />
          India
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">Contact Email</dt>
        <dd>
          <a href="mailto:sandilya@helllo.ai" className="text-primary hover:underline">
            sandilya@helllo.ai
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">Support Email</dt>
        <dd>
          <a href="mailto:support@helllo.ai" className="text-primary hover:underline">
            support@helllo.ai
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-foreground">Website</dt>
        <dd>
          <a
            href="https://perceptorylabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://perceptorylabs.ai
          </a>
        </dd>
      </div>
    </dl>
  </div>
);

const PrivacyPolicy = () => {
  useEffect(() => {
    setSEO({
      title: "Privacy Policy | helllo.ai - GDPR & DPDP Compliant",
      description:
        "Privacy Policy for helllo.ai - Learn how we collect, use, and protect your personal information in compliance with GDPR and DPDP. Your privacy is our priority.",
      keywords: "privacy policy, GDPR compliance, DPDP, data protection, helllo.ai privacy",
      canonical: "https://www.helllo.ai/privacy",
      ogUrl: "https://www.helllo.ai/privacy",
      ogTitle: "Privacy Policy | helllo.ai",
      ogDescription:
        "Learn how helllo.ai protects your personal information in compliance with GDPR and DPDP regulations.",
      twitterTitle: "Privacy Policy | helllo.ai",
      twitterDescription:
        "Learn how helllo.ai protects your personal information in compliance with GDPR and DPDP regulations.",
      structuredData: [
        generateBreadcrumbSchema([
          { name: "Home", url: "https://www.helllo.ai/" },
          { name: "Privacy Policy", url: "https://www.helllo.ai/privacy" },
        ]),
      ],
    });
  }, []);

  useEffect(() => {
    const scrollToCurrentHash = () => {
      if (window.location.hash) {
        requestAnimationFrame(() => scrollToHash(window.location.hash));
      }
    };

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);
    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">Last updated: June 15, 2026</p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Perceptory AI Labs Private Limited, operating the helllo.ai platform
                      (&quot;Helllo.ai&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;),
                      provides AI-powered voice and customer engagement services to businesses and
                      organizations. This Privacy Policy explains what personal information we
                      collect, why we collect it, how we use and share it, and the choices
                      available to you.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We are committed to protecting personal information and complying with
                      applicable privacy laws, including the Digital Personal Data Protection Act,
                      2023 (DPDP) in India and the General Data Protection Regulation (GDPR) where
                      applicable.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Data Fiduciary Information
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For the purposes of applicable privacy laws, Perceptory AI Labs Private
                      Limited is the data fiduciary responsible for processing personal information
                      described in this policy.
                    </p>
                    <DataFiduciaryBlock />
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Grievance Officer
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have concerns about how we handle your personal information, you may
                      contact our Grievance Officer:
                    </p>
                    <div className="bg-muted p-4 rounded-lg not-prose">
                      <p className="text-muted-foreground mb-2">
                        <strong className="text-foreground">Name:</strong> Sandilya Konduri
                      </p>
                      <p className="text-muted-foreground mb-2">
                        <strong className="text-foreground">Email:</strong>{" "}
                        <a href="mailto:grievance@helllo.ai" className="text-primary hover:underline">
                          grievance@helllo.ai
                        </a>
                      </p>
                      <p className="text-muted-foreground mb-1">
                        <strong className="text-foreground">Response Time:</strong>
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Acknowledgement within 48 hours</li>
                        <li>Resolution within 30 calendar days</li>
                      </ul>
                    </div>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      2. What We Collect and Why
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We collect personal information to provide, secure, and improve our services.
                      The table below summarizes the main categories of data we process.
                    </p>

                    <div className="overflow-x-auto not-prose mb-6">
                      <table className="w-full min-w-[640px] border-collapse text-sm sm:text-base">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-3 font-semibold text-foreground">
                              Data Collected
                            </th>
                            <th className="text-left py-3 px-3 font-semibold text-foreground">
                              Purpose
                            </th>
                            <th className="text-left py-3 px-3 font-semibold text-foreground">
                              Required?
                            </th>
                            <th className="text-left py-3 px-3 font-semibold text-foreground">
                              Shared with Processors?
                            </th>
                            <th className="text-left py-3 px-3 font-semibold text-foreground">
                              Typical Retention
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Name</td>
                            <td className="py-3 px-3">Account creation and communication</td>
                            <td className="py-3 px-3">Yes, for account holders</td>
                            <td className="py-3 px-3">Yes, with service providers</td>
                            <td className="py-3 px-3">While account is active + legal period</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Email Address</td>
                            <td className="py-3 px-3">Authentication and support</td>
                            <td className="py-3 px-3">Yes, for account holders</td>
                            <td className="py-3 px-3">Yes, with service providers</td>
                            <td className="py-3 px-3">While account is active + legal period</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Phone Number</td>
                            <td className="py-3 px-3">Call routing and communication</td>
                            <td className="py-3 px-3">Often required for voice services</td>
                            <td className="py-3 px-3">Yes, with telecom and cloud providers</td>
                            <td className="py-3 px-3">Per customer configuration</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Voice Recordings</td>
                            <td className="py-3 px-3">
                              Call handling, quality assurance and analytics
                            </td>
                            <td className="py-3 px-3">Depends on service configuration</td>
                            <td className="py-3 px-3">Yes, with AI and cloud providers</td>
                            <td className="py-3 px-3">Per customer configuration</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Call Transcripts</td>
                            <td className="py-3 px-3">
                              AI processing, summaries and workflow automation
                            </td>
                            <td className="py-3 px-3">Depends on service configuration</td>
                            <td className="py-3 px-3">Yes, with AI and cloud providers</td>
                            <td className="py-3 px-3">Per customer configuration</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">CRM Data</td>
                            <td className="py-3 px-3">Customer relationship management</td>
                            <td className="py-3 px-3">Optional, when integrations are enabled</td>
                            <td className="py-3 px-3">Yes, with integrated CRM providers</td>
                            <td className="py-3 px-3">Per customer configuration</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">
                              Conversation Metadata
                            </td>
                            <td className="py-3 px-3">Service performance and analytics</td>
                            <td className="py-3 px-3">Collected automatically during use</td>
                            <td className="py-3 px-3">Yes, with analytics and cloud providers</td>
                            <td className="py-3 px-3">Up to 2 years in aggregated form</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">Cookies</td>
                            <td className="py-3 px-3">Website functionality and analytics</td>
                            <td className="py-3 px-3">
                              Necessary cookies only without consent; others require consent
                            </td>
                            <td className="py-3 px-3">Yes, with cookie and analytics vendors</td>
                            <td className="py-3 px-3">Varies by cookie type</td>
                          </tr>
                          <tr className="border-b border-border/60">
                            <td className="py-3 px-3 font-medium text-foreground">
                              Device Information
                            </td>
                            <td className="py-3 px-3">Security, fraud prevention and diagnostics</td>
                            <td className="py-3 px-3">Collected automatically during use</td>
                            <td className="py-3 px-3">Yes, with security and cloud providers</td>
                            <td className="py-3 px-3">Short-term logs; longer if needed for security</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We only collect information that is reasonably necessary for the purposes
                      described above. Where information is not required to use a feature, you may
                      choose not to provide it, though some features may not work without it.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell personal information. We share information with trusted
                      third-party processors only as needed to deliver our services, and we
                      require them to protect that information under contractual obligations.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      AI-Assisted Services
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Helllo.ai provides AI-powered communication, automation and customer
                      engagement services. To provide these services, certain information may be
                      processed by artificial intelligence systems.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">Examples include:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Voice call processing</li>
                      <li>Speech-to-text transcription</li>
                      <li>Call summaries</li>
                      <li>Intent extraction</li>
                      <li>Customer support automation</li>
                      <li>Workflow execution</li>
                      <li>Analytics and insights</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      AI-generated outputs may occasionally be inaccurate and should be reviewed
                      where appropriate.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Call Recording and Transcription
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Calls handled through Helllo.ai may be recorded and transcribed.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Recordings and transcripts may be used for:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Service delivery</li>
                      <li>Quality assurance</li>
                      <li>Customer support</li>
                      <li>Training and improvement of customer workflows</li>
                      <li>Compliance and dispute resolution</li>
                      <li>Analytics and reporting</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Customers are responsible for obtaining any legally required notices or
                      consent from call participants.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Subprocessors and Service Providers
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Helllo.ai may engage trusted third-party service providers to deliver
                      services. Examples include:
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">OpenAI</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                      <li>
                        <strong>Purpose:</strong> AI model processing and language understanding
                      </li>
                      <li>
                        <strong>Data Categories Processed:</strong> Call transcripts, text inputs,
                        conversation content and related metadata
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Google Cloud</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                      <li>
                        <strong>Purpose:</strong> Cloud hosting, infrastructure, storage and
                        security
                      </li>
                      <li>
                        <strong>Data Categories Processed:</strong> Account data, voice recordings,
                        transcripts, logs and operational data
                      </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We contractually require service providers to implement appropriate security
                      and confidentiality protections.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section id="gdpr" className="mb-8 scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      3. Legal Basis for Processing (GDPR)
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Where GDPR applies, we process personal information based on the following
                      legal grounds:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        <strong>Contract Performance:</strong> To provide the services you or your
                        organization have requested
                      </li>
                      <li>
                        <strong>Legitimate Interest:</strong> To improve our services, maintain
                        security, and prevent fraud
                      </li>
                      <li>
                        <strong>Consent:</strong> For optional features, marketing communications,
                        and non-essential cookies
                      </li>
                      <li>
                        <strong>Legal Obligation:</strong> To comply with applicable laws and
                        regulatory requirements
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      4. Information Sharing and Disclosure
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell personal information. We may share information in these
                      situations:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        <strong>Service Providers:</strong> With vendors who help us operate our
                        platform (see Subprocessors above)
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In connection with mergers,
                        acquisitions, or asset sales
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> When required by law or to protect
                        rights, safety, and security
                      </li>
                      <li>
                        <strong>With Consent:</strong> When you or your organization has given
                        explicit consent
                      </li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Security Measures
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Helllo.ai employs reasonable technical and organizational safeguards
                      including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>HTTPS/TLS encryption in transit</li>
                      <li>Encryption of sensitive data where applicable</li>
                      <li>Role-based access controls</li>
                      <li>Authentication and authorization controls</li>
                      <li>Infrastructure monitoring</li>
                      <li>Backup and recovery procedures</li>
                      <li>Incident response processes</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      No internet-based service can guarantee absolute security.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Data Retention
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We retain personal information only for as long as necessary to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Deliver services</li>
                      <li>Meet legal obligations</li>
                      <li>Resolve disputes</li>
                      <li>Enforce agreements</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Retention periods may vary based on:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Customer configuration</li>
                      <li>Service type</li>
                      <li>Regulatory requirements</li>
                      <li>Operational requirements</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When information is no longer required, it is deleted, anonymized or securely
                      destroyed.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Your Rights Under Applicable Privacy Laws
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Depending on your location, you may have the following rights regarding your
                      personal information:
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Right to Access</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Request a copy of personal information we maintain.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Correction
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Request correction of inaccurate or incomplete information.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Erasure
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Request deletion of personal information, subject to legal and contractual
                      obligations.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Withdraw Consent
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Withdraw previously granted consent at any time.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Right to Grievance Redressal
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Raise concerns regarding processing of personal information.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Right to Nominate</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Nominate another individual to exercise rights on your behalf where permitted
                      by law.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      How to Submit a Request
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Send an email to:{" "}
                      <a href="mailto:privacy@helllo.ai" className="text-primary hover:underline">
                        privacy@helllo.ai
                      </a>
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      <strong>Subject:</strong> Data Rights Request
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-2">Include:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Description of request</li>
                      <li>Any relevant account details</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Target response time:</strong> 30 calendar days.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      5. International Data Transfers
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Your information may be transferred to and processed in countries other than
                      your own. We use appropriate safeguards for such transfers, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                      <li>Adequacy decisions by relevant authorities</li>
                      <li>Certification schemes and codes of conduct</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section id="cookies" className="mb-8 scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Cookies and Tracking Technologies
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar technologies on our website. Cookiebot manages our
                      cookie consent banner, which lets you accept all cookies, reject non-essential
                      cookies, or customize your preferences. Non-essential cookies are not placed
                      until you give consent.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can change or withdraw your consent at any time using{" "}
                      <button
                        type="button"
                        onClick={openCookiePreferences}
                        className="text-primary hover:underline font-medium"
                      >
                        Cookie Settings
                      </button>
                      .
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Necessary</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Required for website operation, security, and basic functionality. These
                      cookies cannot be disabled through our consent tool because the site would
                      not work properly without them.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Used for understanding website usage and improving services. Analytics cookies
                      are only placed after you consent to the Statistics category in Cookiebot.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Marketing</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Used for advertising, attribution, and third-party engagement tools such as
                      scheduling widgets and chat widgets. Marketing cookies are only placed after
                      you consent to the Marketing category.
                    </p>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We store a record of your consent choices so we can honor your preferences on
                      future visits and when you withdraw consent.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Cookie Declaration</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The table below is generated by Cookiebot and lists the cookies used on this
                      website.
                    </p>
                    <CookieDeclarationScript />
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Children&apos;s Privacy
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Helllo.ai is intended for business users and organizations. Our services are
                      not directed toward individuals under the age of 18. We do not knowingly
                      collect personal information from children.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If we learn that personal information belonging to a child has been collected
                      without appropriate authorization, we will take reasonable steps to delete such
                      information. Parents or guardians who believe a child has provided personal
                      information may contact{" "}
                      <a href="mailto:privacy@helllo.ai" className="text-primary hover:underline">
                        privacy@helllo.ai
                      </a>
                      .
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Behavioral Tracking of Children
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Helllo.ai does not knowingly perform profiling, behavioral monitoring,
                      targeted advertising or behavioral tracking of children.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground mb-3">Guardian Consent</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Where legally required, collection or processing of a child&apos;s personal
                      information will occur only after obtaining appropriate consent from a parent,
                      guardian or authorized representative.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Withdrawing Consent
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Users may withdraw consent at any time.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      To withdraw consent:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>
                        Use{" "}
                        <button
                          type="button"
                          onClick={openCookiePreferences}
                          className="text-primary hover:underline font-medium"
                        >
                          cookie preference settings
                        </button>
                      </li>
                      <li>
                        Contact{" "}
                        <a href="mailto:privacy@helllo.ai" className="text-primary hover:underline">
                          privacy@helllo.ai
                        </a>
                      </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Withdrawal of consent does not affect processing that occurred before
                      withdrawal.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      6. Changes to This Privacy Policy
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may update this Privacy Policy from time to time. We will notify you of
                      material changes by posting the updated policy on this page and updating the
                      &quot;Last updated&quot; date. We encourage you to review this Privacy Policy
                      periodically.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Privacy Contact
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For privacy-related questions:
                    </p>
                    <ul className="list-none text-muted-foreground space-y-2 mb-4 not-prose">
                      <li>
                        <a href="mailto:privacy@helllo.ai" className="text-primary hover:underline">
                          privacy@helllo.ai
                        </a>
                      </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-2">For grievances:</p>
                    <ul className="list-none text-muted-foreground space-y-2 mb-4 not-prose">
                      <li>
                        <a
                          href="mailto:grievance@helllo.ai"
                          className="text-primary hover:underline"
                        >
                          grievance@helllo.ai
                        </a>
                      </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-2">For support:</p>
                    <ul className="list-none text-muted-foreground space-y-2 mb-4 not-prose">
                      <li>
                        <a href="mailto:support@helllo.ai" className="text-primary hover:underline">
                          support@helllo.ai
                        </a>
                      </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You also have the right to lodge a complaint with your local data protection
                      authority if you believe we have not handled your personal information in
                      accordance with applicable law.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-0" aria-label="Data fiduciary footer">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Data Fiduciary Information
                    </h2>
                    <DataFiduciaryBlock />
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

export default PrivacyPolicy;
