"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load services",
  description: "Something went wrong while loading our services. You can try again or give us a call:",
  showPhone: true,
});
