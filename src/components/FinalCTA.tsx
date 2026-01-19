import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: CheckCircle,
      text: "30 minutes free monthly"
    },
    {
      icon: CreditCard,
      text: "No credit card required"
    },
    {
      icon: Clock,
      text: "5-minute setup"
    }
  ];

  return (
    <section className="py-20 bg-gradient-primary text-primary-foreground min-h-[80vh] snap-start">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business with AI Voice Agents?
          </h2>
          
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join hundreds of growing businesses that trust helllo.ai to handle their customer communications. 
            Start your free trial today and see the difference AI can make.
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <benefit.icon className="h-5 w-5 text-primary-foreground" />
                <span className="text-primary-foreground/90 font-medium">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              variant="secondary" 
              size="lg" 
              className="group text-lg px-8 py-4 h-auto"
              onClick={() => {
                const calendlySection = document.getElementById('schedule-demo');
                if (calendlySection) {
                  calendlySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group text-lg px-8 py-4 h-auto border-primary-foreground/20 bg-background !text-primary hover:bg-primary-foreground hover:!text-primary"
              onClick={() => {
                const calendlySection = document.getElementById('schedule-demo');
                if (calendlySection) {
                  calendlySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-primary-foreground/70 text-sm mb-4">
              Trusted by 500+ businesses worldwide
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs text-primary-foreground/60">
              <span>✓ GDPR & DPDP Compliant</span>
              <span>✓ 99.9% Uptime SLA</span>
              <span>✓ SOC 2 Certified</span>
              <span>✓ 24/7 Support</span>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-8 p-4 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
            <p className="text-primary-foreground/90 text-sm">
              <strong>Limited Time:</strong> Get your first month free when you upgrade to Pro within 7 days of starting your trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;