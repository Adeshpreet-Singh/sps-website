import Link from "next/link";
import { Home, Wrench, Phone, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section
      aria-label="Page not found"
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 py-16 sm:py-24 text-center"
    >
      {/* Large 404 number */}
      <div className="relative mb-6" aria-hidden="true">
        <span
          className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-heading font-bold leading-none select-none"
          style={{
            background:
              "linear-gradient(135deg, var(--color-navy) 0%, var(--color-accent) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </span>
        {/* Subtle pulse ring behind the number */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border-2 border-accent/10 animate-pulse" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-text dark:text-dark-text mb-4">
        Page Not Found
      </h1>

      <p className="text-text-muted dark:text-dark-text-muted text-base sm:text-lg max-w-lg leading-relaxed mb-10">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>

      {/* Primary CTA */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-4 font-medium transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 mb-12"
      >
        <Home className="w-5 h-5" aria-hidden="true" />
        Back to Home
      </Link>

      {/* Quick nav cards */}
      <div className="w-full max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-4">
          Or try one of these
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/services"
            className="group flex items-center gap-3 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 transition-all duration-300 hover:shadow-card-hover dark:hover:border-accent/20 hover:border-accent/20 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center shrink-0 shadow-md shadow-navy/20 dark:shadow-none">
              <Wrench className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="text-left min-w-0">
              <p className="font-semibold text-text dark:text-dark-text group-hover:text-accent transition-colors text-sm">
                Our Services
              </p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted truncate">
                Installation &amp; plumbing
              </p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group flex items-center gap-3 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 transition-all duration-300 hover:shadow-card-hover dark:hover:border-accent/20 hover:border-accent/20 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center shrink-0 shadow-md shadow-navy/20 dark:shadow-none">
              <Phone className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="text-left min-w-0">
              <p className="font-semibold text-text dark:text-dark-text group-hover:text-accent transition-colors text-sm">
                Contact Us
              </p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted truncate">
                Get a free quote
              </p>
            </div>
          </Link>

          <Link
            href="/about"
            className="group flex items-center gap-3 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 transition-all duration-300 hover:shadow-card-hover dark:hover:border-accent/20 hover:border-accent/20 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center shrink-0 shadow-md shadow-navy/20 dark:shadow-none">
              <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="text-left min-w-0">
              <p className="font-semibold text-text dark:text-dark-text group-hover:text-accent transition-colors text-sm">
                About SPS
              </p>
              <p className="text-xs text-text-muted dark:text-dark-text-muted truncate">
                Who we are
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
