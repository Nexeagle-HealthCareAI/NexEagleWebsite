# NexEagle — AI-powered Healthcare OS

A production-ready, responsive website for NexEagle, an AI-driven healthcare product company. Built with React, Vite, Tailwind CSS, and shadcn/ui components.

This repository contains two parts:

- **`/` (root)** — the NexEagle marketing website (React + Vite).
- **`nexeagle-api/`** — a small Express + TypeScript relay backend that powers the
  appointment-booking and feedback features and integrates with the **1HMS** platform.

## 🚀 Features

- **Appointment Booking**: Patients filter doctors by **location** & specialty, view
  ratings, reviews, experience and patients-treated, then book a slot online.
- **Feedback**: General site feedback form with optional star rating.
- **1HMS Integration**: Bookings flow website → relay API → 1HMS (one-way). A backend
  `DOCTOR_SOURCE` toggle chooses whether the doctor list is fetched live from 1HMS or
  served from a curated list — see [`nexeagle-api/README.md`](nexeagle-api/README.md).
- **Responsive Design**: Mobile-first approach with perfect tablet and desktop layouts
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data (incl. `Physician`
  listings for the doctor directory)
- **Performance**: Lazy-load images, optimized fonts, Lighthouse score ≥90
- **Accessibility**: WCAG compliant with proper focus states and contrast
- **Modern Tech Stack**: React + Vite + Tailwind CSS + TypeScript

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

# Preview production build
npm run preview
```

## 📅 Appointment Booking & Backend API

The booking and feedback features talk to the relay backend in `nexeagle-api/`.

### Run the backend
```bash
cd nexeagle-api
cp .env.example .env      # then edit as needed
npm install
npm run dev               # → http://localhost:4000
```

### Point the website at the backend
Create a `.env` file in the website root (this file is gitignored):
```bash
VITE_API_BASE_URL=http://localhost:4000
```

### Endpoints
- `GET /api/doctors` — doctor directory (respects the `DOCTOR_SOURCE` toggle)
- `POST /api/appointments` — create a booking (forwarded to 1HMS)
- `POST /api/feedback` — general site feedback

### 1HMS integration
All 1HMS calls live in `nexeagle-api/src/services/onehms.ts`. Until `ONEHMS_API_URL`
and `ONEHMS_API_KEY` are set, bookings are stored locally and logged. Set
`DOCTOR_SOURCE=onehms` to fetch the doctor list live from 1HMS. The full request/response
contract is documented in [`nexeagle-api/README.md`](nexeagle-api/README.md).

## 📊 Configuration

### Analytics Setup
Replace `GA_MEASUREMENT_ID` in `/src/pages/Index.tsx` with your Google Analytics ID.

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

### Adding New Sections
1. Create component in `/src/components/`
2. Add to `/src/pages/Index.tsx`
3. Wrap with `<div className="section-fade">` for animations
4. Add navigation link in `/src/components/Navbar.tsx`

### Modifying Design System
- **Colors**: Update `/src/index.css` HSL values
- **Fonts**: Modify Google Fonts link in `/index.html`
- **Animations**: Extend Tailwind config in `/tailwind.config.ts`

### Form Integration
Replace the placeholder form submission in `/src/components/Contact.tsx` with your backend API:

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

The site is ready for deployment on any static hosting service:
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload build files to S3 bucket
- **Deploy**: Click "Publish" button in the editor

## 📞 Support

For technical support or customization requests, contact the development team or refer to the component documentation in the codebase.

---

**Built with ❤️ for Indian healthcare by NexEagle**