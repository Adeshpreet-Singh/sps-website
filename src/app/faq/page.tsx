import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about SPS Installation services — appliance installation, plumbing, pricing & scheduling.",
  alternates: {
    canonical: "https://spsinstallation.com/faq",
  },
  openGraph: {
    title: "FAQ | SPS Installation",
    description: "Frequently asked questions about SPS Installation services — appliance installation, plumbing, pricing & scheduling.",
    url: "https://spsinstallation.com/faq",
  },
};

export default function Page() {
  return <FaqClient />;
}
