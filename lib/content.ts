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

export type Highlight = { title: string; body: string }

export const projects: {
  slug: string
  name: string
  tagline: string
  href: string
  badge: string
  kind: ProjectKind
  chips: string[]
  shot: ShotKind
  featured?: boolean
  /** Detail page copy. */
  about: string
  service: string
  link: string
  highlights: Highlight[]
}[] = [
  {
    slug: "crowdstrike-soc-homelab",
    name: "CrowdStrike SOC home lab",
    tagline: "Enterprise-style SOC on free tooling",
    href: "https://github.com/xatrarana/crowdstrike-logscale-homelab",
    badge: "Guide",
    kind: "sec",
    chips: ["Security", "LogScale", "CQL", "Security Onion"],
    shot: "cql",
    featured: true,
    about: "A hands-on guide to building an enterprise-style security operations centre at home on free tooling. CrowdStrike Falcon LogScale handles search and dashboards, Security Onion watches the network, and CQL queries turn raw events into detections and threat hunts.",
    service: "SIEM engineering",
    link: "Read the guide",
    highlights: [
      { title: "Log pipeline", body: "Endpoint and network logs shipped into LogScale and parsed into searchable fields." },
      { title: "CQL hunting", body: "Ready-to-run queries, like finding encoded PowerShell across every host." },
      { title: "Network visibility", body: "Security Onion as the network sensor alongside the SIEM." },
      { title: "Free to reproduce", body: "Every step uses free tiers and open-source tools, documented end to end." },
    ],
  },
  {
    slug: "opensoc-toolkit",
    name: "OpenSOC Toolkit",
    tagline: "Investigation workspace for SOC analysts",
    href: "https://opensoc.vercel.app",
    badge: "Live product",
    kind: "sec",
    chips: ["Security", "Next.js", "TypeScript"],
    shot: "ioc",
    about: "An investigation workspace for SOC analysts. Paste an IP, domain or file hash and get the context you need to triage it, without hopping between a dozen browser tabs.",
    service: "Security engineering",
    link: "Live preview",
    highlights: [
      { title: "Any indicator", body: "IP addresses, domains and file hashes from a single search box." },
      { title: "Triage at a glance", body: "Each indicator gets a clear severity so the next step is obvious." },
      { title: "Built for analysts", body: "Designed around the way an alert is actually investigated." },
      { title: "Runs in the browser", body: "Nothing to install: open it and start investigating." },
    ],
  },
  {
    slug: "vaultlock",
    name: "VaultLock",
    tagline: "Open-source password manager",
    href: "https://vaultlock.vercel.app",
    badge: "Live product",
    kind: "dev",
    chips: ["Development", "E2E encryption", "TypeScript"],
    shot: "vault",
    about: "An open-source password manager where your vault is encrypted on your device before it is ever sent anywhere, so the server only stores data it cannot read.",
    service: "Software development",
    link: "Live preview",
    highlights: [
      { title: "End-to-end encrypted", body: "Encryption happens on the device, before data leaves it." },
      { title: "Zero-knowledge storage", body: "The server keeps ciphertext only." },
      { title: "Open source", body: "The code is public, so the security claims can be checked." },
      { title: "Typed end to end", body: "Written in TypeScript from the UI down to the API." },
    ],
  },
  {
    slug: "sentinelgate",
    name: "SentinelGate",
    tagline: "Security layer for agentic AI",
    href: "https://github.com/xatrarana/sentinelgate",
    badge: "Open source",
    kind: "sec",
    chips: ["Security", "Python", "LLM"],
    shot: "policy",
    about: "A security layer that sits between an AI agent and its tools. Every tool call is checked against policy and either allowed, sent for human review, or blocked before it runs.",
    service: "AI security",
    link: "View on GitHub",
    highlights: [
      { title: "Policy on every call", body: "Tool calls are evaluated before they execute, not after." },
      { title: "Allow, review, block", body: "Three clear outcomes, so risky actions can wait for a human." },
      { title: "Agent-aware", body: "Policies can differ per agent and per tool." },
      { title: "Audit trail", body: "Every decision is logged for later review." },
    ],
  },
  {
    slug: "lightweight-nids",
    name: "Lightweight NIDS",
    tagline: "Snort-based intrusion detection",
    href: "https://github.com/xatrarana/Network-Intrusion-Detection-System",
    badge: "Open source",
    kind: "sec",
    chips: ["Security", "Lua", "Snort"],
    shot: "bars",
    about: "A network intrusion detection system built on Snort, with custom rules and Lua logic that raise alerts on suspicious traffic as it happens.",
    service: "Security engineering",
    link: "View on GitHub",
    highlights: [
      { title: "Rule-based detection", body: "Custom Snort rules tuned for common attack patterns." },
      { title: "Lua extensions", body: "Lua scripting for logic that plain rules cannot express." },
      { title: "Real-time alerts", body: "Traffic is inspected and flagged as it flows." },
      { title: "Lightweight", body: "Small enough to run in a home lab or a single sensor." },
    ],
  },
  {
    slug: "threatintel",
    name: "ThreatIntel",
    tagline: "Modular threat intelligence platform",
    href: "https://threatintel-iudf.onrender.com",
    badge: "Live product",
    kind: "sec",
    chips: ["Security", "Python", "SIEM"],
    shot: "intel",
    about: "A modular threat intelligence platform for checking IP reputation and managing indicators of compromise, with results that can be synced into a SIEM.",
    service: "Security engineering",
    link: "Live preview",
    highlights: [
      { title: "IP reputation", body: "Look up an address and see reports and categories at once." },
      { title: "IOC management", body: "Keep indicators organised in one place." },
      { title: "SIEM sync", body: "Push intelligence to where detections run." },
      { title: "Modular", body: "Sources and outputs can be added as separate modules." },
    ],
  },
  {
    slug: "mockini",
    name: "mockini",
    tagline: "Mock REST API from one JSON file",
    href: "https://www.npmjs.com/package/mockini",
    badge: "npm package",
    kind: "dev",
    chips: ["Development", "CLI", "TypeScript"],
    shot: "code",
    about: "A command-line tool that spins up a mock REST API from one JSON file, so front-end work can start before the real backend exists.",
    service: "Software development",
    link: "View on npm",
    highlights: [
      { title: "One config file", body: "Port and routes live in a single mockini.json." },
      { title: "Zero setup", body: "Run it with npx, no install or boilerplate." },
      { title: "Static or custom", body: "Serve JSON files or define status codes per route." },
      { title: "Published on npm", body: "Versioned and ready to add to any project." },
    ],
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
