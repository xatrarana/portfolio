import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/seo"

/**
 * AI crawlers and assistants we welcome by name, so the portfolio can show up
 * in AI search answers. Remove a name here to block that crawler.
 */
const aiAgents = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini
  "Applebot-Extended",
  "CCBot", // Common Crawl
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
]

/** Served at /robots.txt. A short guide for AI agents lives at /llms.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
      { userAgent: aiAgents, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
