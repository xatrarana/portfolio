"use client"

import { useState } from "react"
import { Github, Linkedin, Mail, Package } from "lucide-react"
import { profile } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { ArrowButton } from "./arrow-button"

const icons = { GitHub: Github, LinkedIn: Linkedin, npm: Package, Email: Mail } as const

export function Contact({ after = "night" }: { after?: "night" | "light" }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <div className={`contact-wrap after-${after}`} id="contact">
      <section className="contact">
        <div className="cloud" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <span className="pill" data-reveal style={delay(0)}>
            <span className="dot" />
            {profile.status}
          </span>
          <h2 data-reveal style={delay(120)}>Have a project in mind?</h2>
          <p data-reveal style={delay(240)}>
            Whether it&apos;s a role, a product to build or a team to train, let&apos;s talk about how to make it secure from day one.
          </p>
          <div className="row" data-reveal style={delay(360)}>
            <ArrowButton href={`mailto:${profile.email}`}>Email me</ArrowButton>
            <ArrowButton variant="light" onClick={copy}>
              {copied ? "Copied" : "Copy email"}
            </ArrowButton>
          </div>
          <div className="mail" data-reveal style={delay(420)}>
            {profile.email}
          </div>
          <ul className="foot-pills">
            <li data-reveal style={delay(480)}>
              <span className="me">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/chhatra-portrait.webp" alt="" width={22} height={22} />
                {profile.firstName} {profile.lastName}
              </span>
            </li>
            {profile.socials.map((s, i) => {
              const Icon = icons[s.label as keyof typeof icons]
              return (
                <li key={s.label} data-reveal style={delay(560 + i * 80)}>
                  <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

