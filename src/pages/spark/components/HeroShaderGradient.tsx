import { memo, useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/** Spark theme: ember → glow → soft accent (maps user preset structure) */
const SPARK_SHADER_COLORS = {
  color1: "#3b82f6",
  color2: "#93c5fd",
  color3: "#dbeafe",
} as const;

const SHADER_SPEED = 0.3;

const SHADER_CANVAS_STYLE = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
} as const;

function HeroShaderFallback() {
  return (
    <div className="hero-shader-fallback" aria-hidden="true">
      <div className="hero-shader-fallback-glow" />
    </div>
  );
}

/**
 * Stable WebGL scene — no props, no React state updates.
 * animate="on" lets @react-three/fiber drive uTime via useFrame (no material remounts).
 * lazyLoad={false} keeps the canvas mounted when the hero scrolls out of view.
 */
const ShaderScene = memo(function ShaderScene() {
  return (
    <ShaderGradientCanvas
      className="hero-shader-canvas"
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
      lazyLoad={false}
      style={SHADER_CANVAS_STYLE}
    >
      <ShaderGradient
        control="props"
        animate="on"
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
        wireframe={false}
        {...SPARK_SHADER_COLORS}
      />
    </ShaderGradientCanvas>
  );
});

function HeroShaderGradient() {
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

  if (reduceMotion) {
    return <HeroShaderFallback />;
  }

  return (
    <div className="hero-shader-gradient" aria-hidden="true">
      <ShaderScene />
      <div className="hero-shader-veil" />
    </div>
  );
}

export default memo(HeroShaderGradient);
