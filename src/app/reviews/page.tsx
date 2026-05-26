/**
 * @fileoverview Reviews page route.
 *
 * Server component that exports page-level metadata and renders
 * the interactive ReviewsClient component.
 */

import type { Metadata } from "next";
import ReviewsClient from "./ReviewsClient";

// ISR: revalidate every 12 hours (reviews may update more frequently)
export const revalidate = 43200;

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Read reviews from SPS Installation customers. 4.6★ rating on Google & Homestars.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Customer Reviews | SPS Installation",
    description: "Read reviews from SPS Installation customers. 4.6★ rating on Google & Homestars.",
    url: "/reviews",
  },
};

export default function Page() {
  return <ReviewsClient />;
}
