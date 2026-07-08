import type { MetadataRoute } from "next";
import { microBuilds } from "@/lib/seed";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildPages: MetadataRoute.Sitemap = microBuilds.map((build) => ({
    url: `${SITE_URL}/builds/${build.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/builds`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/explore`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...buildPages,
  ];
}
