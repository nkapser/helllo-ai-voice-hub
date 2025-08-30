export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Get the assets binding - try different possible names
    const assets = env.ASSETS || env.__STATIC_CONTENT_MANIFEST || env.SITE || env.ASSETS_BINDING;

    if (!assets) {
      return new Response('Assets binding not found', { status: 500 });
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