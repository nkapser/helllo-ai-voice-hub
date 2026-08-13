/**
 * The Helllo brand brief, as plain structured text.
 *
 * This is the payload behind "Copy full brand brief for LLMs" on /brand.
 * Keep it in sync with the visual page — this file is what other people's
 * models will actually read, so it must never drift from the tokens in
 * src/index.css, src/pages/spark/spark.css and src/pages/revengg/revengg.css.
 */

export const BRAND_BRIEF_VERSION = "v1.1";

export const BRAND_BRIEF = `# HELLLO.AI — BRAND & DESIGN LANGUAGE BRIEF (${BRAND_BRIEF_VERSION})

You are designing or writing for helllo.ai. Follow this brief exactly.
Source of truth: https://www.helllo.ai/brand

## 1. WHO WE ARE

helllo.ai builds AI agents for customer conversations. Three surfaces share one
design language:

- RevEngg (route /) — AI Revenue Engineering platform for B2C brands. Agents that
  discover, enrich, qualify, engage and retain customers across Voice, WhatsApp,
  Email and Web. Currently PRIVATE ALPHA.
- Helllo Voice (route /helllo) — AI voice agents and agentic flows for customer
  experience. The shipping product.
- Spark (route /spark) — web agent for SMB website owners.

Positioning line: "Engineer every customer interaction into measurable revenue."
Credentials: SAP Startup Cohort 2026, Google Cloud for Startups, DPIIT Recognized.

## 2. HOW WE SOUND

Voice: precise, technical, calm. We describe mechanisms, not ambitions.

DO:
- Name the mechanism: "agents discover, enrich, qualify, engage, retain".
- Use concrete nouns: Voice, WhatsApp, Email, Web, CRM, lead, call, handoff.
- Use real numbers with units, or none at all.
- Write short declaratives. Lead with the verb.
- Say "measurable", "engineer", "route", "qualify", "sync", "hand off".

DON'T:
- No hype vocabulary: revolutionary, game-changing, unleash, supercharge, magic.
- No vague metrics: "10x", "massive lift", "dramatically better".
- No anthropomorphising the AI: it does not "think", "understand" or "care".
- No exclamation marks. No emoji in product copy.
- Never imply autonomy we don't ship — agents escalate to humans by design.

Lexicon (use the left, not the right):
- "AI agent" not "bot" / "assistant" / "virtual agent"
- "conversation" not "chat session"
- "human handoff" not "escalation to a real person"
- "qualify" not "score leads with AI magic"
- "B2C brands" not "companies" / "businesses"

## 3. THE MARKS

- RevEngg wordmark: "Revenue" in Satoshi Black near-black (#111111) + "Engineering"
  in Satoshi Black Italic, product accent. Satoshi is used for NOTHING else.
- Helllo Voice wordmark: "helllo" in Geist Semibold + ".ai" in the blue accent.
- Spark: SVG logomark + "Spark" in Geist Semibold, with "by Helllo.ai" as a
  10px uppercase +0.12em tracked sub-label.

Rules: clearspace on all sides equals the cap-height of the wordmark. Never
recolour, outline, rotate, add shadows to, or stretch a mark. Never place a mark
on a busy photo — marks sit on paper, on a flat accent, or on glass only.

## 4. COLOUR

Neutral foundation (shared by every page):
- Background        hsl(210 40% 98%)     near-white canvas
- Surface elevated  #FFFFFF
- Surface           #F1F5F9
- Border / hairline hsl(214 32% 84%)
- Muted text        hsl(215 16% 47%)
- Foreground        hsl(215 28% 17%)     cool slate, never pure black

Blue accent (Spark, Helllo Voice, and currently RevEngg):
- Glow   #93C5FD
- Spark  #60A5FA
- Ember  #3B82F6
- Deep   #1D4ED8   — required for small blue text on light (AA)
- CTA gradient: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)

Gothic green — RevEngg's legacy accent, held in reserve:
- #9FEA28 / ember #65A30D / deep #4D7C0F
- Small green text on white must use deep #4D7C0F, never #9FEA28.

Semantic: success #10B981 · warning hsl(38 92% 50%) · destructive hsl(0 72% 51%)

IMPLEMENTATION GOTCHA: in revengg.css the tokens are still NAMED --rev-green,
--rev-green-ember, --rev-green-deep but currently HOLD the blue values
(#60A5FA / #3B82F6 / #1D4ED8). Read the value, not the name.

Rule: one accent per page. Neutrals carry the layout; the accent marks meaning.

## 5. TYPOGRAPHY

- Display / headings: Geist 600, tracking -0.02em
- Body: Inter 400, line-height 1.6
- Labels, data, eyebrows: Geist Mono 400–500
- RevEngg wordmark only: Satoshi Black / Black Italic

Loaded once globally from index.html (Google Fonts, display=swap):
Geist 400;500;600;700 · Geist Mono 400;500 · Inter 300;400;500;600

Scale:
- Display     clamp(2.5rem, 9vw, 4rem), Geist 600, -0.02em, lh 0.95–1.05
- Section head clamp(1.75rem, 4vw, 2.75rem), Geist 600, two-tone (solid + muted)
- H3          1.25rem Geist 600
- Body        1rem Inter 400, lh 1.6, measure 60–75ch
- Eyebrow     11px Geist Mono 500, uppercase, +0.14em tracking
- Data        Geist Mono, tabular figures for money, deltas and timers

## 6. LAYOUT & SPACING

- Container: max-width 80rem (max-w-7xl) for product pages, 72rem (max-w-6xl)
  for documents. Horizontal padding 1.25rem mobile → 2rem desktop.
- Spacing rhythm: 4px base. Use 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
- Section rhythm: padding-bottom 3rem mobile, 3.5rem ≥640px.
- Sections are separated by a gradient glow divider — never heavy rules and
  never alternating background colour blocks.
- Left-aligned by default. Centre only hero CTAs and the footer.
- Breakpoints: 375 / 640 / 768 / 1024 / 1280.

## 7. SURFACES & ELEVATION

- Glass (.glass / .rev-glass): 72% white + 16px backdrop blur + hairline border.
  Navs, hero panels, spec sheets.
- Accent card (.magic-card): white, 1.25rem radius, 3px gradient accent bar,
  −3px lift on hover.
- Standard card (.rev-card): white on hairline, soft slate shadow. The default.
- Radius scale: 0.5rem inputs · 0.75rem buttons · 1.25rem cards · 9999px pills.
- Shadows are slate-tinted and soft, never black and never harder than
  0 12px 40px -16px rgba(15,23,42,0.12) at rest.

## 8. BUTTONS & CONTROLS

- Primary CTA: accent gradient + glow shadow + 1px lift on hover. ONE per screen.
- Secondary: white surface, hairline border, accent tint on hover.
- Ghost: transparent, accent text, underline-free.
- All: radius 0.75rem, min-height 44–48px, visible focus ring, 150–200ms
  transitions, disabled at 0.5 opacity with cursor change.

## 9. ICONOGRAPHY

- Library: lucide-react. One family, everywhere, no exceptions.
- Stroke 1.5–2px, consistent within a layer. Sizes 16 / 20 / 24px.
- Icons are muted slate by default; accent colour only when the icon IS the
  meaning (status dots, live indicators).
- Never emoji as a structural icon. Never raster icons.
- Icon-only buttons must carry an aria-label and a ≥44px hit area.

## 10. IMAGERY & ILLUSTRATION

- Every visual is custom SVG: dashboards, lifecycle diagrams, flow maps,
  product mockups.
- NEVER: stock photography, robot imagery, floating brains, glowing neural
  networks, dark cyberpunk grids, 3D blobs, AI-generated hero art.
- The product is the hero. If a section needs a picture, draw the product.

## 11. MOTION

- Entrance rise: 0.6s cubic-bezier(0.16, 1, 0.3, 1), translateY(16–24px) → 0,
  staggered 80–100ms per sibling.
- Hover lift: 0.18–0.22s ease. Buttons −1px, cards −3px.
- Signal flow: 4–7s linear infinite stroke-dashoffset on dashed SVG paths.
  This is the family's signature motion.
- Draw-in: 1.6s cubic-bezier(0.3, 0, 0.2, 1) for chart lines, once on first view.
- Count-up: 1.3–1.8s ease-out-cubic via requestAnimationFrame.
- Panel crossfade: 0.45s cubic-bezier(0.16, 1, 0.3, 1), fade + 18px slide.

Rules: transform and opacity only — never width/height/top/left. Motion must
narrate the product story; nothing animates for decoration. Everything is
disabled under prefers-reduced-motion.

## 12. BACKGROUND LAYERS

Atmosphere stays below 5% perceived prominence.
- Aurora: fixed radial gradients in the accent, ~45–50% layer opacity.
- Dot grid: 28px radial dots, slate at 25%, masked to the hero, 35% opacity.
- Signal field (RevEngg only): canvas bezier trajectories with drifting
  particles. Pauses when the tab is hidden.

## 13. ACCESSIBILITY

- Contrast: body text ≥4.5:1, large text and UI glyphs ≥3:1. Small accent text
  uses the deep variant, never the mid tone.
- Visible focus ring on every interactive element. Never remove outlines.
- Touch targets ≥44×44px with ≥8px separation.
- Sequential headings, no skipped levels. Landmarks on header/nav/main/footer.
- Colour is never the only carrier of meaning — pair with icon or text.
- Respect prefers-reduced-motion and system text scaling.
- Every meaningful image has alt text; decorative layers are aria-hidden.

## 14. BY MEDIUM

- Webpage: max-w-7xl, glow dividers between sections, one primary CTA,
  glass nav, aurora + dot grid behind the hero only.
- Deck (16:9): near-white slides, Geist 600 headline top-left, one idea per
  slide, mono eyebrow with section number, accent used once per slide.
- Document / report (A4): left-aligned, Inter body at 11pt, Geist headings,
  accent reserved for rules and defined terms.
- Poster (1080×1350): one Geist display line, one accent element, generous
  whitespace, wordmark bottom-left with full clearspace.
- Social / LinkedIn (1200×627): headline ≤9 words, near-white background,
  product SVG right, wordmark bottom-left. No stock photos, no emoji.
- Email: single column 600px, Inter throughout, one CTA button in the accent
  gradient, plain-text fallback that reads as prose.

## 15. TOKENS & GOVERNANCE

- src/index.css .............. global :root tokens → /helllo and app-wide
- src/pages/spark/spark.css .. .spark-page scope → /spark
- src/pages/revengg/revengg.css .rev-page scope → /
- index.html ................. global font loading

Rules: use semantic tokens, never raw hex in components (custom SVG
illustrations excepted). One accent per page. Add a token before adding a
one-off value. When a token's name and value disagree, fix the name in a
dedicated commit — never patch around it.

END OF BRIEF`;
