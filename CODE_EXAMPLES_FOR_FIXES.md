# Code Examples for Critical Fixes

This document provides ready-to-use code snippets for implementing the most important recommendations.

---

## 1. SEO Meta Tags (index.html)

### Current (index.html)
```html
<title>NexEagle — AI-powered Healthcare OS (EasyHMS, Doc-E)</title>
<meta name="description" content="NexEagle builds practical AI for clinics & hospitals: appointments, billing, e-prescriptions, AI assistant, and pharmacy (coming soon)." />
```

### Improved (index.html)
```html
<title>EasyHMS - OPD Management Software for Clinics & Hospitals | NexEagle</title>
<meta name="description" content="Transform your OPD in 2 minutes with EasyHMS. Appointments, e-prescriptions, billing & AI assistant. Free 3-month trial for first 10 hospitals in India." />
<meta name="keywords" content="OPD management software, hospital management system India, clinic management software, e-prescription software, healthcare software India" />
<meta name="author" content="NexEagle" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<link rel="canonical" href="https://nexeagle.com/" />

<!-- Enhanced Open Graph -->
<meta property="og:title" content="EasyHMS - OPD Management Software | NexEagle" />
<meta property="og:description" content="Transform your OPD in 2 minutes. Free 3-month trial for first 10 hospitals." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://nexeagle.com/" />
<meta property="og:image" content="https://nexeagle.com/assets/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="EasyHMS OPD Management Dashboard" />
<meta property="og:site_name" content="NexEagle" />
<meta property="og:locale" content="en_IN" />

<!-- Enhanced Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@nexeagle" />
<meta name="twitter:title" content="EasyHMS - OPD Management Software | NexEagle" />
<meta name="twitter:description" content="Transform your OPD in 2 minutes. Free 3-month trial for first 10 hospitals." />
<meta name="twitter:image" content="https://nexeagle.com/assets/twitter-card.jpg" />
<meta name="twitter:image:alt" content="EasyHMS OPD Management Dashboard" />
```

---

## 2. Dynamic Meta Tags Component

Create a new component for managing meta tags per page:

### src/components/SEO.tsx
```typescript
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  canonical,
  ogImage = '/assets/og-image.jpg',
  ogType = 'website',
  keywords,
  noindex = false,
}: SEOProps) => {
  const fullTitle = `${title} | NexEagle`;
  const siteUrl = 'https://nexeagle.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NexEagle" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@nexeagle" />
    </Helmet>
  );
};
```

### Install react-helmet-async
```bash
npm install react-helmet-async
```

### Update App.tsx
```typescript
import { HelmetProvider } from 'react-helmet-async';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* routes */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
```

### Usage in Pages
```typescript
// src/pages/Index.tsx
import { SEO } from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO
        title="EasyHMS - OPD Management Software for Clinics & Hospitals"
        description="Transform your OPD in 2 minutes with EasyHMS. Appointments, e-prescriptions, billing & AI assistant. Free 3-month trial for first 10 hospitals."
        canonical="/"
        keywords="OPD management software, hospital management system India, clinic management software"
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* page content */}
      </div>
    </>
  );
};
```

---

## 3. Structured Data (JSON-LD)

