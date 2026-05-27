"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/**
 * PageTransition — wraps page content with fade + slide-up on route change.
 * Uses View Transitions API where available, CSS animation fallback elsewhere.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isExiting, setIsExiting] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Always update children — the transition is cosmetic
    if (prevPathRef.current === pathname) {
      setDisplayChildren(children);
      return;
    }

    prevPathRef.current = pathname;

    // Use View Transitions API if available (Chrome 111+, Edge 111+)
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => {
        setDisplayChildren(children);
      });
      return;
    }

    // CSS fallback: exit → swap → enter
    setIsExiting(true);
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsExiting(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={`page-transition ${isExiting ? "page-transition-exit" : ""}`}>
      {displayChildren}
    </div>
  );
}
