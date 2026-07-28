import { useEffect } from "react";
import { setSEO } from "@/lib/seo";
import "./revengg.css";
import SignalField from "./components/SignalField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Lifecycle from "./components/Lifecycle";
import Platform from "./components/Platform";
import Outcomes from "./components/Outcomes";
import RevFooter from "./components/RevFooter";

const RevEnggPage = () => {
  useEffect(() => {
    setSEO({
      title: "RevEngg — AI Revenue Engineering Platform for D2C Brands | helllo.ai",
      description:
        "Engineer every customer interaction into measurable revenue. RevEngg's AI agents discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
      keywords:
        "revenue engineering, AI revenue platform, D2C AI agents, autonomous customer engagement, WhatsApp AI agent, voice AI agent, lead qualification AI, CRM automation",
      canonical: "https://www.helllo.ai/",
      ogUrl: "https://www.helllo.ai/",
      ogTitle: "RevEngg — AI Revenue Engineering Platform for D2C Brands",
      ogDescription:
        "AI agents that discover, enrich, qualify, engage and retain customers across Voice, WhatsApp, Email and Web.",
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
        <Platform />
        <Outcomes />
      </main>
      <RevFooter />
    </div>
  );
};

export default RevEnggPage;
