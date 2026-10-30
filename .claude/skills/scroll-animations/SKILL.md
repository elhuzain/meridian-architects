---
name: scroll-animations
description: How this site's GSAP smooth scrolling, scroll-triggered animations and parallax are built, and the recipes used on each section. Use when adding or changing animations, motion, scroll effects, reveals or parallax, when creating a new section or page that should animate, or when the user says "animate", "scroll trigger", "fade in", "parallax" or "GSAP".
---

# Scroll Animations

Motion on this site is calm, slow and architectural: things settle into place, images open like a drawing being unrolled, nothing bounces. All of it is driven by **data attributes on server-rendered markup**, so sections and pages stay server components. Pair this skill with `frontend-architectural-design` for the visual rules.

# Instructions

1. Animate by adding `data-animate` attributes. Do not add `"use client"`, `useGSAP` or GSAP imports to section or page components.
2. Pick from the existing animation types and recipes below before inventing a new one.
3. If a new type is truly needed, add it to `components/ScrollAnimations.tsx` and `app/globals.css` following "Adding an animation type".
4. Run the checklist at the end before you finish.

## Architecture

| Piece | File | Role |
|---|---|---|
| Smooth scrolling | `components/SmoothScroll.tsx` | Client wrapper around page content. Creates GSAP `ScrollSmoother` (`smooth: 1.2`, `effects: true`, `smoothTouch: false`), routes same-page `#anchor` clicks through `smoother.scrollTo` with an 80px header offset, honours a hash on arrival, and resets to the top on client-side navigation. |
| Animation director | `components/ScrollAnimations.tsx` | Client component that renders nothing. Scans the DOM for `data-animate`, builds ScrollTriggers inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`, and rebuilds on every pathname change (`revertOnUpdate: true`). |
| Initial states | `app/globals.css` | Hides `[data-animate]` (and children of `stagger`) with `visibility: hidden`, only when motion is allowed, so there is no flash before GSAP runs. |
| Wiring | `app/layout.tsx` | `<Header />` outside the smoother, `<SmoothScroll>` around `children` and `<Footer />`, then `<ScrollAnimations />`, then a `<noscript>` style that makes everything visible. |

Order matters in the layout:
- **Fixed elements** (header, modals, toasts) must sit **outside** `<SmoothScroll>`, or they scroll away with the transformed content.
- **`<ScrollAnimations />` comes after `<SmoothScroll>`.** ScrollSmoother must exist before any ScrollTrigger is created, and sibling effects run in order.
- **The scroll reset in `SmoothScroll` is a `useLayoutEffect`.** It runs before `ScrollAnimations` builds the new page's triggers, so triggers are measured from the top of the page.

## The attribute API

| Attribute | Effect | Timing |
|---|---|---|
| `data-animate="fade-up"` | Fades in while rising 24px. Elements entering together are batched and play in DOM order. | 0.9s, `power2.out`, +0.12s per batched element |
| `data-animate="fade"` | Opacity only. For captions, credits and small marks. | 1.2s, `power2.out`, +0.08s per batched element |
| `data-animate="stagger"` | Put on a container. Its **direct children** fade up one after another; the container itself stays visible (borders and rules show immediately). | 0.9s each, 0.12s apart |
| `data-animate="reveal"` | Put on an image frame (`.media`). Wipes it open from the bottom with `clip-path: inset(100% 0 0 0)` to `inset(0)`. | 1.4s, `power3.inOut` |
| `data-delay="0.6"` | Extra delay in seconds, added on top of batching or stagger. | |
| `data-speed="auto"` | ScrollSmoother parallax (no JS needed). Use only on an oversized image wrapper, see the reveal + parallax recipe. | |

All triggers start at `top 85%` and run **once**. Content never re-hides on scroll back.

## Recipes

### Section intro

```tsx
<h2 data-animate="fade-up">Services across the life of a building</h2>
<p data-animate="fade-up" className="copy">…</p>
```

The heading and paragraph enter in the same batch, so the paragraph follows 0.12s after the heading automatically. No delay needed.

### Staggered list, grid or form

```tsx
<ul data-animate="stagger" className="grid …">
  {items.map((item) => <li key={item.id}>…</li>)}
</ul>
```

Used for service cards, team members, fact rows (`<dl>`), social links, footer columns and the contact form's fields. Use `data-delay="0.15"` when the list sits directly under a heading that animates at the same moment.

### Image reveal with parallax

The signature image treatment. The frame wipes open, and the photo inside drifts slightly slower than the page.

```tsx
<div data-animate="reveal" className="media aspect-4/5">
  {/* Taller than the frame so the parallax shift never shows an edge */}
  <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
</div>
```

- `.media` provides `position: relative` and `overflow: hidden`, which the parallax needs.
- The wrapper is 120% tall and offset by -10% so `data-speed="auto"` has room to move.
- Hover zooms go on the `<Image>` (`group-hover:scale-[1.025]`), never on the parallax wrapper. GSAP owns the wrapper's transform.

### Image card (image, then its caption)

```tsx
<div data-animate="reveal" className="media …">…</div>
<div data-animate="fade-up" data-delay="0.5" className="mt-6 border-t …">
  <h3>{title}</h3>
  <p className="meta">{location}</p>
