import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const countries = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
];

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

  const { session } = useAuth();
  const [slotIndex, setSlotIndex] = useState(0);
  const [isPhraseSpinning, setIsPhraseSpinning] = useState(false);
  const [isSlotResetting, setIsSlotResetting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [callSuccess, setCallSuccess] = useState(false);
  const [successPhoneNumber, setSuccessPhoneNumber] = useState("");

  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[2];

  const handleSayHellloClick = () => {
    if (!phoneNumber.trim()) {
      setPhoneError("Please enter a phone number");
      return;
    }
    setPhoneError("");
    setCallSuccess(false);
    setSuccessPhoneNumber("");
    setIsDialogOpen(true);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleSubmitCall = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, "")}`;
      
      // Determine API base URL based on hostname
      const hostname = window.location.hostname;
      let apiBaseUrl: string;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        apiBaseUrl = 'http://localhost:8000';
      } else if (hostname === 'staging.helllo.ai' || hostname.includes('staging')) {
        apiBaseUrl = 'https://api-staging.helllo.ai';
      } else {
        // Production (helllo.ai)
        apiBaseUrl = 'https://api-prod.helllo.ai';
      }
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
      
      const response = await fetch(`${apiBaseUrl}/api/v1/demo-trigger-outbound-call`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          agent_id: 'a29a27c6-ccd2-4e40-abf2-6d90dbaedf99',
          to_number: fullPhoneNumber,
          from_number: '+911234567890', // Optional
          data_variables: {
            callee_name: userName.trim()
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate call');
      }

      setSuccessPhoneNumber(fullPhoneNumber);
      setCallSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error initiating call:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to initiate call. Please try again.'}`);
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsDialogOpen(false);
    setCallSuccess(false);
    setSuccessPhoneNumber("");
    setUserName("");
    setAcceptedTerms(false);
    setPhoneNumber("");
  };
  
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

          {/* Experience Call Widget */}
          <div className="mb-12 mt-8">
            <p className="text-lg md:text-xl text-muted-foreground mb-6 text-center">
              Experience our call now!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-start sm:items-center max-w-xl mx-auto">
              <div className="flex flex-col gap-1 w-full sm:w-auto">
                <div className="flex items-start gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[90px] h-12 border-border/30 px-2 justify-center">
                      <span className="text-xl leading-none flex items-center justify-center">
                        {selectedCountry.flag}
                      </span>
                      <SelectValue className="sr-only">{selectedCountry.code}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span className="text-xl">{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-col gap-1 flex-1">
                    <Input
                      type="tel"
                      placeholder="Enter number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className={`min-w-[220px] sm:min-w-[280px] h-12 border-2 ${phoneError ? 'border-red-500' : 'border-foreground/40 focus:border-foreground/70'} text-base px-4 transition-colors`}
                      aria-label="Phone number"
                    />
                    {phoneError && (
                      <p className="text-sm text-red-500">{phoneError}</p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="h-12 bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-200 rounded-full px-6 sm:px-8 font-semibold uppercase tracking-wider shadow-lg flex items-center gap-2 whitespace-nowrap"
                aria-label="Say Helllo - Start call"
                onClick={handleSayHellloClick}
              >
                <Phone className="h-4 w-4" />
                Say Helllo
              </Button>
            </div>
          </div>

          {/* Call Initiation Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              handleCloseSuccess();
            }
          }}>
            <DialogContent className="sm:max-w-[425px]">
              {callSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Call Initiated Successfully!</DialogTitle>
                    <DialogDescription>
                      We'll call you at {successPhoneNumber} soon.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={handleCloseSuccess}
                      className="bg-foreground text-background hover:bg-foreground/90 w-full"
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Initiate Call</DialogTitle>
                    <DialogDescription>
                      Enter your name and accept the terms and conditions to initiate the call.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        I accept the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:text-primary/80"
                        >
                          terms and conditions
                        </a>
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitCall}
                      disabled={isSubmitting || !userName.trim() || !acceptedTerms}
                      className="bg-foreground text-background hover:bg-foreground/90"
                    >
                      {isSubmitting ? "Initiating..." : (
                        <>
                          <Phone className="h-4 w-4 mr-2" />
                          Say Helllo
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
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
