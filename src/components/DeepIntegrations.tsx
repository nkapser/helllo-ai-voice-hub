const INTEGRATIONS_FLOW_IMAGE =
  "https://ik.imagekit.io/ise7sbyg9/tr:q-90/helllo-integrations-flow.png";

const DeepIntegrations = () => {
  return (
    <section
      id="deep-integrations"
      className="relative pt-16 pb-16 md:pb-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden snap-start"
      aria-labelledby="deep-integrations-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <header className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <h2
            id="deep-integrations-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Deep{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium md:text-2xl md:font-semibold tracking-tight">
              Every conversation, unified across your stack.
            </p>
            <p>
              Powered by helllo.ai — the action layer that books appointments,
              looks up orders, updates CRM records, and files tickets in real
              time.
            </p>
          </div>
        </header>

        <figure className="relative mx-auto max-w-6xl">
          <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden ring-1 ring-primary/[0.06]">
            <img
              src={INTEGRATIONS_FLOW_IMAGE}
              alt="Diagram showing conversations from telephone, web chat, WhatsApp and more flowing through helllo.ai into Salesforce, Zendesk, HubSpot, Shopify, Google Workspace, and other tools"
              className="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default DeepIntegrations;
