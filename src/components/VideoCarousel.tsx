"use client";

import { useEffect, useRef } from "react";

interface VideoCarouselProps {
  videos: string[];
  startTime?: number;
  endTime?: number;
}

export default function VideoCarousel({
  videos,
  startTime = 2,
  endTime = 8,
}: VideoCarouselProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const state = useRef({
    activeIdx: 0,    // which video from videos[] is currently showing
    aIsFront: true,  // videoA is the visible one
  });

  const clipDuration = (endTime - startTime) * 1000;

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB || videos.length === 0) return;

    // Load first video into A, second into B
    videoA.src = videos[0];
    videoB.src = videos[1 % videos.length];

    // When video A loads, start it
    videoA.addEventListener("loadeddata", () => {
      videoA.currentTime = startTime;
      videoA.play().catch(() => {});
    }, { once: true });

    // Start with A visible
    videoA.style.opacity = "1";
    videoB.style.opacity = "0";

    // Keep videos looping within their clip window
    const clampTime = (v: HTMLVideoElement) => {
      if (v.currentTime >= endTime) v.currentTime = startTime;
    };
    videoA.addEventListener("timeupdate", () => clampTime(videoA));
    videoB.addEventListener("timeupdate", () => clampTime(videoB));

    // Crossfade timer
    const interval = setInterval(() => {
      const { aIsFront, activeIdx } = state.current;
      const frontVideo = aIsFront ? videoA : videoB;
      const backVideo = aIsFront ? videoB : videoA;

      // Next video index
      const nextIdx = (activeIdx + 1) % videos.length;

      // Load next video into back slot and wait for it to be ready
      backVideo.src = videos[nextIdx];
      backVideo.currentTime = startTime;

      const doCrossfade = () => {
        // Fade out front, fade in back
        frontVideo.style.opacity = "0";
        backVideo.style.opacity = "1";
        backVideo.play().catch(() => {});

        // Update state
        state.current.aIsFront = !aIsFront;
        state.current.activeIdx = nextIdx;
      };

      // If already cached, crossfade immediately; otherwise wait
      if (backVideo.readyState >= 2) {
        doCrossfade();
      } else {
        backVideo.addEventListener("loadeddata", doCrossfade, { once: true });
        backVideo.load();
      }
    }, clipDuration);

    return () => clearInterval(interval);
  }, [videos, startTime, endTime, clipDuration]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: "opacity 1s ease-in-out" }}
      />
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: "opacity 1s ease-in-out" }}
      />
    </div>
  );
}
