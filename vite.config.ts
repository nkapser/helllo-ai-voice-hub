import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // SEO and Performance optimizations
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Improve loading performance with chunk splitting
        manualChunks: {
          vendor: ['react', 'react-dom'],
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
        },
      },
    },
    // Enable source maps for better debugging in production
    sourcemap: false,
    // Optimize for smaller bundle sizes
    target: 'es2015',
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Preload critical resources
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
