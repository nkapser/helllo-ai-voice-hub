import { Button } from "@/components/ui/button";
import { useEffect, useRef, useCallback } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const backPathRef = useRef<SVGPathElement>(null);
  const highlightPathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<WavePoint[]>([]);
  const timeRef = useRef(0);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // Build smooth quadratic bezier path
  const buildPath = useCallback((yOffset: number = 0, thickness: number = 50): string => {
    const pts = pointsRef.current;
    if (pts.length === 0) return "";
    
    // Top edge of ribbon
    let d = `M ${pts[0].x},${pts[0].y + yOffset}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2 + yOffset;
      d += ` Q ${prev.x},${prev.y + yOffset} ${cx},${cy}`;
    }
    
    // Close at the last point with thickness
    const last = pts[pts.length - 1];
    d += ` L ${last.x},${last.y + yOffset + thickness}`;
    
    // Bottom edge of ribbon (reverse)
    for (let i = pts.length - 2; i >= 0; i--) {
      const next = pts[i + 1];
      const curr = pts[i];
      const cx = (next.x + curr.x) / 2;
      const cy = (next.y + curr.y) / 2 + yOffset + thickness;
      d += ` Q ${next.x},${next.y + yOffset + thickness} ${cx},${cy}`;
    }
    
    d += ` L ${pts[0].x},${pts[0].y + yOffset} Z`;
    return d;
  }, []);

  useEffect(() => {
    const width = 1800;
    const height = 400;
    const pointCount = 14; // More points for more waves
    
    // Initialize control points with unique characteristics
    // Position ribbon higher (baseY around 140-180 instead of 260) so 10-15% is above center
    const points: WavePoint[] = [];
    for (let i = 0; i <= pointCount; i++) {
      // Varying baseY creates a natural undulation in resting position
      const baseVariation = Math.sin((i / pointCount) * Math.PI * 2) * 30;
      const baseY = height / 2 - 40 + baseVariation; // Higher position (around 160)
      points.push({
        x: (width / pointCount) * i - 100,
        baseY: baseY,
        y: baseY,
        amp: 55 + Math.random() * 65, // Amplitude 55-120
        speed: 0.0012 + Math.random() * 0.0018, // Wave speed
        phase: Math.random() * Math.PI * 2,
        targetY: baseY,
        velocityY: 0
      });
    }
    pointsRef.current = points;

    // Animate ribbon with requestAnimationFrame
    const animateRibbon = () => {
      timeRef.current += 1;
      const mouse = mouseRef.current;
      
      // Global floating motion - makes the whole ribbon feel alive and buoyant
      const globalFloat = Math.sin(timeRef.current * 0.0008) * 25; // Slow gentle float
      const breathe = Math.sin(timeRef.current * 0.0015) * 15; // Subtle breathing

      // Update each point's Y position
      pointsRef.current.forEach((p, index) => {
        // Base wave motion (sine wave) with upward bias for floating feel
        const waveY = p.baseY + Math.sin(timeRef.current * p.speed + p.phase) * p.amp;
        
        // Add secondary wave for more complexity
        const secondaryWave = Math.sin(timeRef.current * p.speed * 1.5 + p.phase * 0.7) * (p.amp * 0.3);
        
        // Third wave for even more organic feel
        const tertiaryWave = Math.sin(timeRef.current * p.speed * 0.5 + index * 0.4) * (p.amp * 0.15);
        
        // Target Y from wave motion + global float (negative = upward)
        p.targetY = waveY + secondaryWave + tertiaryWave + globalFloat + breathe;
        
        // Mouse interaction - push ribbon when cursor is near
        if (mouse.active) {
          const svgRect = svgRef.current?.getBoundingClientRect();
          if (svgRect) {
            // Convert mouse position to SVG coordinates
            const svgMouseX = ((mouse.x - svgRect.left) / svgRect.width) * 1800;
            const svgMouseY = ((mouse.y - svgRect.top) / svgRect.height) * 400;
            
            // Calculate distance from mouse to this point
            const dx = p.x - svgMouseX;
            const dy = p.y - svgMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Influence radius
            const radius = 300;
            
            if (distance < radius) {
              // Push strength based on distance (closer = stronger)
              const strength = (1 - distance / radius) * 80;
              
              // Push away from cursor
              const angle = Math.atan2(dy, dx);
              p.targetY += Math.sin(angle) * strength;
              
              // Add some horizontal influence to nearby points
              const neighborInfluence = strength * 0.3;
              if (index > 0) {
                pointsRef.current[index - 1].targetY += neighborInfluence * 0.5;
              }
              if (index < pointsRef.current.length - 1) {
                pointsRef.current[index + 1].targetY += neighborInfluence * 0.5;
              }
            }
          }
        }
        
        // Smooth interpolation with spring physics
        const springStrength = 0.08;
        const damping = 0.85;
        
        p.velocityY += (p.targetY - p.y) * springStrength;
        p.velocityY *= damping;
        p.y += p.velocityY;
      });

      // Update all three paths
      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildPath(0, 55));
      }
      if (backPathRef.current) {
        backPathRef.current.setAttribute("d", buildPath(28, 60));
      }
      if (highlightPathRef.current) {
        highlightPathRef.current.setAttribute("d", buildPath(0, 24));
      }

      animationRef.current = requestAnimationFrame(animateRibbon);
    };

    // Start animation
    animateRibbon();

    // GSAP animations for drift, floating, and breathing
    const svg = svgRef.current;
    if (svg) {
      // Horizontal air flow drift
      gsap.to(svg, {
        x: -50,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Subtle breathing/scale effect - expands upward
      gsap.to(svg, {
        scaleY: 1.05,
        scaleX: 1.02,
        transformOrigin: "center bottom", // Expand upward
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Primary floating motion - moves UP and down naturally
      gsap.to(svg, {
        y: -30, // Float upward primarily
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Secondary slower float for organic layered motion
      gsap.to(svg, {
        y: "+=15",
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
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

  // Mouse interaction handler
  useEffect(() => {
    const section = sectionRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true
        };
      }
    };
    
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
      section.addEventListener("touchmove", handleTouchMove, { passive: true });
      section.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
        section.removeEventListener("touchmove", handleTouchMove);
        section.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const svg = svgRef.current;
      if (svg) {
        gsap.to(svg, {
          y: window.scrollY * 0.05,
          duration: 0.3,
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center" 
      role="banner"
    >
      {/* GSAP Animated Wave Ribbon - Interactive & Floating */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        <svg 
          ref={svgRef}
          className="absolute left-[-10%] top-[8%] w-[120%] h-[500px] opacity-95 pointer-events-auto"
          viewBox="0 0 1800 400"
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
            {/* Back shadow layer */}
            <path
              ref={backPathRef}
              fill="url(#ribbonBackGradient)"
              opacity="0.65"
            />
            
            {/* Main ribbon surface */}
            <path
              ref={pathRef}
              fill="url(#ribbonGradient)"
            />
            
            {/* Top highlight strip for 3D effect */}
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
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
            <span className="text-foreground">AI Voice Agents</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
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
            >
              Try for Free
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border border-foreground/20 bg-white text-foreground hover:bg-foreground/5 rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wider"
              aria-label="Contact sales"
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
