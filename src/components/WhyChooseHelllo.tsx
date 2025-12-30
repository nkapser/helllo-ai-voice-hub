import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Puzzle, 
  Brain, 
  Globe, 
  TrendingUp, 
  Shield,
  Clock
} from "lucide-react";

const WhyChooseHelllo = () => {

  const features = [
    {
      icon: Clock,
      title: "Easy 5-Minute Onboarding",
      description: "Get your AI voice agents up and running in minutes, not hours. Our streamlined setup process is designed specifically for busy SMB owners.",
      color: "text-primary",
      gradient: "from-primary/10 via-primary/5 to-secondary/10"
    },
    {
      icon: Puzzle,
      title: "Seamless Tool Integration",
      description: "Connect with your existing CRM, helpdesk, scheduling tools, and more. Works with Salesforce, HubSpot, Calendly, and 50+ popular business tools.",
      color: "text-secondary",
      gradient: "from-secondary/10 via-secondary/5 to-primary/10"
    },
    {
      icon: Brain,
      title: "Multi-modal LLM Support",
      description: "Powered by the latest AI models including GPT-4, Claude, and Gemini. Best-in-industry natural language understanding and response quality.",
      color: "text-primary",
      gradient: "from-primary/10 via-primary/5 to-secondary/10"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Serve customers in English, Hindi, Spanish, French, German, and 25+ other languages. Perfect for diverse markets and global expansion.",
      color: "text-secondary",
      gradient: "from-secondary/10 via-secondary/5 to-primary/10"
    },
    {
      icon: TrendingUp,
      title: "Scalable Architecture",
      description: "From 10 calls per day to 10,000+ calls. Our infrastructure grows with your business without performance degradation or setup changes.",
      color: "text-primary",
      gradient: "from-primary/10 via-primary/5 to-secondary/10"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II compliant with end-to-end encryption, GDPR compliance, and data residency options. Your customer data is always protected.",
      color: "text-secondary",
      gradient: "from-secondary/10 via-secondary/5 to-primary/10"
    }
  ];

  const stats = [
    { label: "Setup Time", value: "5 min", icon: Clock, gradient: "from-primary/20 to-primary/5" },
    { label: "Supported Languages", value: "25+", icon: Globe, gradient: "from-secondary/20 to-secondary/5" },
    { label: "Integrations", value: "50+", icon: Puzzle, gradient: "from-primary/20 to-primary/5" },
    { label: "Uptime", value: "99.9%", icon: TrendingUp, gradient: "from-secondary/20 to-secondary/5" }
  ];

  return (
    <section 
      id="why-choose-helllo" 
      className="relative pt-20 pb-16 bg-gradient-to-b from-muted/20 via-background to-muted/10 overflow-hidden" 
      role="main"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">helllo.ai</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built specifically for small and medium businesses, our AI voice agents combine cutting-edge technology 
            with practical business solutions that work from day one.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" role="region" aria-labelledby="stats-heading">
          <h3 id="stats-heading" className="sr-only">Platform Statistics</h3>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative text-center p-6 bg-card rounded-xl border border-border hover:shadow-strong transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-dark transition-colors" aria-hidden="true" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="region" aria-labelledby="features-heading">
          <h3 id="features-heading" className="sr-only">Platform Features</h3>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border border-border bg-card overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`relative p-4 rounded-xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                      <IconComponent className={`relative h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <CardDescription className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHelllo;

