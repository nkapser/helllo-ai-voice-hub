import { useEffect, useRef } from "react";
import { useReducedMotion } from "../lib/hooks";

/**
 * SignalField — barely-noticeable revenue-signal background.
 * A handful of long bezier trajectories with tiny particles drifting
 * along them. Canvas-based, DPR-aware, pauses when hidden.
 * Total visual prominence intentionally < 5%.
 */
type Curve = {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
};

type Particle = {
  curve: number;
  t: number;
  speed: number;
  size: number;
  green: boolean;
};

function cubicPoint(c: Curve, t: number): [number, number] {
  const u = 1 - t;
  const x =
    u * u * u * c.p0[0] +
    3 * u * u * t * c.p1[0] +
    3 * u * t * t * c.p2[0] +
    t * t * t * c.p3[0];
  const y =
    u * u * u * c.p0[1] +
    3 * u * u * t * c.p1[1] +
    3 * u * t * t * c.p2[1] +
    t * t * t * c.p3[1];
  return [x, y];
}

const SignalField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let curves: Curve[] = [];
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Long, shallow trajectories sweeping left → right, rising slightly:
      // the "revenue signal" reading of the page.
      const n = w < 768 ? 3 : 5;
      curves = Array.from({ length: n }, (_, i) => {
        const y0 = h * (0.25 + (i / n) * 0.62) + (Math.random() - 0.5) * 40;
        const y3 = y0 - h * (0.08 + Math.random() * 0.1);
        return {
          p0: [-80, y0],
          p1: [w * 0.35, y0 + (Math.random() - 0.5) * h * 0.22],
          p2: [w * 0.65, y3 + (Math.random() - 0.5) * h * 0.22],
          p3: [w + 80, y3],
        } as Curve;
      });

      const count = w < 768 ? 14 : 26;
      particles = Array.from({ length: count }, () => ({
        curve: Math.floor(Math.random() * curves.length),
        t: Math.random(),
        speed: 0.00028 + Math.random() * 0.00042,
        size: 0.8 + Math.random() * 1.1,
        green: Math.random() < 0.4,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const c of curves) {
        ctx.strokeStyle = "rgba(30, 41, 59, 0.05)";
        ctx.beginPath();
        ctx.moveTo(c.p0[0], c.p0[1]);
        ctx.bezierCurveTo(c.p1[0], c.p1[1], c.p2[0], c.p2[1], c.p3[0], c.p3[1]);
        ctx.stroke();
      }
    };

    const frame = () => {
      if (!running) return;
      drawStatic();
      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.curve = Math.floor(Math.random() * curves.length);
        }
        const [x, y] = cubicPoint(curves[p.curve], p.t);
        // fade in/out at the ends of the trajectory
        const edge = Math.min(p.t, 1 - p.t);
        const alpha = Math.min(edge * 6, 1);
        ctx.beginPath();
        ctx.fillStyle = p.green
          ? `rgba(120, 180, 30, ${0.28 * alpha})`
          : `rgba(30, 41, 59, ${0.14 * alpha})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    build();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      build();
      if (reduced) drawStatic();
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default SignalField;
