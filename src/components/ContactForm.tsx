import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    customerVolume: "",
    useCases: [] as string[],
    currentTools: [] as string[],
    biggestChallenge: "",
    timeline: "",
    budget: "",
    additionalRequirements: ""
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
      companySize: "",
      industry: "",
      customerVolume: "",
      useCases: [],
      currentTools: [],
      biggestChallenge: "",
      timeline: "",
      budget: "",
      additionalRequirements: ""
    });
  };

  const handleUseCaseChange = (useCase: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      useCases: checked 
        ? [...prev.useCases, useCase]
        : prev.useCases.filter(item => item !== useCase)
    }));
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      currentTools: checked 
        ? [...prev.currentTools, tool]
        : prev.currentTools.filter(item => item !== tool)
    }));
  };

  const useCaseOptions = [
    "Customer Support & Help Desk",
    "Sales & Lead Qualification", 
    "Appointment Scheduling",
    "Order Taking & Processing",
    "Survey & Feedback Collection",
    "Multilingual Customer Service",
    "After-hours Support",
    "Internal Communications"
  ];

  const toolOptions = [
    "CRM (Salesforce, HubSpot, etc.)",
    "Help Desk Software",
    "Appointment Scheduling Tools",
    "E-commerce Platform", 
    "Phone Systems"
  ];

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
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">hello@helllo.ai</p>
                  <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Office</h3>
                  <p className="text-muted-foreground">San Francisco, CA</p>
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

                  {/* Company Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="financial">Financial Services</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="professional">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Customer Volume */}
                  <div>
                    <Label htmlFor="customerVolume">Current Customer Service Volume</Label>
                    <Select value={formData.customerVolume} onValueChange={(value) => setFormData(prev => ({ ...prev, customerVolume: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select monthly call volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<100">&lt;100 calls/month</SelectItem>
                        <SelectItem value="100-500">100-500 calls/month</SelectItem>
                        <SelectItem value="500-1000">500-1000 calls/month</SelectItem>
                        <SelectItem value="1000-5000">1000-5000 calls/month</SelectItem>
                        <SelectItem value="5000+">5000+ calls/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <Label className="text-base font-medium">Primary Use Cases (select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {useCaseOptions.map((useCase) => (
                        <div key={useCase} className="flex items-center space-x-2">
                          <Checkbox
                            id={useCase}
                            checked={formData.useCases.includes(useCase)}
                            onCheckedChange={(checked) => handleUseCaseChange(useCase, !!checked)}
                          />
                          <Label htmlFor={useCase} className="text-sm">{useCase}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Tools */}
                  <div>
                    <Label className="text-base font-medium">Current Tools/Systems (select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      {toolOptions.map((tool) => (
                        <div key={tool} className="flex items-center space-x-2">
                          <Checkbox
                            id={tool}
                            checked={formData.currentTools.includes(tool)}
                            onCheckedChange={(checked) => handleToolChange(tool, !!checked)}
                          />
                          <Label htmlFor={tool} className="text-sm">{tool}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenge & Timeline */}
                  <div>
                    <Label htmlFor="biggestChallenge">What's your biggest challenge with current customer communication?</Label>
                    <Textarea
                      id="biggestChallenge"
                      placeholder="Tell us about your current pain points..."
                      value={formData.biggestChallenge}
                      onChange={(e) => setFormData(prev => ({ ...prev, biggestChallenge: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeline">Expected Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="exploring">Just exploring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<500">&lt;$500/month</SelectItem>
                          <SelectItem value="500-1000">$500-$1,000/month</SelectItem>
                          <SelectItem value="1000-2500">$1,000-$2,500/month</SelectItem>
                          <SelectItem value="2500-5000">$2,500-$5,000/month</SelectItem>
                          <SelectItem value="5000+">$5,000+/month</SelectItem>
                          <SelectItem value="enterprise">Enterprise/Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <Label htmlFor="additionalRequirements">Additional Requirements or Questions</Label>
                    <Textarea
                      id="additionalRequirements"
                      placeholder="Tell us about any specific needs, integration requirements, or questions you have..."
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Privacy Statement */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy Commitment:</strong> We respect your privacy and will only use this information 
                      to contact you about Helllo.ai services. Your data is protected under GDPR and DPDP regulations.
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" variant="hero" size="lg" className="flex-1 group">
                      Get Custom Solution
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button type="button" variant="outline" size="lg" className="flex-1">
                      Start Free Trial
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