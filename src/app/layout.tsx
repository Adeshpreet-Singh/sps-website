/**
 * @fileoverview Root layout for SPS Installation website.
 *
 * This is the outermost shell rendered by Next.js App Router. It wraps every
 * page with:
 * - Google Fonts (Inter) loaded via `next/font/google` with CSS variable
 * - Global metadata (OpenGraph, Twitter cards, robots directives)
 * - ThemeProvider for dark/light/system mode
 * - Persistent UI: Navbar, Footer, ScrollProgress, ScrollToTop
 * - PageTransition for route-change animations
 * - RouteChangeProgress for navigation loading indicator
 * - ErrorBoundary to catch rendering errors in persistent UI
 * - JSON-LD LocalBusiness structured data for SEO
 *
 * The `themeScript` injected in <head> runs before first paint to apply the
 * user's saved theme preference, preventing flash-of-wrong-theme (FOWT).
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider, themeScript } from "@/components/ThemeProvider";
import RouteChangeProgress from "@/components/RouteChangeProgress";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    template: "%s | SPS Installation",
  },
  description:
    "Metro Vancouver's trusted appliance installation & plumbing team. Licensed, insured, warranty-compliant. Serving Surrey, Vancouver, Burnaby & beyond.",
  keywords: [
    "appliance installation",
    "plumbing services",
    "Metro Vancouver",
    "Surrey plumber",
    "Vancouver appliance installer",
    "licensed plumber BC",
    "dishwasher installation",
    "washer dryer hookup",
    "toilet installation",
    "residential plumbing",
    "commercial appliance installation",
    "Smith Pro Services",
  ],
  authors: [{ name: "Smith Pro Services Ltd." }],
  creator: "Smith Pro Services Ltd.",
  publisher: "Smith Pro Services Ltd.",
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "/",
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: "SPS Installation",
    title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    description: "Metro Vancouver's trusted appliance installation & plumbing team.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SPS Installation — Appliance Installation & Plumbing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPS Installation — Appliance Installation & Plumbing",
    description: "Metro Vancouver's trusted appliance installation & plumbing team.",
    images: ["/og-image.jpg"],
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
  other: {
    "theme-color": "#1B2A4A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      postalCode: siteConfig.address.postal,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.28,
      longitude: -122.55,
    },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    areaServed: [
      "Vancouver",
      "Surrey",
      "Burnaby",
      "Richmond",
      "Coquitlam",
      "North Vancouver",
      "West Vancouver",
      "Langley",
      "Delta",
      "New Westminster",
      "Port Moody",
      "Maple Ridge",
      "Abbotsford",
      "Pitt Meadows",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating,
      reviewCount: "150",
    },
    founder: [
      { "@type": "Person", name: "Rajat Kumar" },
      { "@type": "Person", name: "Diksha Saini" },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.shortName + " Installation",
              url: siteConfig.url,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteConfig.url}/faq?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          {/* Route change progress indicator */}
          <Suspense fallback={null}>
            <RouteChangeProgress />
          </Suspense>
          {/* Scroll progress bar */}
          <ScrollProgress />
          {/* Skip to main content link — visible on focus for keyboard users */}
          <a
            href="#main-content"
            className="skip-to-content"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <PageTransition><ErrorBoundary>{children}</ErrorBoundary></PageTransition>
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
