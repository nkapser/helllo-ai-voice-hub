import { Button } from "@/components/ui/button";
import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// Point interface for wave animation
interface WavePoint {
  x: number;
  baseY: number;
  y: number;
  amp: number;
  speed: number;
  phase: number;
  // Mouse interaction
  targetY: number;
  velocityY: number;
}

const Hero = () => {
  const navigate = useNavigate();
  
  // Ribbon viewport dimensions
  const width = 2000; // Optimal viewport width
  const extension = 500; // Extension beyond viewport for smooth wave movement
  const extendedWidth = width + extension; // Extended width for points (2500)
  const height = 400;
  
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const backPathRef = useRef<SVGPathElement>(null);
  const highlightPathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<WavePoint[]>([]);
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);

  // Build smooth quadratic bezier path with dynamic thickness
  const buildPath = useCallback((yOffset: number = 0, baseThickness: number = 35, thicknessVariation?: number[]): string => {
    const pts = pointsRef.current;
    if (pts.length === 0) return "";
    
    // Calculate dynamic thickness for each point based on wave curvature
    const thicknesses: number[] = [];
    if (thicknessVariation && thicknessVariation.length === pts.length) {
      // Use provided thickness variation (for perspective effect)
      for (let i = 0; i < pts.length; i++) {
        thicknesses.push(baseThickness * (1 + thicknessVariation[i]));
      }
    } else {
      // Calculate thickness based on local wave amplitude (crests appear thinner, troughs thicker in side view)
      for (let i = 0; i < pts.length; i++) {
        let thicknessMultiplier = 1;
        if (i > 0 && i < pts.length - 1) {
          // Calculate local wave position relative to neighbors
          const prev = pts[i - 1];
          const curr = pts[i];
          const next = pts[i + 1];
          const avgY = (prev.y + next.y) / 2;
          const deviation = curr.y - avgY; // How much this point deviates from average
          
          // At crests (high points), ribbon appears thicker from side view (more profile visible)
          // At troughs (low points), ribbon appears thinner from side view (less profile visible)
          // Normalize deviation (typically -60 to +60)
          const normalizedDev = deviation / 60;
          // Direct relationship: higher Y = thicker, lower Y = thinner
          thicknessMultiplier = 1 + normalizedDev * 0.12; // 12% variation
        }
        thicknesses.push(baseThickness * Math.max(0.75, Math.min(1.25, thicknessMultiplier)));
      }
      // Ensure first and last points have same thickness as neighbors
      if (pts.length > 1) {
        thicknesses[0] = thicknesses[1];
        thicknesses[thicknesses.length - 1] = thicknesses[thicknesses.length - 2];
      }
    }
    
    // Top edge of ribbon
    let d = `M ${pts[0].x},${pts[0].y + yOffset}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2 + yOffset;
      d += ` Q ${prev.x},${prev.y + yOffset} ${cx},${cy}`;
    }
    
    // Close at the last point with dynamic thickness
    const last = pts[pts.length - 1];
    const lastThickness = thicknesses[thicknesses.length - 1];
    d += ` L ${last.x},${last.y + yOffset + lastThickness}`;
    
    // Bottom edge of ribbon (reverse) with matching thickness
    for (let i = pts.length - 2; i >= 0; i--) {
      const next = pts[i + 1];
      const curr = pts[i];
      const currThickness = thicknesses[i];
      const nextThickness = thicknesses[i + 1];
      const cx = (next.x + curr.x) / 2;
      // Use average thickness for control point, but actual thickness at each point
      const avgThickness = (currThickness + nextThickness) / 2;
      const cy = (next.y + curr.y) / 2 + yOffset + avgThickness;
      d += ` Q ${next.x},${next.y + yOffset + nextThickness} ${cx},${cy}`;
    }
    
    // Close the path
    const firstThickness = thicknesses[0];
    d += ` L ${pts[0].x},${pts[0].y + yOffset + firstThickness} L ${pts[0].x},${pts[0].y + yOffset} Z`;
    return d;
  }, []);

  useEffect(() => {
    const pointCount = 3; // More points for more waves
    
    // Initialize control points with unique characteristics
    // Position ribbon higher (baseY around 140-180 instead of 260) so 10-15% is above center
    const points: WavePoint[] = [];
    for (let i = 0; i <= pointCount; i++) {
      // Create natural initial wave pattern for side-view ribbon
      // Extend points beyond viewport width to ensure full coverage (no white gaps)
      const xPos = (width / pointCount) * i - 100;
      // Extend last point to extendedWidth for smooth wave movement
      const finalXPos = i === pointCount ? extendedWidth : xPos;
      const normalizedX = (finalXPos + 100) / (extendedWidth + 200);
      
      // Initial wave pattern - creates visible crests and troughs
      const initialWave = Math.sin(normalizedX * Math.PI * 4) * 40; // 2-3 waves across
      const baseVariation = Math.sin(normalizedX * Math.PI * 6) * 15; // Finer detail
      const baseY = height / 2 - 30 + initialWave + baseVariation; // Higher position with waves
      
      points.push({
        x: finalXPos,
        baseY: baseY,
        y: baseY,
        amp: 45 + Math.random() * 50, // Amplitude 45-95 for visible but smooth waves
        speed: 0.0025 + Math.random() * 0.0038, // Slightly faster, more consistent
        phase: normalizedX * Math.PI * 3 + (Math.random() - 0.5) * 0.3, // Aligned phases for continuity
        targetY: baseY,
        velocityY: 0
      });
    }
    pointsRef.current = points;

    // Animate ribbon with requestAnimationFrame
    const animateRibbon = () => {
      timeRef.current += 0.5; // Slower time increment for smoother motion
      
      // Global floating motion - makes the whole ribbon feel alive and buoyant (more prominent)
      const globalFloat = Math.sin(timeRef.current * 0.0006) * 22; // More prominent float
      const breathe = Math.sin(timeRef.current * 0.0009) * 12; // Breathing motion
      
      // Wave propagation speed - creates smooth left-to-right traveling wave (continuous flow)
      const waveSpeed = 0.006; // Increased for faster continuous flow without bounce-back

      // Update each point's Y position with traveling wave
      pointsRef.current.forEach((p, index) => {
        // Create a traveling wave by offsetting phase based on X position
        const normalizedX = (p.x + 100) / (extendedWidth + 200); // Normalize X position (accounts for extended points)
        const xPhase = normalizedX * Math.PI * 4; // Phase offset for 2-3 visible waves
        const timePhase = timeRef.current * waveSpeed; // Time-based phase shift
        
        // Primary traveling wave - smooth flow from left to right
        const travelingWave = Math.sin(timePhase - xPhase + p.phase) * p.amp;
        
        // Secondary wave for subtle depth and organic feel
        const secondaryWave = Math.sin(timePhase * 0.7 - xPhase * 0.8 + p.phase * 1.1) * (p.amp * 0.3);
        
        // Combine waves - simpler, more natural
        const waveY = p.baseY + travelingWave + secondaryWave;
        
        // Target Y from wave motion + prominent global float
        p.targetY = waveY + globalFloat + breathe;
        
        // Smooth interpolation with direct physics for continuous wave flow
        const springStrength = 0.12; // Increased for more direct response, less interference
        const damping = 0.92; // Reduced slightly to allow smoother wave propagation
        
        p.velocityY += (p.targetY - p.y) * springStrength;
        p.velocityY *= damping;
        p.y += p.velocityY;
      });

      // Update all three paths with thinner, more natural ribbon appearance
      // Main ribbon - thinner base (35px instead of 55px) with dynamic thickness variation
      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildPath(0, 35));
      }
      // Back shadow layer - minimal offset (4px) to create subtle depth, not separate layer
      if (backPathRef.current) {
        backPathRef.current.setAttribute("d", buildPath(4, 36)); // Very close to main, just for depth
      }
      // Highlight layer - thin top strip for 3D shine effect
      if (highlightPathRef.current) {
        highlightPathRef.current.setAttribute("d", buildPath(0, 16)); // Thin highlight strip
      }

      animationRef.current = requestAnimationFrame(animateRibbon);
    };

    // Start animation
    animateRibbon();

    // GSAP animations for natural floating - prominent side-view ribbon motion
    const svg = svgRef.current;
    if (svg) {
      // Continuous horizontal drift - waves flow naturally left to right without bounce-back
      gsap.to(svg, {
        x: -200,
        duration: 30,
        ease: "none", // Linear motion for continuous flow
        repeat: -1
        // No yoyo - waves flow continuously forward
      });

      // Subtle breathing/scale effect - very gentle for natural feel
      gsap.to(svg, {
        scaleY: 1.02,
        scaleX: 1.01,
        transformOrigin: "center center",
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Prominent floating motion - smooth up and down like a floating ribbon
      gsap.to(svg, {
        y: -30,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (svg) {
        gsap.killTweensOf(svg);
      }
    };
  }, [buildPath]);


  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const svg = svgRef.current;
      if (svg) {
        gsap.to(svg, {
          y: window.scrollY * 0.05,
          duration: 0.1,
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center" 
      role="banner"
    >
      {/* GSAP Animated Wave Ribbon - Interactive & Floating */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        <svg 
          ref={svgRef}
          className="absolute left-[-10%] top-[8%] w-[130%] h-[500px] opacity-95 pointer-events-auto"
          viewBox={`0 0 ${extendedWidth} ${height}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "blur(0.2px)" }}
        >
          <defs>
            {/* Main ribbon gradient - cyan to blue to purple */}
            <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="12%" stopColor="#22d3ee" />
              <stop offset="30%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="85%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            
            {/* Back/shadow layer - darker */}
            <linearGradient id="ribbonBackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="25%" stopColor="#4f46e5" />
              <stop offset="55%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            
            {/* Top highlight for 3D shine */}
            <linearGradient id="ribbonHighlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            
            {/* Soft glow filter */}
            <filter id="ribbonGlow" x="-15%" y="-15%" width="130%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="0" dy="5" result="shadow" />
              <feFlood floodColor="#6366f1" floodOpacity="0.18" />
              <feComposite in2="shadow" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g filter="url(#ribbonGlow)">
            {/* Back shadow layer - very subtle depth shading, not separate layer */}
            <path
              ref={backPathRef}
              fill="url(#ribbonBackGradient)"
              opacity="0.3"
            />
            
            {/* Main ribbon surface */}
            <path
              ref={pathRef}
              fill="url(#ribbonGradient)"
            />
            
            {/* Top highlight strip for 3D shine effect */}
            <path
              ref={highlightPathRef}
              fill="url(#ribbonHighlightGradient)"
            />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            <span className="text-foreground">Supercharge your</span>
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(168,85,247,0.6) 0%, rgba(99,102,241,0.7) 50%, rgba(59,130,246,0.6) 100%)',
              }}
            >
              Call Operations
            </span>
            <span className="text-foreground"> with</span> <br />
            <span 
              className="bg-clip-text italic"
              style={{
                color: '#3f3f3f',
                // backgroundImage: 'radial-gradient(circle at center, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 5%, rgb(192, 192, 192) 12%, rgb(192, 192, 192) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 15px',
              }}
            >
              AI Voice Agents
            </span>
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 15px',
            }}
          >
            Discover the new way to build, test, deploy, and monitor
            <br className="hidden md:block" />
            production-ready AI voice agents at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="group" aria-label="Call to action buttons">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-200 rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wider shadow-lg"
              aria-label="Try for free"
              onClick={() => navigate("/console")}
            >
              Try for Free
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border border-foreground/20 bg-white text-foreground hover:bg-foreground/5 rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wider"
              aria-label="Contact sales"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
