import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` emits a fully static `out/` directory
  // (no `next export` step — that was removed in v14). Deployable to any
  // static host, including an S3 bucket served at the root.
  output: "export",

  // Emit `route/index.html` instead of `route.html` so directory-style URLs
  // resolve via S3's index-document mechanism (e.g. `/docs/` -> `/docs/index.html`).
  // Without this, `/docs` would 404 on an S3 website endpoint.
  trailingSlash: true,

  // The default `next/image` optimizer needs a server; disable it so images
  // are served as-is in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
