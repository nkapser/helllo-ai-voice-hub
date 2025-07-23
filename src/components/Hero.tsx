import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-ai-voice.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-hero" role="banner">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Your Business with<br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Voice Agents
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl" role="text">
              Empower your Small or Medium Business with intelligent AI voice technology. 
              Easy setup, seamless integration, and multi-language support designed for growing businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" role="group" aria-label="Call to action buttons">
              <Button variant="hero" size="lg" className="group" aria-label="Start your free trial">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              
              <Button variant="outline" size="lg" className="group" aria-label="Watch product demo video">
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground" role="list" aria-label="Key benefits">
              <div className="flex items-center gap-2" role="listitem">
                <div className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></div>
                <span>30 minutes free monthly</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <div className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2" role="listitem">
                <div className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></div>
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <figure className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="AI Voice Technology dashboard showing real-time call analytics, agent performance metrics, and customer interaction data for small business automation"
                className="w-full h-auto object-cover"
                width="600"
                height="400"
                loading="eager"
                fetchPriority="high"
              />
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-medium animate-float" role="status" aria-label="Live AI agent indicator">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" aria-hidden="true"></div>
                  <span className="text-sm font-medium text-foreground">Live AI Agent</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-medium" role="status" aria-label="Daily call statistics">
                <div className="text-sm text-muted-foreground">Active Calls Today</div>
                <div className="text-2xl font-bold text-primary">2,847</div>
              </div>
            </figure>

            {/* Background Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-secondary opacity-20 rounded-full blur-xl" aria-hidden="true"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-primary opacity-20 rounded-full blur-xl" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;