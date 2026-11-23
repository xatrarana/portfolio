import { Github, Linkedin, Mail, Package } from "lucide-react"
import { profile } from "@/lib/content"
import { delay } from "@/lib/reveal"
import { ArrowButton } from "./arrow-button"
import { Portrait } from "./portrait"

const icons = { GitHub: Github, LinkedIn: Linkedin, npm: Package, Email: Mail } as const

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="wrap">
        <h1 className="name" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <span className="w stroke" aria-hidden="true" data-reveal="name" style={delay(100)}>
            {profile.firstName}
          </span>
          <span className="w" aria-hidden="true" data-reveal="name" style={delay(260)}>
            {profile.lastName}
          </span>
        </h1>
        <div className="hero-stage">
          <div className="hero-left">
            <h2 data-reveal style={delay(650)}>{profile.role}</h2>
            <p data-reveal style={delay(760)}>
              {profile.intro.split(/(secure)/).map((part, i) => (part === "secure" ? <em key={i}>{part}</em> : part))}
            </p>
            <div data-reveal style={delay(870)}>
              <ArrowButton href="#contact">Let&apos;s collaborate</ArrowButton>
            </div>
          </div>
          <Portrait />
          <ul className="socials">
            {profile.socials.map((s, i) => {
              const Icon = icons[s.label as keyof typeof icons]
              return (
                <li key={s.label} data-reveal="right" style={delay(760 + i * 110)}>
                  <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    <span>{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
