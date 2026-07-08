import { useEffect, useRef, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/** Spark theme: ember → glow → soft accent (maps user preset structure) */
const SPARK_SHADER_COLORS = {
  color1: "#3b82f6",
  color2: "#93c5fd",
  color3: "#dbeafe",
} as const;

const SHADER_SPEED = 0.3;

function HeroShaderFallback() {
  return (
    <div className="hero-shader-fallback" aria-hidden="true">
      <div className="hero-shader-fallback-glow" />
    </div>
  );
}

export default function HeroShaderGradient() {
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number>();
  const [uTime, setUTime] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (lastFrameRef.current !== undefined) {
        const dt = (now - lastFrameRef.current) / 1000;
        elapsedRef.current += dt * SHADER_SPEED;
        frame += 1;
        if (frame % 2 === 0) {
          setUTime(elapsedRef.current);
        }
      }
      lastFrameRef.current = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <HeroShaderFallback />;
  }

  return (
    <div className="hero-shader-gradient" aria-hidden="true">
      <ShaderGradientCanvas
        className="hero-shader-canvas"
        pixelDensity={1}
        fov={45}
        pointerEvents="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <ShaderGradient
          control="props"
          animate="off"
          type="plane"
          shader="defaults"
          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.6}
          cPolarAngle={70}
          cameraZoom={1}
          envPreset="city"
          grain="on"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          uAmplitude={1}
          uDensity={1.3}
          uFrequency={5.5}
          uSpeed={SHADER_SPEED}
          uStrength={2}
          uTime={uTime}
          wireframe={false}
          {...SPARK_SHADER_COLORS}
        />
      </ShaderGradientCanvas>
      <div className="hero-shader-veil" />
    </div>
  );
}
