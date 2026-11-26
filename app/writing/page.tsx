import type { Metadata } from "next"
import { shortName, social, writingIndexLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { getPosts, splitFeatured } from "@/lib/writing"
import { delay } from "@/lib/reveal"
import { SectionHead } from "@/components/site/section-head"
import { WritingCard, WritingRow } from "@/components/site/writing-card"
import { toCard } from "@/components/site/writing"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/site-footer"
import { TransitionLink } from "@/components/site/page-transition"

const description =
  "Guides and field notes on CrowdStrike Falcon Next-Gen SIEM, LogScale, log collection, AI security and detection engineering."

export const metadata: Metadata = {
  title: "Writing: SIEM, LogScale and detection engineering guides",
  description,
  alternates: { canonical: "/writing" },
  ...social({ title: `Writing | ${shortName}`, description, url: "/writing" }),
}

export default function WritingIndex() {
  const posts = getPosts()
  const { first, rest } = splitFeatured(posts)
  return (
    <>
      <JsonLd data={writingIndexLd(posts)} />
      <main className="detail cover">
        <div className="wrap">
          <div className="detail-bar">
            <span data-reveal="fade" style={delay(80)}>
              <TransitionLink href="/#writing" className="back">
                <span aria-hidden="true">←</span> Home
              </TransitionLink>
            </span>
          </div>
        </div>
        <section className="sec writing">
          <div className="wrap">
            <SectionHead
              ghost="Field notes"
              label="Writing"
              as="h1"
              align="left"
              aside={
                <>
                  <em>{posts.length}</em> {posts.length === 1 ? "article" : "articles"} · newest first
                </>
              }
            />
            {first ? (
              <div data-reveal style={delay(200)}>
                <WritingCard p={toCard(first)} />
              </div>
            ) : null}
            {rest.length ? (
              <div className="post-rows">
                {rest.map((p, i) => (
                  <div key={p.slug} data-reveal style={delay(i * 80)}>
                    <WritingRow p={toCard(p)} i={i + 1} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
        <Contact after="light" />
      </main>
      <Footer />
    </>
  )
}