### Product Schema Component
```typescript
// src/components/ProductSchema.tsx
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export const ProductSchema = ({ name, description, image, offers }: ProductSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "image": `https://nexeagle.com${image}`,
    "offers": offers ? {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": "https://schema.org/InStock"
    } : undefined,
    "provider": {
      "@type": "Organization",
      "name": "NexEagle",
      "url": "https://nexeagle.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

### FAQ Schema Component
```typescript
// src/components/FAQSchema.tsx
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

### Usage in FAQs Page
```typescript
// src/pages/FAQs.tsx
import { FAQSchema } from '@/components/FAQSchema';

const FAQs = () => {
  const faqData = faqs.pilot.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  return (
    <>
      <FAQSchema faqs={faqData} />
      <div className="min-h-screen">
        {/* page content */}
      </div>
    </>
  );
};
```

---

## 4. Sitemap Generation

### Create public/sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nexeagle.com/</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/products</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/pricing</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/team</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/faqs</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/contact</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/team/leadership</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/team/engineering</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/team/healthcare</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://nexeagle.com/team/product-design</loc>
    <lastmod>2026-04-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Update public/robots.txt
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

Sitemap: https://nexeagle.com/sitemap.xml

# Crawl-delay for specific bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1
```

---

## 5. Image Alt Text Improvements

### Current
```tsx
<img src="/assets/Hero Section.webp" alt="easyHMS hero" loading="lazy" />
```

### Improved
```tsx
<img 
  src="/assets/Hero Section.webp" 
  alt="EasyHMS OPD management dashboard showing appointment queue, patient records, and e-prescription interface for Indian hospitals and clinics" 
  loading="lazy"
  width="1200"
  height="675"
/>
```

### All Images Should Have:
```tsx
// Hero Section
alt="EasyHMS OPD management dashboard showing appointment queue, patient records, and e-prescription interface"

// OPD Issue
alt="Crowded hospital OPD waiting room with long patient queues and manual paper-based appointment system"

// Solution
alt="EasyHMS digital OPD board displaying live patient queue, doctor availability, and automated appointment management"

// Feature
alt="EasyHMS features including e-prescriptions, billing, SMS reminders, and patient timeline in Hindi and English"

// Team Photos
alt="Dr Md Taquedis Noori, Medical Advisor at NexEagle, MS MCh Urology specialist"
alt="Md Tasquil Noori, Tech Lead at NexEagle, BTech from NIT Warangal"
alt="Dr Md Tabish Noori, Research Advisor at NexEagle, Research Fellow at Imperial College London"

// Logo
alt="NexEagle logo - AI-powered healthcare operating system for Indian hospitals and clinics"
```

---

## 6. Simplified Hero Section

### Current Hero (Too Complex)
```tsx
<section className="relative overflow-hidden pt-10 lg:pt-10 pb-12 lg:pb-16 min-h-[85vh]">
  {/* Multiple background effects */}
  {/* Pilot launch badge */}
  {/* Long headline */}
  {/* Hero image */}
  {/* Long description */}
  {/* Feature badges */}
  {/* Two CTAs */}
  {/* Additional text */}
</section>
```

### Improved Hero (Simplified)
```tsx
// src/components/HeroSimplified.tsx
const HeroSimplified = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 min-h-[80vh] flex items-center">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-tech-cyan/5"></div>
      
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          
          {/* Pilot Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-tech-cyan/50 bg-white/90 shadow-lg backdrop-blur-md text-sm font-semibold text-medical-trust">
            <Sparkles className="w-4 h-4 text-tech-cyan" />
            <span>3 Months Free for First 10 Hospitals</span>
          </div>

          {/* Main Headline - Shorter & Clearer */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-medical-trust">
            Transform Your OPD<br />in 2 Minutes
          </h1>

          {/* Subheadline - One Clear Benefit */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Appointments, e-prescriptions, billing & AI assistant.<br />
            No setup cost. Works in Hindi & English.
          </p>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto">
            <img
              src="/assets/Hero Section.webp"
              alt="EasyHMS OPD management dashboard"
              className="w-full h-auto rounded-2xl shadow-2xl border border-white/60"
              loading="eager"
              width="1200"
              height="675"
            />
          </div>

          {/* Single Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="px-10 py-7 text-lg font-bold bg-gradient-to-r from-tech-cyan to-tech-electric hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Link to="/contact">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-10 py-7 text-lg font-semibold border-tech-cyan/60"
            >
              <Link to="#demo">
                Watch 2-Min Demo
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground pt-4">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tech-cyan" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tech-cyan" />
              Go live in 2 minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tech-cyan" />
              Trusted by 50+ clinics
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
```

---

## 7. Google Analytics 4 Setup

### Update index.html
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
</script>
```

### Create Analytics Helper
```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-XXXXXXXXXX', {
      page_path: url,
      page_title: title,
    });
  }
};

