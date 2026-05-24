import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import {
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Reliability",
      description:
        "We show up on time, every time. No exceptions, no excuses.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    },
    {
      icon: <BadgeCheck className="w-7 h-7" />,
      title: "Quality",
      description:
        "Every installation meets manufacturer specs and building codes.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Respect",
      description:
        "We treat your home like our own. Clean, careful, professional.",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Transparency",
      description:
        "No hidden fees. No surprises. Just honest, upfront pricing.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
  ];

  const stats = [
    { label: "Years in Business", value: siteConfig.stats.yearsInBusiness },
    { label: "Installations", value: siteConfig.stats.installations },
    { label: "Licensed & Insured", value: siteConfig.stats.licensedInsured },
    { label: "Customer Rating", value: siteConfig.stats.rating },
  ];

  const leaders = [
    { name: "Rajat Kumar", role: "Director & Co-Founder" },
    { name: "Diksha Saini", role: "Director & Co-Founder" },
  ];

  return (
    <main className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/50" />
        {/* Decorative shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute top-16 left-[15%] w-3 h-3 rounded-full bg-accent/30" />
        <div className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-white/20" />
        <div className="absolute bottom-24 left-[30%] w-4 h-4 rounded-full bg-accent/20" />
        <div className="absolute top-1/2 right-[12%] w-24 h-24 rounded-full border border-white/[0.06]" />
        <div className="absolute bottom-1/3 left-[8%] w-16 h-16 rounded-full border border-accent/10" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-full border border-accent/20">
            Est. {siteConfig.legal.incorporated}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            About {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Metro Vancouver&apos;s trusted partner for professional appliance
            installation and plumbing services since day one.
          </p>
        </div>
      </section>

      {/* ── Our Story (two-column) ────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left — text */}
            <div className="lg:col-span-3 space-y-6 text-text-muted leading-relaxed text-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
                Our Story
              </h2>
              <p>
                Founded in 2025, {siteConfig.shortName} was built on a simple
                idea: homeowners deserve the same level of care and
                professionalism for their appliance installations as they get
                from the appliances themselves.
              </p>
              <p>
                Over {siteConfig.stats.yearsInBusiness} years and{" "}
                {siteConfig.stats.installations} installations later, we&apos;ve
                grown into Metro Vancouver&apos;s go-to team for appliance
                installation and plumbing services. From single-family homes in
                Surrey to multi-unit developments across the Lower Mainland, our
                work speaks for itself.
              </p>
              <p>
                We&apos;re not just installers. We&apos;re your home&apos;s last
                line of defence between a great purchase and a great experience.
              </p>
            </div>

            {/* Right — image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=800&fit=crop"
                  alt="Our team at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section className="bg-surface-alt py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative bg-white rounded-xl p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-b-full" />
                <p className="text-4xl md:text-5xl font-bold text-navy mt-2">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-text-muted uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values (glass-morphism on dark) ──────────── */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-navy-dark overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Our Values
          </h2>
          <p className="mt-4 text-white/50 text-center max-w-xl mx-auto text-lg">
            The principles that guide every installation, every interaction,
            every day.
          </p>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(232,122,46,0.08)] transition-all duration-300"
              >
                {/* Background image */}
                <Image
                  src={value.image}
                  alt=""
                  fill
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm" />
                <div className="relative p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-surface">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text text-center">
            Led by a team committed to excellence
          </h2>
          <p className="mt-4 text-text-muted text-center max-w-xl mx-auto text-lg">
            Our leadership brings hands-on trade experience and a relentless
            focus on customer satisfaction.
          </p>
          <div className="mt-14 grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="group relative flex flex-col items-center text-center p-8 bg-white rounded-xl"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-accent/40 via-navy/20 to-accent/40 -z-10 group-hover:from-accent group-hover:via-navy/40 group-hover:to-accent transition-all duration-500" />
                <div className="absolute inset-[1.5px] rounded-[10px] bg-white -z-10" />

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute top-12 right-[15%] w-20 h-20 rounded-full border border-white/[0.06]" />
        <div className="absolute bottom-16 left-[20%] w-2 h-2 rounded-full bg-accent/30" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to work with us?
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
            Get a free quote for your next appliance installation or plumbing
            project. We&apos;re here to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
