import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Puzzle, 
  Brain, 
  Globe, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Clock,
  Users,
  Phone
} from "lucide-react";

const Features = () => {
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
      description: "GDPR and DPDP compliant. SOC 2 certified with end-to-end encryption. Your customer data is protected with bank-level security.",
      color: "text-secondary"
    }
  ];

  const stats = [
    { number: "5min", label: "Average Setup Time" },
    { number: "50+", label: "Integrations Available" },
    { number: "25+", label: "Languages Supported" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything Your Business Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From easy setup to enterprise-grade security, Helllo.ai provides all the tools and features 
            you need to transform your customer communication with AI.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 bg-card">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SMB Focus Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Built Specifically for Small & Medium Businesses
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Unlike enterprise-focused solutions, Helllo.ai is designed for businesses like yours. 
              Affordable pricing, simple setup, and features that actually matter for growing companies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">1-500 employees</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-foreground font-medium">10-10,000+ calls/month</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">Growing businesses</span>
              </div>
            </div>

            <Button variant="cta" size="lg" className="group">
              See How It Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;