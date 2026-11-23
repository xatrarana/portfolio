import { profile, projects, services, experience } from "@/lib/content"
import { ArrowButton } from "./arrow-button"

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
        <span className="pill">
          <span className="dot" />
          {profile.status}
        </span>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                {l.label}
                {l.count ? <sup>({l.count})</sup> : null}
              </a>
            </li>
          ))}
        </ul>
        <ArrowButton href="#contact">Let&apos;s talk</ArrowButton>
      </div>
    </header>
  )
}
