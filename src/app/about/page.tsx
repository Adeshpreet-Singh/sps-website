import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SPS Installation — Metro Vancouver's trusted team for appliance installation & plumbing since 2025.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | SPS Installation",
    description: "Licensed, insured, and trusted by Metro Vancouver's top retailers for appliance installation and plumbing services.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutClient />;
}
