import { useEffect, useRef, useState } from "react";

/**
 * WavyHeroBackground — Vecteezy ripple loop behind the homepage hero.
 *
 * Served through ImageKit so the 14.8 MB original is compressed on the fly.
 * Desktop: 1920px / q-70 (~1.9 MB) so the fine ripple lines stay sharp.
 * Mobile: 1280px / q-60. Credit: Saruepee Chengoh / Vecteezy.
 */

const VIDEO_ID = "ise7sbyg9";
const VIDEO_FILE =
  "vecteezy_smooth-ripple-animation-with-elegant-background-for-digital_71193341.mp4";
const VIDEO_BASE = `https://ik.imagekit.io/${VIDEO_ID}/${VIDEO_FILE}`;

const VIDEO_DESKTOP = `${VIDEO_BASE}?tr=w-1920,q-70,f-mp4`;
const VIDEO_MOBILE = `${VIDEO_BASE}?tr=w-1280,q-60,f-mp4`;
const POSTER = `${VIDEO_BASE}/ik-thumbnail.jpg?tr=w-1920,q-80,f-jpg`;

const WavyHeroBackground = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [src, setSrc] = useState(VIDEO_DESKTOP);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 768px)");

    const sync = () => {
      setPrefersReducedMotion(motion.matches);
      setSrc(narrow.matches ? VIDEO_MOBILE : VIDEO_DESKTOP);
    };

    sync();
    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {prefersReducedMotion ? (
          <img
            src={POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_72%]"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-[50%_72%]"
            autoPlay
            muted
            loop
            playsInline
            poster={POSTER}
            preload="metadata"
            src={src}
          />
        )}
      </div>
      <a
        href="https://www.vecteezy.com/video/71193341-smooth-ripple-animation-with-elegant-background-for-digital-design-projects"
        className="sr-only"
        rel="noopener noreferrer"
      >
        Background video by Saruepee Chengoh on Vecteezy
      </a>
    </>
  );
};

export default WavyHeroBackground;
