# Example App

The package's demo site: an Inertia app with routed and local modals that runs
without a Laravel backend. `server.ts` answers Inertia's requests in the browser
the way Laravel and `inertiaui/modal` would, including validation errors and
redirects, so the build is fully static. It imports the package from `../src`.

```bash
bun install
bun run dev            # http://localhost:3000
bun run build:example  # example/dist
```

Routes and their data live in `server.ts`, page components in `pages/`. Data is
kept in memory and resets on reload.

## Deployment

Cloudflare Pages builds the site on every push to `master` and serves it at
https://modal-ary.pages.dev:

- Build command: `bun install --frozen-lockfile && bun run build:example`
- Build output directory: `example/dist`
- Environment variable: `SKIP_DEPENDENCY_INSTALL=1`, because the build
  command installs

The build has no `404.html`, so Pages serves `index.html` for every path and
modal URLs like `/users/1/edit` load directly.

Use `demo-app/` to test against the real Laravel package and SSR.
