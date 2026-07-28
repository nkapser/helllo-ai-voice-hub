import { useEffect, useRef } from "react";

/**
 * WavyHeroBackground — flowing gradient ribbons behind the hero.
 *
 * Filled, blurred wave bands built from smooth overlapping sine curves
 * (not noise) so the motion reads as silky/fluid rather than jittery.
 * Layered with a "lighten" blend so overlaps glow, DPR-aware for crisp
 * rendering on retina displays. Canvas-based, zero dependencies, Spark
 * blue/indigo/cyan family so it stays on-brand for a light theme.
 * Respects prefers-reduced-motion, pauses when the tab is hidden.
 */

type Band = {
  colorA: string;
  colorB: string;
  baseline: number; // 0..1 of height
  thickness: number; // 0..1 of height
  k1: number;
  k2: number;
  s1: number;
  s2: number;
  phase: number;
  driftK: number;
  driftS: number;
  opacity: number;
};

const BANDS: Band[] = [
  { colorA: "#bfdbfe", colorB: "#93c5fd", baseline: 0.34, thickness: 0.22, k1: 1.1, k2: 2.3, s1: 0.55, s2: 0.9, phase: 0.0, driftK: 0.35, driftS: 0.18, opacity: 0.4 },
  { colorA: "#93c5fd", colorB: "#60a5fa", baseline: 0.46, thickness: 0.24, k1: 0.9, k2: 2.0, s1: 0.42, s2: 0.75, phase: 1.4, driftK: 0.28, driftS: 0.22, opacity: 0.42 },
  { colorA: "#60a5fa", colorB: "#818cf8", baseline: 0.58, thickness: 0.24, k1: 1.3, k2: 1.7, s1: 0.5, s2: 0.6, phase: 2.6, driftK: 0.4, driftS: 0.15, opacity: 0.4 },
  { colorA: "#38bdf8", colorB: "#22d3ee", baseline: 0.68, thickness: 0.2, k1: 1.0, k2: 2.6, s1: 0.35, s2: 0.85, phase: 3.6, driftK: 0.22, driftS: 0.28, opacity: 0.34 },
  { colorA: "#818cf8", colorB: "#a5b4fc", baseline: 0.78, thickness: 0.18, k1: 1.5, k2: 1.2, s1: 0.6, s2: 0.4, phase: 4.8, driftK: 0.33, driftS: 0.2, opacity: 0.28 },
];

const BLUR_PX = 28;
const SPEED = 0.00055;

/** value of one band's centerline, 0..1 of height, at horizontal position x (0..1) and time t */
function centerline(band: Band, x: number, t: number, h: number): number {
  const drift = Math.sin(t * band.driftS + band.phase * 1.7) * 0.03;
  const wave =
    Math.sin(x * Math.PI * 2 * band.k1 + t * band.s1 + band.phase) * 0.55 +
    Math.sin(x * Math.PI * 2 * band.k2 - t * band.s2 + band.phase * 0.6) * 0.45;
  return (band.baseline + drift + wave * (band.thickness * 0.42)) * h;
}

const WavyHeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx || !parent) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let t = reduced ? 30 : 0; // static-but-pleasant frame for reduced motion
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBand = (band: Band) => {
      const step = Math.max(8, Math.floor(w / 140));
      const thickness = band.thickness * h;

      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, band.colorA);
      gradient.addColorStop(0.5, band.colorB);
      gradient.addColorStop(1, band.colorA);

      ctx.beginPath();
      for (let x = -step; x <= w + step; x += step) {
        const y = centerline(band, x / w, t, h) - thickness / 2;
        if (x === -step) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let x = w + step; x >= -step; x -= step) {
        const y = centerline(band, x / w, t, h) + thickness / 2;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.globalAlpha = band.opacity;
      ctx.fill();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.filter = `blur(${BLUR_PX}px)`;
      ctx.globalCompositeOperation = "multiply";
      for (const band of BANDS) drawBand(band);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.filter = "none";
    };

    const frame = () => {
      if (!running) return;
      t += SPEED * 16;
      drawFrame();
      raf = requestAnimationFrame(frame);
    };

    resize();
    if (reduced) {
      drawFrame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) drawFrame();
    });
    ro.observe(parent);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      style={{
        maskImage:
          "radial-gradient(75% 65% at 50% 38%, black 45%, transparent 88%)",
        WebkitMaskImage:
          "radial-gradient(75% 65% at 50% 38%, black 45%, transparent 88%)",
      }}
    />
  );
};

export default WavyHeroBackground;
