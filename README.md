# KONEKTHD Landing Experience

A production-ready React + Vite landing page for KONEKT, focused on cinematic storytelling, strong visual identity, and premium interaction design for the Haitian business community.

## Stack

- React 19
- Vite 7
- Framer Motion
- ESLint 9

## Core Experience

- Immersive hero with animated typography and layered gradients
- Scroll-driven story section with pinned narrative slides
- Unified click-to-switch feature deck (stacked card metaphor)
- Interactive app-phone mockup with hover-driven internal scrolling (desktop) and static behavior on touch devices
- Testimonials marquee and CTA sections
- Fully custom visual system using inline design tokens

## Interaction Model

- **Feature deck:** single active card + two stacked back cards; click or keyboard (`Enter`/`Space`) cycles through cards
- **Phone mockup:** front phone is interactive; on desktop hover, inner content scrolls like a real app list
- **Cursor behavior:** native system cursor enabled (custom cursor layer removed)

## Quality and Accessibility

- `prefers-reduced-motion` support for feature deck transitions
- Keyboard-advancable feature deck (focused active card)
- Clean lint/build pipeline

## Run Locally

```bash
npm install
npm run dev
```

Open: `http://localhost:5173/`

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint checks

## Project Structure

```text
.
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── docs/
│   ├── ARCHITECTURE.md
│   └── CHANGELOG.md
├── package.json
└── vite.config.js
```

## Documentation

- Architecture: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- Changelog: [`docs/CHANGELOG.md`](./docs/CHANGELOG.md)
