# 80s Retro Component Library

A Vite + Vike + React + Tailwind CSS component library inspired by 80s VHS covers and line art aesthetics. Features pastel colors, geometric shapes, and subtle retro elements.

## 🎨 Design Philosophy

This library captures the essence of 1980s graphic design with:
- **Pastel Color Palette**: Teal, orange/peach, purple/magenta, and pink
- **Geometric Elements**: Circles, triangles, squares with layered line art
- **Technical Aesthetics**: Blueprint-style lines and grid patterns
- **Subtle Effects**: Scan lines, glowing borders, and gradient accents
- **VHS-Inspired**: Chevron patterns reminiscent of 80s video covers

## 🎯 Color Palette

```css
Teal:   #4ecdc4 / #95e1d3
Orange: #ff9a76 / #ffb88c
Purple: #9b59b6 / #c77dff
Pink:   #ff6b9d
Dark:   #1a1a1d
```

## 📦 Components

### UI Components

Located in `components/retro/`:

#### RetroButton
Calculator-inspired buttons with charcoal gradient and 3D press effect.
```tsx
<RetroButton size="md">
  Click Me
</RetroButton>

// With pastel border
<RetroButton borderColor="#4ECDC4">
  Teal Border
</RetroButton>
```
Props: `borderColor` (optional pastel color string)
Sizes: `sm`, `md`, `lg`

#### RetroCard
Cards with corner accent marks and border variants.
```tsx
<RetroCard variant="highlighted">
  <h3>Card Title</h3>
  <p>Card content...</p>
</RetroCard>
```
Variants: `default`, `highlighted`, `bordered`

#### RetroBadge
Small badges with color variants.
```tsx
<RetroBadge variant="teal">Label</RetroBadge>
```
Variants: `teal`, `orange`, `purple`, `pink`

#### RetroInput / RetroTextarea
Form inputs with glowing focus states.
```tsx
<RetroInput label="Name" placeholder="Enter name..." />
<RetroTextarea label="Message" placeholder="Type here..." />
```

#### RetroDivider
Horizontal dividers with different styles.
```tsx
<RetroDivider variant="gradient" />
```
Variants: `solid`, `gradient`, `dashed`

#### VHSTapeSpine
Video tape spine component with handwritten label, VHS logo, and random stickers.
```tsx
<VHSTapeSpine 
  mainText="Mark & Kathy" 
  mainTextColor="#ff6b9d" 
  subtitleText="Wedding 1985"
/>
```
Props:
- `mainText` (required): Large handwritten text on label
- `mainTextColor` (optional): Color for main text (default: #ff6b9d)
- `subtitleText` (optional): Smaller subtitle text in marker style

### SVG Background Components

#### ChevronPattern
Layered V-shaped stripes inspired by 80s VHS covers.
```tsx
<ChevronPattern className="w-64 h-32" />
```

#### GridPattern
Subtle perspective grid overlay.
```tsx
<GridPattern className="fixed inset-0 opacity-30" />
```

#### ScanLines
Horizontal scan line effect.
```tsx
<ScanLines className="fixed inset-0" />
```

#### Geometric Shapes
Line art geometric elements:
```tsx
<GeometricCircle color="teal" className="w-32 h-32" />
<GeometricTriangle color="orange" className="w-32 h-32" />
<GeometricSquare color="purple" className="w-32 h-32" />
```

#### BlueprintLines
Technical drawing style grid.
```tsx
<BlueprintLines className="w-full h-48" />
```

## 🚀 Usage

Import components from the retro component library:

```tsx
import {
  RetroButton,
  RetroCard,
  RetroBadge,
  ChevronPattern,
  GridPattern,
  ScanLines,
} from "@/components/retro";
```

## 🎭 Color Variables

The color palette is defined in `pages/tailwind.css` using Tailwind CSS custom properties:

```css
--primary: Teal (main accent)
--secondary: Orange (secondary accent)
--accent: Purple (tertiary accent)
--background: Dark charcoal
--foreground: Light text color
```

## 📁 Project Structure

```
components/
  retro/
    RetroButton.tsx       # Button component
    RetroCard.tsx         # Card component
    RetroBadge.tsx        # Badge component
    RetroInput.tsx        # Input & Textarea
    RetroDivider.tsx      # Divider component
    VHSCard.tsx           # VHS cassette card
    VHSTapeSpine.tsx      # VHS tape spine
    ChevronPattern.tsx    # VHS-style chevron SVG
    GridPattern.tsx       # Grid background SVG
    ScanLines.tsx         # Scan line effect SVG
    GeometricShapes.tsx   # Geometric line art SVGs
    index.ts              # Barrel export
pages/
  index/
    +Page.tsx             # Component showcase page
  tailwind.css            # Custom theme configuration
```

## 🎨 Styling Guidelines

1. **Glow Effects**: Use subtle `shadow-[0_0_20px_rgba(...)]` for retro neon feel
2. **Borders**: 2px borders with matching glow colors
3. **Typography**: Uppercase tracking for headers, clean sans-serif
4. **Spacing**: Generous padding and margins for breathing room
5. **Opacity**: Layer SVG backgrounds at 20-40% opacity
6. **Transitions**: Smooth 200-300ms transitions for hover states

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎯 Design Inspiration

- 80s VHS cover art and tape designs
- Technical blueprint drawings
- Geometric minimalism
- Pastel color schemes from 80s/90s design
- Tron-inspired grid aesthetics (light touch)
- Retro computer interface design

## 📝 Notes

- All SVG components are inline for easy customization
- Colors use CSS custom properties for easy theming
- Components built with accessibility in mind
- Fully responsive design
- TypeScript support throughout
- Tailwind CSS for utility styling
