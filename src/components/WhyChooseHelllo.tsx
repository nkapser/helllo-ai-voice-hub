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
      color: "text-primary"
    },
    {
      icon: Puzzle,
      title: "Seamless Tool Integration",
      description: "Connect with your existing CRM, helpdesk, scheduling tools, and more. Works with Salesforce, HubSpot, Calendly, and 50+ popular business tools.",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Multi-modal LLM Support",
      description: "Powered by the latest AI models including GPT-4, Claude, and Gemini. Best-in-industry natural language understanding and response quality.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Serve customers in English, Hindi, Spanish, French, German, and 25+ other languages. Perfect for diverse markets and global expansion.",
      color: "text-secondary"
    },
    {
      icon: TrendingUp,
      title: "Scalable Architecture",
      description: "From 10 calls per day to 10,000+ calls. Our infrastructure grows with your business without performance degradation or setup changes.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II compliant with end-to-end encryption, GDPR compliance, and data residency options. Your customer data is always protected.",
      color: "text-secondary"
    }
  ];

  const stats = [
    { label: "Setup Time", value: "5 min", icon: Clock },
    { label: "Supported Languages", value: "25+", icon: Globe },
    { label: "Integrations", value: "50+", icon: Puzzle },
    { label: "Uptime", value: "99.9%", icon: TrendingUp }
  ];

  return (
    <section id="why-choose-helllo" className="pt-20 pb-12 bg-muted/20" role="main">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Helllo.ai</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built specifically for small and medium businesses, our AI voice agents combine cutting-edge technology 
            with practical business solutions that work from day one.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" role="region" aria-labelledby="stats-heading">
          <h3 id="stats-heading" className="sr-only">Platform Statistics</h3>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border hover:shadow-medium transition-shadow">
                <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary" aria-hidden="true" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" role="region" aria-labelledby="features-heading">
          <h3 id="features-heading" className="sr-only">Platform Features</h3>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border border-border bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`p-3 rounded-lg bg-background border border-border`}>
                      <IconComponent className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed">
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

