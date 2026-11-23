import { profile, projects, services, experience } from "@/lib/content"
import { ArrowButton } from "./arrow-button"
import { delay } from "@/lib/reveal"
import { TransitionLink } from "./page-transition"

export function Nav({ base = "" }: { base?: string }) {
  const links = [
    { href: `${base}#work`, label: "Work", count: projects.length },
    { href: `${base}#services`, label: "Services", count: services.length },
    { href: `${base}#experience`, label: "Experience", count: experience.length },
    { href: `${base}#contact`, label: "Contact" },
  ]
  return (
    <header className="nav">
      <div className="wrap">
        <span data-reveal="fade" style={delay(0)}>
          <TransitionLink href="/#top" className="brand" aria-label={`${profile.firstName} ${profile.lastName}, home`}>
            <span className="full">
              {profile.firstName} {profile.lastName}
            </span>
            <span className="short" aria-hidden="true">
              {profile.firstName[0]}
              {profile.lastName[0]}
            </span>
          </TransitionLink>
        </span>
        <ul data-reveal="fade" style={delay(80)}>
          {links.map((l) => (
            <li key={l.href}>
              <TransitionLink href={l.href}>
                {l.label}
                {l.count ? <sup>({l.count})</sup> : null}
              </TransitionLink>
            </li>
          ))}
        </ul>
        <div data-reveal="fade" style={delay(160)}>
          <ArrowButton href={`${base}#contact`}>Let&apos;s talk</ArrowButton>
        </div>
      </div>
    </header>
  )
}
