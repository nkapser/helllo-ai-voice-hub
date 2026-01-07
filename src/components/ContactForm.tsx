import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, MessageCircle, Loader2, CheckCircle2, X } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    primaryUseCase: "",
    additionalInfo: "",
    consentToContact: false,
    consentToMarketing: false,
    // Honeypot field - hidden from users, bots might fill it
    website: ""
  });

  // Rate limiting: 30 seconds between submissions
  const RATE_LIMIT_SECONDS = 30;
  // Maximum submissions per session (stored in sessionStorage)
  const MAX_SUBMISSIONS_PER_SESSION = 3;

  // Calculate if form should be disabled due to rate limiting
  const getRemainingWaitTime = (): number => {
    if (!lastSubmissionTime) return 0;
    const now = Date.now();
    const timeSinceLastSubmission = (now - lastSubmissionTime) / 1000;
    const remaining = RATE_LIMIT_SECONDS - timeSinceLastSubmission;
    return remaining > 0 ? Math.ceil(remaining) : 0;
  };

  const remainingWaitTime = getRemainingWaitTime();
  const isRateLimited = remainingWaitTime > 0;
  const isSubmissionLimitReached = submissionCount >= MAX_SUBMISSIONS_PER_SESSION;
  const isFormDisabled = isSubmitting || isRateLimited || isSubmissionLimitReached;

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_5l1n25h";
  const EMAILJS_TEMPLATE_ID = "template_v44xlmb";
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

  // Debug: Log environment variable on mount (only in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("EmailJS Public Key loaded:", EMAILJS_PUBLIC_KEY ? "✓ Present" : "✗ Missing");
      console.log("All VITE_ env vars:", Object.keys(import.meta.env).filter(key => key.startsWith("VITE_")));
    }

    // Load submission count from sessionStorage
    const storedCount = sessionStorage.getItem('contactFormSubmissionCount');
    if (storedCount) {
      setSubmissionCount(parseInt(storedCount, 10));
    }

    // Load last submission time from sessionStorage
    const storedTime = sessionStorage.getItem('contactFormLastSubmission');
    if (storedTime) {
      setLastSubmissionTime(parseInt(storedTime, 10));
    }
  }, []);

  // Update rate limit countdown in real-time
  useEffect(() => {
    if (!isRateLimited || !lastSubmissionTime) {
      setCountdown(0);
      return;
    }

    const calculateRemaining = () => {
      const now = Date.now();
      const timeSinceLastSubmission = (now - lastSubmissionTime) / 1000;
      const remaining = RATE_LIMIT_SECONDS - timeSinceLastSubmission;
      return remaining > 0 ? Math.ceil(remaining) : 0;
    };

    // Set initial countdown
    setCountdown(calculateRemaining());

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setCountdown(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRateLimited, lastSubmissionTime]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if this field is filled, it's likely a bot
    if (formData.website) {
      console.warn("Honeypot field detected - potential bot submission");
      // Silently fail - don't show error to bot
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (lastSubmissionTime) {
      const timeSinceLastSubmission = (now - lastSubmissionTime) / 1000; // in seconds
      if (timeSinceLastSubmission < RATE_LIMIT_SECONDS) {
        const remainingSeconds = Math.ceil(RATE_LIMIT_SECONDS - timeSinceLastSubmission);
        toast({
          title: "Please wait",
          description: `You can only submit once every ${RATE_LIMIT_SECONDS} seconds. Please try again in ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}.`,
          variant: "destructive"
        });
        return;
      }
    }

    // Check submission count limit
    if (submissionCount >= MAX_SUBMISSIONS_PER_SESSION) {
      toast({
        title: "Submission limit reached",
        description: `You have reached the maximum of ${MAX_SUBMISSIONS_PER_SESSION} submissions per session. Please refresh the page or try again later.`,
        variant: "destructive"
      });
      return;
    }
    
    // Basic validation
    if (!formData.businessName || !formData.contactName || !formData.email) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, contact name, and email are required.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Consent validation
    if (!formData.consentToContact) {
      toast({
        title: "Consent required",
        description: "Please agree to our privacy policy to continue.",
        variant: "destructive"
      });
      return;
    }

    // Check if EmailJS Public Key is configured
    if (!EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS Public Key is missing. Make sure VITE_EMAILJS_PUBLIC_KEY is set in .env.local and the dev server has been restarted.");
      toast({
        title: "Configuration error",
        description: import.meta.env.DEV 
          ? "EmailJS Public Key not found. Please check .env.local and restart the dev server."
          : "Email service is not properly configured. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        primaryUseCase: formData.primaryUseCase || "Not specified",
        additionalInfo: formData.additionalInfo || "None",
        consentToContact: formData.consentToContact ? "Yes" : "No",
        consentToMarketing: formData.consentToMarketing ? "Yes" : "No",
        submittedAt: new Date().toLocaleString(),
      };

      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Update rate limiting and submission tracking
      const submissionTime = Date.now();
      setLastSubmissionTime(submissionTime);
      sessionStorage.setItem('contactFormLastSubmission', submissionTime.toString());
      
      const newCount = submissionCount + 1;
      setSubmissionCount(newCount);
      sessionStorage.setItem('contactFormSubmissionCount', newCount.toString());

      // Show success message
      setShowSuccess(true);
      
      // Scroll to top of form to show success message
      const formCard = document.getElementById('contact-form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Reset form (but keep honeypot empty)
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        primaryUseCase: "",
        additionalInfo: "",
        consentToContact: false,
        consentToMarketing: false,
        website: ""
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-20 bg-muted/10 min-h-[80vh] snap-start">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Reach Us Today
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Let's transform your business with AI Voice Agents. Tell us about your needs 
                and we'll create a customized solution for you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+919901678665</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <a 
                    href="https://wa.me/919901678665" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +919901678665
                  </a>
                  <p className="text-sm text-muted-foreground">Quick support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">helllo@helllo.ai</p>
                  <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Office</h3>
                  <p className="text-muted-foreground">Bengaluru, India</p>
                  <p className="text-sm text-muted-foreground">Available for meetings</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-6 bg-background rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3">Why Choose helllo.ai?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 5-minute setup process</li>
                <li>✓ 50+ business tool integrations</li>
                <li>✓ GDPR & DPDP compliant</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card id="contact-form-card" className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Custom Solution</CardTitle>
                <CardDescription>
                  Help us understand your business needs so we can provide the best AI voice solution for you.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Success Message Alert */}
                {showSuccess && (
                  <Alert className="mb-6 border-green-500/50 bg-green-50 dark:bg-green-950/20">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <AlertTitle className="text-green-800 dark:text-green-200 font-semibold">
                          Thank you for reaching out to HellloAI!
                        </AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300 mt-1">
                          We have received your request. Our team will reach out to you within 24 hours.
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
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users, visible to bots */}
                  <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                    <Label htmlFor="website">Website (do not fill)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>

                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your Company Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contactName">Contact Person Name *</Label>
                      <Input
                        id="contactName"
                        placeholder="Your Full Name"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Primary Use Case */}
                  <div>
                    <Label htmlFor="primaryUseCase" className="text-sm font-medium text-foreground">
                      Primary Use Case *
                    </Label>
                    <Select value={formData.primaryUseCase} onValueChange={(value) => setFormData(prev => ({ ...prev, primaryUseCase: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your primary use case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order-taking">Order taking & processing</SelectItem>
                        <SelectItem value="customer-support">Customer support & helpdesk</SelectItem>
                        <SelectItem value="sales-lead-qualification">Sales & Lead Qualification</SelectItem>
                        <SelectItem value="after-hours-support">After-hours Support</SelectItem>
                        <SelectItem value="other">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Information for "Others" */}
                  <div>
                    <Label htmlFor="additionalInfo" className="text-sm font-medium text-foreground">
                      Additional Information (for "Others" option)
                    </Label>
                    <Textarea 
                      id="additionalInfo"
                      placeholder="Please describe your specific use case or requirements..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consentToContact"
                        checked={formData.consentToContact}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consentToContact: checked as boolean }))}
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="consentToContact"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a> *
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By checking this box, you consent to us processing your personal data to contact you about our services.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="consentToMarketing"
                        checked={formData.consentToMarketing}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consentToMarketing: checked as boolean }))}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="consentToMarketing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I would like to receive marketing communications about helllo.ai products and services
                        </label>
                        <p className="text-xs text-muted-foreground">
                          You can unsubscribe at any time. This is optional and not required to submit your inquiry.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(isRateLimited || isSubmissionLimitReached) && (
                      <p className="text-sm text-muted-foreground text-center">
                        {isRateLimited && (
                          <span className="text-amber-600 dark:text-amber-400">
                            Please wait {countdown || remainingWaitTime} second{(countdown || remainingWaitTime) !== 1 ? 's' : ''} before submitting again.
                          </span>
                        )}
                        {isSubmissionLimitReached && (
                          <span className="text-red-600 dark:text-red-400">
                            Maximum submissions reached. Please refresh the page to submit again.
                          </span>
                        )}
                      </p>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg" 
                      disabled={isFormDisabled}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : isRateLimited ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5" />
                          Please wait ({(countdown || remainingWaitTime)}s)
                        </>
                      ) : isSubmissionLimitReached ? (
                        <>
                          <X className="mr-2 h-5 w-5" />
                          Submission limit reached
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;