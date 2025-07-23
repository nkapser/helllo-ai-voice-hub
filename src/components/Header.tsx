import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const navItems = [
    { name: "Home", href: "#home", description: "Go to homepage" },
    { name: "Features", href: "#features", description: "View platform features" },
    { name: "Pricing", href: "#pricing", description: "See pricing plans" },
    { name: "Contact", href: "#contact", description: "Contact information" },
  ];

  const handleAuthAction = () => {
    if (user) {
      // Redirect to console
      window.location.href = '/console';
    } else {
      // Redirect to sign in
      window.location.href = '/auth/signin';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="#home" className="flex items-center space-x-2" aria-label="Helllo.ai homepage">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg" aria-hidden="true">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">Helllo.ai</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                    aria-label={item.description}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4" role="group" aria-label="User actions">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAuthAction}
              disabled={loading}
              aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
            >
              {loading ? "Loading..." : user ? "Console" : "Sign In"}
            </Button>
            <Button variant="hero" size="sm" aria-label="Start your free trial">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-foreground hover:text-primary transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={item.description}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-2 pt-4" role="group" aria-label="User actions">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAuthAction}
                  disabled={loading}
                  aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
                >
                  {loading ? "Loading..." : user ? "Console" : "Sign In"}
                </Button>
                <Button variant="hero" size="sm" aria-label="Start your free trial">
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