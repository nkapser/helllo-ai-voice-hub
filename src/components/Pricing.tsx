import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Phone, Users, Headphones, Shield } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for trying the platform",
      badge: null,
      icon: Phone,
      features: [
        "100 minutes of free calls per month",
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
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "Best for growing businesses",
      badge: "Most Popular",
      icon: Users,
      features: [
        "Unlimited calls",
        "Advanced AI features & LLM models",
        "Full tool integrations (50+ apps)",
        "Multi-language support (25+ languages)",
        "Priority support",
        "Advanced analytics dashboard",
        "Custom voice personas",
        "GDPR & DPDP compliance",
        "API access"
      ],
      excluded: [],
      buttonText: "Start Pro Trial",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      badge: "Premium",
      icon: Headphones,
      features: [
        "Everything in Pro",
        "Custom minutes/usage limits",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations & APIs",
        "SLA guarantees (99.9% uptime)",
        "Advanced security features",
        "Custom voice training",
        "24/7 phone support",
        "Compliance reporting"
      ],
      excluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no long-term contracts. 
            Choose the plan that fits your business size and needs.
          </p>
          
          {/* Pricing Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-lg p-1">
            <button className="px-4 py-2 rounded-md bg-background text-foreground font-medium shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-muted-foreground font-medium">
              Annual
            </button>
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
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
          <p className="text-muted-foreground mb-6">
            Trusted by 500+ businesses worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
            {['GDPR Compliant', 'DPDP Certified', '99.9% Uptime', 'SOC 2 Type II'].map((cert, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Can I change plans anytime?</h4>
              <p className="text-muted-foreground">Yes, upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">What happens after the free trial?</h4>
              <p className="text-muted-foreground">Your account converts to the Free plan automatically. No credit card required to start.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Do you offer custom integrations?</h4>
              <p className="text-muted-foreground">Yes, Enterprise plans include custom integrations and dedicated technical support.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Is my data secure?</h4>
              <p className="text-muted-foreground">Absolutely. We are GDPR & DPDP compliant with SOC 2 certification and end-to-end encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;