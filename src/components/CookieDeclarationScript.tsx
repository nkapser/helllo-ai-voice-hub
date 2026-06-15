import { useEffect, useRef } from "react";

const COOKIE_DECLARATION_ID = "CookieDeclaration";
const COOKIE_DECLARATION_SRC =
  "https://consent.cookiebot.com/4d629a25-6df2-43ed-b35a-b585ef17c881/cd.js";

/**
 * Loads Cookiebot's cookie declaration table. Use only on the privacy/cookie policy page.
 */
const CookieDeclarationScript = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || document.getElementById(COOKIE_DECLARATION_ID)) return;

    const script = document.createElement("script");
    script.id = COOKIE_DECLARATION_ID;
    script.src = COOKIE_DECLARATION_SRC;
    script.type = "text/javascript";
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="not-prose mt-6" aria-label="Cookie declaration" />;
};

export default CookieDeclarationScript;
