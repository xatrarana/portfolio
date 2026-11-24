"use client"

import { useState } from "react"

/** Dark code block with a label bar and a Copy button. */
export function CodeBlock({ lang, label, code }: { lang: string; label?: string; code: string }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setDone(true)
      setTimeout(() => setDone(false), 1400)
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  }
  return (
    <div className="codeblock">
      <div className="codeblock-bar">
        <span>{label || lang}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label || lang} code`}>
          {done ? "Copied" : "Copy"}
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
