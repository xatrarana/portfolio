"use client"

import { useState } from "react"
import { profile } from "@/lib/content"
import { ArrowButton } from "./arrow-button"

export function Contact() {
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
    <div className="contact-wrap" id="contact">
      <section className="contact">
        <div className="wrap">
          <span className="pill">
            <span className="dot" />
            {profile.status}
          </span>
          <h2>Have a project in mind?</h2>
          <p>Whether it&apos;s a role, a product to build or a team to train, let&apos;s talk about how to make it secure from day one.</p>
          <div className="row">
            <ArrowButton href={`mailto:${profile.email}`}>Email me</ArrowButton>
            <ArrowButton variant="light" onClick={copy}>
              {copied ? "Copied" : "Copy email"}
            </ArrowButton>
          </div>
          <div className="mail">{profile.email}</div>
        </div>
      </section>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
