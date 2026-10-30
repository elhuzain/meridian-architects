---
name: frontend-architectural-design
description: Minimal, modern architectural frontend styling. use when building or adjusting component and component styles or when user says "style", "create a component", or "create a section".
---

# Frontend Architectural Design

Build interfaces that feel like an architecture studio's portfolio: restrained, precise, generous with space and confident in imagery. Every element should look as if it was drawn with a ruler. When in doubt, remove something.

# Instructions

1. Before writing code, look for the project's existing design tokens (CSS variables, Tailwind config, theme files). Extend them instead of creating parallel values. If none exist, start from the token block below.
2. Apply every rule in this file to each component or section you create or adjust, including small edits.
3. Run the checklist at the end before you finish.

## Starter tokens

```css
:root {
  --color-bg: #f6f5f1;          /* warm off-white, never pure white */
  --color-surface: #ecebe6;     /* concrete tone for alternating sections */
  --color-ink: #161616;         /* near-black, never pure black */
  --color-muted: #6b6b66;       /* body copy and captions */
  --color-line: rgba(22,22,22,0.12); /* hairlines */
  --color-accent: #8a7a5c;      /* optional, use sparingly */

  --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;

  --space-section: clamp(96px, 14vw, 200px);
  --gutter: clamp(16px, 2.5vw, 32px);
  --edge: clamp(20px, 5vw, 80px);
  --max-width: 1440px;

  --ease: cubic-bezier(0.2, 0.6, 0.2, 1);
  --radius: 0;
}
```

## Typography

- Headings use thin weights (200–300). Never bold headings.
- Headings are large and fluid, set with `clamp()`, with line-height 1.05–1.15 and letter-spacing around -0.02em.
  - h1: `clamp(2.75rem, 6vw, 6rem)`
  - h2: `clamp(2rem, 4vw, 3.75rem)`
  - h3: `clamp(1.375rem, 2vw, 1.75rem)`
- Use one clean grotesk or geometric sans (Inter, Manrope, Neue Montreal, Helvetica Neue) or the project's font. Two families at most.
- Use sentence case for headings. No all-caps headings.
- **No eyebrows.** Never put a kicker, overline, tag, label or small text above a heading. The heading stands alone.
- Body paragraphs are relaxed: 16–18px, weight 300–400, line-height 1.7–1.8, max-width 60–68ch, colored `--color-muted`.
- Small metadata (captions, project details, dates) may appear beside or below content: 11–12px, uppercase, letter-spacing 0.12–0.2em, weight 400.
- Keep a clear gap between heading and paragraph (at least 24–32px).

## Space and layout

- Whitespace is the main design material. Sections get `--space-section` vertical padding.
- Use a 12-column grid with consistent gutters and a max width with edge padding.
- Prefer asymmetry: text across 4–5 columns, imagery across 7–8, or content offset from the left edge. Avoid centering everything.
- Align every element to grid lines. Spacing follows an 8px base.
- One idea per section. Do not crowd sections with multiple competing blocks.

## Shape and surface

- `border-radius: 0` on everything: buttons, inputs, images, cards, modals, tooltips, badges and avatars.
- No drop shadows. Express depth with 1px hairlines (`--color-line`) and subtle tone changes between sections.
- No gradients, except a soft dark overlay on an image when text sits on top of it.
- No glassmorphism, blurred panels or neon glows.

## Color

- Near-monochrome: off-whites, concrete greys, near-black.
- At most one muted accent (ochre, bronze, oxidized green), used for a single detail such as a link hover or an active state.
- Dark sections are allowed for contrast: invert to `--color-ink` background with off-white text.

## Imagery

- Images are large: full-bleed, or spanning most of the grid.
- Use architectural aspect ratios: 4:5, 3:2, 16:9, 21:9. Set them with `aspect-ratio` and `object-fit: cover`.
- Sharp corners, no borders, frames or shadows.
- Captions sit below the image, left-aligned, small and muted.
- Hover, if any: a slow scale to 1.02–1.03 over 800ms+ inside `overflow: hidden`.
- Without real images, use neutral placeholder blocks at the correct ratio. Never substitute emojis or decorative icons.

## Architectural background patterns

Use when suitable: heroes, section transitions, empty areas, footers, or behind large imagery. Keep them barely visible (4–8% contrast) and never behind body text where they hurt legibility. Use one pattern per page at most.

Blueprint grid:
```css
.bg-grid {
  background-image:
    linear-gradient(var(--color-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-line) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

Column lines matching the layout grid:
```css
.bg-columns {
  background-image: repeating-linear-gradient(90deg,
    var(--color-line) 0 1px, transparent 1px calc(100% / 12));
}
```

Fine dot grid:
```css
.bg-dots {
  background-image: radial-gradient(var(--color-line) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

Other options, built as inline SVG: crosshair registration marks at section corners, dimension lines with end ticks, thin topographic contour lines, a single large section/elevation line drawing.

## Components

- **Buttons:** rectangular, either 1px `--color-ink` border on transparent or solid ink fill with off-white text. Padding around 14px 28px, small tracked label. A thin arrow (→) is optional. Hover inverts fill over 300ms.
- **Links:** 1px underline with `text-underline-offset: 4px`, or an animated hairline that grows on hover.
- **Inputs:** 1px bottom border only (or a full 1px border), no radius, no fill. Small label above. Focus state darkens the line.
- **Cards:** avoid boxed cards. Present items as image + text stacks separated by space or hairline rules.
- **Lists and features:** separate rows with hairlines. Index numbers (01, 02) go in a left column beside the content, never stacked above a heading.
- **Navigation:** sparse, light-weight text, wide spacing, a hairline below the header.
- **Icons:** thin line icons (1–1.5px stroke), used sparingly. No filled, colorful or emoji icons.
- **Footer:** large light-weight statement or wordmark, small metadata in columns, hairline dividers.

## Motion

- Slow and calm: 400–900ms with `--ease`.
- Reveals fade in and translate 16–24px. No bounces, springs or rotations.
- Always respect `prefers-reduced-motion`.

## Tailwind mapping (if the project uses Tailwind)

`rounded-none`, `font-extralight`/`font-light` for headings, `tracking-tight`, `leading-relaxed`/`leading-loose` for body, `max-w-prose`, `shadow-none`, `border-black/10` for hairlines, `aspect-[4/5]`, `object-cover`. Set `borderRadius` defaults to 0 in the config when you own it.

## Avoid

- Rounded corners of any kind, pill buttons, circular avatars
- Eyebrows, kickers, tags or labels above headings
- Bold or heavy headings
- Drop shadows, gradients, glass effects
- Colorful badges, emojis, decorative illustrations, stock icon grids
- Centered-everything layouts and dense, cramped sections
- Small thumbnail images where a large image would work
- Pure black on pure white

## Checklist

Before finishing, confirm:
- [ ] Headings are light weight, large, and have nothing above them
- [ ] Paragraphs are relaxed (line-height ≥ 1.7) and width-limited
- [ ] No border-radius or shadows anywhere, including inherited library styles
- [ ] Images are large, sharp-cornered, at architectural ratios
- [ ] Layout aligns to the grid with generous section spacing
- [ ] Palette is near-monochrome with at most one accent
- [ ] Any background pattern is subtle and doesn't touch body-text legibility
- [ ] Motion is slow, eased and respects reduced motion
