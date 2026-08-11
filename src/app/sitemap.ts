import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

const HERO_PREVIEW_IMAGE = `${SITE_URL}/assets/images/hero-preview.png`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [HERO_PREVIEW_IMAGE],
    },
  ];
}
