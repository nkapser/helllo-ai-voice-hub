import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    primaryUseCase: "",
    additionalInfo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.businessName || !formData.contactName || !formData.email) {
      toast({
        title: "Please fill in required fields",
        description: "Business name, contact name, and email are required.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    
    toast({
      title: "Thank you for your interest!",
      description: "We'll analyze your needs and get back to you within 24 hours with a customized solution.",
    });

    // Reset form
    setFormData({
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      primaryUseCase: "",
      additionalInfo: ""
    });
  };


  return (
    <section id="contact" className="py-20 bg-muted/30">
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
              <h4 className="font-semibold text-foreground mb-3">Why Choose Helllo.ai?</h4>
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
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Custom Solution</CardTitle>
                <CardDescription>
                  Help us understand your business needs so we can provide the best AI voice solution for you.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Privacy Statement */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy Commitment:</strong> We respect your privacy and will only use this information 
                      to contact you about Helllo.ai services. Your data is protected under GDPR and DPDP regulations.
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Submit
                  </Button>
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