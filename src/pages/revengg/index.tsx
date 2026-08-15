import { useEffect } from "react";
import { setSEO } from "@/lib/seo";
import { REVENGG_SEO, getRevEnggStructuredData } from "@/lib/revengg-seo";
import "./revengg.css";
import SignalField from "./components/SignalField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Lifecycle from "./components/Lifecycle";
import Problems from "./components/Problems";
import Platform from "./components/Platform";
import Outcomes from "./components/Outcomes";
import RevFooter from "./components/RevFooter";

const RevEnggPage = () => {
  useEffect(() => {
    setSEO({
      ...REVENGG_SEO,
      structuredData: getRevEnggStructuredData(),
    });
    document.documentElement.lang = "en";
  }, []);

  return (
    <div className="rev-page relative min-h-screen overflow-x-clip">
      <div className="rev-aurora" aria-hidden="true" />
      <div className="rev-grid" aria-hidden="true" />
      <SignalField />
      <Nav />
      <main>
        <Hero />
        <Lifecycle />
        <Problems />
        <Platform />
        <Outcomes />
      </main>
      <RevFooter />
    </div>
  );
};

export default RevEnggPage;
