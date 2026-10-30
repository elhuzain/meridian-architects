---
name: gsap-scroll-animations
description: Set up GSAP smooth scrolling, scroll-triggered entrance animations, image reveals with parallax and reversible interactive timelines in a Next.js App Router project, driven by data attributes so pages and sections stay server components. Use when adding smooth scroll, scroll animations, reveals, parallax or GSAP to a Next.js site, or when the user says "animate", "scroll trigger", "fade in", "parallax", "smooth scroll" or "GSAP".
---

# GSAP Scroll Animations for Next.js

A reusable structure for calm, editorial motion in a Next.js App Router site:

- **Smooth scrolling** with GSAP ScrollSmoother, including anchor links, a fixed-header offset and route changes.
- **Scroll-triggered entrances** (fade-up, fade, stagger, image reveal) declared with `data-animate` attributes on server-rendered markup.
- **Parallax** with ScrollSmoother's `data-speed`, without client code in components.
- **Reversible interactive timelines** for menus, drawers and overlays.

The core idea: **one client "animation director" scans the DOM for attributes**, so sections and pages never need `"use client"` just to animate.

# Instructions

1. Check what already exists: `gsap` and `@gsap/react` in `package.json`, a smooth-scroll wrapper, an animation component, `data-animate` attributes. Extend what is there instead of adding a parallel system.
2. For a new setup, follow "Setup" using the files in `templates/`. Adapt imports, paths and the header offset to the project.
3. Animate content with attributes from "Attribute API" and "Recipes". Only write GSAP code in components for interactive animations ("Interactive timelines").
4. Run the checklist at the end. Lint and type-check; don't run a production build unless the user asks.

## Requirements

- Next.js App Router, React 18 or 19.
- `gsap` 3.13 or later (ScrollSmoother and the other bonus plugins ship in the public package) and `@gsap/react` for `useGSAP`.

```bash
npm install gsap @gsap/react
```

## Setup

| Step | Template | Destination |
|---|---|---|
| 1. Smooth scrolling wrapper | `templates/SmoothScroll.tsx` | `components/SmoothScroll.tsx` |
| 2. Animation director | `templates/ScrollAnimations.tsx` | `components/ScrollAnimations.tsx` |
| 3. Initial hidden states | `templates/animations.css` | Append to the global stylesheet |
| 4. Layout wiring | `templates/layout.tsx` | Merge into `app/layout.tsx` |
| 5. (Optional) Reversible menu | `templates/ReversibleMenu.tsx` | Pattern for the site's menu or drawer |

Then:
- Set `HEADER_OFFSET` in `SmoothScroll.tsx` to the fixed header's height (`"top 80px"`), or `"top top"` if there is none.
- Give in-page anchor targets an `id`. Plain `<a href="#id">` and `<a href="/#id">` links work automatically.

### Why the layout order matters

```tsx
<Header />                 {/* fixed: outside the smoother or it scrolls away */}
<SmoothScroll>
  {children}
  <Footer />
</SmoothScroll>
<ScrollAnimations />       {/* after SmoothScroll: the smoother must exist before any ScrollTrigger */}
<noscript>…</noscript>     {/* shows everything if JS is off */}
```

- **Fixed or overlay UI** (headers, modals, toasts, cookie bars) must render outside `<SmoothScroll>`. The smoothed content is transformed, which breaks `position: fixed` inside it.
- **Sibling effects run in order,** so `SmoothScroll` creates the smoother before `ScrollAnimations` creates triggers.
- **`SmoothScroll`'s route-change reset is a `useLayoutEffect`.** On client-side navigation it scrolls to the top before `ScrollAnimations` rebuilds the triggers. Otherwise the new page's triggers would be measured from the old scroll position and fire all at once.

### What each piece handles

