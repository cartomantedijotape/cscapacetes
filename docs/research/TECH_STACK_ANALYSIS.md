# Tech Stack Analysis — CS Capacetes

## Original Stack
- **Framework**: React (Vite SPA) — detected via `__vite__mapDeps` and `react-dom` imports
- **CSS**: Tailwind CSS v3 (utility classes in production CSS)
- **State**: React Query (TanStack Query) for data fetching
- **Routing**: React Router v6 (detected via `react-router-dom` imports)
- **UI Primitives**: Radix UI (Toast, Popover, Accordion, Dialog, etc.)
- **Animation**: Framer Motion (detected `motion` API usage)
- **Toast**: Sonner + Radix Toast
- **Icons**: Lucide React
- **Backend**: Supabase (detected `supabase` references for orders/PIX)
- **Analytics**: TikTok Pixel, Flock analytics
- **Payment**: PIX via Supabase Edge Functions
- **QR Code**: Rendering library for PIX QR codes
- **Build tool**: Lovable.dev (detected in OG image URL)

## Our Clone Stack
- **Framework**: Next.js 16 (App Router, React 19, TypeScript strict)
- **CSS**: Tailwind CSS v4 with oklch design tokens
- **UI**: shadcn/ui (Radix primitives)
- **Icons**: Lucide React (same as original)
- **Fonts**: System font stack (matching original)
- **State**: React state (static clone, no backend needed)
- **Animation**: CSS transitions + tw-animate-css

## Key Differences
- Original is a Vite SPA; we use Next.js SSR
- Original uses Supabase for orders; we create a static showcase
- Original has real e-commerce; we clone the UI only
- We use Tailwind v4 (oklch tokens) instead of v3 (HSL)
