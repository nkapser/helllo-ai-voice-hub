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
        // Add content hashes to prevent cache issues
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    // Enable source maps for better debugging in production
    sourcemap: false,
    // Optimize for smaller bundle sizes
    target: 'es2015',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate manifest for cache busting
    manifest: true,
  },
  // Preload critical resources
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
