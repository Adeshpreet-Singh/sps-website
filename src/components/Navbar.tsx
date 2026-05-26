"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, X, ChevronDown } from "lucide-react";
import { siteConfig, navLinks, services } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen]);

  // Escape key to close + focus trap
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }

      // Focus trap: keep Tab within the mobile panel
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the panel when it opens
    const timer = setTimeout(() => {
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileOpen]);

  // Restore focus to toggle when menu closes
  useEffect(() => {
    if (!mobileOpen) {
      toggleRef.current?.focus();
    }
  }, [mobileOpen]);

  // Check if current path is a services page
  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 motion-reduce:transition-none animate-nav-enter ${
        scrolled
          ? "bg-white/95 dark:bg-dark-surface/95 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] backdrop-blur-md"
          : "bg-white/80 dark:bg-dark-surface/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo — pill badge */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="SPS Smith Pro Services — Home"
        >
          <span className="inline-flex items-center rounded-full bg-navy dark:bg-accent px-4 py-1.5 text-sm font-bold text-white tracking-wide transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(232,122,46,0.3)] motion-reduce:transition-none motion-reduce:transform-none">
            SPS
          </span>
          <span className="hidden text-sm font-medium text-text-muted dark:text-dark-text-muted lg:inline">
            Smith Pro Services
          </span>
        </Link>

        {/* Desktop Nav — visible on lg and up */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            // Handle Services dropdown separately
            if (link.label === "Services") {
              return (
                <div key={link.href} ref={servicesRef} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 motion-reduce:transition-none hover:-translate-y-0.5 group ${
                      isServicesActive
                        ? "text-accent-safe"
                        : "text-text dark:text-dark-text hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out motion-reduce:transition-none ${
                        isServicesActive
                          ? "w-5 animate-accent-pulse"
                          : "w-0 group-hover:w-5"
                      }`}
                    />
                  </button>

                  {/* Services dropdown */}
                  {servicesOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-xl bg-white dark:bg-dark-surface shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-border/50 dark:border-dark-border/50 py-2 animate-scale-in origin-top stagger-children"
                      role="menu"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          role="menuitem"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-text dark:text-dark-text hover:bg-surface-alt dark:hover:bg-dark-surface-alt hover:text-accent transition-all duration-200 motion-reduce:transition-none animate-fade-in"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent text-xs font-bold">
                            {service.number}
                          </span>
                          <div>
                            <span className="font-medium">{service.title}</span>
                            <span className="block text-xs text-text-muted dark:text-dark-text-muted mt-0.5">
                              {service.shortDescription.slice(0, 50)}...
                            </span>
                          </div>
                        </Link>
                      ))}
                      <div className="border-t border-border/50 dark:border-dark-border/50 mt-1 pt-1">
                        <Link
                          href="/services"
                          onClick={() => setServicesOpen(false)}
                          role="menuitem"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/5 transition-all duration-200 motion-reduce:transition-none animate-fade-in"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              {/* Desktop Nav — visible on tablet (md) and up */}
              <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 motion-reduce:transition-none hover:-translate-y-0.5 group magnetic-hover ${
                        isActive
                          ? "text-accent-safe"
                          : "text-text dark:text-dark-text hover:text-accent"
                      }`}
                    >
                      {link.label}
                      {/* Animated underline — grows from center on hover/active */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          isActive
                            ? "w-5 animate-accent-pulse"
                            : "w-0 group-hover:w-5"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

        {/* Desktop CTAs — visible on lg and up */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneLink}
            aria-label={`Call us at ${siteConfig.phone}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-accent transition-all duration-200 hover:text-accent dark:hover:text-accent-light hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            aria-label="Get a free quote"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm motion-reduce:transition-none motion-reduce:transform-none btn-press btn-shimmer"
          >
            Get a Quote
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button + Theme Toggle — 44px min touch target */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex flex-col items-center justify-center gap-[5px] rounded-md p-3 text-text dark:text-dark-text transition-colors duration-200 hover:text-accent lg:hidden motion-reduce:transition-none min-w-[44px] min-h-[44px] ${
              mobileOpen ? "hamburger-open" : ""
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
          >
            <span className="hamburger-line block h-[2px] w-5 rounded-full bg-current" />
            <span className="hamburger-line block h-[2px] w-5 rounded-full bg-current" />
            <span className="hamburger-line block h-[2px] w-5 rounded-full bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Panel */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden motion-reduce:transition-none ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white dark:bg-dark-surface shadow-[-4px_0_20px_rgba(0,0,0,0.15)] dark:shadow-[-4px_0_20px_rgba(0,0,0,0.5)] border-l border-border/50 dark:border-dark-border/50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden motion-reduce:transition-none ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-border dark:border-dark-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-navy dark:bg-accent px-3 py-1 text-xs font-bold text-white tracking-wide">
              SPS
            </span>
            <span className="text-xs text-text-muted dark:text-dark-text-muted">
              Smith Pro Services
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-3 text-text-muted dark:text-dark-text-muted transition-colors hover:text-text dark:hover:text-dark-text motion-reduce:transition-none min-w-[44px] min-h-[44px]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile phone CTA */}
        <div className="border-b border-border dark:border-dark-border px-5 py-3">
          <a
            href={siteConfig.phoneLink}
            className="flex items-center justify-center gap-2 rounded-lg bg-navy/5 dark:bg-accent/10 px-4 py-2.5 text-sm font-semibold text-navy dark:text-accent transition-all duration-200 hover:bg-navy/10 dark:hover:bg-accent/20 motion-reduce:transition-none"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>

        {/* Mobile nav links */}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5 px-4 py-4 overflow-y-auto max-h-[calc(100vh-280px)] stagger-children">
          {navLinks.map((link, idx) => {
            // Services with submenu
            if (link.label === "Services") {
              return (
                <div key={link.href}>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-between motion-reduce:transition-none ${
                      isServicesActive
                        ? "bg-accent/10 text-accent-safe border-l-3 border-accent"
                        : "text-text dark:text-dark-text hover:bg-surface-alt dark:hover:bg-dark-surface-alt hover:text-accent"
                    } ${mobileOpen ? "animate-slide-in-right" : ""}`}
                    style={
                      mobileOpen
                        ? { animationDelay: `${idx * 50}ms` }
                        : undefined
                    }
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Services submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      mobileServicesOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 border-l-2 border-border/50 dark:border-dark-border/50 pl-3 py-1 stagger-children">
                      {services.map((service, sIdx) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-muted dark:text-dark-text-muted hover:text-accent hover:bg-accent/5 transition-all duration-200 motion-reduce:transition-none animate-fade-in"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 text-accent text-[10px] font-bold">
                            {service.number}
                          </span>
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-accent/5 transition-all duration-200 motion-reduce:transition-none animate-fade-in"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center motion-reduce:transition-none ${
                  isActive
                    ? "bg-accent/10 text-accent-safe border-l-3 border-accent"
                    : "text-text dark:text-dark-text hover:bg-surface-alt dark:hover:bg-dark-surface-alt hover:text-accent hover:translate-x-1 border-l-3 border-transparent transition-all duration-200"
                } ${mobileOpen ? "animate-slide-in-right" : ""}`}
                style={
                  mobileOpen
                    ? { animationDelay: `${idx * 50}ms` }
                    : undefined
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 border-t border-border dark:border-dark-border px-5 py-5 bg-white dark:bg-dark-surface">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm motion-reduce:transition-none motion-reduce:transform-none btn-press"
          >
            Get a Free Quote
          </Link>
          <p className="text-center text-xs text-text-muted dark:text-dark-text-muted">
            Licensed &amp; Insured · Metro Vancouver
          </p>
        </div>
      </div>
    </header>
  );
}
