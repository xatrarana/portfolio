import { profile } from "@/lib/content"
import { siteUrl } from "@/lib/seo"

export const dynamic = "force-static"

/**
 * /.well-known/security.txt (RFC 9116): how to report a vulnerability.
 * Expires is set one year after each build, so any deploy within a year keeps it valid.
 */
export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  const body = [
    `Contact: mailto:${profile.email}`,
    `Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, ".000Z")}`,
    "Preferred-Languages: en",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    "",
    "# Found a security issue on this site? Please email the details and steps to",
    "# reproduce. I'll reply within a few days. Please don't run automated scans",
    "# or denial-of-service tests against the site.",
    "",
  ].join("\n")
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
