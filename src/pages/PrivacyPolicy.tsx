import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | helllo.ai";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Privacy Policy for helllo.ai - Learn how we collect, use, and protect your personal information in compliance with GDPR and DPDP.'
      );
    }
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
              <p className="text-lg text-muted-foreground">
                Last updated: January 15, 2025
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      HellloAI Technologies Pvt Ltd ("we", "our", or "us") operates the helllo.ai platform ("Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. We are committed to protecting your privacy and ensuring compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Digital Personal Data Protection Act (DPDP) of India.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">2.1 Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may collect the following types of personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                      <li><strong>Account Information:</strong> Name, email address, phone number, company name, and billing address</li>
                      <li><strong>Usage Data:</strong> Information about how you use our Service, including call logs, voice recordings, and analytics</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
                      <li><strong>Communication Data:</strong> Records of your communications with us, including support tickets and feedback</li>
                      <li><strong>Payment Information:</strong> Billing details and payment method information (processed securely by third-party providers)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">2.2 Voice Data</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      As an AI voice platform, we process voice data including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Voice recordings of customer interactions</li>
                      <li>Transcribed text from voice conversations</li>
                      <li>Voice analytics and sentiment analysis</li>
                      <li>Custom voice training data (if applicable)</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use your personal information for the following purposes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong>Service Provision:</strong> To provide, maintain, and improve our AI voice services</li>
                      <li><strong>Account Management:</strong> To manage your account, process payments, and provide customer support</li>
                      <li><strong>Communication:</strong> To send you important updates, notifications, and marketing communications (with your consent)</li>
                      <li><strong>Analytics:</strong> To analyze usage patterns and improve our Service</li>
                      <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                      <li><strong>Security:</strong> To protect against fraud, abuse, and security threats</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Legal Basis for Processing (GDPR)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Under GDPR, we process your personal data based on the following legal grounds:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong>Contract Performance:</strong> To fulfill our contractual obligations to you</li>
                      <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                      <li><strong>Consent:</strong> For marketing communications and optional features</li>
                      <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Information Sharing and Disclosure</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our Service</li>
                      <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                      <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We implement appropriate technical and organizational measures to protect your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication mechanisms</li>
                      <li>Employee training on data protection</li>
                      <li>Incident response procedures</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong>Account Data:</strong> Retained while your account is active and for 3 years after closure</li>
                      <li><strong>Voice Recordings:</strong> Retained for 90 days unless you request longer retention</li>
                      <li><strong>Usage Analytics:</strong> Retained for 2 years in aggregated form</li>
                      <li><strong>Legal Records:</strong> Retained as required by applicable law</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Depending on your jurisdiction, you may have the following rights regarding your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li><strong>Access:</strong> Request access to your personal information</li>
                      <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                      <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                      <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                      <li><strong>Restriction:</strong> Request limitation of processing</li>
                      <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                      <li><strong>Withdraw Consent:</strong> Withdraw consent for consent-based processing</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      To exercise these rights, please contact us at privacy@helllo.ai.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                      <li>Adequacy decisions by relevant authorities</li>
                      <li>Certification schemes and codes of conduct</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">10. Cookies and Tracking Technologies</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. For detailed information, please see our Cookie Policy.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us immediately.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-muted-foreground">
                        <strong>Data Protection Officer</strong><br />
                        HellloAI Technologies Pvt Ltd<br />
                        Email: privacy@helllo.ai<br />
                        Phone: +91 99016 78665<br />
                        Address: Bengaluru, India
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      You also have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal information in accordance with applicable law.
                    </p>
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
