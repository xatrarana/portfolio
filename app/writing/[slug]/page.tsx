import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { profile } from "@/lib/content"
import { getPost, getPosts, postDate } from "@/lib/writing"
import { delay } from "@/lib/reveal"
import { articleLd, clip, social, fullName, shortName, siteUrl } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { ArticleBody } from "@/components/site/article"
import { ArticleToc } from "@/components/site/article-toc"
import { Styled } from "@/components/site/writing-card"
import { ArrowButton } from "@/components/site/arrow-button"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/site-footer"
import { TransitionLink } from "@/components/site/page-transition"

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getPost(params.slug)
  if (!p) return {}
  const description = clip(p.summary)
  const shareTitle = `${p.title} | ${shortName}`
  return {
    title: p.title,
    description,
    keywords: p.tags,
    authors: [{ name: fullName, url: siteUrl }],
    alternates: { canonical: `/writing/${p.slug}` },
    ...social({
      title: shareTitle,
      description,
      url: `/writing/${p.slug}`,
      type: "article",
      images: false,
      publishedTime: p.date || undefined,
      authors: [siteUrl],
      tags: p.tags,
    }),
  }
}

export default function ArticlePage({ params }: Params) {
  const p = getPost(params.slug)
  if (!p) notFound()

  // Contents: sections grouped under their "# Part" heading.
  const groups: { part: string; items: { id: string; no?: string; text: string }[] }[] = []
  for (const b of p.blocks) {
    if (b.t === "part") groups.push({ part: b.text, items: [] })
    else if (b.t === "h2") {
      if (!groups.length) groups.push({ part: "Contents", items: [] })
      groups[groups.length - 1].items.push({ id: b.id, no: b.no, text: b.text })
    }
  }
  const others = getPosts().filter((x) => x.slug !== p.slug).slice(0, 2)

  return (
    <>
      <JsonLd data={articleLd(p)} />
      <main className="detail article cover">
        <div className="wrap">
          <div className="detail-bar">
            <span data-reveal="fade" style={delay(80)}>
              <TransitionLink href="/#writing" className="back">
                <span aria-hidden="true">←</span> Writing
              </TransitionLink>
            </span>
            <span className="pill" data-reveal="fade" style={delay(200)}>
              <span className="dot" />
              {p.minutes} min read
            </span>
          </div>

          <header className="art-head">
            <div className="tags" data-reveal style={delay(260)}>
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h1 data-reveal style={delay(360)}>
              <Styled text={p.heading} />
            </h1>
            <p className="lede" data-reveal style={delay(480)}>
              {p.summary}
            </p>
            <div className="meta-row" data-reveal style={delay(580)}>
              <b>
                {profile.firstName} {profile.lastName}
              </b>
              <time dateTime={p.date}>{postDate(p.date)}</time>
              <span>{p.sections} sections</span>
              {p.stack ? <span>{p.stack}</span> : null}
            </div>
          </header>

          <div className="art-body">
            <ArticleToc groups={groups} />
            <article className="prose">
              <ArticleBody blocks={p.blocks} />
              <div className="endcard">
                <p>Found this useful? I&apos;m always happy to compare notes.</p>
                <ArrowButton href="#contact">Get in touch</ArrowButton>
              </div>
            </article>
          </div>

          {others.length ? (
            <div className="post-rows next-reads">
              {others.map((o) => (
                <TransitionLink key={o.slug} href={`/writing/${o.slug}`} className="post-row">
                  <span className="n">→</span>
                  <span className="t">
                    <Styled text={o.card} />
                    <small>{o.summary}</small>
                  </span>
                  <span className="m">{o.minutes} min</span>
                </TransitionLink>
              ))}
            </div>
          ) : null}
        </div>
        <Contact after="light" />
      </main>
      <Footer />
    </>
  )
}
