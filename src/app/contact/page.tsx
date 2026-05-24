import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { Phone, Mail, Clock, MapPin, Building } from "lucide-react";
import ContactForm from "./ContactForm";

/* ---------- Contact info card ---------- */
function ContactCard({
  icon: Icon,
  label,
  children,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href, className: "group block" } : { className: "group" })}
    >
      <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-0.5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shrink-0 shadow-md shadow-navy/20">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
            {label}
          </p>
          <div className="text-text font-medium group-hover:text-accent transition-colors break-words">
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default function ContactPage() {
  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.province} ${siteConfig.address.postal}`;

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero — background image */}
      <section className="relative text-white py-24 px-6">
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop"
          alt="Contact us background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block rounded-full bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 mb-6">
            We&apos;re Here to Help
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Ready to schedule your installation? Fill out the form below and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-20 px-6 -mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 shadow-card">
              <h2 className="text-2xl font-heading font-bold text-text mb-2">
                Request a Quote
              </h2>
              <p className="text-text-muted text-sm mb-8">
                Fields marked with <span className="text-error">*</span> are
                required.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Right — Contact Image + Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-8 self-start">
            {/* Contact image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl lg:h-80">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop"
                alt="Contact us"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <h2 className="text-2xl font-heading font-bold text-text mb-2">
              Contact Information
            </h2>

            <ContactCard icon={Phone} label="Phone" href={siteConfig.phoneLink}>
              {siteConfig.phone}
            </ContactCard>

            <ContactCard icon={Mail} label="Email" href={siteConfig.emailLink}>
              {siteConfig.email}
            </ContactCard>

            <ContactCard icon={Clock} label="Hours">
              {siteConfig.hours}
            </ContactCard>

            <ContactCard icon={MapPin} label="Service Area">
              Metro Vancouver &amp; Lower Mainland, B.C.
            </ContactCard>

            <ContactCard icon={Building} label="Address">
              {fullAddress}
            </ContactCard>
          </div>
        </div>
      </section>
    </main>
  );
}
