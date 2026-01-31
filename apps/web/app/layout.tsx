import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://muammar.pages.dev'),
  title: {
    default: "Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer",
    template: "%s | Muammar Mufid Darmindra",
  },
  description: "Professional Fullstack Developer & Cloud Engineer specializing in Next.js, TypeScript, React, and cloud infrastructure. View my projects, skills, and experience.",
  keywords: [
    "Muammar Mufid Darmindra",
    "Fullstack Developer",
    "Cloud Engineer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "React",
    "Web Developer",
    "Software Engineer",
    "JavaScript",
    "Node.js",
    "Cloud Computing",
    "AWS",
    "GCP",
    "Cloudflare"
  ],
  authors: [{ name: "Muammar Mufid Darmindra", url: process.env.NEXT_PUBLIC_SITE_URL }],
  creator: "Muammar Mufid Darmindra",
  publisher: "Muammar Mufid Darmindra",
  applicationName: "Muammar Mufid Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/',
      'id-ID': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    siteName: "Muammar Mufid Darmindra",
    title: "Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer",
    description: "Professional Fullstack Developer & Cloud Engineer specializing in Next.js, TypeScript, React, and cloud infrastructure. View my projects, skills, and experience.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muammar Mufid Darmindra - Fullstack Developer & Cloud Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer",
    description: "Professional Fullstack Developer & Cloud Engineer specializing in Next.js, TypeScript, React, and cloud infrastructure.",
    images: ["/og-image.png"],
    creator: "@muammarmufid",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
