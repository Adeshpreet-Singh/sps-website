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
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spsinstallation.com"),
  title: {
    default: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    template: "%s | SPS Installation",
  },
  description:
    "Metro Vancouver's trusted appliance installation & plumbing team. Licensed, insured, warranty-compliant. Serving Surrey, Vancouver, Burnaby & beyond.",
  alternates: {
    canonical: "https://spsinstallation.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://spsinstallation.com",
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
    telephone: siteConfig.phoneLink.replace("tel:", ""),
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
      reviewCount: "10000",
    },
    founder: [
      { "@type": "Person", name: "Rajat Kumar" },
      { "@type": "Person", name: "Diksha Saini" },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
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
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:text-sm focus:font-semibold"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 animate-fade-in" tabIndex={-1}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
