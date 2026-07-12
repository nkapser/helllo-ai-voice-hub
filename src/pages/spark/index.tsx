import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/pages/spark/components/Hero";
import FeatureShowcase from "@/pages/spark/components/FeatureShowcase";
import Pricing from "@/pages/spark/components/Pricing";
import FAQ from "@/pages/spark/components/FAQ";
import FinalCTA from "@/pages/spark/components/FinalCTA";
import Footer from "@/pages/spark/components/Footer";
import RevealInit from "@/pages/spark/components/RevealInit";
import { setSEO } from "@/lib/seo";
import { scrollToSparkHash } from "@/lib/scroll";
import "@/pages/spark/spark.css";

const Spark = () => {
  const location = useLocation();

  useEffect(() => {
    setSEO({
      title: "Spark — Give your website a brain | Helllo.ai",
      description:
        "Paste your URL. In 30 seconds, get an AI assistant trained on your site that answers questions, books meetings, and guides visitors to the right page — then embed it in one line of code.",
      keywords:
        "AI website assistant, website chatbot, voice AI for websites, Spark Helllo.ai, no-code chatbot",
      canonical: "https://www.helllo.ai/spark",
      ogTitle: "Spark — Give your website a brain",
      ogDescription:
        "Paste your URL → AI assistant trained on your site in 30 seconds → answers, navigates, books meetings → one script tag, go live.",
      ogUrl: "https://www.helllo.ai/spark",
      ogImage: "https://helllo.ai/og/spark.png",
      twitterTitle: "Spark — Give your website a brain",
      twitterDescription:
        "Paste your URL → 30 seconds → AI assistant trained on your site → answers, navigates, books meetings.",
      twitterImage: "https://helllo.ai/og/spark.png",
    });

    document.documentElement.style.scrollSnapType = "none";
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    const scrollToHashTarget = () => {
      scrollToSparkHash(location.hash);
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

    const retryTimeout = window.setTimeout(scrollToHashTarget, 400);
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.clearTimeout(retryTimeout);
      window.removeEventListener("load", scrollToHashTarget);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, [location.hash]);

  return (
    <div className="spark-page antialiased">
      <div className="spark-aurora" aria-hidden="true" />
      <div className="spark-grid" aria-hidden="true" />
      <RevealInit />

      <div className="spark-content relative flex min-h-screen w-full flex-col">
        <Hero />
        <FeatureShowcase />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Spark;
