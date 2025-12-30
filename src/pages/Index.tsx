import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseHelllo from "@/components/WhyChooseHelllo";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  // Update page title and meta description for better SEO
  useEffect(() => {
    document.title = "AI Voice Agents for Small, Medium and Enterprise Business | Helllo.ai - Automate Customer Calls";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Transform your business with intelligent AI voice agents. Easy 5-minute setup, seamless CRM integration, and multi-language support. Start your free trial today - no credit card required.'
      );
    }
    
    // Add lang attribute to html tag
    document.documentElement.lang = 'en';
    
    // Add viewport meta tag if not exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewportMeta);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main role="main" id="main-content">
        <Hero />
        <WhyChooseHelllo />
        <Pricing />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
