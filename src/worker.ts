export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle root path
    if (path === '/') {
      return env.ASSETS.fetch('/index.html');
    }

    // Try to serve the requested file
    try {
      return await env.ASSETS.fetch(request);
    } catch (error) {
      // If file not found, serve index.html for SPA routing
      return env.ASSETS.fetch('/index.html');
    }
  },
};
