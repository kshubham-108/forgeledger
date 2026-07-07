/*
  Canonical site origin for metadata, sitemap and structured data.
  Set NEXT_PUBLIC_SITE_URL in production; the fallback keeps local
  builds and previews working.
*/
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fluent-app.vercel.app";

export const SITE_NAME = "Fluent";

export const SITE_DESCRIPTION =
  "The newest AI advances, turned into 25-minute practice builds matched to the modules you're actually taking. Free tools only. Built for UK undergraduates.";
