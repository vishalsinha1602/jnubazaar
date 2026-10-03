---
name: Campus Commerce Minimal
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#434655'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#784b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#996100'
  on-tertiary-container: '#ffeedd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  price-display:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a focused, pragmatic, and high-trust peer-to-peer campus marketplace. It blends the structured utility of Material Design 3 with crisp modern digital product standards, avoiding excessive ornamental glassmorphism, aggressive neomorphism, or saturated multi-tone gradients.

### Audience & Mood
- **Target Audience:** Jawaharlal Nehru University (JNU) undergraduate, postgraduate, and doctoral scholars, campus staff, and faculty looking for immediate, hyper-local exchange (textbooks, lab equipment, cycles, room coolers, electronics, and study essentials).
- **Core Emotional Signals:** Institutional trust, peer safety, utility-first clarity, and unencumbered transactional speed.
- **Visual Stance:** Scholarly restraint meets frictionless modern e-commerce. Content (product photography, item condition, price transparency in ₹, and precise pickup points) takes absolute center stage over stylistic excess.

## Colors

The palette is engineered for daylight outdoor campus legibility and institutional reliability. High WCAG AAA contrast ratios are maintained across all informational and transactional touchpoints.

### Key Roles & Semantics
- **Primary (`#2563EB` - Royal Blue):** Used for verified badges, primary action triggers (Chat Seller, Make Offer, Post Listing), and active navigational tabs.
- **Secondary (`#0F766E` - Deep Teal):** Designates campus safety, verified student email validation badges, in-person safe-zone handoff indicators, and eco-friendly / circular reuse tags.
- **Tertiary (`#F59E0B` - Amber Warmth):** Reserved for urgent listings, pending offers, price-drop badges, and moderation flags.
- **Neutral Primary (`#111827` - Slate Charcoal):** Base canvas typography and prominent pricing figures (`₹`).
- **Neutral Secondary (`#4B5563` & `#6B7280`):** Timestamps, condition subtext, hostel location breadcrumbs, and inactive controls.
- **Surface & Borders:** Default ground sits at `#F9FAFB` with white `#FFFFFF` surface cards, separated by an assertive structural border (`#E5E7EB`).

## Typography

Inter powers the entire system to deliver uniform digital legibility on both low-cost mobile screens and high-DPI desktop viewports.

### Application Guidelines
- **Rupee Currency Display:** Currency symbols (`₹`) paired with figures must render using tabular figures (`font-variant-numeric: tabular-nums`) with `price-display` weight (700) to reinforce scan speed when browsing crowded card feeds.
- **Campus Location Breadcrumbs:** Hostel tags (e.g., *Ganga Hostel*, *Brahmaputra*, *KC Market*) utilize `label-md` uppercase or semi-bold micro-copy to prevent visual collision with the item's primary title.
- **Seller Trust Metadata:** Verified student enrollment tags, departmental affiliations (e.g., *School of International Studies*, *SLL&CS*), and profile ratings render strictly in `label-md` or `label-sm`.

## Layout & Spacing

A disciplined 8px layout grid governs all structural spacing, maximizing content visibility and lowering touch frustration on mobile devices used while walking around campus.

### Responsive Breakpoints & Grid Rules
- **Mobile (0 – 639px):** 4-column fluid layout with `margin: 1rem` (16px) and `gutter: 1rem` (16px). Product listings default to a dense 2-column card arrangement to optimize vertical scroll distance.
- **Tablet (640px – 1023px):** 8-column layout with 24px margins, reflowing product grids into 3 columns, pairing filters into an expandable side sheet.
- **Desktop (1024px+):** 12-column layout capped at a maximum width of `1280px` centered. Fixed 280px left sidebar for campus zones (North Gate, Dakshinapuram, Library) and nested categories; 4-column product grid with `margin-desktop: 2rem` and `gutter-desktop: 1.5rem`.

## Elevation & Depth

This design system uses a low-elevation, high-boundary surface model rooted in Material Design 3. Visual hierarchy relies on tonal differentiation and hairline dividers, backed by ultra-soft, low-opacity ambient shadows that mimic natural diffuse ambient light.

