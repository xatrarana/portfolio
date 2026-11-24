import { getPosts, postDate } from "@/lib/writing"
import { delay } from "@/lib/reveal"
import { SectionHead } from "./section-head"
import { ArrowButton } from "./arrow-button"
import { WritingCard, WritingRow, type CardPost } from "./writing-card"

export const toCard = (p: ReturnType<typeof getPosts>[number]): CardPost => ({
  slug: p.slug,
  card: p.card,
  tags: p.tags,
  summary: p.summary,
  date: postDate(p.date),
  minutes: p.minutes,
  sections: p.sections,
  stack: p.stack,
  visual: p.visual,
  outline: p.blocks.flatMap((b) => (b.t === "h2" ? [b.text] : [])).slice(0, 6),
})

/** Home page Writing section: the newest article as a featured card, the next few as rows. */
export function Writing() {
  const posts = getPosts()
  if (!posts.length) return null
  const [first, ...rest] = posts
  return (
    <section className="sec writing" id="writing">
      <div className="wrap">
        <SectionHead
          ghost="Field notes"
          label="Writing"
          align="left"
          aside={
            <>
              <em>{posts.length}</em> {posts.length === 1 ? "article" : "articles"} · guides and notes from the SOC
            </>
          }
        />
        <div data-reveal style={delay(200)}>
          <WritingCard p={toCard(first)} />
        </div>
        {rest.length ? (
          <div className="post-rows">
            {rest.slice(0, 4).map((p, i) => (
              <div key={p.slug} data-reveal style={delay(i * 90)}>
                <WritingRow p={toCard(p)} i={i + 1} />
              </div>
            ))}
          </div>
        ) : null}
        <div className="writing-more" data-reveal style={delay(300)}>
          <span>New guides land here first, newest on top.</span>
          <ArrowButton href="/writing" variant="light">
            All writing
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}
