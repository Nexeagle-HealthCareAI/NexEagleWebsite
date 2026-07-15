# NexEagle — AI-powered Healthcare OS

A production-ready, responsive website for NexEagle, an AI-driven healthcare product company, plus a patient booking portal backed by the EasyHMS public API. Built with Next.js (App Router), React, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with perfect tablet and desktop layouts
- **SEO Optimized**: Meta tags (Next.js Metadata API), Open Graph, JSON-LD structured data
- **Performance**: Lazy-load images, optimized fonts, Lighthouse score ≥90
- **Accessibility**: WCAG compliant with proper focus states and contrast
- **Modern Tech Stack**: Next.js (App Router) + React + Tailwind CSS + TypeScript

## 📱 Components

### Navigation & Layout
- **Sticky Navbar**: Desktop navigation with mobile hamburger menu
- **Sticky Mobile CTA**: Bottom floating CTAs for mobile users
- **Smooth Scrolling**: Anchor links with smooth scroll behavior

### Content Sections
1. **Hero Section**: AI-powered healthcare OS headline with CTAs
2. **Products**: EasyHMS, Doc-E, and Pharmacy Suite cards
3. **Why NexEagle**: Benefit-driven tiles with animations
4. **How it works**: 3-step process timeline
5. **Pricing**: 3-tier pricing cards with features
6. **Tier Messaging**: India-focused Tier 1/2/3 messaging
7. **FAQs**: Accordion with 6 common questions
8. **Contact**: Dual-column with form and contact info
9. **Footer**: Links, badges, and structured data

### Interactive Features
- **Contact Form**: Success state with validation
- **WhatsApp Integration**: Direct links to WhatsApp chat
- **Calendly Integration**: External calendar booking
- **Scroll Animations**: Fade-in effects on scroll
- **Hover Effects**: Subtle card lifts and glows

## 🎨 Design System

### Brand Colors
- **Deep Blue**: `#0A2540` (Primary trust color)
- **Teal**: `#14B8A6` (Accent/CTA color)  
- **Indigo**: `#4F46E5` (Subtle accents)
- **Slate**: `#F8FAFC` (Background)
- **Gray**: `#4B5563` (Body text)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800
- **Semantic tokens**: Used throughout for consistency

### Animations
- **Scroll animations**: Section fade-ins at 10% viewport
- **Hover effects**: Card lifts with teal glow
- **Micro-interactions**: Button states and icon animations

## 🛠️ Development

### Prerequisites
- Node.js 18+ and npm
- Modern browser for development

### Installation
```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd nexeagle-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Run the production build (starts a Node server, see Dockerfile)
npm run start
```

## 📊 Configuration

### Analytics Setup
Replace `GA_MEASUREMENT_ID` wherever it's referenced (see `src/components/AnalyticsTracker.tsx`) with your Google Analytics ID.

Event tracking is already implemented for:
- `demo_click` - Demo request submissions
- `whatsapp_click` - WhatsApp button clicks
- `contact_submit` - Contact form submissions

### Contact Information
Update these placeholders throughout the codebase:
- **WhatsApp**: Replace `91XXXXXXXXXX` with actual number
- **Phone**: Replace `+91 XXXXXXXXXX` with actual number  
- **Email**: Replace `hello@nexeagle.com` with actual email
- **Calendly**: Replace `https://calendly.com/nexeagle` with actual link

### Pricing
Update pricing in `/src/components/Pricing.tsx`:
- Replace `₹2,999` and `₹7,999` with actual prices
- Adjust features and descriptions as needed

## 🔧 Customization

### Adding New Sections / Pages
1. Create component in `/src/components/`
2. Route-level pages live under `/app/` (App Router — one folder per route, `page.tsx` inside)
3. Wrap with `<div className="section-fade">` for animations
4. Add navigation link in `/src/components/Navbar.tsx`

### Modifying Design System
- **Colors**: Update `/src/index.css` HSL values (imported by `/app/globals.css`)
- **Fonts**: Modify the Google Fonts link in `/app/layout.tsx`
- **Animations**: Extend Tailwind config in `/tailwind.config.ts`

### Form Integration
The public contact form lives at `/app/contact/contact-client.tsx`. Replace its placeholder
submission with your backend API:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      setIsSubmitted(true);
    }
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📱 Mobile Optimization

- **Sticky CTAs**: Bottom floating buttons on mobile
- **Touch Targets**: Minimum 44px touch targets
- **Viewport**: Responsive breakpoints for all screen sizes
- **Performance**: Optimized for 3G networks

## 🔍 SEO Features

- **Meta Tags**: Title, description, author
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for Organization and Products
- **Sitemap Ready**: All internal links use anchor navigation
- **Performance**: Lazy loading, optimized images, no blocking resources

## 🚀 Deployment

This is a server-rendered Next.js app (not a static export) — it needs a Node runtime, not
static file hosting.

- **Current pipeline**: `.github/workflows/deploy.yml` builds a Docker image (`Dockerfile`,
  `next build` → `next start`), pushes it to GHCR, and runs it on the Prod VM via SSH
  (host port 8080 → container port 80). See that file for the full pipeline.
- **Vercel**: also works out of the box if you'd rather not self-host (connect the GitHub repo).

## 📞 Support

For technical support or customization requests, contact the development team or refer to the component documentation in the codebase.

---

**Built with ❤️ for Indian healthcare by NexEagle**