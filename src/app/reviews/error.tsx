"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load reviews",
  description: "Something went wrong while loading customer reviews. You can try again or check our reviews on Google or Homestars directly.",
});
