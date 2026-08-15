import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/assets/images/", "/assets/brand/", "/assets/icons/"],
      disallow: ["/api/", "/*.json$"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
