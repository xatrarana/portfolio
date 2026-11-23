import Image from "next/image"
import { profile } from "@/lib/content"
import { ArrowButton } from "./arrow-button"

function Letters({ word, offset }: { word: string; offset: number }) {
  return (
    <>
      {Array.from(word).map((ch, i) => (
        <span key={i} className="ch" style={{ ["--i" as string]: i + offset }}>
          {ch}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="wrap">
        <h1 className="name" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <span className="w stroke" aria-hidden="true">
            <Letters word={profile.firstName} offset={0} />
          </span>
          <span className="w" aria-hidden="true">
            <Letters word={profile.lastName} offset={profile.firstName.length - 1} />
          </span>
        </h1>
        <div className="hero-stage">
          <div className="hero-left">
            <h2>{profile.role}</h2>
            <p>{profile.intro}</p>
            <ArrowButton href="#work">See my work</ArrowButton>
          </div>
          <div className="portrait">
            <Image src="/me.webp" alt={`Portrait of ${profile.firstName} ${profile.lastName}`} width={512} height={512} priority />
          </div>
          <ul className="socials">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <i aria-hidden="true">{s.short}</i>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
