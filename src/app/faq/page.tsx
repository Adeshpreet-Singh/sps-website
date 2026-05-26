import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about SPS Installation services — appliance installation, plumbing, pricing & scheduling.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | SPS Installation",
    description: "Frequently asked questions about SPS Installation services — appliance installation, plumbing, pricing & scheduling.",
    url: "/faq",
  },
};

export default function Page() {
  return <FaqClient />;
}
