import type React from "react"
import { Archivo, Instrument_Serif, Manrope, Mrs_Saint_Delafield } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { Motion } from "@/components/site/motion"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { PageTransition } from "@/components/site/page-transition"
import { fullName, shortName, siteUrl, social } from "@/lib/seo"
import "./globals.css"
import "./site.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
})

const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sign",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const title = "Chhatra Rana | Software & Security Engineer in Kathmandu"
const description =
  "Chhatra Rana is a software and security engineer in Kathmandu, Nepal, building secure web systems, CrowdStrike Falcon SIEM detections and security tooling."

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f3f3",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${shortName}` },
  description,
  applicationName: `${shortName} Portfolio`,
  keywords: [
    "Chhatra Rana",
    "Chhatra Bahadur Rana",
    "Software Engineer Nepal",
    "Security Engineer Kathmandu",
    "CrowdStrike Falcon",
    "Next-Gen SIEM",
    "LogScale",
    "Detection engineering",
    "Full-stack developer",
    "Portfolio",
  ],
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...social({ title, description, url: "/", type: "profile" }),
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${serif.variable} ${signature.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide not-yet-revealed elements only when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <Motion />
          <SmoothScroll />
          {children}
          <PageTransition />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
