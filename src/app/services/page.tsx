import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Appliance installation & plumbing services for residential & commercial properties across Metro Vancouver.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | SPS Installation",
    description: "Appliance installation & plumbing services for residential & commercial properties across Metro Vancouver.",
    url: "/services",
  },
};

export default function Page() {
  return <ServicesClient />;
}
