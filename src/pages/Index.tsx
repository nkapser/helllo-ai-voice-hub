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
      title: "Supercharge Customer Experience with AI Voice Agents + Agentic Flows | Helllo.ai",
      description: "Deploy and scale production-ready AI voice agents powered by agentic orchestration. Supercharge your customer experience with intelligent voice automation. Easy setup, CRM integration, and multi-language support. Start your free trial today.",
      canonical: "https://www.helllo.ai/",
      ogUrl: "https://www.helllo.ai/",
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
