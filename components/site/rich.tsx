import { Fragment, type ReactNode } from "react"

/** Inline Markdown: `code`, **bold**, *italic*, [links](url) and [ ] checkboxes. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\[ \])/g
  let last = 0
  let k = 0
  for (const m of text.matchAll(re)) {
    const s = m[0]
    if (m.index! > last) parts.push(text.slice(last, m.index))
    if (s === "[ ]") parts.push(<span key={k++} className="box" role="img" aria-label="to check" />)
    else if (s.startsWith("`")) parts.push(<code key={k++}>{s.slice(1, -1)}</code>)
    else if (s.startsWith("**"))
      parts.push(
        <b key={k++}>
          <Inline text={s.slice(2, -2)} />
        </b>,
      )
    else if (s.startsWith("*"))
      parts.push(
        <em key={k++}>
          <Inline text={s.slice(1, -1)} />
        </em>,
      )
    else {
      const [, label, href] = s.match(/\[([^\]]+)\]\(([^)]+)\)/)!
      parts.push(
        <a key={k++} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {label}
        </a>,
      )
    }
    last = m.index! + s.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <Fragment>{parts}</Fragment>
}