</div>
```

The caption waits until the wipe is about a third done. Used in the home page project grid.

### Page-load entrance (hero and page titles)

Elements in view on load trigger immediately, so an entrance is just a sequence of delays:

```tsx
<div data-animate="reveal" className="media …">            {/* 0s: panel wipes open */}
  <div data-speed="auto" className="absolute inset-x-0 -top-[10%] h-[120%]">…</div>
  <h1 data-animate="fade-up" data-delay="0.7">…</h1>        {/* 0.7s */}
  <p data-animate="fade-up" data-delay="0.7">…</p>          {/* 0.82s, batched */}
  <a data-animate="fade-up" data-delay="0.7" className="btn">…</a>
</div>
<svg data-animate="fade" data-delay="1.2" …/>              {/* corner registration marks last */}
```

The text sits inside the wiping frame and starts at 0.7s, so it appears as the wipe reaches it from the bottom. Detail elements (registration marks, credits) fade in last at about 1.2s.

Project pages use the same idea: title and location fade up at 0s, the lead image reveals at `data-delay="0.3"`, and the photo credit fades in at `data-delay="1.2"`.

## Where each animation is used

| Area | Treatment |
|---|---|
| Hero | Panel reveal + image parallax, text sequence at 0.7s, corner marks fade at 1.2s |
| About | Image reveal + parallax, caption fade, heading fade-up, paragraphs stagger (0.15s), key figures stagger, link fade-up |
| Services | Heading and intro fade-up, cards stagger |
| Projects (home) | Heading fade-up, each image reveal + parallax, caption fade-up at 0.5s, credits fade |
| Team | Heading and paragraph fade-up, members stagger |
| Contact | Heading and paragraph fade-up, contact details stagger, social links stagger, form fields stagger (0.2s) |
| Footer | Logo and link columns stagger, wordmark fade-up. The bottom © row is deliberately not animated. |
| Project pages | Title entrance, lead image reveal + parallax, facts stagger, summary fade-up, description stagger, other projects stagger |
| Mobile menu | Not data-driven: a paused GSAP timeline in `Header.tsx` (already a client component). The panel wipes down (`clip-path`, 0.7s, `power3.inOut`), then the links rise in (0.06s apart). Opening calls `play()` and closing calls `reverse()`, so toggling mid-animation turns around smoothly. The menu stays mounted and is `invisible` until the timeline starts. |

## Rules

- **Server components stay server components.** Attributes only. Client components (like `ContactForm`) can take attributes too.
- **Don't nest animated elements.** Never put `reveal` or `fade-up` inside a `stagger` child, or `stagger` inside `stagger`. The parent's hidden state hides the child, and the two animations fight.
- **Don't put `data-animate` on an element that has a CSS `transform` transition.** GSAP writes inline transforms. Animate a wrapper instead, or move the hover effect to an inner element.
- **Nothing near the very bottom of the page.** Triggers start when the element's top passes 85% of the viewport. An element in the last ~15% of the page may never get there and stays hidden. This is why the footer's bottom row has no animation.
- **Fixed-position UI goes outside `<SmoothScroll>`.**
- **In-page links use plain `<a href="#id">` or `/#id`.** `SmoothScroll` intercepts same-page hash links. Don't call `scrollIntoView` or `window.scrollTo`; use `ScrollSmoother.get()?.scrollTo(target, true, "top 80px")`.
- **Keep motion calm.** Durations 0.9–1.4s, `power2.out` for fades and `power3.inOut` for wipes, 24px of travel at most. No bounce, elastic, rotation or scale-in.
- **Limit parallax** to large images. Use `data-speed="auto"` on an oversized wrapper only; avoid parallax on text.
- **Reduced motion is automatic.** Everything lives inside `gsap.matchMedia`, and the CSS hidden state only applies under `prefers-reduced-motion: no-preference`. Keep any new code inside the same `mm.add` block.

## Adding an animation type

1. In `components/ScrollAnimations.tsx`, inside the existing `mm.add("(prefers-reduced-motion: no-preference)", …)` callback, query `[data-animate='your-type']` and create the tween with `scrollTrigger: { trigger, start: START, once: true }` (or `ScrollTrigger.batch` for many small elements). Read `data-delay` with `delayOf(el)`.
2. Animate to visible with `autoAlpha: 1` so the CSS `visibility: hidden` is cleared.
3. Document the new type in the comment block at the top of `ScrollAnimations.tsx` and in this skill's attribute table.
4. The hidden state in `globals.css` already covers every `[data-animate]` except `stagger`. Only touch it if the new type hides children instead of itself.

For a one-off animation that doesn't fit any type, create a small client wrapper (for example `<Reveal>`) that takes server-rendered `children`, rather than converting the section to a client component.

## Checklist

Before finishing, confirm:
- [ ] No section or page gained `"use client"` or GSAP imports just to animate
- [ ] Every image reveal with parallax uses the oversized `data-speed="auto"` wrapper inside `.media`
- [ ] No animated element is nested inside another animated element
- [ ] Nothing animated sits in the last ~15% of the page
- [ ] Fixed elements are outside `<SmoothScroll>`
- [ ] Durations, easing and travel match the table above
- [ ] Lint and type check pass (`npm run lint`, `npx tsc --noEmit`). Don't run `npm run build`; the user builds the app themselves.
