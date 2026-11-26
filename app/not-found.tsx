import type { Metadata } from "next"
import { getPosts } from "@/lib/writing"
import { projects } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { ArrowButton } from "@/components/site/arrow-button"
import { Footer } from "@/components/site/site-footer"
import { TransitionLink } from "@/components/site/page-transition"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const latest = getPosts()[0]
  return (
    <>
      <main className="detail cover nf">
        <div className="wrap">
          <div className="detail-bar">
            <span data-reveal="fade" style={delay(80)}>
              <TransitionLink href="/" className="back">
                <span aria-hidden="true">←</span> Home
              </TransitionLink>
            </span>
          </div>
          <div className="nf-in">
            <p className="nf-code" aria-hidden="true" data-reveal="fade" style={delay(160)}>
              404
            </p>
            <h1 data-reveal style={delay(260)}>
              This page <em>doesn&apos;t exist</em>
            </h1>
            <p className="lede" data-reveal style={delay(380)}>
              The link may be old or mistyped. Here are a few places to pick up from instead.
            </p>
            <div className="row" data-reveal style={delay(480)}>
              <ArrowButton href="/">Back to home</ArrowButton>
              <ArrowButton href="/writing" variant="light">
                Read the writing
              </ArrowButton>
            </div>
            <ul className="nf-links" data-reveal style={delay(580)}>
              <li>
                <TransitionLink href="/#work">All projects</TransitionLink>
              </li>
              {featured ? (
                <li>
                  <TransitionLink href={`/work/${featured.slug}`}>{featured.name}</TransitionLink>
                </li>
              ) : null}
              {latest ? (
                <li>
                  <TransitionLink href={`/writing/${latest.slug}`}>{latest.title}</TransitionLink>
                </li>
              ) : null}
              <li>
                <TransitionLink href="/#contact">Get in touch</TransitionLink>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
