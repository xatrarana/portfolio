/**
 * Certifications shown on the home page.
 *
 * To add one:
 *   1. Put the PDF in public/certs/<slug>.pdf and a preview image of its first
 *      page in public/certs/<slug>.webp (a screenshot works; ~960px wide).
 *   2. Add an entry below. Order does not matter: the list sorts newest first,
 *      and the filter tabs, counts and issuer line are built from these entries.
 */
export type CertType = "Certification" | "Learning plan" | "Workshop" | "Training"

export type Cert = {
  slug: string
  title: string
  issuer: string
  type: CertType
  /** "YYYY-MM-DD", or just "YYYY" when the certificate shows no date. */
  date: string
  level?: string
  note?: string
  /** Certificate or credential number printed on it. */
  id?: string
  /** Set for portrait certificates. */
  portrait?: boolean
}

const all: Cert[] = [
  { slug: "falcon-administrator", title: "Falcon Administrator", issuer: "CrowdStrike University", type: "Learning plan", date: "2026-08-25", id: "LP39388", portrait: true },
  { slug: "falcon-champions-cloud-security", title: "Falcon Champions · Cloud Security", issuer: "CrowdStrike", type: "Certification", level: "Associate", date: "2026-08-12" },
  { slug: "falcon-champions-ng-siem", title: "Falcon Champions · Next-Gen SIEM", issuer: "CrowdStrike", type: "Certification", level: "Associate", date: "2026-08-10" },
  { slug: "falcon-champions-endpoint", title: "Falcon Champions · Endpoint", issuer: "CrowdStrike", type: "Certification", level: "Associate", date: "2026-08-10" },
  { slug: "falcon-champions-ng-identity", title: "Falcon Champions · Next-Gen Identity", issuer: "CrowdStrike", type: "Certification", level: "Associate", date: "2026-08-10" },
  { slug: "ng-siem-associate-learning-plan", title: "Next-Gen SIEM Associate", issuer: "CrowdStrike Falcon Champions", type: "Learning plan", date: "2026" },
  { slug: "falcon-aidr-workshop", title: "Securing AI with Falcon AI Detection & Response", issuer: "CrowdStrike", type: "Workshop", note: "1 CPE credit", date: "2026" },
  { slug: "broadway-advanced-cybersecurity", title: "Advanced Cybersecurity", issuer: "Broadway Infosys", type: "Training", note: "113 hours", date: "2025-11-05", id: "B65621000" },
]

// A year-only date sorts after the dated entries of that year.
const key = (d: string) => (d.length === 4 ? `${d}-00-00` : d)
export const certs = [...all].sort((a, b) => key(b.date).localeCompare(key(a.date)))

export const certDate = (d: string) =>
  d.length === 4 ? d : new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { month: "short", year: "numeric" })

export const certMeta = (c: Cert) => [c.issuer, c.level, c.note, c.id && `#${c.id}`].filter(Boolean).join(" · ")
