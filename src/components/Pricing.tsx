import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Phone, Users, Headphones, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Trial",
      price: "₹0",
      period: "/month",
      description: "Perfect for trying the platform",
      badge: null,
      icon: Phone,
      features: [
        "30 minutes of free calls per month",
        "Basic AI voice features",
        "Email support",
        "2 integrations included",
        "Standard voice quality",
        "Basic analytics dashboard"
      ],
      excluded: [
        "Advanced AI features",
        "Multi-language support",
        "Priority support",
        "Custom integrations"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Start",
      price: "₹2,999",
      period: "/month",
      description: "Best for growing businesses",
      badge: "Most Popular",
      icon: Users,
      features: [
        "500 minutes of calls per month",
        "Advanced AI features & LLM models",
        "Full tool integrations (50+ apps)",
        "Multi-language support (25+ languages)",
        "Priority support",
        "Advanced analytics dashboard",
        "Basic AI voice features",
        "Email support",

      ],
      excluded: [
        "Custom voice personas",
        "GDPR & DPDP compliance",
        "API access"
      ],
      buttonText: "Start Now",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Pro",
      price: "₹9,999",
      period: "/month",
      description: "Perfect for enterprise teams",
      badge: "Best Value",
      icon: Headphones,
      features: [
        "2000 minutes of calls per month",
        "All Advanced AI features & LLM models",
        "Unlimited tool integrations",
        "Multi-language support (50+ languages)",
        "24/7 Priority support",
        "Advanced analytics dashboard with custom reports",
        "Custom voice personas & training",
        "GDPR & DPDP compliance",
        "Full API access with higher rate limits",
        "Dedicated account manager",
        "Custom integrations & white-labeling",
        "Advanced security features"
      ],
      excluded: [],
      buttonText: "Get Pro",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="pt-12 pb-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 lg:p-12 mb-8 border border-primary/10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free, scale as you grow. No hidden fees, no long-term contracts. 
              Choose the plan that fits your business size and needs.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-all duration-300 hover:shadow-medium hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-primary shadow-medium scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto rounded-full ${plan.popular ? 'bg-gradient-primary' : 'bg-muted'} flex items-center justify-center mb-4`}>
                  <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                
                <CardDescription className="text-base mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full mb-6" 
                  size="lg"
                  onClick={() => {
                    if (plan.buttonText === "Start Free Trial") {
                      navigate("/console");
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.excluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 opacity-50">
                      <div className="h-5 w-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
                      </div>
                      <span className="text-muted-foreground line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-2xl p-8 border border-success/10">
            <p className="text-muted-foreground mb-8 text-lg">
              Trusted by 500+ businesses worldwide
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center max-w-4xl mx-auto">
              {['GDPR Compliant', 'DPDP Certified', '99.9% Uptime', 'SOC 2 Type II'].map((cert, index) => (
                <div key={index} className="flex items-center justify-center gap-3 bg-background/50 rounded-lg p-4 border border-muted/20 hover:border-success/20 transition-colors">
                  <Shield className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 bg-gradient-to-br from-muted/40 to-muted/20 rounded-3xl p-8 lg:p-12 border border-muted/30 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get answers to the most common questions about our AI voice assistant platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background/50 rounded-xl p-6 border border-muted/20 hover:border-primary/20 transition-colors">
              <h4 className="font-semibold text-foreground mb-3 text-lg">Do you offer custom integrations?</h4>
              <p className="text-muted-foreground leading-relaxed">Yes, Enterprise plans include custom integrations and dedicated technical support.</p>
            </div>
            
            <div className="bg-background/50 rounded-xl p-6 border border-muted/20 hover:border-primary/20 transition-colors">
              <h4 className="font-semibold text-foreground mb-3 text-lg">Is my data secure?</h4>
              <p className="text-muted-foreground leading-relaxed">Absolutely. We are GDPR & DPDP compliant with SOC 2 certification and end-to-end encryption.</p>
            </div>
            
            <div className="bg-background/50 rounded-xl p-6 border border-muted/20 hover:border-primary/20 transition-colors md:col-span-2">
              <h4 className="font-semibold text-foreground mb-3 text-lg">What happens after the minutes get exhausted?</h4>
              <p className="text-muted-foreground leading-relaxed">You will need to repurchase additional minutes / purchase 500 minutes whichever you choose to and they will be valid for a month.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;