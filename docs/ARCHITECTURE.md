# Website architecture

## Role

KONEKTHD is a React/Vite public discovery surface. It communicates the KONEKT product, hosts public support information, and reads published provider records from Supabase. It does not administer provider submissions.

```text
Browser
  -> App route composition
      -> Landing sections
      -> Bilingual information pages
      -> Account-free provider discovery
          -> Supabase published-provider records
          -> ZIP-to-state or opt-in browser location lookup
  -> Static assets and reviewed Phosphor icons
  -> Optional configured store/support destinations
```

## State

- The selected language and last resolved search area are stored in local browser storage.
- Search text and category selection remain in memory.
- Provider cards are real published records returned under Supabase Row Level Security.
- Results are scoped by state. Nationwide remote records appear in a separately labeled section and are never presented as local matches.
- Store URLs come from Vite environment variables and fall back to the platform-status route.

## Design system

The stylesheet uses primitive color values, semantic purpose tokens, and component-level selectors. The visual language is warm editorial paper, Haitian navy, restrained red, and gold. The site uses no remote fonts, third-party tracking scripts, or decorative icon library at runtime.

The reviewed icon assets are from the same local Phosphor family used by KONEKT's iPhone experience. Icons support navigation or meaning; they are not used as decorative feature filler.

## Routing

Vercel rewrites public paths to the Vite entry point. `App.jsx` resolves known information routes and shows an accessible 404 for unknown paths.

## Security and privacy

- No backend secret is shipped. The Vite publishable key is a public client credential protected by Row Level Security.
- No analytics pipeline or newsletter collection is enabled.
- Content Security Policy, frame denial, referrer policy, MIME sniffing protection, and a self-only geolocation permissions policy are configured at the host.
- ZIP lookups use Zippopotam.us. Coordinate reverse-geocoding uses BigDataCloud only after an explicit visitor action. The privacy page discloses both.
- Provider authentication, publication, moderation, and evidence access remain outside this repository.

## Quality gates

- ESLint validates React and JavaScript.
- The content audit blocks previously identified unsupported claims and incorrect Clerk/ticketing copy.
- Unit tests cover state extraction, local-versus-nationwide separation, category/search matching, and safe external links.
- Vite production build proves bundle integrity.
- GitHub Actions runs the same `npm run check` gate on pull requests and `main` pushes.
- Browser verification covers English/Kreyòl switching, mobile navigation, interactive filtering, key public routes, 404 behavior, console errors, and mobile horizontal overflow.
