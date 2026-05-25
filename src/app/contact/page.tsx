import type { Metadata } from "next";
import ContactPage from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get a free quote for appliance installation or plumbing. Call (604) 865-0619 or fill out our online form.",
  alternates: {
    canonical: "https://spsinstallation.com/contact",
  },
  openGraph: {
    title: "Contact Us | SPS Installation",
    description: "Get a free quote for appliance installation or plumbing. Call (604) 865-0619 or fill out our online form.",
    url: "https://spsinstallation.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
