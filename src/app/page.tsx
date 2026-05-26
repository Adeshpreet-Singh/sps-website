import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
  description:
    "Metro Vancouver's trusted appliance installation & plumbing team. 5+ years, 10k+ installations, 4.6★ rating. Serving Surrey, Vancouver, Burnaby & beyond. Get a free quote.",
  alternates: {
    canonical: "https://spsinstallation.com/",
  },
  openGraph: {
    title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    description: "Metro Vancouver's trusted appliance installation & plumbing team. 5+ years, 10k+ installations, 4.6★ rating.",
    url: "https://spsinstallation.com/",
  },
};

export default function Page() {
  return <HomeClient />;
}
