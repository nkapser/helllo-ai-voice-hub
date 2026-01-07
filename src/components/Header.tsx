import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Users, Headphones, Shield, BookOpen, Building2, Settings, Lightbulb, FileText, Play, HelpCircle, Star, Calendar, Clock, Home, Heart, Briefcase, Landmark, MessageSquare, CheckCircle2, GitBranch, ClipboardList, RotateCcw, DollarSign, TrendingUp, Handshake, Search, RefreshCw, Database, Workflow, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const handleAuthAction = () => {
    // Detect environment based on hostname - more robust detection
    const hostname = window.location.hostname;
    const isStaging = hostname === 'staging.helllo.ai' || hostname.includes('staging');
    
    // Debug logging
    console.log('Current hostname:', hostname);
    console.log('Is staging:', isStaging);
    console.log('User state:', user);
    console.log('Full URL:', window.location.href);
    
    // Force redirect to external dashboard URLs
    if (isStaging) {
      console.log('Redirecting to: https://dash-staging.helllo.ai/console');
      window.location.replace('https://dash-staging.helllo.ai/console');
    } else {
      console.log('Redirecting to: https://dash.helllo.ai/console');
      window.location.replace('https://dash.helllo.ai/console');
    }
  };

  const featuresMenu = [
    {
      title: "Advanced Features",
      items: [
        { name: "Call Summary", description: "AI-powered summaries of key points and action items from each call.", href: "#features", icon: MessageSquare },
        { name: "Sentiment Analysis", description: "Understand customer emotions and satisfaction in real-time.", href: "#features", icon: TrendingUp },
        { name: "Human Handoff", description: "Seamlessly transfer complex conversations to human agents when needed.", href: "#features", icon: Handshake },
        { name: "Conversation Continuity", description: "Maintain context across multiple conversations and channels.", href: "#features", icon: RefreshCw },
        { name: "Google Search", description: "AI agents can search the web for real-time information during calls.", href: "#features", icon: Search },
        { name: "Call Transcriptions", description: "Real-time transcription of all conversations with high accuracy.", href: "#features", icon: FileText },
        { name: "HubSpot Integration", description: "Native integration with HubSpot CRM, Marketing, and Sales Hubs.", href: "#features", icon: Workflow },
        { name: "Custom CRM Integration", description: "Build custom integrations with any CRM or business tool via API.", href: "#features", icon: Database },
      ]
    }
  ];

  const industriesMenu = [
    {
      title: "Industries",
      items: [
        { 
          name: "Real Estate", 
          description: "Capture leads and schedule property viewings 24/7. Handle inquiries instantly and never miss a potential client.",
          icon: Home 
        },
        { 
          name: "Health Care", 
          description: "Streamline appointment scheduling and patient communication. Provide round-the-clock support for healthcare inquiries.",
          icon: Heart 
        },
        { 
          name: "Professional Services", 
          description: "Qualify leads and manage client inquiries efficiently. Enhance customer service with intelligent call handling.",
          icon: Briefcase 
        },
        { 
          name: "BFSI", 
          description: "Secure customer support for banking and financial services. Handle account inquiries with compliance and trust.",
          icon: Landmark 
        },
      ]
    }
  ];

  const solutionsMenu = [
    {
      title: "Core Solutions",
      items: [
        { 
          name: "Appointment Scheduling", 
          description: "Automatically book property viewings, patient appointments, and consultations. Never miss a booking opportunity.",
          icon: Calendar 
        },
        { 
          name: "Lead Qualification", 
          description: "Identify and prioritize high-value leads in real-time. Capture key information and route qualified leads instantly.",
          icon: CheckCircle2 
        },
        { 
          name: "24/7 After Hours Support", 
          description: "Handle customer inquiries around the clock. Provide support even when your team is unavailable.",
          icon: Clock 
        },
        { 
          name: "Customer Intake & Onboarding", 
          description: "Streamline patient registration, client onboarding, and inquiry collection. Capture essential information automatically.",
          icon: ClipboardList 
        },
      ]
    },
    {
      title: "Advanced Solutions",
      items: [
        { 
          name: "Smart Routing", 
          description: "Intelligently route calls to the right department, specialist, or agent based on inquiry type and urgency. Ensure customers reach the best resource immediately.",
          icon: GitBranch 
        },
        { 
          name: "Overflow Reception", 
          description: "Handle peak call volumes seamlessly. Ensure every customer gets attention even during busy periods.",
          icon: Users 
        },
        { 
          name: "Follow-up Automation", 
          description: "Automatically follow up with leads, patients, and clients. Nurture relationships with intelligent follow-up sequences.",
          icon: RotateCcw 
        },
        { 
          name: "Quote & Inquiry Handling", 
          description: "Process quote requests, service inquiries, and product information requests. Provide instant responses with accurate details.",
          icon: DollarSign 
        },
      ]
    }
  ];

  const resourcesMenu = [
    {
      title: "Customer Stories",
      items: [
        { name: "Success Stories", description: "See how businesses use helllo.ai", href: "#resources", icon: Star },
        { name: "Case Studies", description: "Detailed implementation examples", href: "#resources", icon: BookOpen },
        { name: "Testimonials", description: "What our customers say", href: "#resources", icon: Users },
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Blog", description: "Tips and tricks for businesses", href: "#blog", icon: FileText },
        { name: "Help Center", description: "Answers to common questions", href: "#help", icon: HelpCircle },
        { name: "Video Tutorials", description: "Step-by-step guides", href: "#tutorials", icon: Play },
        { name: "API Documentation", description: "Developer resources", href: "#api", icon: Settings },
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2" aria-label="helllo.ai homepage">
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
              <span className="text-xl font-bold text-foreground">helllo.ai</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Features Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      {featuresMenu.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-4">
                          <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {section.items.map((item, itemIndex) => (
                              <NavigationMenuLink asChild key={itemIndex}>
                                <a
                                  href={item.href}
                                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    {item.icon && <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />}
                                    <div className="flex-1">
                                      <div className="font-medium text-sm text-foreground">{item.name}</div>
                                      {item.description && (
                                        <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</div>
                                      )}
                                    </div>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-border">
                            <NavigationMenuLink asChild>
                              <a
                                href="#features"
                                className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2"
                              >
                                View all features
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Industries Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[700px] p-6">
                      {industriesMenu.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-4">
                          <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="block p-3 rounded-lg hover:bg-accent transition-colors cursor-default"
                              >
                                <div className="flex items-start gap-3">
                                  {item.icon && <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />}
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-foreground">{item.name}</div>
                                    {item.description && (
                                      <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[700px] grid-cols-2 gap-6 p-6">
                      {solutionsMenu.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-3">
                          <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
                          <div className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="block p-3 rounded-lg hover:bg-accent transition-colors cursor-default"
                              >
                                <div className="flex items-start gap-3">
                                  {item.icon && <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />}
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-foreground">{item.name}</div>
                                    {item.description && (
                                      <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-6 p-6">
                      {resourcesMenu.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-3">
                          <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
                          <div className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <NavigationMenuLink asChild key={itemIndex}>
                                <a
                                  href={item.href}
                                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    {item.icon && <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{item.name}</div>
                                      {item.description && (
                                        <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                                      )}
                                    </div>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple nav items */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
                      Pricing
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4" role="group" aria-label="User actions">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAuthAction}
              disabled={loading}
              aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
            >
              {loading ? "Loading..." : user ? "Console" : "Sign In"}
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              aria-label="Start your free trial"
              onClick={() => navigate("/console")}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden py-4 border-t border-border max-h-[80vh] overflow-y-auto" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-3">
              {/* Mobile Features - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Features</h3>
                <div className="space-y-2 px-4">
                  {featuresMenu.flatMap(section => section.items).map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon && <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="font-medium text-sm text-foreground">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</div>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                  <a
                    href="#features"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 px-3 rounded-lg border border-border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View all features
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Mobile Industries - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Industries</h3>
                <div className="space-y-2 px-4">
                  {industriesMenu.flatMap(section => section.items).map((item, index) => (
                    <div
                      key={index}
                      className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon && <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="font-medium text-sm text-foreground">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Solutions - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Solutions</h3>
                <div className="space-y-2 px-4">
                  {solutionsMenu.flatMap(section => section.items).map((item, index) => (
                    <div
                      key={index}
                      className="block py-2 px-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon && <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="font-medium text-sm text-foreground">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Resources - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Resources</h3>
                <div className="grid grid-cols-2 gap-1 px-4">
                  {resourcesMenu.flatMap(section => section.items).slice(0, 4).map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors rounded px-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Simple Nav */}
              <div className="space-y-1">
                <a
                  href="#pricing"
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
              </div>

              {/* User Actions - Always visible at bottom */}
              <div className="flex flex-col space-y-2 pt-2 px-4 border-t border-border/50" role="group" aria-label="User actions">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAuthAction}
                  disabled={loading}
                  aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
                >
                  {loading ? "Loading..." : user ? "Console" : "Sign In"}
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  aria-label="Start your free trial"
                  onClick={() => navigate("/console")}
                >
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;