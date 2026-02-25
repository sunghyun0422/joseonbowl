import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://joseonbowl.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://joseonbowl.vercel.app/menu",
      lastModified: new Date(),
    },
    {
      url: "https://joseonbowl.vercel.app/visit",
      lastModified: new Date(),
    },
  ];
}
