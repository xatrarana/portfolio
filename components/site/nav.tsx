import { profile, projects, services, experience } from "@/lib/content"
import { ArrowButton } from "./arrow-button"
import { delay } from "@/lib/reveal"

export function Nav() {
  const links = [
    { href: "#work", label: "Work", count: projects.length },
    { href: "#services", label: "Services", count: services.length },
    { href: "#experience", label: "Experience", count: experience.length },
    { href: "#contact", label: "Contact" },
  ]
  return (
    <header className="nav">
      <div className="wrap">
        <span className="pill" data-reveal="fade" style={delay(0)}>
          <span className="dot" />
          {profile.status}
        </span>
        <ul data-reveal="fade" style={delay(80)}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                {l.label}
                {l.count ? <sup>({l.count})</sup> : null}
              </a>
            </li>
          ))}
        </ul>
        <div data-reveal="fade" style={delay(160)}>
          <ArrowButton href="#contact">Let&apos;s talk</ArrowButton>
        </div>
      </div>
    </header>
  )
}
