import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
  description:
    "Metro Vancouver's trusted appliance installation & plumbing team. 5+ years, 10k+ installations, 4.6★ rating. Serving Surrey, Vancouver, Burnaby & beyond. Get a free quote.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    description: "Metro Vancouver's trusted appliance installation & plumbing team. 5+ years, 10k+ installations, 4.6★ rating.",
    url: "/",
  },
};

export default function Page() {
  return <HomeClient />;
}
