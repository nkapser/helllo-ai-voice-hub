import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, Headphones, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const features = [
  'Call Recording',
  'Call Transcriptions',
  'Call Summary & Sentiment Analysis',
  'Advanced AI features & LLM models (GPT-4, Claude, Gemini)',
  'Full tool integrations (50+ apps)',
  'Multi-language support (25+ languages)',
  'Advanced analytics dashboard',
  'Email & Priority support',
  'Lead Management & CRM Sync',
  'Campaign Setup & Outreach',
  'WhatsApp & WebChat Integration',
  'Google Search & Nearby Location',
  'Conversation Continuity & Context',
  'Human Handoff',
  'Automated Lead Follow-ups',
  'API access',
  'GDPR & DPDP compliance',
  'Enterprise security (SOC 2 Type II, 99.9% Uptime)',
  '5-minute setup',
];

const Pricing = () => {
  const navigate = useNavigate();
  const [expandedPlans, setExpandedPlans] = useState<Set<number>>(new Set());
  
  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedPlans);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPlans(newExpanded);
  };

  const plans = [
    {
      name: "Standard",
      price: "₹10,000",
      period: "/month",
      description: "Perfect for growing businesses",
      badge: null,
      icon: Phone,
      minutes: "10,000 minutes",
      minutesDescription: "included per month",
      features: features,
      highlightedFeatures: [],
      buttonText: "Start Now",
      buttonVariant: "default" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "₹50,000",
      period: "/month",
      description: "Perfect for enterprise teams",
      badge: "Best Value",
      icon: Headphones,
      minutes: "12,000 minutes",
      minutesDescription: "of calls per month",
      features: features,
      highlightedFeatures: ["2,000 additional minutes", "Dedicated support", "Custom integrations"],
      buttonText: "Get Premium",
      buttonVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no long-term contracts. Choose the plan that fits your business size and needs.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Additional minutes: ₹5/min (~$0.06/min)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-2 transition-colors ${
                plan.popular 
                  ? 'border-primary shadow-lg hover:shadow-xl' 
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1 text-sm font-semibold">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className={`text-center pb-8 ${plan.badge ? 'pt-6' : ''}`}>
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${
                  plan.popular ? 'bg-primary/10' : 'bg-blue-100'
                }`}>
                  <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-blue-600'}`} />
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                  <div className="text-lg text-gray-600 font-medium">{plan.period}</div>
                </div>
                
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center pb-4 border-b">
                  <div className="text-2xl font-bold text-gray-900">{plan.minutes}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {plan.minutesDescription}
                  </div>
                </div>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate("/console")}
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-4">All Features Included:</h4>
                  
                  {/* Highlighted features for Premium */}
                  {plan.highlightedFeatures && plan.highlightedFeatures.length > 0 && (
                    <div className="space-y-2 mb-4 pb-4 border-b">
                      {plan.highlightedFeatures.map((feature, featureIndex) => (
                        <div key={`highlighted-${featureIndex}`} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-bold text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Regular features - show first 10, rest on expand */}
                  {plan.features.slice(0, 10).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                  
                  {/* Expandable remaining features */}
                  {plan.features.length > 10 && (
                    <>
                      {expandedPlans.has(index) && (
                        <>
                          {plan.features.slice(10).map((feature, featureIndex) => (
                            <div key={featureIndex + 10} className="flex items-start space-x-3">
                              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </>
                      )}
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium mt-2"
                      >
                        <span>{expandedPlans.has(index) ? 'Show less' : `Show ${plan.features.length - 10} more features`}</span>
                        {expandedPlans.has(index) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Trusted by 500+ businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>DPDP Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;