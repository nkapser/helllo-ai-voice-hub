import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import Console from "./pages/Console";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const Spark = lazy(() => import("./pages/spark"));
const RevEngg = lazy(() => import("./pages/revengg"));
const Brand = lazy(() => import("./pages/brand"));

const queryClient = new QueryClient();

function RevEnggRouteFallback() {
  return (
    <div
      className="min-h-screen bg-[hsl(210_40%_98%)]"
      aria-busy="true"
      aria-label="Loading RevEngg"
    />
  );
}

function SparkRouteFallback() {
  return (
    <div
      className="min-h-screen bg-[hsl(210_40%_98%)]"
      aria-busy="true"
      aria-label="Loading Spark"
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Legacy path — same Helllo Voice page as / */}
            <Route path="/helllo" element={<Index />} />
            <Route
              path="/orevv-ai"
              element={
                <Suspense fallback={<RevEnggRouteFallback />}>
                  <RevEngg />
                </Suspense>
              }
            />
            <Route
              path="/brand"
              element={
                <Suspense fallback={<RevEnggRouteFallback />}>
                  <Brand />
                </Suspense>
              }
            />
            {/* Old name for /brand — keep so existing links don't 404 */}
            <Route path="/design-language-system" element={<Navigate to="/brand" replace />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
            <Route path="/console" element={<Console />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route
              path="/spark"
              element={
                <Suspense fallback={<SparkRouteFallback />}>
                  <Spark />
                </Suspense>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
