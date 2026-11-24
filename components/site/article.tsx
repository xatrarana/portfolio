import type { Block } from "@/lib/writing"
import { CodeBlock } from "./code-block"
import { Inline } from "./rich"

/** Renders a parsed article. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "part":
            return (
              <p className="part" key={i}>
                {b.text}
              </p>
            )
          case "h2":
            return (
              <h2 id={b.id} key={i}>
                {b.no ? <span className="no">{b.no.padStart(2, "0")}</span> : null}
                {b.text}
              </h2>
            )
          case "h3":
            return <h3 key={i}>{b.text}</h3>
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            )
          case "note":
            return (
              <p className="callout" key={i}>
                <span>
                  <Inline text={b.text} />
                </span>
              </p>
            )
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            )
          case "table":
            return (
              <div className="tbl-wrap" key={i} tabIndex={0}>
                <table className="tbl">
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, n) => (
                          <td key={n}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case "code":
            if (b.lang === "output")
              return (
                <div className="out" key={i}>
                  <span>Expected</span>
                  <pre>{b.code}</pre>
                </div>
              )
            if (b.lang === "diagram")
              return (
                <pre className="ascii" key={i} tabIndex={0}>
                  {b.code}
                </pre>
              )
            return <CodeBlock key={i} lang={b.lang} label={b.label} code={b.code} />
        }
      })}
    </>
  )
}
