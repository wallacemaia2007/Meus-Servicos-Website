import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

const HERO_PREVIEW_IMAGE = `${SITE_URL}/assets/images/hero-preview.png`;
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [HERO_PREVIEW_IMAGE],
    },
    {
      url: `${SITE_URL}/start-project`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [HERO_PREVIEW_IMAGE],
    },
  ];
}
