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
  autoPlayInterval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate slides to show based on viewport (we use CSS for actual responsive layout)
  // but we need to know how many dots to show
  const totalSlides = testimonials.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning],
  );

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, goToNext, autoPlayInterval, totalSlides]);

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
      {/* Carousel track */}
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
            width: `${totalSlides * 100}%`,
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="w-full shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / totalSlides}%` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${idx + 1} of ${totalSlides}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center rounded-2xl bg-white dark:bg-dark-surface-alt p-6 sm:p-8 shadow-card dark:shadow-dark-card border-l-4 border-transparent card-hover"
                style={{
                  borderImage: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-light)) 1",
                }}
              >
                {/* Customer photo - left side on desktop */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden ring-2 ring-accent/20 shadow-md">
                    <Image
                      src={t.photo || testimonialAvatars[t.name] || ""}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                      priority={idx === 0}
                    />
                  </div>
                  {/* Star rating - below photo on mobile, below photo on desktop */}
                  <div className="flex items-center gap-1 star-rating-pop" aria-hidden="true">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="sr-only">{t.rating} out of 5 stars</span>
                  </div>
                </div>

                {/* Quote content - right side */}
                <div className="relative">
                  {/* Decorative quote icon */}
                  <Quote className="absolute -top-2 -left-1 h-8 w-8 sm:h-10 sm:w-10 text-accent/10 fill-accent/5" aria-hidden="true" />

                  <blockquote className="text-base sm:text-lg leading-relaxed text-text-muted dark:text-dark-text-muted italic pl-6 sm:pl-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author info */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div>
                      <p className="font-bold text-navy dark:text-dark-text text-sm sm:text-base">
                        {t.name}
                      </p>
                      <p className="text-xs sm:text-sm text-text-muted dark:text-dark-text-muted">
                        {t.location} &middot; {t.source}
                      </p>
                    </div>
                    <span className="inline-block text-xs font-medium bg-accent/10 text-accent-safe rounded-full px-3 py-1">
                      {t.service}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white dark:bg-dark-surface shadow-lg dark:shadow-dark-card border border-border dark:border-dark-border text-navy dark:text-dark-text hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white dark:bg-dark-surface shadow-lg dark:shadow-dark-card border border-border dark:border-dark-border text-navy dark:text-dark-text hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {totalSlides > 1 && (
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-2.5" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, idx) => (
            <button
              key={t.name}
              onClick={() => goToSlide(idx)}
              className={`group relative h-2.5 sm:h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                idx === currentIndex
                  ? "w-8 sm:w-10 bg-accent"
                  : "w-2.5 sm:w-3 bg-border dark:bg-dark-border hover:bg-accent/50"
              }`}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to testimonial ${idx + 1}`}
            >
              {/* Active dot pulse effect */}
              {idx === currentIndex && (
                <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {totalSlides > 1 && !isPaused && (
        <div className="mt-4 mx-auto max-w-xs">
          <div className="h-0.5 rounded-full bg-border/30 dark:bg-dark-border/30 overflow-hidden">
            <div
              className="h-full bg-accent/40 rounded-full testimonial-progress"
              style={{
                animationDuration: `${autoPlayInterval}ms`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
