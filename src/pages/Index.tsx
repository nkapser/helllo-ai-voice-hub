import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseHelllo from "@/components/WhyChooseHelllo";
import DeepIntegrations from "@/components/DeepIntegrations";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CalendlyWidget from "@/components/CalendlyWidget";
import ContactForm from "@/components/ContactForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import RecognitionShowcase from "@/components/RecognitionShowcase";
import AgentChatWidget from "@/components/AgentChatWidget";
import StartupRecognitionWidget from "@/components/StartupRecognitionWidget";
import { setSEO } from "@/lib/seo";
import { HELLLO_SEO, getHellloStructuredData } from "@/lib/helllo-seo";
import { scrollToHash } from "@/lib/scroll";

const Index = () => {
  const location = useLocation();

  // Update SEO meta tags for better search engine optimization
  useEffect(() => {
    setSEO({
      ...HELLLO_SEO,
      structuredData: getHellloStructuredData(),
    });
    
    // Ensure lang attribute is set
    document.documentElement.lang = 'en';
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHashNavigation = Boolean(location.hash);

    // Scroll snap fights anchor links such as /#contact.
    if (!hasHashNavigation && !prefersReducedMotion) {
      document.documentElement.style.scrollSnapType = 'y proximity';
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      document.documentElement.style.scrollSnapType = 'none';
      document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    }
    
    return () => {
      // Cleanup on unmount
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, [location.hash]);

  useEffect(() => {
    if (!location.hash) return;

    const scrollToHashTarget = () => {
      scrollToHash(window.location.hash);
    };

    const runAfterLayout = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToHashTarget);
      });
    };

    runAfterLayout();

    if (document.readyState !== "complete") {
      window.addEventListener("load", scrollToHashTarget, { once: true });
    }

    // Images and embeds can shift section positions after the first paint.
    const retryTimeout = window.setTimeout(scrollToHashTarget, 400);

    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.clearTimeout(retryTimeout);
      window.removeEventListener("load", scrollToHashTarget);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Header showOrevvBanner />
      <main role="main" id="main-content">
        <Hero />
        <RecognitionShowcase />
        <WhyChooseHelllo />
        <DeepIntegrations />
        <Features />
        <Pricing />
        <CalendlyWidget />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
      <StartupRecognitionWidget />
      <AgentChatWidget />
    </div>
  );
};

export default Index;
