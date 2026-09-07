# CloudForge — Frontend

The CloudForge marketing site and dashboard: a **Next.js 16** (App Router) app built with
React 19, TypeScript, and Tailwind CSS v4. It is configured as a **static export**, so a
production build is a self-contained bundle of HTML/CSS/JS that deploys to an S3 bucket root
(or any static host) with no server.

## Routes

| Route         | Description                                          |
| ------------- | ---------------------------------------------------- |
| `/`           | Marketing landing page                               |
| `/docs`       | Documentation with sidebar nav and code blocks       |
| `/dashboard`  | Dashboard sign-in screen                             |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 — development server with HMR
```

## Building (static export)

```bash
npm run build    # emits ./out — a static, deployable bundle
```

Static export is enabled in [`next.config.ts`](next.config.ts):

- `output: "export"` — `next build` produces `out/` directly (no separate `next export` step).
- `trailingSlash: true` — emits `route/index.html` (e.g. `docs/index.html`) so directory-style
  URLs resolve via S3's index-document mechanism instead of 404-ing.
- `images: { unoptimized: true }` — the default `next/image` optimizer needs a server, so it's
  disabled for the static build.

## Deploying to S3

Upload the **contents** of `out/` (note the trailing slash) so files land at the bucket root —
not inside an `out/` prefix:

```bash
aws s3 sync out/ s3://YOUR_BUCKET --delete
```

On the bucket's static-website config, set **index document** to `index.html` and
**error document** to `404.html`.

## Project structure

```
src/
├── app/            App Router routes (page.tsx + layout.tsx per route) and global CSS
├── components/
│   ├── ui/         Reusable UI kit (Button, Card, Dialog, Tabs, Input, …)
│   └── icons/      Icon components
└── styles/
    ├── tokens/     Design tokens — colors, radius, spacing, typography
    └── components.css
```

The visual source of truth is the CloudForge design system; see
[`../docs/DESIGN-SYSTEM.md`](../docs/DESIGN-SYSTEM.md).

## Tooling

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Language:** TypeScript
- **Lint:** `npm run lint` (ESLint, `eslint-config-next`)
