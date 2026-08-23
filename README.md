# KONEKT public website

This repository owns KONEKT's bilingual public landing experience. It explains the product, demonstrates service discovery, gives providers a clear participation path, and hosts support, privacy, terms, and release-status pages.

It does not contain the KONEKT directory backend or the private moderation dashboard. The mobile clients and this website remain untrusted public surfaces; publication, verification, ownership, and private-evidence access stay server-controlled.

## Product position

KONEKT helps Haitian and Haitian Creole-speaking communities find healthcare, legal, financial, housing, food, beauty, translation, and community services. The core promise is concrete: every public profile should explain how Kreyòl is available before someone calls.

The site avoids unsupported scale claims, synthetic testimonials, fake ratings, launch badges, and guarantees the operating system cannot yet meet.

## Experience

- Editorial English and Haitian Creole landing page
- Interactive, clearly labeled product preview with sample content
- Responsive navigation and layouts from 390-pixel phones through desktop
- Provider claim/add/review explanation
- Support, privacy, terms, age-rating, and release-status routes
- Store URLs activated only through environment configuration
- Search, social, sitemap, manifest, and security-header foundations

## Local development

```bash
npm ci
npm run dev
```

Quality gate:

```bash
npm run check
```

`check` runs ESLint, the source-backed content audit, and the production build.

## Configuration

Copy `.env.example` to `.env.local` when local overrides are needed.

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Canonical production host |
| `VITE_SUPPORT_EMAIL` | Public support destination |
| `VITE_APP_STORE_URL` | Official App Store listing after publication |
| `VITE_GOOGLE_PLAY_URL` | Official Google Play listing after publication |

Leave store URLs empty until the listings are public. Empty values route visitors to the truthful platform-status page.

## Repository map

```text
src/App.jsx                 Landing sections and route composition
src/components/             Header, footer, language, and product-preview components
src/content.js              English and Haitian Creole landing copy
src/pages/pageData.js       Bilingual support/product/legal page content
src/siteConfig.js           External destination configuration
public/images/              Original KONEKT editorial photography
public/icons/               Reviewed Phosphor icons shared with the iPhone design language
docs/design/                Selected reference and verified implementation captures
scripts/content-audit.mjs   Unsupported-claim regression guard
```

## Delivery boundary

The KONEKT admin dashboard belongs in a separate private desktop-first application. No service-role secret, administrator enrollment, moderation authority, or private provider evidence belongs in this website bundle.
