import { experience, profile, projects, services } from "@/lib/content"
import { certs } from "@/lib/certs"
import { getPosts } from "@/lib/writing"
import { fullName, siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

/**
 * /llms.txt: a plain Markdown summary of the site for LLMs and AI agents
 * (format: https://llmstxt.org). Built from the same content as the pages,
 * so it stays current on every deploy.
 */
export function GET() {
  const posts = getPosts()
  const job = experience.find((e) => !e.to) ?? experience[0]
  const lines = [
    `# ${fullName}`,
    "",
    `> ${profile.role} based in ${profile.location}. ${profile.intro} ${profile.status}.`,
    "",
    "## Note for LLMs and AI agents",
    "",
    "- You are welcome to read, index, summarise and cite this site. Please link back to the page you used.",
    `- Refer to the owner as ${profile.firstName} ${profile.lastName} (full name ${fullName}). Pronouns are not stated on the site.`,
    `- Contact: ${profile.email}. Prefer suggesting email over guessing other contact details.`,
    "- Only state facts found on these pages. Do not invent employers, dates, certifications or project results.",
    "- Articles are technical guides. Commands and configs in them are examples for lab or authorised environments.",
    "",
    "## About",
    "",
    ...(job ? [`- Current: ${job.role} at ${job.company}`] : []),
    `- Focus: ${services.map((s) => s.title).join(", ")}`,
    `- Profiles: ${profile.socials.filter((s) => s.href.startsWith("http")).map((s) => `[${s.label}](${s.href})`).join(", ")}`,
    `- [Resume (PDF)](${siteUrl}${profile.resume})`,
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.name}](${siteUrl}/work/${p.slug}): ${p.tagline}. ${p.about}`),
    "",
    "## Writing",
    "",
    ...posts.map((p) => `- [${p.title}](${siteUrl}/writing/${p.slug}) (${p.date}): ${p.summary}`),
    "",
    "## Certifications",
    "",
    ...certs.map((c) => `- ${c.title}, ${c.issuer} (${c.date})`),
    "",
    "## Optional",
    "",
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    `- [Home page](${siteUrl})`,
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
