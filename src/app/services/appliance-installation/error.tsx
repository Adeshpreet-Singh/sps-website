"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load appliance installation details",
  description: "Something went wrong while loading this service page. Try again or browse all our services.",
  secondaryHref: "/services",
  secondaryLabel: "All Services",
});
