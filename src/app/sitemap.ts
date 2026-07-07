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
    ...buildPages,
  ];
}
