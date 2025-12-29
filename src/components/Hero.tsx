import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center" role="banner">
      {/* Animated 3D Wave Ribbon - Natural flowing wave */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        {/* CSS for natural wave animation - 4 second cycle */}
        <style>{`
          @keyframes ribbonFlow {
            0% {
              transform: translateX(0%) translateY(0px);
            }
            25% {
              transform: translateX(2%) translateY(-8px);
            }
            50% {
              transform: translateX(4%) translateY(0px);
            }
            75% {
              transform: translateX(2%) translateY(8px);
            }
            100% {
              transform: translateX(0%) translateY(0px);
            }
          }
          
          .ribbon-container {
            animation: ribbonFlow 4s ease-in-out infinite;
          }
        `}</style>
        
        {/* SVG with wavy ribbon - starts from lower middle */}
        <svg 
          className="ribbon-container absolute w-[140%] h-full left-[-20%] top-[5%]"
          viewBox="0 0 2000 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main ribbon gradient - cyan to blue to purple */}
            <linearGradient id="ribbonMain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="20%" stopColor="#22d3ee" />
              <stop offset="40%" stopColor="#3b82f6" />
              <stop offset="60%" stopColor="#818cf8" />
              <stop offset="80%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            
            {/* Back/shadow layer - darker */}
            <linearGradient id="ribbonBack" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="35%" stopColor="#4f46e5" />
              <stop offset="70%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            
            {/* Top highlight for 3D shine */}
            <linearGradient id="ribbonHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            {/* Soft shadow filter */}
            <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dx="0" dy="8" result="shadow" />
              <feFlood floodColor="#6366f1" floodOpacity="0.25" />
              <feComposite in2="shadow" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g filter="url(#ribbonShadow)">
            {/* Back layer - starts from lower middle (Y=550) */}
            <path
              d="M-100,580 
                 Q50,520 200,460
                 Q350,400 500,350
                 Q650,300 800,340
                 Q950,380 1100,320
                 Q1250,260 1400,300
                 Q1550,340 1700,280
                 Q1850,220 2000,260
                 Q2150,300 2200,240
                 L2200,290
                 Q2150,350 2000,310
                 Q1850,270 1700,330
                 Q1550,390 1400,350
                 Q1250,310 1100,370
                 Q950,430 800,390
                 Q650,350 500,400
                 Q350,450 200,510
                 Q50,570 -100,630
                 Z"
              fill="url(#ribbonBack)"
              opacity="0.85"
            >
              <animate
                attributeName="d"
                dur="4s"
                repeatCount="indefinite"
                values="
                  M-100,580 Q50,520 200,460 Q350,400 500,350 Q650,300 800,340 Q950,380 1100,320 Q1250,260 1400,300 Q1550,340 1700,280 Q1850,220 2000,260 Q2150,300 2200,240 L2200,290 Q2150,350 2000,310 Q1850,270 1700,330 Q1550,390 1400,350 Q1250,310 1100,370 Q950,430 800,390 Q650,350 500,400 Q350,450 200,510 Q50,570 -100,630 Z;
                  M-100,560 Q50,500 200,440 Q350,380 500,370 Q650,360 800,400 Q950,440 1100,360 Q1250,280 1400,320 Q1550,360 1700,300 Q1850,240 2000,280 Q2150,320 2200,260 L2200,310 Q2150,370 2000,330 Q1850,290 1700,350 Q1550,410 1400,370 Q1250,330 1100,390 Q950,450 800,410 Q650,370 500,420 Q350,470 200,530 Q50,590 -100,650 Z;
                  M-100,600 Q50,540 200,480 Q350,420 500,330 Q650,240 800,300 Q950,360 1100,280 Q1250,200 1400,260 Q1550,320 1700,240 Q1850,160 2000,220 Q2150,280 2200,200 L2200,250 Q2150,330 2000,270 Q1850,210 1700,290 Q1550,370 1400,310 Q1250,250 1100,330 Q950,410 800,350 Q650,290 500,360 Q350,430 200,490 Q50,550 -100,610 Z;
                  M-100,580 Q50,520 200,460 Q350,400 500,350 Q650,300 800,340 Q950,380 1100,320 Q1250,260 1400,300 Q1550,340 1700,280 Q1850,220 2000,260 Q2150,300 2200,240 L2200,290 Q2150,350 2000,310 Q1850,270 1700,330 Q1550,390 1400,350 Q1250,310 1100,370 Q950,430 800,390 Q650,350 500,400 Q350,450 200,510 Q50,570 -100,630 Z"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
              />
            </path>
            
            {/* Main ribbon surface - starts from lower middle */}
            <path
              d="M-100,550 
                 Q50,490 200,430
                 Q350,370 500,320
                 Q650,270 800,310
                 Q950,350 1100,290
                 Q1250,230 1400,270
                 Q1550,310 1700,250
                 Q1850,190 2000,230
                 Q2150,270 2200,210
                 L2200,260
                 Q2150,320 2000,280
                 Q1850,240 1700,300
                 Q1550,360 1400,320
                 Q1250,280 1100,340
                 Q950,400 800,360
                 Q650,320 500,370
                 Q350,420 200,480
                 Q50,540 -100,600
                 Z"
              fill="url(#ribbonMain)"
            >
              <animate
                attributeName="d"
                dur="4s"
                repeatCount="indefinite"
                values="
                  M-100,550 Q50,490 200,430 Q350,370 500,320 Q650,270 800,310 Q950,350 1100,290 Q1250,230 1400,270 Q1550,310 1700,250 Q1850,190 2000,230 Q2150,270 2200,210 L2200,260 Q2150,320 2000,280 Q1850,240 1700,300 Q1550,360 1400,320 Q1250,280 1100,340 Q950,400 800,360 Q650,320 500,370 Q350,420 200,480 Q50,540 -100,600 Z;
                  M-100,530 Q50,470 200,410 Q350,350 500,340 Q650,330 800,370 Q950,410 1100,330 Q1250,250 1400,290 Q1550,330 1700,270 Q1850,210 2000,250 Q2150,290 2200,230 L2200,280 Q2150,340 2000,300 Q1850,260 1700,320 Q1550,380 1400,340 Q1250,300 1100,360 Q950,420 800,380 Q650,340 500,390 Q350,440 200,500 Q50,560 -100,620 Z;
                  M-100,570 Q50,510 200,450 Q350,390 500,300 Q650,210 800,270 Q950,330 1100,250 Q1250,170 1400,230 Q1550,290 1700,210 Q1850,130 2000,190 Q2150,250 2200,170 L2200,220 Q2150,300 2000,240 Q1850,180 1700,260 Q1550,340 1400,280 Q1250,220 1100,300 Q950,380 800,320 Q650,260 500,330 Q350,400 200,460 Q50,520 -100,580 Z;
                  M-100,550 Q50,490 200,430 Q350,370 500,320 Q650,270 800,310 Q950,350 1100,290 Q1250,230 1400,270 Q1550,310 1700,250 Q1850,190 2000,230 Q2150,270 2200,210 L2200,260 Q2150,320 2000,280 Q1850,240 1700,300 Q1550,360 1400,320 Q1250,280 1100,340 Q950,400 800,360 Q650,320 500,370 Q350,420 200,480 Q50,540 -100,600 Z"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
              />
            </path>
            
            {/* Top highlight strip */}
            <path
              d="M-100,550 
                 Q50,490 200,430
                 Q350,370 500,320
                 Q650,270 800,310
                 Q950,350 1100,290
                 Q1250,230 1400,270
                 Q1550,310 1700,250
                 Q1850,190 2000,230
                 Q2150,270 2200,210
                 L2200,235
                 Q2150,295 2000,255
                 Q1850,215 1700,275
                 Q1550,335 1400,295
                 Q1250,255 1100,315
                 Q950,375 800,335
                 Q650,295 500,345
                 Q350,395 200,455
                 Q50,515 -100,575
                 Z"
              fill="url(#ribbonHighlight)"
            >
              <animate
                attributeName="d"
                dur="4s"
                repeatCount="indefinite"
                values="
                  M-100,550 Q50,490 200,430 Q350,370 500,320 Q650,270 800,310 Q950,350 1100,290 Q1250,230 1400,270 Q1550,310 1700,250 Q1850,190 2000,230 Q2150,270 2200,210 L2200,235 Q2150,295 2000,255 Q1850,215 1700,275 Q1550,335 1400,295 Q1250,255 1100,315 Q950,375 800,335 Q650,295 500,345 Q350,395 200,455 Q50,515 -100,575 Z;
                  M-100,530 Q50,470 200,410 Q350,350 500,340 Q650,330 800,370 Q950,410 1100,330 Q1250,250 1400,290 Q1550,330 1700,270 Q1850,210 2000,250 Q2150,290 2200,230 L2200,255 Q2150,315 2000,275 Q1850,235 1700,295 Q1550,355 1400,315 Q1250,275 1100,335 Q950,395 800,355 Q650,315 500,365 Q350,415 200,475 Q50,535 -100,595 Z;
                  M-100,570 Q50,510 200,450 Q350,390 500,300 Q650,210 800,270 Q950,330 1100,250 Q1250,170 1400,230 Q1550,290 1700,210 Q1850,130 2000,190 Q2150,250 2200,170 L2200,195 Q2150,275 2000,215 Q1850,155 1700,235 Q1550,315 1400,255 Q1250,195 1100,275 Q950,355 800,295 Q650,235 500,305 Q350,375 200,435 Q50,495 -100,555 Z;
                  M-100,550 Q50,490 200,430 Q350,370 500,320 Q650,270 800,310 Q950,350 1100,290 Q1250,230 1400,270 Q1550,310 1700,250 Q1850,190 2000,230 Q2150,270 2200,210 L2200,235 Q2150,295 2000,255 Q1850,215 1700,275 Q1550,335 1400,295 Q1250,255 1100,315 Q950,375 800,335 Q650,295 500,345 Q350,395 200,455 Q50,515 -100,575 Z"
                calcMode="spline"
                keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
              />
            </path>
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