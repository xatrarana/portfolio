import { profile, projects } from "@/lib/content"
import { certs } from "@/lib/certs"
import type { Post } from "@/lib/writing"

/** Production origin. Every canonical URL, the sitemap and the JSON-LD are built from it. */
export const siteUrl = "https://chhatrarana.com.np"
export const fullName = "Chhatra Bahadur Rana"
export const shortName = `${profile.firstName} ${profile.lastName}`

const abs = (path: string) => new URL(path, siteUrl).toString()
const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

const sameAs = profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href)

/** The site owner. Other entities point at it with { "@id": personId }. */
export function personLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: fullName,
    alternateName: shortName,
    url: siteUrl,
    image: abs("/opengraph-image.jpg"),
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.intro,
    worksFor: [
      { "@type": "Organization", name: "Raechal Enterprise" },
      { "@type": "Organization", name: "Astoria Company" },
    ],
    address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
    knowsAbout: [
      "Cybersecurity",
      "SIEM engineering",
      "CrowdStrike Falcon Next-Gen SIEM",
      "Falcon LogScale",
      "CrowdStrike Query Language (CQL)",
      "Threat hunting",
      "Detection engineering",
      "AI security",
      "Penetration testing",
      "Software engineering",
      "TypeScript",
      "Next.js",
      "Node.js",
      ".NET",
      "AWS",
    ],
    hasCredential: certs.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      credentialCategory: c.type === "Certification" ? "certification" : c.type.toLowerCase(),
      recognizedBy: { "@type": "Organization", name: c.issuer },
      url: abs(`/certs/${c.slug}.pdf`),
    })),
    sameAs,
  }
}

function projectLd(p: (typeof projects)[number]) {
  return {
    "@type": p.kind === "dev" || p.badge === "npm package" ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${abs(`/work/${p.slug}`)}#project`,
    name: p.name,
    headline: p.tagline,
    description: p.about,
    url: abs(`/work/${p.slug}`),
    sameAs: p.href,
    keywords: p.chips.join(", "),
    genre: p.service,
    author: { "@id": personId },
    creator: { "@id": personId },
  }
}

const crumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
})

/** Home page: the person, the site, and the list of projects. */
export function homeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personLd(),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `${shortName} Portfolio`,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: `${shortName} | ${profile.role}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ItemList",
        name: "Projects",
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: projectLd(p) })),
      },
    ],
  }
}

export function projectPageLd(p: (typeof projects)[number]) {
  return {
    "@context": "https://schema.org",
    "@graph": [projectLd(p), crumbs([["Home", "/"], [p.name, `/work/${p.slug}`]])],
  }
}

export function writingIndexLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${abs("/writing")}#blog`,
        url: abs("/writing"),
        name: `Writing by ${shortName}`,
        description: "Guides and field notes on SIEM, log collection and detection engineering.",
        author: { "@id": personId },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: abs(`/writing/${p.slug}`),
          datePublished: p.date || undefined,
        })),
      },
      crumbs([["Home", "/"], ["Writing", "/writing"]]),
    ],
  }
}

export function articleLd(p: Post) {
  const url = abs(`/writing/${p.slug}`)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: p.title,
        description: p.summary,
        url,
        mainEntityOfPage: url,
        datePublished: p.date || undefined,
        dateModified: p.date || undefined,
        keywords: p.tags.join(", "),
        wordCount: p.minutes * 230,
        image: abs(`/writing/${p.slug}/opengraph-image`),
        inLanguage: "en",
        author: { "@type": "Person", "@id": personId, name: fullName, url: siteUrl },
        publisher: { "@type": "Person", "@id": personId, name: fullName, url: siteUrl },
      },
      crumbs([["Home", "/"], ["Writing", "/writing"], [p.title, `/writing/${p.slug}`]]),
    ],
  }
}

/** Trim copy to a search-snippet friendly length (~160 chars) on a word boundary. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`
}

const shareAlt = `${shortName}, ${profile.role} in Kathmandu`

/**
 * Open Graph + Twitter fields for a page. Next.js replaces (not merges) these
 * objects per page, so each page sets the share images and card type again.
 */
export function social({ title, description, url, type = "website", images = true, ...og }: {
  title: string
  description: string
  url: string
  type?: "website" | "article" | "profile"
  /** false leaves the images to an opengraph-image / twitter-image file in the route. */
  images?: boolean
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}) {
  return {
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: `${shortName} Portfolio`,
      locale: "en_US",
      ...(images && { images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: shareAlt, type: "image/jpeg" }] }),
      ...og,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      creator: "@Xatra101",
      site: "@Xatra101",
      ...(images && { images: [{ url: "/twitter-image.jpg", width: 1200, height: 630, alt: shareAlt }] }),
    },
  }
}
