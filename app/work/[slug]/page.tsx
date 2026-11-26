import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { profile, projects } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { clip, social, projectPageLd, shortName } from "@/lib/seo"
import { JsonLd } from "@/components/site/json-ld"
import { ArrowButton } from "@/components/site/arrow-button"
import { ProjectShot } from "@/components/site/project-shot"
import { ProjectCard } from "@/components/site/work"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/site-footer"
import { TransitionLink } from "@/components/site/page-transition"

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const p = projects.find((x) => x.slug === params.slug)
  if (!p) return {}
  const title = `${p.name}: ${p.tagline}`
  const description = clip(p.about)
  const shareTitle = `${title} | ${shortName}`
  return {
    title,
    description,
    keywords: [p.name, ...p.chips, p.service, shortName],
    alternates: { canonical: `/work/${p.slug}` },
    ...social({ title: shareTitle, description, url: `/work/${p.slug}`, type: "article" }),
  }
}

/** Title that resolves letter by letter, words kept whole so they never break mid-word. */
function LetterTitle({ text, start }: { text: string; start: number }) {
  let n = 0
  return (
    <h1 className="letters" aria-label={text} data-reveal="letters" style={delay(start)}>
      {text.split(" ").map((word, w) => (
        <span className="wd" aria-hidden="true" key={w}>
          {[...word].map((ch, i) => (
            <span className="ch" key={i} style={{ ["--i" as string]: n++ }}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

export default function ProjectPage({ params }: Params) {
  const idx = projects.findIndex((x) => x.slug === params.slug)
  if (idx < 0) notFound()
  const p = projects[idx]
  const more = [projects[(idx + 1) % projects.length], projects[(idx + 2) % projects.length]]
  const tools = p.chips.filter((c) => c !== "Security" && c !== "Development")

  return (
    <>
      <JsonLd data={projectPageLd(p)} />
      <main className="detail cover">
        <div className="wrap">
          <div className="detail-bar">
            <span data-reveal="fade" style={delay(80)}>
              <TransitionLink href="/#work" className="back">
                <span aria-hidden="true">←</span> Back
              </TransitionLink>
            </span>
            <span className="pill" data-reveal="fade" style={delay(200)}>
              <span className="dot" />
              {profile.status}
            </span>
          </div>

          <div className="detail-head">
            <div>
              <div className="tags" data-reveal style={delay(300)}>
                <span>{p.badge}</span>
                <span>{p.kind === "sec" ? "Security" : "Development"}</span>
              </div>
              <div className="title-row">
                <LetterTitle text={p.name} start={420} />
                <span className="real" data-reveal="fade" style={delay(900)}>
                  /{p.badge === "Guide" ? "Guide" : "Real project"}
                </span>
              </div>
              <p className="lede" data-reveal style={delay(820)}>
                {p.tagline}.
              </p>
              <div className="row" data-reveal style={delay(960)}>
                <ArrowButton href={p.href} external>
                  {p.link}
                </ArrowButton>
                <ArrowButton href="#contact" variant="light">
                  Contact me
                </ArrowButton>
              </div>
            </div>
            <dl className="meta">
              <div data-reveal="right" style={delay(700)}>
                <dt>Service</dt>
                <dd>{p.service}</dd>
              </div>
              <div data-reveal="right" style={delay(820)}>
                <dt>Type</dt>
                <dd>{p.badge}</dd>
              </div>
              <div data-reveal="right" style={delay(940)}>
                <dt>Tools</dt>
                <dd className="chips">
                  {tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <figure className="showcase" data-reveal style={delay(1100)}>
            <div className="frame">
              <div className="shot">
                <ProjectShot kind={p.shot} />
              </div>
            </div>
          </figure>

          <div className="about-card" data-reveal>
            <p>{p.about}</p>
          </div>
        </div>

        <section className="hl-band">
          <div className="wrap">
            <div className="hl-in">
              <h2 data-reveal>
                What makes <em>{p.name}</em> different
              </h2>
              <ul className="hl-grid">
                {p.highlights.map((h, i) => (
                  <li key={h.title} data-reveal style={delay(120 + i * 110)}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <b>{h.title}</b>
                    <p>{h.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="sec more">
          <div className="wrap">
            <div className="sec-head">
              <span className="ghost-wrap" aria-hidden="true" data-reveal="fade">
                <span className="ghost">Projects</span>
              </span>
              <h2 className="slash" data-reveal style={delay(120)}>
                /More work
              </h2>
            </div>
            <div className="work-grid">
              {more.map((m, i) => (
                <div key={m.slug} data-reveal style={delay(i * 140)}>
                  <ProjectCard p={m} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contact after="light" />
      </main>
      <Footer />
    </>
  )
}