- **SmoothScroll:** creates ScrollSmoother (`smooth: 1.2`, `effects: true`, `smoothTouch: false`) inside `gsap.matchMedia` so reduced-motion users get native scrolling. It intercepts same-page hash links and scrolls with `smoother.scrollTo(target, true, HEADER_OFFSET)`, honours a hash on arrival, and resets and refreshes on route change.
- **ScrollAnimations:** renders nothing. Inside `mm.add("(prefers-reduced-motion: no-preference)")` it builds all `data-animate` triggers, and rebuilds them on pathname change (`dependencies: [pathname], revertOnUpdate: true`).
- **CSS:** hides animated elements from first paint so there is no flash, but only when motion is allowed. GSAP reveals them with `autoAlpha`.

## Attribute API

| Attribute | Effect | Default timing |
|---|---|---|
| `data-animate="fade-up"` | Fades in while rising 24px. Elements entering together are batched (`ScrollTrigger.batch`) and play in DOM order. | 0.9s, `power2.out`, +0.12s per batched element |
| `data-animate="fade"` | Opacity only. For captions, credits, small marks. | 1.2s, `power2.out`, +0.08s per batched element |
| `data-animate="stagger"` | On a container: its **direct children** fade up one after another. The container stays visible, so borders and rules show at once. | 0.9s each, 0.12s apart |
| `data-animate="reveal"` | On an image frame: wipes it open from the bottom with `clip-path: inset(100% 0 0 0)` → `inset(0)`. | 1.4s, `power3.inOut` |
| `data-delay="0.6"` | Extra delay in seconds, added to batching or stagger offsets. | |
| `data-speed="auto"` | ScrollSmoother parallax. Only on an oversized image wrapper (see recipe). | |
| `data-lag="0.2"` | ScrollSmoother lag: the element catches up slightly late. Use sparingly. | |

All triggers start at `top 85%` and run once. Content never re-hides when scrolling back up.

## Recipes

### Section intro

```tsx
<h2 data-animate="fade-up">Section heading</h2>
<p data-animate="fade-up">Intro paragraph…</p>
```

Both enter in the same batch, so the paragraph follows the heading by 0.12s with no explicit delay.

### Staggered list, grid or form

```tsx
<ul data-animate="stagger" className="grid …">
  {items.map((item) => <li key={item.id}>…</li>)}
</ul>
```

Works for cards, team grids, fact lists (`<dl>` with row children), link lists, footer columns and form fields. Add `data-delay="0.15"` when the list sits right under a heading that animates at the same moment.

### Image reveal with parallax

```tsx
<div data-animate="reveal" className="relative overflow-hidden aspect-[4/5]">
  {/* Taller than the frame so the parallax shift never shows an edge */}
  <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
</div>
```

- The frame needs `position: relative` and `overflow: hidden`.
- The wrapper is 120% tall and offset -10%, which gives `data-speed="auto"` room to move.
- Put hover effects (like a slow `scale`) on the `<Image>`, never on the wrapper. GSAP owns the wrapper's transform.

### Image card (image, then caption)

```tsx
<div data-animate="reveal" className="…">…</div>
<div data-animate="fade-up" data-delay="0.5">
  <h3>{title}</h3>
  <p>{meta}</p>
</div>
```

The caption waits until the wipe is about a third done.

### Page-load entrance (hero or page title)

Elements already in view on load trigger immediately, so an entrance is a sequence of delays:

```tsx
<div data-animate="reveal" className="relative overflow-hidden …">   {/* 0s: frame wipes open */}
  <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">…</div>
  <h1 data-animate="fade-up" data-delay="0.7">…</h1>                 {/* 0.7s */}
  <p data-animate="fade-up" data-delay="0.7">…</p>                   {/* 0.82s via batching */}
  <a data-animate="fade-up" data-delay="0.7">…</a>
</div>
<svg data-animate="fade" data-delay="1.2" …/>                       {/* small details last */}
```

Text inside the wiping frame starts at about half the wipe, so it appears as the wipe reaches it. For a page without a hero image: title and meta fade up at 0s, the lead image reveals at `data-delay="0.3"`, and its caption fades at about `1.2`.

## Interactive timelines

For animations driven by user actions (menus, drawers, accordions, overlays), the component is already a client component, so write the timeline there. `templates/ReversibleMenu.tsx` shows the pattern:

