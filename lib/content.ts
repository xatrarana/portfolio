export const profile = {
  firstName: "Chhatra",
  lastName: "Rana",
  role: "Software & Security Engineer",
  intro:
    "I build web systems that are secure from the first commit, and the detection tools that watch over them.",
  email: "info@chhatrarana.com.np",
  location: "Kathmandu, Nepal",
  status: "Open to new roles",
  socials: [
    { label: "GitHub", short: "GH", href: "https://github.com/xatrarana" },
    { label: "LinkedIn", short: "in", href: "https://np.linkedin.com/in/chhatra-rana-73b5991b1" },
    { label: "npm", short: "np", href: "https://www.npmjs.com/package/mockini" },
    { label: "Email", short: "@", href: "mailto:info@chhatrarana.com.np" },
  ],
}

export type ProjectKind = "sec" | "dev"
export type ShotKind = "ioc" | "vault" | "policy" | "bars" | "intel" | "code"

export const projects: {
  name: string
  tagline: string
  href: string
  badge: string
  kind: ProjectKind
  chips: string[]
  shot: ShotKind
}[] = [
  {
    name: "OpenSOC Toolkit",
    tagline: "Investigation workspace for SOC analysts",
    href: "https://opensoc.vercel.app",
    badge: "Live product",
    kind: "sec",
    chips: ["Security", "Next.js", "TypeScript"],
    shot: "ioc",
  },
  {
    name: "VaultLock",
    tagline: "Open-source password manager",
    href: "https://vaultlock.vercel.app",
    badge: "Live product",
    kind: "dev",
    chips: ["Development", "E2E encryption", "TypeScript"],
    shot: "vault",
  },
  {
    name: "SentinelGate",
    tagline: "Security layer for agentic AI",
    href: "https://github.com/xatrarana/sentinelgate",
    badge: "Open source",
    kind: "sec",
    chips: ["Security", "Python", "LLM"],
    shot: "policy",
  },
  {
    name: "Lightweight NIDS",
    tagline: "Snort-based intrusion detection",
    href: "https://github.com/xatrarana/Network-Intrusion-Detection-System",
    badge: "Open source",
    kind: "sec",
    chips: ["Security", "Lua", "Snort"],
    shot: "bars",
  },
  {
    name: "ThreatIntel",
    tagline: "Modular threat intelligence platform",
    href: "https://threatintel-iudf.onrender.com",
    badge: "Live product",
    kind: "sec",
    chips: ["Security", "Python", "SIEM"],
    shot: "intel",
  },
  {
    name: "mockini",
    tagline: "Mock REST API from one JSON file",
    href: "https://www.npmjs.com/package/mockini",
    badge: "npm package",
    kind: "dev",
    chips: ["Development", "CLI", "TypeScript"],
    shot: "code",
  },
]

export const services = [
  {
    title: "Software development",
    body: "Full-stack web applications and APIs, from the database to deployment on AWS and Kubernetes.",
    stack: ["TypeScript", "Next.js", "Node.js", ".NET", "Laravel", "PostgreSQL"],
  },
  {
    title: "Security engineering",
    body: "Penetration testing, vulnerability assessment and secure code review for web applications.",
    stack: ["Pentesting", "Code review", "Threat modeling"],
  },
  {
    title: "Detection & SIEM",
    body: "Network intrusion detection and SIEM deployments that turn logs into useful alerts.",
    stack: ["Wazuh", "Snort", "CrowdStrike LogScale", "Security Onion"],
  },
  {
    title: "Training & workshops",
    body: "Hands-on secure development and SOC workshops for teams and students.",
    stack: ["Secure coding", "SOC home labs"],
  },
]

export const experience = [
  { company: "Astoria Company", role: "Software Engineer · Texas, USA", from: "Aug 2025", to: null, tech: ["AWS", "Kubernetes", "Databases"] },
  { company: "Security Training Program", role: "Cybersecurity Analyst Intern", from: "Aug 2025", to: "Nov 2025", tech: ["Snort", "Wazuh SIEM", "NIDS"] },
  { company: "Aarshia Infotech", role: ".NET Developer · Kathmandu", from: "Apr 2024", to: "Jul 2024", tech: [".NET", "C#", "SQL Server"] },
  { company: "NexSewa", role: "Full-Stack Developer (Contract)", from: "Jul 2023", to: "Aug 2023", tech: ["Node.js", "REST APIs"] },
  { company: "CastellTech", role: "Full-Stack Developer · Kathmandu", from: "May 2022", to: "May 2023", tech: ["Node.js", "JWT auth", "JavaScript"] },
]