### Elevation Hierarchy
- **Level 0 (Flat / Canvas):** Main canvas sits at `#F9FAFB`. Static listing containers and table views use `#FFFFFF` with a 1px border (`#E5E7EB`) without shadows.
- **Level 1 (Default Cards & Input Fields):** Standard interactive cards utilize `box-shadow: 0 1px 3px 0 rgba(17, 24, 39, 0.05), 0 1px 2px -1px rgba(17, 24, 39, 0.05)` coupled with the `#E5E7EB` border.
- **Level 2 (Hover / Focused Elements):** Interactive cards on cursor hover or active card selections elevate slightly with `box-shadow: 0 4px 6px -1px rgba(17, 24, 39, 0.07), 0 2px 4px -2px rgba(17, 24, 39, 0.05)`, moving the Y-axis -1px.
- **Level 3 (Sticky Navigation, Drawers & Bottom Sheets):** Mobile bottom navigation, campus chat sheets, and search bars use `box-shadow: 0 10px 15px -3px rgba(17, 24, 39, 0.08), 0 4px 6px -4px rgba(17, 24, 39, 0.03)`.
- **Level 4 (Modals & Handoff Verification Dialogs):** Centered popups feature `box-shadow: 0 20px 25px -5px rgba(17, 24, 39, 0.1), 0 8px 10px -6px rgba(17, 24, 39, 0.04)` over a 40% `#111827` dimmed backdrop.

## Shapes

The interface balances utilitarian discipline and inviting approachable geometry through consistent 8px (`rounded-base`) and 12px (`rounded-lg`) corners.

### Component Shape Rules
- **Base Components (8px / `0.5rem`):** Applied to secondary action buttons, text input fields, campus location badges, small thumbnails, and select menus.
- **Container Elements (12px / `0.75rem` - `rounded-lg`):** Product listing cards, chat message containers, modal dialog boxes, and floating filter sheets.
- **Pill Exceptions (`9999px`):** Strict usage for dynamic state labels (e.g., "Available", "Reserved", "Sold"), campus location chips (e.g., "Central Library"), and user verified status badges. Full pill buttons are prohibited for primary CTA buttons to maintain an intentional product application aesthetic.

## Components

### Buttons
- **Primary CTA:** Background `#2563EB`, text `#FFFFFF`, height 44px (touch-target compliance), border-radius 8px. Hover state deepens to `#1D4ED8`. Active state `#1E40AF`.
- **Secondary / Outlined:** Surface `#FFFFFF`, border 1px solid `#E5E7EB`, text `#1F2937`. Hover state transitions to `#F3F4F6` background with `#D1D5DB` border.
- **Tertiary / Destructive:** For listing cancellations or reports, flat `#FEF2F2` background with `#DC2626` text.

### Product Listing Cards
- Constructed with a pure white background, 1px `#E5E7EB` border, and 12px border radius.
- Ratio-locked 1:1 or 4:3 product image preview with an overlay pill chip in the upper left specifying item condition (*New*, *Like New*, *Well-Used*).
- The bottom container groups the price (`₹` format in bold 18px-22px Inter), item title limited to 2-line truncation, and a micro-footer displaying the seller's hostel/school along with time posted.

### Campus Location Chips
- Compact horizontal-scrolling or wrapped chips (height 32px, rounded-full) used to filter by micro-location (*Tapti*, *Ganga*, *Sabarmati*, *KC Market*, *Library*, *Poorvanchal*).
- Default: `#F3F4F6` background with `#4B5563` text.
- Selected: `#2563EB` background with `#FFFFFF` text and checkmark icon.

### Form Inputs & Search
- Standardized 44px height with 8px radius, `#FFFFFF` fill, 1px `#D1D5DB` stroke. Focus ring uses a subtle 2px `#2563EB` border accompanied by an offset zero-spread focus halo `rgba(37, 99, 235, 0.15)`.
- Campus Search Input includes an embedded leading magnifying icon and a trailing keyboard shortcut or clear trigger.

### Verified Student & Safe-Zone Badges
- Trust components displaying the institutional verification shield (`#0F766E` background tint `#F0FDFA`, 1px solid `#CCFBF1`, text `#0F766E`) showing verified `@jnu.ac.in` domain status.
- Designate designated safe-exchange landmarks on campus with an icon-pinned badge.

### Lists & Chat Rows
- 64px min-height list tiles with hairline bottom borders (`#F3F4F6`).
- Avatar thumbnail (40px circular or 8px rounded) indicating active status, user school/centre code, unread message count counter in `#2563EB` pill.