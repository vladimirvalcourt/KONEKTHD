# Architecture Overview

## App Composition

All UI is composed in `src/App.jsx` as a section-based, animation-first landing page.

Top-level render order:

1. `Noise`
2. `ProgressBar`
3. `Nav`
4. `Hero`
5. `Marquee`
6. `Stats`
7. `ScrollStory`
8. `Features`
9. `AppSection`
10. `HowItWorks`
11. `Categories`
12. `Testimonials`
13. `CTA`
14. `Footer`

## Design System Strategy

- Local design tokens are centralized in constant `T` (`black`, `cream`, `gold`, etc.).
- Typography and base document styles are injected through `FONT_STYLE`.
- Visual consistency is preserved via recurring spacing/opacity/border patterns.

## Motion System

- Framer Motion is used for:
  - entrance reveals
  - scroll-linked transforms (`useScroll`, `useTransform`, `useSpring`)
  - deck/card transitions (`AnimatePresence`)
- Reduced-motion handling is implemented where interactions are most dynamic (feature deck).

## Feature Deck (Current Model)

The features section uses a unified deck interaction:

- `DeckActiveCard`:
  - clickable front card
  - supports keyboard advance (`Enter`, `Space`)
  - exits and enters with stack-style rotate/slide motion
- `DeckBackCard`:
  - non-interactive stacked preview layers (`aria-hidden`)
  - depth achieved through offset/scale/opacity
- `activeIndex` controls the active feature and wraps cyclically.

## Phone Mockup Interaction

`PhoneMockup` supports an `interactive` prop:

- Front phone (`interactive`) listens for hover on desktop-capable pointers.
- Internal content track animates vertically inside a fixed viewport.
- Scroll range is measured using `ResizeObserver`.
- Touch/mobile defaults to static behavior.

## Accessibility Notes

- Active feature card is a semantic `button`.
- Keyboard and reduced-motion behavior is integrated in feature deck interaction.
- Native cursor behavior is restored globally.

## Build and Tooling

- Build tool: Vite
- Linting: ESLint (flat config)
- Output artifacts: `dist/`

