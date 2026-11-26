import type { MetadataRoute } from "next"
import { projects } from "@/lib/content"
import { getPosts } from "@/lib/writing"
import { siteUrl } from "@/lib/seo"

/** Served at /sitemap.xml. New projects and articles are picked up on the next deploy. */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts()
  const latest = posts.map((p) => p.date).filter(Boolean).sort().at(-1)
  const now = new Date()
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/writing`, lastModified: latest ? new Date(latest) : now, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${siteUrl}/writing/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
