import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { resourcePosts } from "@/lib/resources";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.websiteUrl.replace(/\/$/, "");
  const staticRoutes = ["", "/services", "/resources", "/tools", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const postRoutes = resourcePosts.map((post) => ({
    url: `${base}/resources/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...postRoutes];
}