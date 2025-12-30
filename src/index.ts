export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const hostname = url.hostname;

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
      const indexUrl = new URL('/index.html', url.origin);
      return assets.fetch(indexUrl);
    }

    // Try to serve the requested file
    try {
      return await assets.fetch(request);
    } catch (error) {
      // If file not found, serve index.html for SPA routing
      const indexUrl = new URL('/index.html', url.origin);
      return assets.fetch(indexUrl);
    }
  },
};