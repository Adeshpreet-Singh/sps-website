/**
 * @fileoverview Contact page route.
 *
 * Server component that exports page-level metadata (including phone
 * number in description for click-to-call in search results) and
 * renders the interactive ContactClient component.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import ContactClient from "./ContactClient";

// ISR: revalidate every 24 hours (contact info is stable)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote for appliance installation or plumbing. Call ${siteConfig.phone} or fill out our online form.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | SPS Installation",
    description: `Get a free quote for appliance installation or plumbing. Call ${siteConfig.phone} or fill out our online form.`,
    url: "/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}
