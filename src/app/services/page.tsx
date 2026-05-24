import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Droplets,
  Home,
  Building2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { services, siteConfig } from "@/lib/data";

const serviceImages: Record<string, string> = {
  "appliance-installation":
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=300&fit=crop",
  plumbing:
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=300&fit=crop",
  residential:
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=300&fit=crop",
  commercial:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  Droplets,
  Home,
  Building2,
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden px-6 py-24 text-center text-white lg:py-32">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/5765849/5765849-uhd_2560_1440_25fps.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/50" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
            What We Do
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Two specialties, one call. Whether you just bought a new appliance
            or are renovating your entire bathroom, our certified technicians
            handle both.
          </p>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="bg-surface-alt px-6 py-20 lg:py-28">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.1)]"
              >
                {/* ── Top: Image ── */}
                {serviceImages[service.slug] && (
                  <div className="relative h-40 w-full shrink-0 overflow-hidden md:h-48">
                    <Image
                      src={serviceImages[service.slug]}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* ── Left: Icon + Number ── */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0f1b3d] to-[#1a2760] px-8 py-10 text-white md:w-56 md:py-14">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    {Icon && <Icon className="h-8 w-8" />}
                  </div>
                  <span className="text-sm font-semibold tracking-wider text-white/50">
                    {service.number}
                  </span>
                </div>

                {/* ── Right: Content ── */}
                <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
                  <h2 className="font-heading text-2xl font-bold text-text lg:text-[1.7rem]">
                    {service.title}
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-text-muted">
                    {service.description}
                  </p>

                  {/* Items in 2 columns */}
                  <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More */}
                  <div className="mt-8">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy-light hover:gap-3"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-white px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.04] to-transparent p-10 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:p-14">
            <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Give us a call and we&apos;ll help you figure out the right
              service for your project — no pressure, no obligation.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                <Phone className="h-5 w-5" />
                Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 text-base font-semibold text-text transition-colors hover:bg-surface-alt"
              >
                Contact Us Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
