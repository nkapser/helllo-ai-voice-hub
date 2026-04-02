import { useEffect } from "react";

const SCRIPT_ID = "helllo-agent-chat-widget";
const SCRIPT_SRC =
  "https://unpkg.com/@helllo-ai/agent-chat-widget@latest/agent-chat.prod.js";

const WIDGET_CONFIG = {
  agentId: "5a62e595-4360-424f-8784-4804a5ae7baf",
  embedKey: "0W4EyABUclj86FyrPOcgpFuVmWjJi1bZ0MGSStnq-rc",
  position: "bottom-right" as const,
  captureCustomerInfo: true,
  allowSkipCustomerInfo: false,
  showIcon: true,
  title: "Aarohi",
  launcherText: "Chat with us",
  enableWhatsApp: true,
  whatsappPhone: '+919901678665',
  whatsapp_message: "Hi, We want to supercharge our business using helllo.ai"
};

/**
 * Loads the Helllo agent chat widget (home page only).
 */
const AgentChatWidget = () => {
  useEffect(() => {
    let cancelled = false;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (!cancelled) {
        window.AgentChatWidget?.init(WIDGET_CONFIG);
      }
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      window.AgentChatWidget?.destroy?.();
      script.remove();
    };
  }, []);

  return null;
};

export default AgentChatWidget;
