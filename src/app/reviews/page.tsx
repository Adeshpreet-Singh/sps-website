import { Star, ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { testimonials, siteConfig } from "@/lib/data";

export default function ReviewsPage() {
  const rating = 4.6;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  const avatarMap: Record<string, string> = {
    "Michael T.": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    "Sandra K.": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    "Patricia M.": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              What Our Customers Say
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Don&apos;t just take our word for it. Hear from homeowners and
              businesses across Metro Vancouver who trust{" "}
              {siteConfig.shortName}.
            </p>
          </div>
        </div>
      </section>

      {/* Overall Rating Summary */}
      <section className="-mt-12 relative z-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08),0_2px_8px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 ${
                        i < fullStars
                          ? "fill-yellow-400 text-yellow-400"
                          : i === fullStars && hasHalf
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-zinc-200 text-zinc-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-7xl font-bold tracking-tight text-slate-900">
                  {rating}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Based on Google and Homestars reviews
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
                  <span className="text-sm font-semibold text-blue-700">
                    {siteConfig.stats.installations} satisfied customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-gradient-to-b from-zinc-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.06),0_1px_4px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1),0_2px_8px_rgb(0,0,0,0.06)]"
              >
                {/* Left accent gradient border */}
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-600" />

                {/* Decorative quote mark */}
                <div className="mb-4">
                  <Quote className="h-10 w-10 text-blue-500/20 fill-blue-500/10" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-4 text-base leading-7 text-zinc-700 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {avatarMap[t.name] && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={avatarMap[t.name]}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-zinc-500">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Source badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.source.includes("Google")
                          ? "bg-blue-50 text-blue-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {t.source}
                    </span>
                  </div>
                </div>

                {/* Service tag */}
                <span className="mt-4 inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                  {t.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Links */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
              See more reviews on
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <a
                href="https://www.google.com/maps/search/smith+pro+services+surrey"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.06),0_1px_4px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1),0_2px_8px_rgb(0,0,0,0.06)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-base font-semibold text-zinc-900">Google Business</p>
                      <p className="text-sm text-zinc-500">Read our reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
              <a
                href="https://www.homestars.com/companies/smith-pro-services"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.06),0_1px_4px_rgb(0,0,0,0.04)] ring-1 ring-zinc-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1),0_2px_8px_rgb(0,0,0,0.06)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-base font-semibold text-zinc-900">Homestars</p>
                      <p className="text-sm text-zinc-500">Verified reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Experience the Smith Pro difference
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Ready to work with Metro Vancouver&apos;s most trusted appliance
              installation and plumbing team?
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
