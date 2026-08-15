import { createPricingRegionResponse } from "@/lib/pricing-region-server";
import { isBotUserAgent } from "@/lib/seo";
import { patchSparkIndexHtml } from "@/lib/spark-seo";
import { patchRevEnggIndexHtml } from "@/lib/revengg-seo";
import { patchHellloIndexHtml } from "@/lib/helllo-seo";

// This is a client-rendered SPA: every route serves the same index.html,
// and only client-side JS (setSEO, see src/lib/seo.ts) corrects the
// title/description/OG/JSON-LD per page. Bots and social-preview
// scrapers that don't execute JS (GPTBot, ClaudeBot, PerplexityBot,
// facebookexternalhit, Twitterbot, LinkedInBot, WhatsApp, …) would
// otherwise see the same generic tags no matter which product page
// they requested. We detect those bots here and rewrite index.html
// with the correct per-route SEO before returning it — one patcher per
// product route, matched by path.
const ROUTE_PATCHERS: Record<string, (html: string) => string> = {
  "/": patchHellloIndexHtml,
  "/helllo": patchHellloIndexHtml,
  "/orevv-ai": patchRevEnggIndexHtml,
  "/spark": patchSparkIndexHtml,
};

function resolvePatcher(pathname: string): ((html: string) => string) | undefined {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
  return ROUTE_PATCHERS[normalized];
}

async function serveIndexHtml(
  assets: { fetch: (input: RequestInfo | URL) => Promise<Response> },
  url: URL,
  request: Request,
): Promise<Response> {
  const indexUrl = new URL("/index.html", url.origin);
  const indexResponse = await assets.fetch(indexUrl);
  const patch = resolvePatcher(url.pathname);

  if (patch && isBotUserAgent(request.headers.get("user-agent"))) {
    const html = await indexResponse.text();
    return new Response(patch(html), {
      status: indexResponse.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  return indexResponse;
}

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const hostname = url.hostname;

    if (path === "/api/pricing-region") {
      return createPricingRegionResponse(request);
    }

    // Get the assets binding - try different possible names
    const assets = env.ASSETS || env.__STATIC_CONTENT_MANIFEST || env.SITE || env.ASSETS_BINDING;

    if (!assets) {
      return new Response('Assets binding not found', { status: 500 });
    }

    // Handle robots.txt - serve staging version for staging domains
    if (path === '/robots.txt') {
      const isStaging = hostname === 'staging.helllo.ai' || hostname === 'dash-staging.helllo.ai' || hostname.includes('staging');
      const robotsFile = isStaging ? '/robots-staging.txt' : '/robots.txt';
      
      try {
        const robotsUrl = new URL(robotsFile, url.origin);
        const robotsResponse = await assets.fetch(robotsUrl);
        if (robotsResponse.ok) {
          return new Response(robotsResponse.body, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
            },
          });
        }
      } catch (error) {
        // Fall through to default robots.txt if staging file not found
      }
    }

    // For SPA routing, serve index.html for all routes that don't have a file extension
    if (!path.includes('.')) {
      return serveIndexHtml(assets, url, request);
    }

    // Try to serve the requested file
    try {
      return await assets.fetch(request);
    } catch (error) {
      // If file not found, serve index.html for SPA routing
      return serveIndexHtml(assets, url, request);
    }
  },
};