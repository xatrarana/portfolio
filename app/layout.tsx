import type React from "react"
import { Archivo, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Motion } from "@/components/site/motion"
import { SmoothScroll } from "@/components/site/smooth-scroll"
import { PageTransition } from "@/components/site/page-transition"
import "./globals.css"
import "./site.css"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const title = "Chhatra Rana | Software & Security Engineer"
const description =
  "Software engineer in Kathmandu building secure web systems and security tooling: Node.js, .NET, AWS, SIEM and intrusion detection."


export const metadata = {
  title,
  description,
  keywords:
    "Chhatra, Chhatra Rana, Personal Portfolio, Software Engineer, Security Engineer, Full-Stack Developer, Secure Coding, Software Developer, JavaScript, Laravel, .NET, Developer Portfolio",
  authors: [
    { name: "Chhatra Bahadur Rana", url: "https://chhatrarana.com.np" },
  ],
  creator: "Chhatra Bahadur Rana",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  metadataBase: new URL("https://chhatrarana.com.np"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title,
    description,
    url: "https://chhatrarana.com.np",
    siteName: "Chhatra Rana Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/chhatra-portrait.webp",
        width: 860,
        height: 996,
        alt: "Portrait of Chhatra Rana",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/chhatra-portrait.webp"],
    creator: "@Xatra101",
    site: "@Xatra101",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`} suppressHydrationWarning>
       <head>
        <link rel="manifest" href="/site.webmanifest" />
        {/* Lets CSS hide not-yet-revealed elements only when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          <Motion />
          <SmoothScroll />
          {children}
          <PageTransition />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
