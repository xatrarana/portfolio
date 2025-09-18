import type React from "react"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})


export const metadata = {
  title: "Chhatra Rana - Software Developer & Cybersecurity Enthusiast",
  description:
    "Professional portfolio showcasing expertise in software development and cybersecurity training.",
  keywords:
    "Chhatra, Chhatra Rana, Personal Portfolio, Full-Stack Developer, Cybersecurity Enthusiast, Secure Coding, Software Developer, JavaScript, Laravel, .NET, Developer Portfolio",
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
    title: "Chhatra Rana - Software Developer & Cybersecurity Trainer",
    description:
      "Professional portfolio showcasing expertise in software development and cybersecurity training.",
    url: "https://chhatrarana.com.np",
    siteName: "Chhatra Rana Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/me.webp",
        width: 800,
        height: 600,
        alt: "Chhatra's Portfolio Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhatra Rana - Software Developer & Cybersecurity Trainer",
    description:
      "Explore Chhatra's work and experience in secure software development and cybersecurity.",
    images: ["/me.webp"],
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
    <html lang="en" className="dark">
       <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-sans ${inter.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
