# Design Tokens — CS Capacetes

## Colors (HSL from CSS variables)

### Primary Colors
- **Primary**: `hsl(350, 80%, 55%)` — Pinkish-red (#ee4d7a is used as accent)
- **Primary Foreground**: `hsl(0, 0%, 100%)` — White
- **Accent**: `hsl(24, 95%, 53%)` — Orange (used for price badges)
- **Accent Foreground**: `hsl(0, 0%, 100%)`

### Background / Surface
- **Background**: `hsl(0, 0%, 100%)` — White
- **Foreground**: `hsl(0, 0%, 13%)` — Near-black
- **Card**: `hsl(0, 0%, 100%)`
- **Card Foreground**: `hsl(0, 0%, 13%)`
- **Muted**: `hsl(0, 0%, 96%)`
- **Muted Foreground**: `hsl(0, 0%, 45%)`
- **Secondary**: `hsl(0, 0%, 96%)`

### Decorative & Special
- **Price BG From**: `hsl(28, 92%, 52%)` — Orange gradient start
- **Price BG To**: `hsl(18, 85%, 50%)` — Orange gradient end
- **Star**: `hsl(45, 100%, 50%)` — Gold for ratings
- **Green Badge**: `hsl(145, 63%, 42%)` — Green for "sold" badges
- **Timer BG**: `hsl(0, 0%, 13%)`
- **Link Color**: `hsl(200, 80%, 45%)` — Blue links
- **Dark Footer BG**: `hsl(220, 20%, 18%)` — Dark blue-gray
- **Dark Footer Foreground**: `hsl(0, 0%, 85%)`
- **Destructive**: `hsl(0, 84.2%, 60.2%)` — Red

### Named Colors
- `#ee4d7a` — Primary pink/magenta accent
- `#d4458a` — Deeper pink for hover
- `#f5f5f5` — Light gray backgrounds
- `#2a2a2a` — Dark backgrounds
- `#1e293b` — Slate dark

### Border
- **Border**: `hsl(0, 0%, 90%)`
- **Input**: `hsl(0, 0%, 90%)`
- **Ring**: `hsl(350, 80%, 55%)` — Matches primary
- **Radius**: `0.5rem` (8px)

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
```
System font stack — no custom web fonts.

### Font Sizes Used
- `text-xs`: 0.75rem (12px)
- `text-[10px]`: 10px
- `text-[11px]`: 11px  
- `text-[13px]`: 13px
- `text-[14px]`: 14px
- `text-[15px]`: 15px
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px)
- `text-[26px]`: 26px

### Font Weights
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)
- `font-extrabold` (800)

## Spacing Scale
Standard Tailwind v3 scale: 0.25rem increments (4px base)

## Shadows
- `shadow-sm`: small cards
- `shadow-md`: product cards
- `shadow-lg`: popups
- `shadow-xl`: modals
- `shadow-2xl`: overlays
- Custom: `0 -2px 10px rgba(0,0,0,0.08)` — bottom bar shadow

## Border Radius
- `rounded-sm`: calc(0.5rem - 4px)
- `rounded-md`: calc(0.5rem - 2px)
- `rounded-lg`: 0.5rem
- `rounded-xl`: 0.75rem
- `rounded-2xl`: 1rem
- `rounded-full`: 9999px (pill buttons)

## Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

## Z-Index Layers
- Content: 1
- Sticky nav: 10-20
- Modals: 30-40
- Overlays: 50
- WhatsApp button: 60
- Toast: 100
- Max: 9999
