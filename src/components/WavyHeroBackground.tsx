import { useEffect, useRef } from "react";

/**
 * WavyHeroBackground — floating ribbon waves behind the hero,
 * modeled on the Framer community "Wavy Background" component
 * (free tier: noise-driven wave strokes + blur, no interactivity).
 *
 * Canvas-based, zero dependencies. Spark-blue family palette,
 * tuned for a light theme. Respects prefers-reduced-motion,
 * pauses when the tab is hidden.
 */

const WAVE_COLORS = ["#93c5fd", "#60a5fa", "#38bdf8", "#818cf8", "#bfdbfe"];
const WAVE_WIDTH = 42;
const WAVE_OPACITY = 0.32;
const BLUR_PX = 10;
const SPEED = 0.0016; // "slow" preset

/* Compact 1D value-noise (smooth, tileable enough for ribbons) */
function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function smooth(t: number) {
  return t * t * (3 - 2 * t);
}
function noise(x: number, seed: number) {
  const i = Math.floor(x);
  const f = x - i;
  const a = hash(i + seed * 57.31);
  const b = hash(i + 1 + seed * 57.31);
  return (a + (b - a) * smooth(f)) * 2 - 1; // -1..1
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
    let t = reduced ? 42 : 0; // static-but-pleasant frame for reduced motion
    let w = 0;
    let h = 0;

    const resize = () => {
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.filter = `blur(${BLUR_PX}px)`;
      ctx.globalAlpha = WAVE_OPACITY;
      ctx.lineCap = "round";

      for (let i = 0; i < WAVE_COLORS.length; i++) {
        const baseY = h * (0.3 + (i / WAVE_COLORS.length) * 0.45);
        const amp = h * (0.06 + (i % 3) * 0.02);
        ctx.beginPath();
        ctx.lineWidth = WAVE_WIDTH - i * 4;
        ctx.strokeStyle = WAVE_COLORS[i];
        for (let x = -60; x <= w + 60; x += 6) {
          const n =
            noise(x * 0.0022 + t * 0.9 + i * 3.7, i + 1) * 0.7 +
            noise(x * 0.0051 - t * 0.6 + i * 1.3, i + 11) * 0.3;
          const y = baseY + n * amp;
          if (x === -60) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
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
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    />
  );
};

export default WavyHeroBackground;
