"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Shared IntersectionObserver pool — one observer per threshold+rootMargin
 * combination instead of one per component instance.  This cuts the number
 * of observers on the homepage from ~9 down to 1-2.
 */

type ObserverKey = string; // "threshold|rootMargin"

interface ObserverEntry {
  observer: IntersectionObserver;
  callbacks: Map<Element, (visible: boolean) => void>;
}

const observerPool = new Map<ObserverKey, ObserverEntry>();

function makeKey(threshold: number, rootMargin: string): ObserverKey {
  return `${threshold}|${rootMargin}`;
}

function getOrCreateObserver(
  threshold: number,
  rootMargin: string
): ObserverEntry {
  const key = makeKey(threshold, rootMargin);
  let entry = observerPool.get(key);
  if (entry) return entry;

  const callbacks = new Map<Element, (visible: boolean) => void>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const cb = callbacks.get(e.target);
        if (cb) cb(e.isIntersecting);
      }
    },
    { threshold, rootMargin }
  );

  entry = { observer, callbacks };
  observerPool.set(key, entry);
  return entry;
}

function observe(
  element: Element,
  threshold: number,
  rootMargin: string,
  callback: (visible: boolean) => void
): () => void {
  const entry = getOrCreateObserver(threshold, rootMargin);
  entry.callbacks.set(element, callback);
  entry.observer.observe(element);

  return () => {
    entry!.observer.unobserve(element);
    entry!.callbacks.delete(element);
    // Clean up observer when no more elements are tracked
    if (entry!.callbacks.size === 0) {
      entry!.observer.disconnect();
      observerPool.delete(makeKey(threshold, rootMargin));
    }
  };
}

/**
 * Custom hook that uses a shared IntersectionObserver pool to detect when
 * an element enters the viewport and trigger a CSS class toggle for animations.
 *
 * @param options - IntersectionObserver options
 * @param once - If true, only trigger once (default: true)
 * @returns [ref, isVisible] tuple
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {},
  once: boolean = true
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If user prefers reduced motion, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const threshold = options.threshold ?? 0.1;
    const rootMargin = options.rootMargin ?? "0px 0px -60px 0px";

    const disconnect = observe(element, threshold, rootMargin, (intersecting) => {
      if (intersecting) {
        setIsVisible(true);
        if (once) {
          disconnect();
        }
      } else if (!once) {
        setIsVisible(false);
      }
    });

    return disconnect;
  }, [options.threshold, options.rootMargin, once]);

  return [ref, isVisible];
}
