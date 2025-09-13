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
  description: "Portofolio Fullstack Developer & Cloud Engineer: proyek, skill, pengalaman, kontak.",
  keywords: [
    "Muammar Mufid Darmindra",
    "Fullstack Developer",
    "Cloud Engineer",
    "Portfolio",
    "Next.js",
    "TypeScript"
  ],
  authors: [{ name: "Muammar Mufid Darmindra", url: process.env.NEXT_PUBLIC_SITE_URL }],
  creator: "Muammar Mufid Darmindra",
  publisher: "Muammar Mufid Darmindra",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muammar Mufid Darmindra",
    title: "Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer",
    description: "Portofolio Fullstack Developer & Cloud Engineer: proyek, skill, pengalaman, kontak.",
    images: [
      {
        url: "/placeholder-user.jpg",
        width: 1200,
        height: 630,
        alt: "Muammar Mufid Darmindra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muammar Mufid Darmindra — Fullstack Developer & Cloud Engineer",
    description: "Portofolio Fullstack Developer & Cloud Engineer: proyek, skill, pengalaman, kontak.",
    images: ["/placeholder-user.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  generator: 'v0.dev'
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
