import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseHelllo from "@/components/WhyChooseHelllo";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { setSEO } from "@/lib/seo";

const Index = () => {
  // Update SEO meta tags for better search engine optimization
  useEffect(() => {
    setSEO({
      title: "AI Voice Agents for Small, Medium and Enterprise Business | helllo.ai - Automate Customer Calls",
      description: "Transform your business with intelligent AI voice agents. Easy 5-minute setup, seamless CRM integration, and multi-language support. Start your free trial today - no credit card required.",
      canonical: "https://helllo.ai/",
      ogUrl: "https://helllo.ai/",
    });
    
    // Ensure lang attribute is set
    document.documentElement.lang = 'en';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" id="main-content">
        <Hero />
        <WhyChooseHelllo />
        <Features />
        <Pricing />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
