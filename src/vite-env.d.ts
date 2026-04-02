/// <reference types="vite/client" />

interface Window {
  AgentChatWidget?: {
    init: (config: Record<string, unknown>) => void;
    destroy?: () => void;
  };
}
