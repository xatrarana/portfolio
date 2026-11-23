export const profile = {
  firstName: "Chhatra",
  lastName: "Rana",
  role: "Software & Security Engineer",
  intro:
    "I build web systems that are secure from the first commit, and the detection tools that watch over them.",
  email: "mail@chhatrarana.com.np",
  location: "Kathmandu, Nepal",
  status: "Open to new roles",
  socials: [
    { label: "GitHub", short: "GH", href: "https://github.com/xatrarana" },
    { label: "LinkedIn", short: "in", href: "https://np.linkedin.com/in/chhatra-rana-73b5991b1" },
    { label: "npm", short: "np", href: "https://www.npmjs.com/package/mockini" },
    { label: "Email", short: "@", href: "mailto:mail@chhatrarana.com.np" },
  ],
}

export type ProjectKind = "sec" | "dev"
export type ShotKind = "ioc" | "vault" | "policy" | "bars" | "intel" | "code" | "cql"

export const projects: {
  name: string
  tagline: string
  href: string
  badge: string
  kind: ProjectKind
  chips: string[]
  shot: ShotKind
  featured?: boolean
}[] = [
  {
    name: "CrowdStrike SOC home lab",
    tagline: "Enterprise-style SOC on free tooling",
    href: "https://github.com/xatrarana/crowdstrike-logscale-homelab",
    badge: "Guide",
    kind: "sec",
    chips: ["Security", "LogScale", "CQL", "Security Onion"],
    shot: "cql",
    featured: true,
  },
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

export const services: { title: string; body: string; stack: string[]; shot: ShotKind }[] = [
  {
    title: "SIEM engineering",
    body: "CrowdStrike Falcon Next-Gen SIEM end to end: log source onboarding, parsing and normalization, CQL detections and threat hunting, and automated response with Fusion SOAR.",
    stack: ["Falcon Next-Gen SIEM", "CQL", "Fusion SOAR", "Workbench", "Wazuh"],
    shot: "cql",
  },
  {
    title: "AI security",
    body: "Protecting AI-driven systems and agents with AI Detection and Response and agentic security practices.",
    stack: ["Falcon AIDR", "Agent monitoring", "LLM guardrails"],
    shot: "policy",
  },
  {
    title: "Software development",
    body: "Full-stack web applications and APIs, from the database to deployment on AWS and Kubernetes.",
    stack: ["TypeScript", "Next.js", "Node.js", ".NET", "Laravel", "PostgreSQL"],
    shot: "code",
  },
  {
    title: "Security engineering",
    body: "Penetration testing, vulnerability and asset management, and secure code review for web applications.",
    stack: ["Pentesting", "Vulnerability mgmt", "Code review", "Threat modeling"],
    shot: "intel",
  },
  {
    title: "Training & workshops",
    body: "Hands-on secure development and SOC workshops for teams and students.",
    stack: ["Secure coding", "SOC home labs", "Detection engineering"],
    shot: "ioc",
  },
]

export const experience: { company: string; role: string; from: string; to: string | null; summary: string; tech: string[] }[] = [
  {
    company: "Raechal Enterprise",
    role: "SIEM Engineer",
    from: "Dec 2025",
    to: null,
    summary: "Engineer and operate CrowdStrike Falcon Next-Gen SIEM, write CQL detections and hunts, automate response with Fusion SOAR, and secure AI agents with Falcon AIDR.",
    tech: ["Falcon NG-SIEM", "CQL", "Fusion SOAR", "AIDR"],
  },
  { company: "Astoria Company", role: "Software Engineer · Texas, USA", from: "Aug 2025", to: null, summary: "Lead-management software on AWS and Kubernetes, with database and query optimization.", tech: ["AWS", "Kubernetes", "Databases"] },
  { company: "Security Training Program", role: "Cybersecurity Analyst Intern", from: "Aug 2025", to: "Nov 2025", summary: "Built two Snort NIDS projects and deployed a Wazuh SIEM.", tech: ["Snort", "Wazuh SIEM", "NIDS"] },
  { company: "Aarshia Infotech", role: ".NET Developer · Kathmandu", from: "Apr 2024", to: "Jul 2024", summary: "Enterprise management and data systems in C# and SQL Server.", tech: [".NET", "C#", "SQL Server"] },
  { company: "NexSewa", role: "Full-Stack Developer (Contract)", from: "Jul 2023", to: "Aug 2023", summary: "Node.js backend and REST APIs for a tourism app.", tech: ["Node.js", "REST APIs"] },
  { company: "CastellTech", role: "Full-Stack Developer · Kathmandu", from: "May 2022", to: "May 2023", summary: "Node.js backend systems with JWT authentication.", tech: ["Node.js", "JWT auth", "JavaScript"] },
]
