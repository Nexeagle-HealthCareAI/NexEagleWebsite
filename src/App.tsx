import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import CursorGlow from "@/components/ui/CursorGlow";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Services from "./pages/Services";
import WhyNexEagle from "./pages/WhyNexEagle";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import Leadership from "./pages/team/Leadership";
import Engineering from "./pages/team/Engineering";
import Healthcare from "./pages/team/Healthcare";
import ProductDesign from "./pages/team/ProductDesign";
import OneHMS from "./pages/solutions/OneHMS";
import OneRad from "./pages/solutions/OneRad";
import OnePharma from "./pages/solutions/OnePharma";
import OneLab from "./pages/solutions/OneLab";
import NexEagleAI from "./pages/NexEagleAI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <CursorGlow />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why" element={<WhyNexEagle />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            {/* <Route path="/pricing" element={<Pricing />} /> */}
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
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
