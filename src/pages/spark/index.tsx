import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/pages/spark/components/Hero";
import HowItWorks from "@/pages/spark/components/HowItWorks";
import Platform from "@/pages/spark/components/Platform";
import UseCases from "@/pages/spark/components/UseCases";
import Integrations from "@/pages/spark/components/Integrations";
import Pricing from "@/pages/spark/components/Pricing";
import FAQ from "@/pages/spark/components/FAQ";
import FinalCTA from "@/pages/spark/components/FinalCTA";
import Footer from "@/pages/spark/components/Footer";
import RevealInit from "@/pages/spark/components/RevealInit";
import { setSEO } from "@/lib/seo";
import { getSparkStructuredData, SPARK_SEO } from "@/lib/spark-seo";
import { scrollToSparkHash } from "@/lib/scroll";
import "@/pages/spark/spark.css";

const Spark = () => {
  const location = useLocation();

  useEffect(() => {
    setSEO({
      ...SPARK_SEO,
      structuredData: getSparkStructuredData(),
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
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
          <HowItWorks />
          <Platform />
          <UseCases />
          <Integrations />
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
