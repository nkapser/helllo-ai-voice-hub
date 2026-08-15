import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
  X
} from "lucide-react";
import { RecognitionLogoStrip } from "@/components/RecognitionShowcase";
import { openCookiePreferences } from "@/lib/cookiebot";
import { subscribeToBrevo } from "@/lib/brevo";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    const result = await subscribeToBrevo(email);
    setIsSubscribing(false);

    if (result.status === "ok") {
      setShowSuccess(true);
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      return;
    }

    if (result.status === "already") {
      toast({
        title: "Already subscribed",
        description: "This email is already on our mailing list.",
      });
      return;
    }

    if (result.status === "invalid_email") {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (result.status === "rate_limited") {
      toast({
        title: "Please wait",
        description: `Please wait ${result.remainingSeconds} second${result.remainingSeconds !== 1 ? 's' : ''} before subscribing again.`,
        variant: "destructive"
      });
      return;
    }

    if (result.status === "not_configured") {
      toast({
        title: "Subscription service not configured",
        description: import.meta.env.DEV
          ? "Please configure VITE_BREVO_API_KEY and VITE_BREVO_LIST_ID in .env.local"
          : "Subscription service is temporarily unavailable. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Subscription failed",
      description: result.message || "There was an error subscribing. Please try again later.",
      variant: "destructive"
    });
  };

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "/#contact" },
        { name: "Blog", href: "#blog" }
      ]
    },
    {
      title: "Product", 
      links: [
        { name: "Spark", href: "/spark" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Documentation", href: "#docs" },
        { name: "API Reference", href: "#api" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cancellation & Refund Policy", href: "/cancellation-refund" },
        { name: "Cookie Policy", href: "/privacy#cookies" },
        { name: "Cookie Settings", href: "#", onClick: openCookiePreferences },
        { name: "GDPR Compliance", href: "/privacy#gdpr" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Contact Support", href: "#support" },
        { name: "System Status", href: "#status" },
        { name: "Community", href: "#community" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
    { name: "GitHub", icon: Github, href: "#github" }
  ];

  return (
    <footer className="bg-foreground text-background snap-start">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Stay Updated with AI Voice Technology
            </h3>
            <p className="text-background/80 text-lg mb-8">
              Get the latest insights, product updates, and best practices for AI voice agents in your inbox.
            </p>
            
            {/* Success Message */}
            {showSuccess && (
              <Alert className="mb-6 max-w-md mx-auto border-green-500/50 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <AlertTitle className="text-green-800 dark:text-green-200 font-semibold">
                      Successfully subscribed!
                    </AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300 mt-1">
                      Thank you for subscribing. Check your inbox for a confirmation email.
                    </AlertDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30 flex-shrink-0"
                    onClick={() => setShowSuccess(false)}
                    aria-label="Close success message"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubscribing}
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="whitespace-nowrap"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-background/60 mt-4">
              No spam. Unsubscribe at any time. Read our <a href="/privacy" className="text-background hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src="/small-logo.png" 
                  alt="helllo.ai logo" 
                  className="w-8 h-8 rounded-lg"
                  width="32"
                  height="32"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xl font-bold">helllo.ai</span>
            </div>
            
            <p className="text-background/80 mb-6 leading-relaxed">
              Enterprise-grade AI voice agents built for businesses of all sizes. 
              Easy setup, seamless integration, and enterprise-grade security.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-background/60" />
                <span className="text-sm text-background/80">Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-background/60" />
                <span className="text-sm text-background/80">+919901678665</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-background/60" />
                <span className="text-sm text-background/80">hi@helllo.ai</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-background mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/80 hover:text-background transition-colors"
                      onClick={
                        "onClick" in link && link.onClick
                          ? (event) => {
                              event.preventDefault();
                              link.onClick?.();
                            }
                          : undefined
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-background/10" />

      <div className="container mx-auto px-4 lg:px-8 pb-2 pt-2">
        <RecognitionLogoStrip />
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-background/60 text-sm">
              © 2026 HellloAI Technologies Pvt Ltd. All rights reserved.
            </p>
            <p className="text-background/50 text-xs mt-1">
              Parent company:{" "}
              <a
                href="https://perceptorylabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background underline-offset-2 hover:underline"
              >
                Perceptory AI Labs Private Limited
              </a>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-background/60">
            <span>GDPR Compliant</span>
            <span>DPDP Certified</span>
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;