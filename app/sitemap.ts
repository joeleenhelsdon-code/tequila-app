import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://www.tequilafi.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.tequilafi.com/home",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
