import Image from "next/image";
import { serviceAreas, siteConfig } from "@/lib/data";
import {
  MapPin,
  Phone,
  Mail,
  Home,
  Wrench,
  Clock,
  Shield,
  Truck,
} from "lucide-react";

export default function ServiceAreaPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero — background image */}
      <section className="relative text-white py-24 px-6">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
          alt="Service area background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block rounded-full bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 mb-6">
            Serving Metro Vancouver
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">
            Where We Work
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Based in Metro Vancouver, we serve homeowners and developers across
            the entire Lower Mainland of B.C.
          </p>
        </div>
      </section>

      {/* Coverage Area — gradient border card, CSS grid pattern */}
      <section className="py-20 px-6 -mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-accent via-accent-light to-navy">
            <div className="rounded-[14px] bg-surface p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Service area image */}
                <div className="relative aspect-square max-h-[320px] rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop"
                    alt="Service area coverage"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-navy/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
                      <MapPin className="w-4 h-4 text-accent" />
                      Metro Vancouver &amp; Lower Mainland, B.C.
                    </span>
                  </div>
                </div>

                {/* Coverage details */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-success/10 text-success px-4 py-1.5 text-sm font-semibold mb-4">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    Full Coverage
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mb-4">
                    Lower Mainland&apos;s Trusted Installation Team
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-6">
                    From Vancouver to Abbotsford, our technicians cover the
                    entire Metro Vancouver region and beyond. We bring
                    professional installation right to your door.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                      <Shield className="w-4 h-4 text-accent" />
                      Licensed &amp; Insured
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                      <Clock className="w-4 h-4 text-accent" />
                      Same-Day Available
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                      <Truck className="w-4 h-4 text-accent" />
                      On-Site Service
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid — badges with hover fill */}
      <section className="py-20 px-6 bg-surface-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
              Cities We Serve
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              We provide professional installation services throughout the
              following communities.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((city) => (
              <span
                key={city}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-surface px-5 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg hover:shadow-navy/20 cursor-default"
              >
                <MapPin className="w-3.5 h-3.5 text-accent group-hover:text-accent-light transition-colors" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details — two-column icon cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
              We Come to You
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Our technicians travel directly to your home or job site — no need
              to bring appliances anywhere.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Home,
                title: "On-Site Installation",
                desc: "We handle everything at your location — from unboxing to final testing, all in one visit.",
              },
              {
                icon: Truck,
                title: "Retailer Coordination",
                desc: "We work directly with Home Depot, Best Buy, RONA, and more to sync delivery with install.",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                desc: "Same-day and next-day appointments available in most areas. We work around your schedule.",
              },
              {
                icon: Wrench,
                title: "Full-Service Setup",
                desc: "Hookup, leveling, testing, and cleanup — we don't leave until everything works perfectly.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex gap-5 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-card-hover hover:border-accent/20"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text text-lg mb-1.5">
                    {title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — gradient bg */}
      <section className="py-20 px-6 bg-gradient-to-br from-navy via-navy-light to-navy-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Don&apos;t see your area?
          </h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">
            We may still be able to help. Reach out and we&apos;ll let you know
            if we can accommodate your location.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-3.5 font-medium transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailLink}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              <Mail className="w-4 h-4" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
