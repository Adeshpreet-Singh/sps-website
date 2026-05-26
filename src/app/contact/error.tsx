"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load the contact form",
  description: "Something went wrong while loading the contact page. You can try again, or reach us directly:",
  showPhone: true,
});
