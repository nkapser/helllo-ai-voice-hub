import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center" role="banner">
      {/* Animated 3D Wave Ribbon - Single continuous flowing ribbon */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
        {/* CSS for unified ribbon wave animation */}
        <style>{`
          @keyframes ribbonWave {
            0% {
              transform: translateX(0%) translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateX(2%) translateY(-15px) rotate(0.5deg);
            }
            50% {
              transform: translateX(4%) translateY(5px) rotate(0deg);
            }
            75% {
              transform: translateX(2%) translateY(-8px) rotate(-0.5deg);
            }
            100% {
              transform: translateX(0%) translateY(0px) rotate(0deg);
            }
          }
          
          @keyframes ribbonFloat {
            0%, 100% {
              d: path("M-80,650 C100,600 200,500 350,420 C500,340 650,280 850,270 C1050,260 1200,200 1400,140 C1600,80 1700,100 1850,50 L1850,130 C1700,180 1600,165 1400,220 C1200,275 1050,340 850,355 C650,370 500,420 350,500 C200,580 100,670 -80,740 Z");
            }
            33% {
              d: path("M-80,640 C100,585 200,480 350,410 C500,340 650,295 850,290 C1050,285 1200,210 1400,155 C1600,100 1700,115 1850,70 L1850,145 C1700,195 1600,175 1400,235 C1200,295 1050,355 850,365 C650,375 500,410 350,485 C200,560 100,655 -80,720 Z");
            }
            66% {
              d: path("M-80,660 C100,615 200,520 350,435 C500,350 650,270 850,255 C1050,240 1200,185 1400,125 C1600,65 1700,90 1850,35 L1850,115 C1700,165 1600,155 1400,210 C1200,265 1050,330 850,350 C650,370 500,430 350,515 C200,600 100,685 -80,755 Z");
            }
          }
          
          .ribbon-unified {
            animation: ribbonWave 8s ease-in-out infinite;
            transform-origin: center center;
          }
          
          .ribbon-path-animated {
            animation: ribbonFloat 6s ease-in-out infinite;
          }
        `}</style>
        
        {/* SVG with single continuous ribbon */}
        <svg 
          className="ribbon-unified absolute w-[130%] h-full left-[-15%] top-0"
          viewBox="0 0 1800 800"
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
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            
            {/* Soft shadow filter */}
            <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
              <feOffset dx="0" dy="15" result="shadow" />
              <feFlood floodColor="#6366f1" floodOpacity="0.25" />
              <feComposite in2="shadow" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g filter="url(#ribbonShadow)">
            {/* Back layer - creates depth/shadow effect */}
            <path
              className="ribbon-path-animated"
              d="M-80,680 
                 C100,630 200,530 350,450 
                 C500,370 650,310 850,300 
                 C1050,290 1200,230 1400,170 
                 C1600,110 1700,130 1850,80
                 L1850,160
                 C1700,210 1600,195 1400,250 
                 C1200,305 1050,370 850,385 
                 C650,400 500,450 350,530 
                 C200,610 100,700 -80,770
                 Z"
              fill="url(#ribbonBack)"
              opacity="0.85"
            />
            
            {/* Main ribbon surface */}
            <path
              className="ribbon-path-animated"
              d="M-80,650 
                 C100,600 200,500 350,420 
                 C500,340 650,280 850,270 
                 C1050,260 1200,200 1400,140 
                 C1600,80 1700,100 1850,50
                 L1850,130
                 C1700,180 1600,165 1400,220 
                 C1200,275 1050,340 850,355 
                 C650,370 500,420 350,500 
                 C200,580 100,670 -80,740
                 Z"
              fill="url(#ribbonMain)"
            >
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M-80,650 C100,600 200,500 350,420 C500,340 650,280 850,270 C1050,260 1200,200 1400,140 C1600,80 1700,100 1850,50 L1850,130 C1700,180 1600,165 1400,220 C1200,275 1050,340 850,355 C650,370 500,420 350,500 C200,580 100,670 -80,740 Z;
                  M-80,640 C100,580 200,490 350,400 C500,310 650,260 850,260 C1050,260 1200,220 1400,170 C1600,120 1700,130 1850,85 L1850,160 C1700,205 1600,185 1400,240 C1200,295 1050,350 850,360 C650,370 500,400 350,475 C200,550 100,645 -80,715 Z;
                  M-80,660 C100,620 200,520 350,440 C500,360 650,295 850,280 C1050,265 1200,190 1400,120 C1600,50 1700,80 1850,25 L1850,105 C1700,155 1600,145 1400,205 C1200,265 1050,335 850,355 C650,375 500,440 350,525 C200,610 100,695 -80,765 Z;
                  M-80,650 C100,600 200,500 350,420 C500,340 650,280 850,270 C1050,260 1200,200 1400,140 C1600,80 1700,100 1850,50 L1850,130 C1700,180 1600,165 1400,220 C1200,275 1050,340 850,355 C650,370 500,420 350,500 C200,580 100,670 -80,740 Z"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            </path>
            
            {/* Top highlight strip for 3D shine */}
            <path
              d="M-80,650 
                 C100,600 200,500 350,420 
                 C500,340 650,280 850,270 
                 C1050,260 1200,200 1400,140 
                 C1600,80 1700,100 1850,50
                 L1850,80
                 C1700,130 1600,115 1400,170 
                 C1200,225 1050,285 850,300 
                 C650,315 500,360 350,440 
                 C200,520 100,605 -80,680
                 Z"
              fill="url(#ribbonHighlight)"
            >
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M-80,650 C100,600 200,500 350,420 C500,340 650,280 850,270 C1050,260 1200,200 1400,140 C1600,80 1700,100 1850,50 L1850,80 C1700,130 1600,115 1400,170 C1200,225 1050,285 850,300 C650,315 500,360 350,440 C200,520 100,605 -80,680 Z;
                  M-80,640 C100,580 200,490 350,400 C500,310 650,260 850,260 C1050,260 1200,220 1400,170 C1600,120 1700,130 1850,85 L1850,115 C1700,160 1600,140 1400,195 C1200,250 1050,305 850,315 C650,325 500,355 350,425 C200,495 100,585 -80,655 Z;
                  M-80,660 C100,620 200,520 350,440 C500,360 650,295 850,280 C1050,265 1200,190 1400,120 C1600,50 1700,80 1850,25 L1850,55 C1700,105 1600,95 1400,155 C1200,215 1050,280 850,300 C650,320 500,380 350,465 C200,550 100,635 -80,705 Z;
                  M-80,650 C100,600 200,500 350,420 C500,340 650,280 850,270 C1050,260 1200,200 1400,140 C1600,80 1700,100 1850,50 L1850,80 C1700,130 1600,115 1400,170 C1200,225 1050,285 850,300 C650,315 500,360 350,440 C200,520 100,605 -80,680 Z"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
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
            <span className="text-foreground"> with Voice AI</span>
            <br />
            <span className="text-foreground">Agents</span>
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