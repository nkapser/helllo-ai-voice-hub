import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Users, Headphones, Shield, BookOpen, Building2, Settings, Lightbulb, FileText, Play, HelpCircle, Star, Calendar, Clock } from "lucide-react";
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
      title: "Core Features",
      items: [
        { name: "AI Voice Assistant", description: "Natural conversation with advanced AI", href: "#features", icon: Phone },
        { name: "Multi-language Support", description: "25+ languages supported", href: "#features", icon: Users },
        { name: "Call Recording", description: "Record and analyze conversations", href: "#features", icon: Headphones },
        { name: "Analytics Dashboard", description: "Detailed insights and reports", href: "#features", icon: Shield },
      ]
    },
    {
      title: "Advanced Features",
      items: [
        { name: "Custom Voice Personas", description: "Train AI with your brand voice", href: "#features", icon: Settings },
        { name: "Integration Hub", description: "Connect with 50+ tools", href: "#features", icon: Building2 },
        { name: "Smart Routing", description: "Route calls intelligently", href: "#features", icon: Lightbulb },
        { name: "Real-time Transcription", description: "Live conversation transcription", href: "#features", icon: FileText },
      ]
    }
  ];

  const industriesMenu = [
    {
      title: "Popular Industries",
      items: [
        { name: "Real Estate", description: "Capture leads and client calls", href: "#industries" },
        { name: "Law Firms", description: "Screen calls and qualify leads", href: "#industries" },
        { name: "Property Management", description: "Handle tenant calls 24/7", href: "#industries" },
        { name: "Healthcare", description: "Appointment booking and patient care", href: "#industries" },
      ]
    },
    {
      title: "All Industries",
      items: [
        { name: "Contractors", href: "#industries" },
        { name: "HVAC", href: "#industries" },
        { name: "Financial Services", href: "#industries" },
        { name: "Restaurants", href: "#industries" },
        { name: "Insurance", href: "#industries" },
        { name: "Salons", href: "#industries" },
        { name: "Towing", href: "#industries" },
        { name: "Veterinary", href: "#industries" },
      ]
    }
  ];

  const solutionsMenu = [
    {
      title: "Included with all plans",
      items: [
        { name: "AI Voice Assistant", description: "Natural conversation handling", href: "#solutions", icon: Phone },
        { name: "Call Routing", description: "Send calls to the right place", href: "#solutions", icon: Users },
        { name: "Appointment Scheduling", description: "Book appointments automatically", href: "#solutions", icon: Calendar },
        { name: "Message Taking", description: "Capture all the details", href: "#solutions", icon: FileText },
        { name: "After Hours Calls", description: "Pick up calls 24/7", href: "#solutions", icon: Clock },
      ]
    },
    {
      title: "Additional Solutions",
      items: [
        { name: "Lead Qualification", href: "#solutions" },
        { name: "Order Taking", href: "#solutions" },
        { name: "Overflow Reception", href: "#solutions" },
        { name: "Voicemail Assistant", href: "#solutions" },
        { name: "Call Recording", href: "#solutions" },
        { name: "Call Screening", href: "#solutions" },
      ]
    }
  ];

  const resourcesMenu = [
    {
      title: "Customer Stories",
      items: [
        { name: "Success Stories", description: "See how businesses use Helllo.ai", href: "#resources", icon: Star },
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
            <a href="/" className="flex items-center space-x-2" aria-label="Helllo.ai homepage">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src="/small-logo.png" 
                  alt="Helllo.ai logo" 
                  className="w-8 h-8 rounded-lg"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xl font-bold text-foreground">Helllo.ai</span>
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
                    <div className="grid w-[800px] grid-cols-2 gap-6 p-6">
                      {featuresMenu.map((section, sectionIndex) => (
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

                {/* Industries Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-6 p-6">
                      {industriesMenu.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-3">
                          <h3 className="font-semibold text-sm text-foreground">{section.title}</h3>
                          <div className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <NavigationMenuLink asChild key={itemIndex}>
                                <a
                                  href={item.href}
                                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className="flex items-start">
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
                              <NavigationMenuLink asChild key={itemIndex}>
                                <a
                                  href={item.href}
                                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                  <div className={`flex items-start ${item.icon ? 'gap-3' : ''}`}>
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
                <div className="grid grid-cols-2 gap-1 px-4">
                  {featuresMenu.flatMap(section => section.items).slice(0, 4).map((item, index) => (
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

              {/* Mobile Industries - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Industries</h3>
                <div className="grid grid-cols-2 gap-1 px-4">
                  {industriesMenu.flatMap(section => section.items).slice(0, 4).map((item, index) => (
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

              {/* Mobile Solutions - Compact */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-foreground px-4">Solutions</h3>
                <div className="grid grid-cols-2 gap-1 px-4">
                  {solutionsMenu.flatMap(section => section.items).slice(0, 4).map((item, index) => (
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