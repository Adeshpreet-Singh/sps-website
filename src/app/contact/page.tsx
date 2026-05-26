import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote for appliance installation or plumbing. Call ${siteConfig.phone} or fill out our online form.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Us | SPS Installation",
    description: `Get a free quote for appliance installation or plumbing. Call ${siteConfig.phone} or fill out our online form.`,
    url: `${siteConfig.url}/contact`,
  },
};

export default function Page() {
  return <ContactClient />;
}