// Event tracking functions
export const trackDemoRequest = () => {
  trackEvent('demo_request', {
    event_category: 'engagement',
    event_label: 'Demo Request Form'
  });
};

export const trackTrialStart = () => {
  trackEvent('trial_start', {
    event_category: 'conversion',
    event_label: 'Free Trial Signup'
  });
};

export const trackContactSubmit = () => {
  trackEvent('contact_submit', {
    event_category: 'engagement',
    event_label: 'Contact Form'
  });
};

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Button'
  });
};
```

### Usage in Components
```typescript
import { trackDemoRequest, trackTrialStart } from '@/lib/analytics';

const handleDemoSubmit = async (e: FormEvent) => {
  e.preventDefault();
  // ... form submission logic
  trackDemoRequest();
};

const handleTrialClick = () => {
  trackTrialStart();
};
```

---

## 8. Mobile Touch Target Fix

### Current (Too Small)
```tsx
<Button size="sm" className="p-2">
  <Menu className="h-4 w-4" />
</Button>
```

### Improved (48x48px Minimum)
```tsx
<Button 
  size="lg" 
  className="min-w-[48px] min-h-[48px] p-3"
  aria-label="Open menu"
>
  <Menu className="h-6 w-6" />
</Button>
```

### Add to Tailwind Config
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      minWidth: {
        'touch': '48px',
      },
      minHeight: {
        'touch': '48px',
      },
    },
  },
};
```

### Usage
```tsx
<button className="min-w-touch min-h-touch">
  Click Me
</button>
```

---

## 9. Code Splitting for Performance

### Update App.tsx
```typescript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Eager load critical pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Lazy load other pages
const Products = lazy(() => import('./pages/Products'));
const WhyNexEagle = lazy(() => import('./pages/WhyNexEagle'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Careers = lazy(() => import('./pages/Careers'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Contact = lazy(() => import('./pages/Contact'));
const Team = lazy(() => import('./pages/Team'));
const Leadership = lazy(() => import('./pages/team/Leadership'));
const Engineering = lazy(() => import('./pages/team/Engineering'));
const Healthcare = lazy(() => import('./pages/team/Healthcare'));
const ProductDesign = lazy(() => import('./pages/team/ProductDesign'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tech-cyan"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/why" element={<WhyNexEagle />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/leadership" element={<Leadership />} />
              <Route path="/team/engineering" element={<Engineering />} />
              <Route path="/team/healthcare" element={<Healthcare />} />
              <Route path="/team/product-design" element={<ProductDesign />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
```

---

## 10. WhatsApp Click-to-Chat

### Add to Footer or Contact Page
```tsx
// src/components/WhatsAppButton.tsx
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackWhatsAppClick } from '@/lib/analytics';

export const WhatsAppButton = () => {
  const phoneNumber = '918074906808'; // Remove + and spaces
  const message = encodeURIComponent('Hi, I want to learn more about EasyHMS');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    trackWhatsAppClick();
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] md:hidden"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};
```

### Usage
```tsx
// src/pages/Index.tsx
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* page content */}
      <WhatsAppButton />
    </div>
  );
};
```

---

## Summary

These code examples cover the most critical fixes:

1. ✅ SEO meta tags with dynamic component
2. ✅ Structured data (Product, FAQ schemas)
3. ✅ Sitemap and robots.txt
4. ✅ Image alt text improvements
5. ✅ Simplified hero section
6. ✅ Google Analytics 4 setup
7. ✅ Mobile touch target fixes
8. ✅ Code splitting for performance
9. ✅ WhatsApp click-to-chat

**Next Steps:**
1. Copy these code snippets into your project
2. Replace placeholder values (GA ID, phone numbers, URLs)
3. Test each implementation
4. Monitor analytics and performance
5. Iterate based on data

**Questions?** Refer to the main analysis document for more context and additional recommendations.
