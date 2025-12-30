import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setSEO, generateBreadcrumbSchema } from "@/lib/seo";

const TermsOfService = () => {
  useEffect(() => {
    setSEO({
      title: "Terms of Service | helllo.ai - AI Voice Agent Platform",
      description: "Terms of Service for helllo.ai - AI Voice Agent Platform. Read our terms and conditions for using our services. Updated January 2025.",
      keywords: "terms of service, terms and conditions, helllo.ai terms, user agreement",
      canonical: "https://helllo.ai/terms",
      ogUrl: "https://helllo.ai/terms",
      ogTitle: "Terms of Service | helllo.ai",
      ogDescription: "Read the terms and conditions for using helllo.ai AI Voice Agent Platform services.",
      twitterTitle: "Terms of Service | helllo.ai",
      twitterDescription: "Read the terms and conditions for using helllo.ai AI Voice Agent Platform services.",
      structuredData: [
        generateBreadcrumbSchema([
          { name: "Home", url: "https://helllo.ai/" },
          { name: "Terms of Service", url: "https://helllo.ai/terms" },
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
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: January 15, 2025
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      By accessing and using helllo.ai ("Service"), operated by HellloAI Technologies Pvt Ltd ("Company", "we", "us", or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      helllo.ai provides AI-powered voice agent services for businesses, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>AI voice assistants for customer service and lead generation</li>
                      <li>Call routing and management services</li>
                      <li>Voice transcription and analytics</li>
                      <li>Integration with third-party CRM and business tools</li>
                      <li>Multi-language voice support</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts and Registration</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      To access certain features of the Service, you must register for an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Provide accurate, current, and complete information during registration</li>
                      <li>Maintain and update your account information to keep it accurate and current</li>
                      <li>Maintain the security of your password and account</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use Policy</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You may not use the Service in any manner that could damage, disable, overburden, or impair any server, or the network(s) connected to any server, or interfere with any other party's use and enjoyment of the Service.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Prohibited uses include but are not limited to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Violating any applicable laws or regulations</li>
                      <li>Transmitting spam, unsolicited communications, or harassment</li>
                      <li>Attempting to gain unauthorized access to any part of the Service</li>
                      <li>Using the Service for fraudulent or deceptive practices</li>
                      <li>Interfering with or disrupting the Service or servers</li>
                      <li>Collecting or harvesting user information without consent</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our Service offers both free and paid subscription plans. For paid services:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Fees are billed in advance on a monthly or annual basis</li>
                      <li>All fees are non-refundable unless otherwise stated</li>
                      <li>We reserve the right to change our pricing with 30 days' notice</li>
                      <li>Failure to pay may result in service suspension or termination</li>
                      <li>You are responsible for all applicable taxes</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The Service and its original content, features, and functionality are and will remain the exclusive property of HellloAI Technologies Pvt Ltd and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data and Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Service Availability</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We strive to maintain high service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) temporarily or permanently with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      In no event shall HellloAI Technologies Pvt Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground">
                        <strong>HellloAI Technologies Pvt Ltd</strong><br />
                        Email: legal@helllo.ai<br />
                        Phone: +91 99016 78665<br />
                        Address: Bengaluru, India
                      </p>
                    </div>
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

export default TermsOfService;