- **Keep the element mounted** and hidden with `visibility: hidden` instead of rendering it conditionally. Unmounting makes reversing impossible.
- **Build one paused timeline** in `useGSAP`: open calls `play()`, close calls `reverse()`. Toggling mid-animation turns around from the current progress.
- **Toggle visibility in timeline callbacks:** `onStart` makes it visible, `onReverseComplete` hides it again, so it's out of the tab order when closed.
- **Handle reduced motion with `gsap.matchMedia` conditions:** multiply durations by 0 for reduced motion, so the same timeline opens and closes instantly.
- **If the timeline is rebuilt while open** (a media query change), restore it with `progress(1)`.
- **Pause the smoother behind overlays:** `ScrollSmoother.get()?.paused(true)` on open and `paused(false)` on close. Do the same for modal `<dialog>`s and other full-screen layers.

## Rules

- **Don't add `"use client"` or GSAP imports to sections or pages just to animate them.** Use attributes. Client components can take attributes too.
- **Don't nest animated elements.** No `reveal` or `fade-up` inside a `stagger` child, and no `stagger` inside `stagger`. The parent's hidden state hides the child, and the tweens conflict.
- **Don't put `data-animate` on an element with a CSS `transform` transition.** GSAP writes inline transforms; animate a wrapper instead.
- **Don't animate the last ~15% of the page.** A trigger starts when the element's top passes 85% of the viewport. The very last elements, such as a copyright row, may never reach that and would stay hidden.
- **Scroll programmatically through the smoother:** `ScrollSmoother.get()?.scrollTo(target, true, HEADER_OFFSET)`, never `scrollIntoView` or `window.scrollTo`.
- **Keep everything inside `gsap.matchMedia`** so reduced-motion users skip it. The CSS hidden state is already scoped to `prefers-reduced-motion: no-preference`.
- **Keep motion calm:** 0.6–1.4s durations, `power2.out` for fades, `power3.inOut` for wipes, at most 24px of travel. No bounce, elastic, rotation or scale-in. Adjust to the project's design language if it defines one.
- **Parallax only on large images,** via the oversized wrapper. Never on text.

## Adding an animation type

1. In `ScrollAnimations.tsx`, inside the existing `mm.add(...)` callback, select `[data-animate='your-type']` and create the tween with `scrollTrigger: { trigger, start: START, once: true }`. Use `ScrollTrigger.batch` for many small elements. Read `data-delay` with `delayOf(el)`.
2. End in a visible state with `autoAlpha: 1` so the CSS `visibility: hidden` is cleared.
3. Document the type in the comment at the top of `ScrollAnimations.tsx` and in this skill's attribute table.
4. The CSS hides every `[data-animate]` except `stagger`. Only change it if the new type hides children instead of itself.

For a one-off effect that fits no type, write a small client wrapper (for example `<Reveal>`) that receives server-rendered `children`, instead of converting the whole section.

## Tuning

| Setting | Where | Default |
|---|---|---|
| Smoothing strength | `smooth` in `SmoothScroll.tsx` | `1.2` (0.8–1.5 is the useful range) |
| Smoothing on touch devices | `smoothTouch` | `false` (native scrolling on phones) |
| Anchor offset | `HEADER_OFFSET` | `"top 80px"` |
| Trigger point | `START` in `ScrollAnimations.tsx` | `"top 85%"` |
| Default ease | `EASE` | `"power2.out"` |

## Checklist

Before finishing, confirm:
- [ ] Fixed and overlay elements render outside `<SmoothScroll>`
- [ ] `<ScrollAnimations />` comes after `<SmoothScroll>` in the layout, and the `<noscript>` fallback is present
- [ ] No section or page gained `"use client"` only to animate
- [ ] Every parallax image uses the oversized `data-speed="auto"` wrapper inside an `overflow: hidden` frame
- [ ] No animated element is nested inside another animated element
- [ ] Nothing animated sits in the last ~15% of the page
- [ ] Interactive timelines keep their element mounted, reverse instead of unmounting, and pause the smoother while open
- [ ] All GSAP code runs inside `gsap.matchMedia` with a reduced-motion path
- [ ] Lint and type check pass
