# Website architecture

## Role

KONEKTHD is a static React/Vite marketing surface. It communicates the KONEKT product and hosts public support information. It does not query Supabase and does not administer provider submissions.

```text
Browser
  -> App route composition
      -> Landing sections
      -> Bilingual information pages
  -> Static assets and reviewed Phosphor icons
  -> Optional configured store/support destinations
```

## State

- The selected language is the only persisted website preference and is stored in local browser storage.
- Product-preview search and category selection are in-memory demonstration state.
- Preview results are explicitly illustrative and never presented as production provider records.
- Store URLs come from Vite environment variables and fall back to the platform-status route.

## Design system

The stylesheet uses primitive color values, semantic purpose tokens, and component-level selectors. The visual language is warm editorial paper, Haitian navy, restrained red, and gold. The site uses no remote fonts, third-party tracking scripts, or decorative icon library at runtime.

The reviewed icon assets are from the same local Phosphor family used by KONEKT's iPhone experience. Icons support navigation or meaning; they are not used as decorative feature filler.

## Routing

Vercel rewrites public paths to the Vite entry point. `App.jsx` resolves known information routes and shows an accessible 404 for unknown paths.

## Security and privacy

- No backend secret is shipped.
- No analytics pipeline or newsletter collection is enabled.
- Content Security Policy, frame denial, referrer policy, MIME sniffing protection, and a restrictive permissions policy are configured at the host.
- Provider authentication, publication, verification, and evidence access remain outside this repository.

## Quality gates

- ESLint validates React and JavaScript.
- The content audit blocks previously identified unsupported claims and incorrect Clerk/ticketing copy.
- Vite production build proves bundle integrity.
- GitHub Actions runs the same `npm run check` gate on pull requests and `main` pushes.
- Browser verification covers English/Kreyòl switching, mobile navigation, interactive filtering, key public routes, 404 behavior, console errors, and mobile horizontal overflow.
