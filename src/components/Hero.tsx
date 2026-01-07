import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const rotatingPhrases = ["Front Desk Services", "Customer Experience", "Revenue Operations"];
  const phraseHeightEm = 1.2;
  const slotRepeatCount = 12;
  const slotItems = useMemo(
    () =>
      Array.from({ length: rotatingPhrases.length * slotRepeatCount }, (_, i) => rotatingPhrases[i % rotatingPhrases.length]),
    [rotatingPhrases.length]
  );

  const [slotIndex, setSlotIndex] = useState(0);
  const [isPhraseSpinning, setIsPhraseSpinning] = useState(false);
  const [isSlotResetting, setIsSlotResetting] = useState(false);
  
  useEffect(() => {
    const stepSize = 1; // Flip one phrase at a time
    let intervalId: number | undefined;
    
    // Initial delay before first animation
    const initialDelay = setTimeout(() => {
      setSlotIndex((prev) => prev + stepSize);
      
      // Then continue with regular interval
      intervalId = window.setInterval(() => {
        setSlotIndex((prev) => {
          const next = prev + stepSize;
          // Reset when we've gone through all phrases
          if (next >= slotItems.length) {
            return 0;
          }
          return next;
        });
      }, 2500); // Interval between phrase flips
    }, 800); // Initial delay before first animation

    return () => {
      clearTimeout(initialDelay);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [rotatingPhrases.length, slotItems.length]);

  useEffect(() => {
    if (isSlotResetting) return;
    setIsPhraseSpinning(true);
    const timeoutId = window.setTimeout(() => {
      setIsPhraseSpinning(false);
    }, 700); // Match the transition duration

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSlotResetting, slotIndex]);

  useEffect(() => {
    // Reset when we've shown all unique phrases (after showing the 3rd one)
    // We reset after showing all 3 phrases to loop back to the first
    if (slotIndex >= rotatingPhrases.length) {
      const timeoutId = window.setTimeout(() => {
        setIsSlotResetting(true);
        // Reset to start of the cycle
        setSlotIndex(0);

        window.requestAnimationFrame(() => {
          setIsSlotResetting(false);
        });
      }, 700); // Match the transition duration

      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [slotIndex, rotatingPhrases.length]);


  return (
    <>
      <style>{`
        .partner-logo-container {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .partner-logo-container:hover {
          opacity: 1;
        }
        .partner-logo {
          max-height: 60px;
          max-width: 150px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(100%) brightness(0.8);
          transition: filter 0.3s ease;
        }
        .partner-logo-container:hover .partner-logo {
          filter: grayscale(0%) brightness(1);
        }

        .hero-slot {
          display: inline-flex;
          align-items: baseline;
          justify-content: flex-end;
          height: 1.2em;
          overflow: hidden;
          vertical-align: baseline;
          padding: 0;
          text-align: right;
        }

        .hero-slot-track {
          display: block;
          text-align: right;
          will-change: transform;
          transition: transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1), filter 700ms ease;
          background: linear-gradient(to bottom, #7c5dff 0%, #7c5dff 75%, #9d7aff 75%, #b894ff 85%, #7c5dff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-slot-track.no-transition {
          transition: none;
        }

        .hero-slot-item {
          display: block;
          height: 1.2em;
          line-height: 1.2em;
          text-align: right;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slot-track {
            transition: none;
            background: #7c5dff;
            -webkit-text-fill-color: #7c5dff;
          }
          .hero-slot-track.is-spinning {
            filter: none;
          }
        }
      `}</style>
      <section 
        id="home" 
        className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 bg-background overflow-hidden min-h-screen flex flex-col snap-start" 
        role="banner"
      >
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
          {/* Main Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight flex flex-col items-center text-center"
            style={{ rowGap: "0.65rem" }}
          >
            <span className="block leading-tight text-foreground">
              Supercharge your
            </span>
            <span className="text-foreground block leading-tight">
              <span className="flex items-baseline justify-center gap-3 flex-wrap">
                <span className="hero-slot" aria-live="polite">
                  <span
                    className={`hero-slot-track ${isPhraseSpinning ? "is-spinning" : ""} ${isSlotResetting ? "no-transition" : ""}`}
                    style={{
                      transform: `translateY(-${slotIndex * phraseHeightEm}em)`,
                    }}
                  >
                    {slotItems.map((phrase, index) => (
                      <span key={`${phrase}-${index}`} className="hero-slot-item">
                        {phrase}
                      </span>
                    ))}
                  </span>
                </span>
                <span>&nbsp;with</span>
              </span>
            </span>
            <span 
              className="block leading-tight text-foreground italic"
            >
              AI Voice Agents + Agentic Flows
            </span>
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 15px',
            }}
          >
            Deploy and scale production-ready AI voice agents, powered by agentic orchestration, to deliver business outcomes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" role="group" aria-label="Call to action buttons">
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

      {/* Trusted Partners - Full Width */}
      <div className="w-full relative z-10 mt-8">
        <div className="w-full pt-6 pb-6 border-t border-border/30 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-sm text-muted-foreground mb-5 text-center font-medium uppercase tracking-wider">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16" role="list" aria-label="Trusted partner companies">
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/1-essem18-logo.png" 
                  alt="ESSEM 18 logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/2-cascade-neopolis.png" 
                  alt="The Cascades Neopolis logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/3-clean-fanatics-.webp" 
                  alt="Clean Fanatics logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/4-mednetLabs_logo.png" 
                  alt="MedNet Labs logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/5-delta-images.jpeg" 
                  alt="Delta Hospitals logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
              <div className="partner-logo-container" role="listitem">
                <img 
                  src="/partner-logos/6-gsl-college.png" 
                  alt="GSL College logo - Trusted partner of helllo.ai" 
                  className="partner-logo"
                  loading="lazy"
                  width="120"
                  height="60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
