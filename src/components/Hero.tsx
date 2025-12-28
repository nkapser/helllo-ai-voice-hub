import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-background overflow-hidden" role="banner">
      {/* Wave Graphic Overlay - Flowing across the middle */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" style={{ overflow: 'hidden' }}>
        <svg
          width="100%"
          height="400"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="absolute top-1/2 left-0 -translate-y-1/2"
          style={{ 
            height: '400px',
            width: '100%',
            opacity: 0.7
          }}
        >
          <defs>
            <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="30%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="70%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="blurFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
            </filter>
          </defs>
          <path
            d="M0,120 Q360,60 720,100 T1440,120 L1440,200 L0,200 Z"
            fill="url(#heroWaveGradient)"
            filter="url(#blurFilter)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight relative z-20">
            <span className="text-foreground">Supercharge your </span>
            <span className="relative inline-block">
              <span className="relative z-20">Call Operations</span>
              {/* Wave overlay effect on "Call Operations" - creates the translucent blue/purple overlay */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                viewBox="0 0 500 120"
                preserveAspectRatio="none"
                width="120%"
                height="120"
                style={{ 
                  zIndex: 15,
                  opacity: 0.65
                }}
              >
                <defs>
                  <linearGradient id="heroTextWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <filter id="textBlurFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                  </filter>
                </defs>
                <path
                  d="M0,60 Q125,30 250,60 T500,60 L500,120 L0,120 Z"
                  fill="url(#heroTextWaveGradient)"
                  filter="url(#textBlurFilter)"
                />
              </svg>
            </span>
            <span className="text-foreground"> with Voice AI Agents</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto relative z-20" role="text">
            Discover the new way to build, test, deploy, and monitor
            <br className="hidden md:block" />
            production-ready AI voice agents at scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20" role="group" aria-label="Call to action buttons">
            <Button
              variant="default"
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-transform duration-200 rounded-lg px-8 py-6 text-lg font-semibold shadow-lg"
              aria-label="Try for free"
            >
              Try for Free
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-foreground/20 bg-background text-foreground hover:bg-foreground/5 hover:border-foreground/30 rounded-lg px-8 py-6 text-lg font-semibold"
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