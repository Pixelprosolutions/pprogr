# PixelPro Design System

## Core Principles
1. **Premium Aesthetics** - Glassmorphism, subtle gradients, and smooth animations
2. **Consistency** - Reusable components with standardized styling
3. **Responsiveness** - Mobile-first approach with adaptive layouts
4. **Accessibility** - AA contrast ratios and clear visual hierarchy

## Typography
```jsx
// Headings
<h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
// Subheadings  
<h2 className="text-2xl font-bold text-white">
// Body text
<p className="text-gray-300/80 text-xl md:text-2xl leading-relaxed">
```

## Color Palette
- Primary: `bg-purple-400` to `bg-pink-600` (gradients)
- Accent: `bg-accent/50` (configurable in tailwind.config.js)
- Backgrounds: `bg-black/30` to `bg-black/50` (gradients)
- Text: `text-white` and `text-gray-300/80`

## Components

### Cards
```jsx
<div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-pink-500/10">
```

### Buttons
```jsx
<button className="bg-accent/50 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-lg font-medium hover:bg-accent/70 transition-all duration-300">
```

### Layout Grids
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

## Spacing System
- Page padding: `pt-32 pb-20`
- Section margins: `mb-20`
- Card padding: `p-8` 
- Button padding: `py-3 px-6`

## Animation Rules
- Hover effects: `transition-all duration-300`
- Card lift: `hover:-translate-y-2`
- Button states: `hover:bg-accent/70`

## Implementation Guide
1. Use container classes for responsive widths
2. Apply consistent transition durations
3. Maintain 50% transparency on interactive elements
4. Test contrast ratios for accessibility
5. Document new components in this file
