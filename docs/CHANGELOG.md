# Changelog

All notable changes to this project are documented in this file.

## 2026-02-27

### Added

- Full cinematic landing page implementation in `src/App.jsx` with:
  - Hero narrative section
  - Marquee, stats, and scroll story sections
  - Feature, app, how-it-works, categories, testimonials, CTA, and footer
- Phone mockup desktop hover-scroll interaction:
  - Front phone is interactive
  - Internal viewport + animated track
  - Scroll range measurement with resize handling
- Unified click-to-switch feature deck:
  - Single active card
  - Two stacked back cards
  - Click and keyboard-based card cycling
  - Stack rotate + slide transitions
- Documentation set:
  - `README.md` rewritten for production usage
  - `docs/ARCHITECTURE.md`
  - `docs/CHANGELOG.md`

### Changed

- Replaced feature 3x2 card grid behavior with unified deck interaction.
- Updated feature-card interaction model from hover-reveal to click-to-switch deck UX.
- Increased clarity and reliability of interactive behaviors across pointer types.

### Fixed

- Removed accidental top-left cursor artifact.
- Removed on-screen scroll indicator text from hero.
- Removed fixed decorative wordmark from story section.
- Restored native cursor visibility by removing custom cursor-hiding behavior and custom cursor rendering layer.

### Verification

- `npm run lint` passes.
- `npm run build` passes.

