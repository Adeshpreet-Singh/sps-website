"use client";

import { useState, useEffect, useCallback, useRef, type TouchEvent } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/lib/data";
import { testimonialAvatars } from "@/lib/data";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const totalSlides = testimonials.length;

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? "right" : "left");
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const goToNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play with progress bar reset
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    // Reset progress bar animation
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      // Force reflow
      progressRef.current.offsetHeight;
      progressRef.current.style.transition = `width ${autoPlayInterval}ms linear`;
      progressRef.current.style.width = "100%";
    }

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, goToNext, autoPlayInterval, totalSlides, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch/swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrev();
    }
  };

  // Get adjacent slide indices for peeking cards
  const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (currentIndex + 1) % totalSlides;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Customer testimonials carousel"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      {/* Carousel viewport — with peeking cards on desktop */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Peek cards — visible on desktop only */}
        <div className="hidden lg:block" aria-hidden="true">
          {/* Left peek */}
          <div className="absolute left-0 top-0 bottom-0 w-[calc(50%-340px)] z-0 pointer-events-none">
            <div className="h-full opacity-40 scale-[0.92] blur-[1px] transition-all duration-700 ease-out">
              <TestimonialCard
                testimonial={testimonials[prevIndex]}
                isActive={false}
                slideIndex={prevIndex}
                totalSlides={totalSlides}
              />
            </div>
          </div>
          {/* Right peek */}
          <div className="absolute right-0 top-0 bottom-0 w-[calc(50%-340px)] z-0 pointer-events-none">
            <div className="h-full opacity-40 scale-[0.92] blur-[1px] transition-all duration-700 ease-out">
              <TestimonialCard
                testimonial={testimonials[nextIndex]}
                isActive={false}
                slideIndex={nextIndex}
                totalSlides={totalSlides}
              />
            </div>
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-dark-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-dark-surface to-transparent z-10 pointer-events-none" />
        </div>

        {/* Active slide — crossfade */}
        <div className="relative z-20 mx-auto max-w-[680px]">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  idx === currentIndex
                    ? "opacity-100 scale-100 translate-x-0 relative"
                    : idx === prevIndex && direction === "left"
                      ? "opacity-0 scale-95 translate-x-4 absolute inset-0"
                      : idx === nextIndex && direction === "right"
                        ? "opacity-0 scale-95 -translate-x-4 absolute inset-0"
                        : "opacity-0 scale-95 absolute inset-0"
                }
              `}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${idx + 1} of ${totalSlides}`}
              aria-hidden={idx !== currentIndex}
            >
              <TestimonialCard
                testimonial={t}
                isActive={idx === currentIndex}
                slideIndex={idx}
                totalSlides={totalSlides}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrev}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-dark-surface-alt shadow-md dark:shadow-dark-card border border-border dark:border-dark-border text-navy dark:text-dark-text-muted hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-surface"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Dot indicators — inline with arrows */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((t, idx) => (
              <button
                key={t.name}
                onClick={() => goToSlide(idx)}
                className={`relative rounded-full transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  idx === currentIndex
                    ? "h-2.5 w-8 bg-accent"
                    : "h-2.5 w-2.5 bg-border dark:bg-dark-border hover:bg-accent/40"
                }`}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to testimonial ${idx + 1}`}
              >
                {idx === currentIndex && (
                  <span className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-dark-surface-alt shadow-md dark:shadow-dark-card border border-border dark:border-dark-border text-navy dark:text-dark-text-muted hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-surface"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      )}

      {/* Progress bar — refined, centered */}
      {totalSlides > 1 && !isPaused && (
        <div className="mt-5 mx-auto max-w-[200px]">
          <div className="h-[3px] rounded-full bg-border/40 dark:bg-dark-border/40 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      )}

      {/* Slide counter — subtle */}
      {totalSlides > 1 && (
        <p className="mt-3 text-center text-xs text-text-muted/60 dark:text-dark-text-muted/60 tabular-nums">
          {currentIndex + 1} / {totalSlides}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  TestimonialCard — extracted for reuse in peek cards                 */
/* ──────────────────────────────────────────────────────────────────── */

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  slideIndex: number;
  totalSlides: number;
}

function TestimonialCard({
  testimonial: t,
  isActive,
  slideIndex,
  totalSlides,
}: TestimonialCardProps) {
  return (
    <article className="group/card rounded-2xl bg-white dark:bg-dark-surface shadow-card dark:shadow-dark-card border border-border/60 dark:border-dark-border/60 overflow-hidden transition-shadow duration-500 hover:shadow-card-hover dark:hover:shadow-dark-card-hover">
      {/* Top accent gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-accent-light to-accent" />

      <div className="p-6 sm:p-8">
        {/* Quote icon — subtle background element */}
        <div className="relative">
          <Quote
            className="absolute -top-1 -left-1 h-10 w-10 sm:h-12 sm:w-12 text-accent/[0.07] fill-accent/[0.03] transition-colors duration-500"
            aria-hidden="true"
          />

          {/* Star rating — animated per card */}
          <div
            className={`flex items-center gap-1 mb-5 ${
              isActive ? "star-rating-pop" : ""
            }`}
            aria-hidden="true"
          >
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 ${
                  isActive ? "" : "opacity-70"
                }`}
              />
            ))}
            <span className="sr-only">{t.rating} out of 5 stars</span>
          </div>

          {/* Quote text */}
          <blockquote className="text-base sm:text-lg leading-relaxed text-text-muted dark:text-dark-text-muted italic pl-0 sm:pl-1">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author info — with avatar */}
        <div className="mt-6 pt-5 border-t border-border/50 dark:border-dark-border/50 flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/20 shadow-sm transition-shadow duration-300 group-hover/card:ring-accent/40 group-hover/card:shadow-md">
            <Image
              src={t.photo || testimonialAvatars[t.name] || ""}
              alt={t.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 48px, 56px"
              priority={slideIndex === 0}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-navy dark:text-dark-text text-sm sm:text-base truncate">
              {t.name}
            </p>
            <p className="text-xs sm:text-sm text-text-muted dark:text-dark-text-muted">
              {t.location} &middot;{" "}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  t.source.includes("Google")
                    ? "bg-accent/10 text-accent-safe"
                    : "bg-navy/10 dark:bg-dark-surface-alt text-navy dark:text-dark-text-muted"
                }`}
              >
                {t.source}
              </span>
            </p>
          </div>

          {/* Service badge */}
          <span className="hidden sm:inline-flex shrink-0 text-xs font-medium bg-surface-alt dark:bg-dark-surface-alt text-text-muted dark:text-dark-text-muted rounded-full px-3 py-1.5 border border-border/50 dark:border-dark-border/50">
            {t.service}
          </span>
        </div>
      </div>
    </article>
  );
}
