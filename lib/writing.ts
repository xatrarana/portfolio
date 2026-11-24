import fs from "node:fs"
import path from "node:path"

/**
 * Articles for the Writing section.
 *
 * To add one: save a Markdown file as content/writing/<slug>.md with a short
 * header between --- lines (title, date, tags, summary; card and heading are
 * optional versions of the title where *words* show in italic serif; visual:
 * failover gives the card the live failover diagram, otherwise it lists the
 * article's sections; featured: true keeps it as the big card on the home page).
 * Then push.
 * The home section, nav count, article page and sitemap all pick it up.
 *
 * Markdown supported: "# Part" dividers, "## 1. Section" and "### Sub" headings,
 * paragraphs, "- " lists, "> " notes, | tables |, and ``` code blocks. A code
 * block's first line can be ```bash, ```yaml <file name>, ```output (shown as an
 * "Expected" box) or ```diagram (a plain-text drawing).
 */

export type Block =
  | { t: "part"; text: string }
  | { t: "h2"; id: string; no?: string; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "note"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "code"; lang: string; label?: string; code: string }
  | { t: "table"; head: string[]; rows: string[][] }

export type Post = {
  slug: string
  title: string
  card: string
  heading: string
  date: string
  tags: string[]
  stack?: string
  visual?: string
  featured: boolean
  summary: string
  minutes: number
  sections: number
  blocks: Block[]
}

const dir = path.join(process.cwd(), "content", "writing")

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim().replace(/\\\|/g, "|"))

function parse(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n")
  const out: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }
    if (line.startsWith("```")) {
      const [first, ...rest] = line.slice(3).trim().split(" ")
      const lang = first || "text"
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) body.push(lines[i++])
      i++
      out.push({ t: "code", lang, label: rest.join(" ") || undefined, code: body.join("\n") })
      continue
    }
    if (line.startsWith("### ")) {
      out.push({ t: "h3", text: line.slice(4).trim() })
      i++
      continue
    }
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim()
      const m = text.match(/^(\d+)\.\s+(.*)$/)
      out.push(m ? { t: "h2", id: slugify(m[2]), no: m[1], text: m[2] } : { t: "h2", id: slugify(text), text })
      i++
      continue
    }
    if (line.startsWith("# ")) {
      out.push({ t: "part", text: line.slice(2).trim() })
      i++
      continue
    }
    if (line.startsWith("|")) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s:|-]+\|?$/.test(lines[i])) rows.push(cells(lines[i]))
        i++
      }
      out.push({ t: "table", head: rows[0], rows: rows.slice(1) })
      continue
    }
    if (line.startsWith("> ")) {
      const body: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) body.push(lines[i++].slice(2))
      out.push({ t: "note", text: body.join(" ") })
      continue
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""))
      out.push({ t: "ol", items })
      continue
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2))
      out.push({ t: "ul", items })
      continue
    }
    const body: string[] = []
    while (i < lines.length && lines[i].trim() && !/^(#|```|\||> |[-*] |\d+\. )/.test(lines[i])) body.push(lines[i++])
    out.push({ t: "p", text: body.join(" ") })
  }
  return out
}

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(dir, file), "utf8")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const meta: Record<string, string> = {}
  if (m) for (const l of m[1].split("\n")) {
    const k = l.indexOf(":")
    if (k > 0) meta[l.slice(0, k).trim()] = l.slice(k + 1).trim()
  }
  const body = m ? raw.slice(m[0].length) : raw
  const blocks = parse(body)
  const title = meta.title || file.replace(/\.md$/, "")
  return {
    slug: file.replace(/\.md$/, ""),
    title,
    card: meta.card || title,
    heading: meta.heading || title,
    date: meta.date || "",
    tags: (meta.tags || "").split(",").map((s) => s.trim()).filter(Boolean),
    stack: meta.stack,
    visual: meta.visual,
    featured: meta.featured === "true",
    summary: meta.summary || "",
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 230)),
    sections: blocks.filter((b) => b.t === "h2").length,
    blocks,
  }
}

let cache: Post[] | null = null

/** All articles, newest first. */
export function getPosts(): Post[] {
  if (cache) return cache
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : []
  cache = files.map(read).sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug))
  return cache
}

/** The article shown big on the home page: the one marked featured, else the newest. */
export function splitFeatured(posts = getPosts()) {
  const first = posts.find((p) => p.featured) ?? posts[0]
  return { first, rest: posts.filter((p) => p !== first) }
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug)

export const postDate = (d: string) =>
  d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""
