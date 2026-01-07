import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  FileText,
  MessageSquare,
  TrendingUp,
  MessageCircle,
  Handshake,
  Megaphone,
  Search,
  MapPin,
  RefreshCw,
  Database,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Workflow,
  Settings
} from "lucide-react";
import gsap from "gsap";

interface Feature {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
}

const Features = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedRef = useRef<boolean>(false);
  const previousCategoryRef = useRef<string>("all");

  const features: Feature[] = [
    // Call Management
    {
      id: "call-recording",
      title: "Call Recording",
      shortDescription: "Record every conversation for quality assurance and compliance.",
      fullDescription: "Automatically record all inbound and outbound calls with crystal-clear audio quality. Access recordings instantly from your dashboard, search by keywords, and ensure compliance with industry regulations. Perfect for training, dispute resolution, and quality monitoring.",
      icon: Phone,
      category: "Call Management",
      color: "text-primary"
    },
    {
      id: "call-transcriptions",
      title: "Call Transcriptions",
      shortDescription: "Real-time transcription of all conversations with high accuracy.",
      fullDescription: "Get instant, accurate transcriptions of every call in multiple languages. Our advanced speech-to-text technology captures every word with industry-leading accuracy. Transcripts are searchable, exportable, and perfect for creating knowledge bases and training materials.",
      icon: FileText,
      category: "Call Management",
      color: "text-primary"
    },
    {
      id: "call-summary",
      title: "Call Summary",
      shortDescription: "AI-powered summaries of key points and action items from each call.",
      fullDescription: "Automatically generate comprehensive summaries highlighting key discussion points, customer needs, action items, and outcomes. Save hours of manual note-taking and ensure nothing important is missed. Summaries are formatted for easy sharing with your team.",
      icon: MessageSquare,
      category: "Call Management",
      color: "text-primary"
    },
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis",
      shortDescription: "Understand customer emotions and satisfaction in real-time.",
      fullDescription: "Track customer sentiment throughout each conversation with advanced AI analysis. Identify frustrated customers before they escalate, measure satisfaction scores, and get alerts for negative sentiment. Use insights to improve agent training and customer experience.",
      icon: TrendingUp,
      category: "Call Management",
      color: "text-primary"
    },
    // Integrations
    {
      id: "whatsapp-integration",
      title: "WhatsApp Integration",
      shortDescription: "Seamlessly connect with customers via WhatsApp messaging.",
      fullDescription: "Extend your AI voice agent capabilities to WhatsApp. Customers can start conversations on WhatsApp, and your AI agent handles inquiries, scheduling, and support 24/7. Unified dashboard for all communication channels with consistent conversation history.",
      icon: MessageCircle,
      category: "Integrations",
      color: "text-secondary"
    },
    {
      id: "webchat-embed",
      title: "WebChat Embed Script",
      shortDescription: "Add AI chat agent directly to your website with one line of code.",
      fullDescription: "Embed a fully functional AI chat agent on your website in minutes. Customize the appearance to match your brand, set business hours, and configure automated responses. The chat agent uses the same AI models as your voice agents for consistent experience across channels.",
      icon: MessageCircle,
      category: "Integrations",
      color: "text-secondary"
    },
    {
      id: "lead-management",
      title: "Lead Management",
      shortDescription: "Sync leads with Salesforce, HubSpot, and 50+ CRM platforms.",
      fullDescription: "Automatically capture, qualify, and sync leads to your CRM system. Works seamlessly with Salesforce, HubSpot, Pipedrive, Zoho, and 50+ other platforms. Custom field mapping, duplicate detection, and real-time sync ensure your sales team always has the latest information.",
      icon: Database,
      category: "Integrations",
      color: "text-secondary"
    },
    {
      id: "zapier-integration",
      title: "Zapier Integration",
      shortDescription: "Connect with 5,000+ apps and automate workflows without coding.",
      fullDescription: "Integrate helllo.ai with thousands of apps through Zapier. Automate workflows between your AI voice agents and tools like Slack, Google Sheets, Airtable, Trello, and more. Create custom Zaps to trigger actions based on call outcomes, lead captures, or sentiment analysis. No coding required - set up powerful automations in minutes.",
      icon: Zap,
      category: "Integrations",
      color: "text-secondary"
    },
    {
      id: "hubspot-integration",
      title: "HubSpot Integration",
      shortDescription: "Native integration with HubSpot CRM, Marketing, and Sales Hubs.",
      fullDescription: "Seamlessly sync all customer interactions with HubSpot. Automatically create contacts, update deal stages, log activities, and trigger marketing workflows based on call data. Two-way sync ensures your HubSpot data is always up-to-date, and your AI agents have access to complete customer history for personalized conversations.",
      icon: Workflow,
      category: "Integrations",
      color: "text-secondary"
    },
    {
      id: "custom-crm-integration",
      title: "Custom CRM Integration",
      shortDescription: "Build custom integrations with any CRM or business tool via API.",
      fullDescription: "Connect helllo.ai with your existing business tools through our robust REST API. Whether you use a custom CRM, proprietary systems, or niche tools, our flexible API allows you to sync data, trigger actions, and build custom workflows. Comprehensive documentation and developer support make integration straightforward.",
      icon: Settings,
      category: "Integrations",
      color: "text-secondary"
    },
    // Communication
    {
      id: "call-summarization-messages",
      title: "Call Summarization Messages",
      shortDescription: "Automated summaries sent to both owner and customer after each call.",
      fullDescription: "After every call, automatically send beautifully formatted summaries to both the business owner and the customer. Owners get detailed insights including key points, sentiment, and action items. Customers receive friendly summaries confirming what was discussed and next steps.",
      icon: MessageSquare,
      category: "Communication",
      color: "text-primary"
    },
    {
      id: "human-handoff",
      title: "Human Handoff",
      shortDescription: "Seamlessly transfer complex conversations to human agents when needed.",
      fullDescription: "When conversations require human expertise, smoothly transfer to your team with full context. The AI agent provides a complete summary, customer history, and suggested responses to the human agent. Customers experience zero friction during the handoff process.",
      icon: Handshake,
      category: "Communication",
      color: "text-primary"
    },
    // Campaign & Outreach
    {
      id: "campaign-setup",
      title: "Campaign Setup",
      shortDescription: "Create and manage outbound calling campaigns with advanced targeting.",
      fullDescription: "Design sophisticated outbound calling campaigns with custom scripts, scheduling, and targeting rules. Set up drip campaigns, follow-up sequences, and A/B test different approaches. Track campaign performance with detailed analytics and optimize for better results.",
      icon: Megaphone,
      category: "Campaign & Outreach",
      color: "text-secondary"
    },
    // Intelligence
    {
      id: "google-search",
      title: "Google Search",
      shortDescription: "AI agents can search the web for real-time information during calls.",
      fullDescription: "Your AI agents can perform real-time Google searches during conversations to answer questions about current events, product availability, pricing, or any information not in your knowledge base. Results are synthesized and presented naturally in the conversation.",
      icon: Search,
      category: "Intelligence",
      color: "text-primary"
    },
    {
      id: "nearby-location",
      title: "Nearby Location",
      shortDescription: "Find and recommend nearby locations, services, or businesses.",
      fullDescription: "When customers ask about locations, your AI agent can search for nearby businesses, services, or points of interest. Perfect for businesses with multiple locations, service providers, or when customers need recommendations based on their location.",
      icon: MapPin,
      category: "Intelligence",
      color: "text-primary"
    },
    {
      id: "conversation-continuity",
      title: "Conversation Continuity Context",
      shortDescription: "Maintain context across multiple conversations and channels.",
      fullDescription: "Your AI agents remember previous conversations with each customer across all channels (phone, WhatsApp, web chat). This creates a seamless experience where customers don't need to repeat information, and agents can provide personalized service based on complete interaction history.",
      icon: RefreshCw,
      category: "Intelligence",
      color: "text-primary"
    },
    // Automation
    {
      id: "automated-followups",
      title: "Automated Lead Follow-ups",
      shortDescription: "Intelligent follow-up sequences that nurture leads automatically.",
      fullDescription: "Set up intelligent follow-up campaigns that automatically reach out to leads at optimal times. Use AI to determine the best follow-up strategy based on lead behavior, engagement level, and conversation history. Increase conversion rates with timely, personalized outreach.",
      icon: Zap,
      category: "Automation",
      color: "text-secondary"
    }
  ];

  const categories = [
    { id: "all", label: "All Features", count: features.length },
    { id: "Call Management", label: "Call Management", count: features.filter(f => f.category === "Call Management").length },
    { id: "Integrations", label: "Integrations", count: features.filter(f => f.category === "Integrations").length },
    { id: "Communication", label: "Communication", count: features.filter(f => f.category === "Communication").length },
    { id: "Campaign & Outreach", label: "Campaign & Outreach", count: features.filter(f => f.category === "Campaign & Outreach").length },
    { id: "Intelligence", label: "Intelligence", count: features.filter(f => f.category === "Intelligence").length },
    { id: "Automation", label: "Automation", count: features.filter(f => f.category === "Automation").length }
  ];

  const filteredFeatures = selectedCategory === "all" 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  // GSAP animations on mount and filter change only
  useEffect(() => {
    // Only animate if category changed, not on card expansion
    const categoryChanged = previousCategoryRef.current !== selectedCategory;
    
    if (!categoryChanged && hasAnimatedRef.current) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean);
    
    if (cards.length === 0) return;

    // Kill any existing animations on these cards
    cards.forEach(card => {
      if (card) gsap.killTweensOf(card);
    });

    // Reset cards to initial state before animating
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

    // Animate cards with stagger effect
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.2
    });

    hasAnimatedRef.current = true;
    previousCategoryRef.current = selectedCategory;
  }, [selectedCategory, filteredFeatures]);

  // Animate only the expanded card when it changes
  useEffect(() => {
    const expandedCardIndex = filteredFeatures.findIndex(f => f.id === expandedFeature);
    const expandedCard = expandedCardIndex >= 0 ? cardsRef.current[expandedCardIndex] : null;

    if (expandedFeature && expandedCard) {
      // Kill any existing animations on this card
      gsap.killTweensOf(expandedCard);
      
      // Smoothly animate the expanded card
      gsap.to(expandedCard, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (!expandedFeature && expandedCard) {
      // Reset scale when collapsing
      gsap.killTweensOf(expandedCard);
      gsap.to(expandedCard, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [expandedFeature, filteredFeatures]);


  // Scroll functions
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handleCardClick = (featureId: string) => {
    if (expandedFeature === featureId) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(featureId);
    }
  };

  return (
    <section id="features" className="pt-20 pb-12 bg-muted/10 min-h-[80vh] snap-start" role="main">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to automate customer communication, manage leads, and scale your business operations.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id);
                setExpandedFeature(null);
              }}
              className="rounded-full"
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>

        {/* Scroll Container with Navigation - 2 rows layout */}
        <div className="relative">
          {/* Left Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Right Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Horizontal Scroll Container with 2 rows */}
          <div
            ref={containerRef}
            className="overflow-x-auto scrollbar-hide pb-6 px-12 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <div className="inline-flex flex-col gap-6" style={{ width: "max-content" }}>
              {/* Split features into 2 rows: 3 full + 1 partial per row */}
              {[0, 1].map((rowIndex) => {
                // Row 1: features 0, 1, 2 (full) + 3 (partial)
                // Row 2: features 4, 5, 6 (full) + 7 (partial)
                // Then continue: Row 1: 8, 9, 10 (full) + 11 (partial), etc.
                const rowFeatures: typeof filteredFeatures = [];
                for (let i = rowIndex * 4; i < filteredFeatures.length; i += 8) {
                  // Take 4 features at a time (3 full + 1 partial)
                  for (let j = 0; j < 4 && i + j < filteredFeatures.length; j++) {
                    rowFeatures.push(filteredFeatures[i + j]);
                  }
                }
                
                return (
                  <div key={rowIndex} className="flex gap-6">
                    {rowFeatures.map((feature, localIndex) => {
                      const globalIndex = filteredFeatures.findIndex(f => f.id === feature.id);
                      const IconComponent = feature.icon;
                      const isExpanded = expandedFeature === feature.id;

                      return (
                        <div
                          key={feature.id}
                          ref={(el) => {
                            cardsRef.current[globalIndex] = el;
                          }}
                          className="flex-shrink-0 w-80"
                        >
                          <Card
                            className={`relative h-full cursor-pointer transition-all duration-300 border border-border bg-card hover:shadow-strong ${
                              isExpanded ? "shadow-strong z-20" : "hover:-translate-y-2"
                            }`}
                            onClick={() => handleCardClick(feature.id)}
                          >
                            {/* Image Placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
                                  <IconComponent className={`relative h-16 w-16 ${feature.color}`} />
                                </div>
                              </div>
                              {/* Category Badge */}
                              <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground border border-border">
                                {feature.category}
                              </div>
                            </div>

                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-xl font-semibold text-foreground pr-8">
                                  {feature.title}
                                </CardTitle>
                                {isExpanded && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 absolute top-4 right-4"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedFeature(null);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                              <CardDescription className="text-muted-foreground leading-relaxed">
                                {isExpanded ? feature.fullDescription : feature.shortDescription}
                              </CardDescription>
                              {!isExpanded && (
                                <div className="mt-4 text-sm text-primary font-medium">
                                  Click to learn more →
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Scroll horizontally to explore all features
          </p>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Features;

