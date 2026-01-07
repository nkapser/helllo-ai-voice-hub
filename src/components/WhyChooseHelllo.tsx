import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { 
  Puzzle, 
  Brain, 
  Globe, 
  TrendingUp, 
  Shield,
  Clock,
  CheckCircle2
} from "lucide-react";

const WhyChooseHelllo = () => {

  const features = [
    {
      icon: Clock,
      title: "5-Minute Setup",
      description: "Get started in minutes, not hours. No technical expertise required.",
      stat: "5 min",
      color: "text-primary",
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Puzzle,
      title: "50+ Integrations",
      description: "Works with Salesforce, HubSpot, Calendly, and all your favorite tools.",
      stat: "50+",
      color: "text-secondary",
      gradient: "from-secondary/10 to-secondary/5"
    },
    {
      icon: Brain,
      title: "Best-in-Class AI",
      description: "Powered by GPT-4, Claude, and Gemini for natural conversations.",
      stat: "3+ LLMs",
      color: "text-primary",
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Globe,
      title: "25+ Languages",
      description: "Serve customers globally in their native language.",
      stat: "25+",
      color: "text-secondary",
      gradient: "from-secondary/10 to-secondary/5"
    },
    {
      icon: TrendingUp,
      title: "Unlimited Scale",
      description: "From 10 to 10,000+ calls daily. Grows with your business.",
      stat: "10K+",
      color: "text-primary",
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 Type II, GDPR compliant with end-to-end encryption.",
      stat: "99.9%",
      color: "text-secondary",
      gradient: "from-secondary/10 to-secondary/5"
    }
  ];

  const quickStats = [
    { label: "Setup Time", value: "5 min" },
    { label: "Languages", value: "25+" },
    { label: "Integrations", value: "50+" },
    { label: "Uptime", value: "99.9%" }
  ];

  return (
    <section 
      id="why-choose-helllo" 
      className="relative pt-16 pb-12 bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden" 
      role="main"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">helllo.ai</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade AI voice agents built for businesses of all sizes. Ready to work from day one.
          </p>
        </header>

        {/* Compact Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12" role="region" aria-labelledby="stats-heading">
          <h3 id="stats-heading" className="sr-only">Platform Statistics</h3>
          {quickStats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-baseline gap-2"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Compact Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="region" aria-labelledby="features-heading">
          <h3 id="features-heading" className="sr-only">Platform Features</h3>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border bg-card overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`relative p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className={`h-4 w-4 ${feature.color} transition-colors`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <CardTitle className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </CardTitle>
                        {feature.stat && (
                          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            {feature.stat}
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-sm text-muted-foreground leading-snug group-hover:text-foreground/70 transition-colors duration-300">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>SOC 2 Type II Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>End-to-End Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHelllo;

