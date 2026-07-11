import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import CursorGlow from "@/components/ui/CursorGlow";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "@/components/ScrollToTop";

// Lazy-loaded page components for route-based chunk splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const WhyNexEagle = lazy(() => import("./pages/WhyNexEagle"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Careers = lazy(() => import("./pages/Careers"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Contact = lazy(() => import("./pages/Contact"));
const Team = lazy(() => import("./pages/Team"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Security = lazy(() => import("./pages/Security"));
const Leadership = lazy(() => import("./pages/team/Leadership"));
const Engineering = lazy(() => import("./pages/team/Engineering"));
const Healthcare = lazy(() => import("./pages/team/Healthcare"));
const ProductDesign = lazy(() => import("./pages/team/ProductDesign"));
const OneHMS = lazy(() => import("./pages/solutions/OneHMS"));
const OneRad = lazy(() => import("./pages/solutions/OneRad"));
const OnePharma = lazy(() => import("./pages/solutions/OnePharma"));
const OneLab = lazy(() => import("./pages/solutions/OneLab"));
const NexEagleAI = lazy(() => import("./pages/NexEagleAI"));

const queryClient = new QueryClient();

// Skeleton loader indicator during lazy route transitions
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <CursorGlow />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/why" element={<WhyNexEagle />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/team/leadership" element={<Leadership />} />
              <Route path="/team/engineering" element={<Engineering />} />
              <Route path="/team/healthcare" element={<Healthcare />} />
              <Route path="/team/product-design" element={<ProductDesign />} />
              
              {/* Solutions Routes */}
              <Route path="/solutions/1hms" element={<OneHMS />} />
              <Route path="/solutions/1rad" element={<OneRad />} />
              <Route path="/solutions/1pharma" element={<OnePharma />} />
              <Route path="/solutions/1lab" element={<OneLab />} />
              
              {/* AI Route */}
              <Route path="/ai" element={<NexEagleAI />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
