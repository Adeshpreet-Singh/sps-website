import type { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SPS Installation — Metro Vancouver's trusted team for appliance installation & plumbing since 2025.",
  alternates: {
    canonical: "https://spsinstallation.com/about",
  },
  openGraph: {
    title: "About Us | SPS Installation",
    description: "Learn about SPS Installation — Metro Vancouver's trusted team for appliance installation & plumbing since 2025.",
    url: "https://spsinstallation.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
