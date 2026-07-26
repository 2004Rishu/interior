# Design Audit: Interior Me

## Baseline Visual Language
This document captures the existing visual identity of the Interior Me application to serve as the baseline for the premium upgrade in Phase 3. The goal is to elevate the UI to the standards of Houzz, Airbnb, Linear, and Vercel while preserving the brand's core essence.

### 1. Color Palette (Current State)
- **Primary Brand Colors**: 
  - `charcoal-900`: Used for primary headings, hero gradients, buttons, and high-contrast badges.
  - `charcoal-800`: Used for secondary text and hover states.
- **Background & Accent Colors**: 
  - `sand-50`: Main background for light sections.
  - `sand-100`, `sand-200`: Used for section backgrounds, image placeholders, and subtle borders.
  - `sand-300`, `sand-400`, `sand-500`, `sand-600`, `sand-700`: Used for secondary text, descriptions, and UI element borders.
- **Success/System Colors**: 
  - `sage-200`, `sage-600`, `sage-900`: Used for positive status badges (e.g., "Matched").
- **Dark Mode**: Currently missing. The app is entirely light-themed except for the dark "Trust Section" (`bg-charcoal-900`) and the hero overlay.

### 2. Typography
- **Headings (`font-serif`)**: The brand leans heavily on serif fonts for elegance and luxury (used in `h1`, `h2`, `h3`).
- **Body (`font-sans`)**: Standard sans-serif for body copy and UI elements (buttons, badges).
- **Weights**: Ranges from `font-light` in hero descriptions to `font-medium` in buttons and `font-normal` in body text.
- **Scale**: Heavy use of large, impactful typography in heroes (`text-4xl` to `text-7xl leading-tight`).

### 3. Spacing & Layout
- **Containers**: Relies on `max-w-7xl`, `max-w-5xl`, and `max-w-4xl` with generous horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Vertical Rhythm**: Generous vertical spacing between sections (`py-24 md:py-32`) to communicate luxury and breathing room.
- **Grids**: Standard 1-to-3 or 1-to-2 column grids for features, projects, and trust metrics.

### 4. Components & Primitives
- **Buttons**: Square or slightly rounded, large hit areas (`h-14`), solid colors with simple opacity/color hover transitions.
- **Badges**: Uppercase, tracking-widest, small font (`text-xs`), used for project statuses and styles.
- **Cards (Projects)**: Image-heavy, 4/3 aspect ratio, with a subtle zoom on hover (`hover:scale-105`). Text sits below the image.
- **Inputs**: Currently using simple bottom-border inputs (`border-b border-sand-300 bg-transparent`) for a minimalist, airy feel.

### 5. Motion & Interaction
- **Framer Motion**: Currently used for simple fade-ins and slide-ups (`y: 20` to `y: 0`) on scroll (`whileInView`).
- **Hover Effects**: Image scaling on project cards, background color swaps on buttons and process steps.
- **Transitions**: Standard CSS transitions (`transition-all`, `transition-colors`, `duration-500`, `duration-700`) used to soften interactions.

## Targets for Phase 3 Premium Upgrade
1. **Formalize Tokens**: Extract these raw tailwind classes into a strict token system (Colors, Spacing, Typography).
2. **Dark Mode Parity**: Design a dark mode palette that translates `sand` to deep charcoal/obsidian tones while keeping the luxury feel.
3. **Glassmorphism**: Introduce subtle blurs (`backdrop-blur-md`, `bg-white/70`) for sticky navs and modals.
4. **Primitive Library**: Standardize the bottom-border inputs, solid buttons, and project cards into reusable React components (`<Input />`, `<Button />`, `<Card />`).
5. **Loading States**: Replace missing data states with animated skeletons matching the card aspect ratios.
