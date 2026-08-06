/* ════════════════════════════════════════════════════════════════
   Helllo Design Language System — Figma Plugin Builder
   Runs once inside Figma to generate a complete .fig file with:
   - Color styles (paint styles) for every token
   - Text styles for the full type scale
   - Component samples (buttons, badges, chips, cards)
   - Swatch grids, type rows, motion specs, usage docs
   - Placeholders for wordmark/logo SVG assets
═══════════════════════════════════════════════════════════════ */

/* ── Color tokens (hex) ────────────────────────────────────────── */
const COLORS = {
  // Neutral foundation
  background:       "#F8FAFC",  // hsl(210 40% 98%)
  surfaceElevated:  "#FFFFFF",
  surface:          "#F1F5F9",
  border:           "#CBD5E1",  // hsl(214 32% 84%)
  mutedText:        "#64748B",  // hsl(215 16% 47%)
  foreground:       "#1E293B",  // hsl(215 28% 17%)
  subtleText:       "#94A3B8",

  // Blue — Spark & Helllo Voice
  blueGlow:         "#93C5FD",
  blueSpark:        "#60A5FA",
  blueEmber:        "#3B82F6",
  blueTextOnWhite:  "#1D4ED8",  // hsl(217 84% 46%)

  // Green — RevEngg legacy
  gothicGreen:      "#9FEA28",
  greenEmber:       "#65A30D",
  greenDeep:        "#4D7C0F",

  // Semantic
  success:          "#10B981",
  warning:          "#F59E0B",  // hsl(38 92% 50%)
  destructive:      "#DC2626",  // hsl(0 72% 51%)

  // Effects
  glassWhite:       "rgba(255,255,255,0.72)",
  auroraBlue:       "rgba(96,165,250,0.45)",
};

/* ── Font names with fallbacks ─────────────────────────────────── */
// Figma will try these in order; falls back to Inter if custom fonts
// aren't uploaded yet. After uploading Geist/Geist Mono/Satoshi,
// re-run the plugin to get the correct fonts.
const FONTS = {
  display: { family: "Geist", style: "Semibold" },
  displayBold: { family: "Geist", style: "Bold" },
  displayItalic: { family: "Geist", style: "Semibold Italic" },
  body: { family: "Inter", style: "Regular" },
  bodyMedium: { family: "Inter", style: "Medium" },
  mono: { family: "Geist Mono", style: "Regular" },
  monoMedium: { family: "Geist Mono", style: "Medium" },
  satoshi: { family: "Satoshi", style: "Bold" },
  satoshiItalic: { family: "Satoshi", style: "Bold Italic" },
  // Fallbacks
  fallbackDisplay: { family: "Inter", style: "Bold" },
  fallbackBody: { family: "Inter", style: "Regular" },
  fallbackMono: { family: "Roboto Mono", style: "Regular" },
};

/* ── Layout constants ──────────────────────────────────────────── */
const PAGE_WIDTH = 1200;
const PAGE_PADDING = 48;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_PADDING * 2;
const SECTION_GAP = 80;
const CARD_RADIUS = 20;     // 1.25rem
const BUTTON_RADIUS = 12;   // 0.75rem
const INPUT_RADIUS = 8;     // 0.5rem
const PILL_RADIUS = 999;

/* ════════════════════════════════════════════════════════════════
   Helper functions
═══════════════════════════════════════════════════════════════ */

let _loadedFonts = new Set();

async function loadFont(fontName) {
  const key = `${fontName.family}::${fontName.style}`;
  if (_loadedFonts.has(key)) return fontName;
  try {
    await figma.loadFontAsync(fontName);
    _loadedFonts.add(key);
    return fontName;
  } catch (e) {
    // Try fallback
    if (fontName.family === "Geist") return loadFont(FONTS.fallbackDisplay);
    if (fontName.family === "Geist Mono") return loadFont(FONTS.fallbackMono);
    if (fontName.family === "Satoshi") return loadFont(FONTS.fallbackDisplay);
    if (fontName.family === "Inter") return loadFont({ family: "Roboto", style: "Regular" });
    return loadFont({ family: "Roboto", style: "Regular" });
  }
}

async function loadAllFonts() {
  const all = [
    FONTS.display, FONTS.displayBold, FONTS.displayItalic,
    FONTS.body, FONTS.bodyMedium,
    FONTS.mono, FONTS.monoMedium,
    FONTS.satoshi, FONTS.satoshiItalic,
    FONTS.fallbackDisplay, FONTS.fallbackBody, FONTS.fallbackMono,
  ];
  for (const f of all) {
    await loadFont(f);
  }
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return { r, g, b };
}

function hexToFigmaPaint(hex) {
  const { r, g, b } = hexToRgb(hex);
  return { type: "SOLID", color: { r, g, b } };
}

function rgbaToFigmaPaint(rgbaStr) {
  // Parse "rgba(r,g,b,a)"
  const m = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return hexToFigmaPaint("#FFFFFF");
  const r = parseInt(m[1]) / 255;
  const g = parseInt(m[2]) / 255;
  const b = parseInt(m[3]) / 255;
  const a = m[4] ? parseFloat(m[4]) : 1;
  return { type: "SOLID", color: { r, g, b }, opacity: a };
}

function createSolidPaint(hex) {
  return hexToFigmaPaint(hex);
}

function applyFill(node, hex) {
  node.fills = [hexToFigmaPaint(hex)];
}

function applyStroke(node, hex, weight = 1) {
  node.strokes = [hexToFigmaPaint(hex)];
  node.strokeWeight = weight;
}

function createText(chars, fontName, fontSize, colorHex, opts = {}) {
  const node = figma.createText();
  node.characters = chars;
  node.fontName = fontName;
  node.fontSize = fontSize;
  const { r, g, b } = hexToRgb(colorHex);
  node.fills = [{ type: "SOLID", color: { r, g, b } }];
  if (opts.letterSpacing !== undefined) node.letterSpacing = { value: opts.letterSpacing, unit: "PIXELS" };
  if (opts.lineHeight !== undefined) node.lineHeight = opts.lineHeight;
  if (opts.textAlign) node.textAlignHorizontal = opts.textAlign;
  if (opts.textCase) node.textCase = opts.textCase;
  if (opts.italic) node.fontName = { ...fontName, style: fontName.style.includes("Italic") ? fontName.style : fontName.style + " Italic" };
  return node;
}

function createFrame(name, opts = {}) {
  const frame = figma.createFrame();
  frame.name = name;
  if (opts.width !== undefined) frame.resize(opts.width, opts.height || 100);
  if (opts.fill) applyFill(frame, opts.fill);
  if (opts.radius !== undefined) frame.cornerRadius = opts.radius;
  if (opts.stroke) applyStroke(frame, opts.stroke, opts.strokeWeight || 1);
  if (opts.layout) {
    frame.layoutMode = opts.layout; // "VERTICAL" | "HORIZONTAL"
    if (opts.gap) frame.itemSpacing = opts.gap;
    if (opts.padding) {
      frame.paddingTop = opts.padding;
      frame.paddingBottom = opts.padding;
      frame.paddingLeft = opts.padding;
      frame.paddingRight = opts.padding;
    }
    if (opts.paddingX) { frame.paddingLeft = opts.paddingX; frame.paddingRight = opts.paddingX; }
    if (opts.paddingY) { frame.paddingTop = opts.paddingY; frame.paddingBottom = opts.paddingY; }
  }
  if (opts.primaryAxisAlign) frame.primaryAxisAlignItems = opts.primaryAxisAlign;
  if (opts.counterAxisAlign) frame.counterAxisAlignItems = opts.counterAxisAlign;
  frame.layoutWrap = opts.wrap || "NO_WRAP";
  return frame;
}

function createRect(width, height, fillHex, opts = {}) {
  const rect = figma.createRectangle();
  rect.resize(width, height);
  applyFill(rect, fillHex);
  if (opts.radius !== undefined) rect.cornerRadius = opts.radius;
  if (opts.stroke) applyStroke(rect, opts.stroke, opts.strokeWeight || 1);
  if (opts.opacity !== undefined) rect.opacity = opts.opacity;
  return rect;
}

/* ── Paint styles (Figma color styles) ─────────────────────────── */
async function createPaintStyles() {
  const styles = {
    "Neutral/Background":       COLORS.background,
    "Neutral/Surface Elevated": COLORS.surfaceElevated,
    "Neutral/Surface":          COLORS.surface,
    "Neutral/Border":           COLORS.border,
    "Neutral/Muted Text":       COLORS.mutedText,
    "Neutral/Foreground":       COLORS.foreground,
    "Neutral/Subtle Text":      COLORS.subtleText,
    "Blue/Glow":                COLORS.blueGlow,
    "Blue/Spark":               COLORS.blueSpark,
    "Blue/Ember":               COLORS.blueEmber,
    "Blue/Text on White":       COLORS.blueTextOnWhite,
    "Green/Gothic Green":       COLORS.gothicGreen,
    "Green/Ember":              COLORS.greenEmber,
    "Green/Deep":               COLORS.greenDeep,
    "Semantic/Success":         COLORS.success,
    "Semantic/Warning":         COLORS.warning,
    "Semantic/Destructive":     COLORS.destructive,
  };

  for (const [name, hex] of Object.entries(styles)) {
    const style = figma.createPaintStyle();
    style.name = name;
    style.paints = [hexToFigmaPaint(hex)];
  }
}

/* ── Text styles (Figma text styles) ───────────────────────────── */
async function createTextStyles() {
  const styles = [
    { name: "Display/Hero",         font: FONTS.display,     size: 60, letterSpacing: -1.2 },
    { name: "Display/Section Head", font: FONTS.display,     size: 44, letterSpacing: -0.8 },
    { name: "Display/H3",           font: FONTS.display,     size: 20 },
    { name: "Display/Card Title",   font: FONTS.display,     size: 16 },
    { name: "Body/Regular",         font: FONTS.body,        size: 16, lineHeight: { value: 160, unit: "PERCENT" } },
    { name: "Body/Small",           font: FONTS.body,        size: 13, lineHeight: { value: 160, unit: "PERCENT" } },
    { name: "Body/Medium",          font: FONTS.bodyMedium,  size: 16 },
    { name: "Eyebrow/Label",        font: FONTS.monoMedium,  size: 11, letterSpacing: 1.4, textCase: "UPPER" },
    { name: "Mono/Data",            font: FONTS.mono,        size: 14 },
    { name: "Mono/Small",           font: FONTS.mono,        size: 11 },
    { name: "Satoshi/Wordmark",     font: FONTS.satoshi,     size: 30 },
  ];

  for (const s of styles) {
    try {
      const style = figma.createTextStyle();
      style.name = s.name;
      style.fontSize = s.size;
      style.fontName = s.font;
      if (s.letterSpacing !== undefined) style.letterSpacing = { value: s.letterSpacing, unit: "PIXELS" };
      if (s.lineHeight !== undefined) style.lineHeight = s.lineHeight;
      if (s.textCase) style.textCase = s.textCase;
    } catch (e) {
      // Font not available — skip this style
    }
  }
}

/* ════════════════════════════════════════════════════════════════
   Section builders
═══════════════════════════════════════════════════════════════ */

/* ── Section header (eyebrow + two-tone headline) ──────────────── */
function createSectionHead(index, label, title, sub) {
  const frame = createFrame(`Section Head [${index}]`, {
    layout: "VERTICAL",
    gap: 12,
    width: CONTENT_WIDTH,
  });

  // Eyebrow row
  const eyebrow = createFrame("Eyebrow", {
    layout: "HORIZONTAL",
    gap: 8,
    width: CONTENT_WIDTH,
  });
  const idx = createText(`[${index}]`, FONTS.monoMedium, 11, COLORS.blueEmber, {
    letterSpacing: 1.4, textCase: "UPPER",
  });
  const lbl = createText(label, FONTS.monoMedium, 11, COLORS.mutedText, {
    letterSpacing: 1.4, textCase: "UPPER",
  });
  eyebrow.appendChild(idx);
  eyebrow.appendChild(lbl);

  // Headline
  const head = createFrame("Headline", {
    layout: "HORIZONTAL",
    gap: 8,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });
  const titleNode = createText(title, FONTS.display, 44, COLORS.foreground, { letterSpacing: -0.8 });
  head.appendChild(titleNode);
  if (sub) {
    const subNode = createText(sub, FONTS.display, 44, COLORS.mutedText, { letterSpacing: -0.8 });
    head.appendChild(subNode);
  }

  frame.appendChild(eyebrow);
  frame.appendChild(head);
  return frame;
}

/* ── Glow divider ──────────────────────────────────────────────── */
function createGlowDivider() {
  const div = figma.createRectangle();
  div.resize(CONTENT_WIDTH, 1);
  div.fills = [];
  // Gradient stroke approximation
  div.strokes = [{
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0.6, g: 0.7, b: 0.9, a: 0 } },
      { position: 0.5, color: { r: 0.38, g: 0.65, b: 0.98, a: 0.5 } },
      { position: 1, color: { r: 0.6, g: 0.7, b: 0.9, a: 0 } },
    ],
    gradientTransform: [[1, 0, 0], [0, 0, 0]],
  }];
  div.strokeWeight = 1;
  div.name = "Glow Divider";
  return div;
}

/* ── Glass card ────────────────────────────────────────────────── */
function createGlassCard(name, width) {
  const card = createFrame(name, {
    layout: "VERTICAL",
    gap: 8,
    width: width,
    padding: 28,
    radius: CARD_RADIUS,
    fill: COLORS.surfaceElevated,
  });
  card.opacity = 0.72;
  applyStroke(card, COLORS.border, 1);
  // Add blur effect
  card.effects = [{ type: "LAYER_BLUR", radius: 16 }];
  return card;
}

/* ── Accent card (magic-card) ──────────────────────────────────── */
function createAccentCard(name, width) {
  const card = createFrame(name, {
    layout: "VERTICAL",
    gap: 0,
    width: width,
    radius: CARD_RADIUS,
    fill: COLORS.surfaceElevated,
  });
  applyStroke(card, COLORS.border, 1);
  card.effects = [
    { type: "DROP_SHADOW", color: { r: 0.06, g: 0.09, b: 0.16, a: 0.04 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0 },
    { type: "DROP_SHADOW", color: { r: 0.06, g: 0.09, b: 0.16, a: 0.12 }, offset: { x: 0, y: 12 }, radius: 40, spread: -16 },
  ];

  // Accent bar (3px gradient)
  const accentBar = figma.createRectangle();
  accentBar.resize(width, 3);
  accentBar.fills = [{
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0.58, g: 0.65, b: 0.98, a: 1 } },
      { position: 1, color: { r: 0.23, g: 0.51, b: 0.96, a: 1 } },
    ],
    gradientTransform: [[1, 0, 0], [0, 0, 0]],
  }];
  accentBar.name = "Accent Bar";
  accentBar.cornerRadius = CARD_RADIUS;
  card.appendChild(accentBar);

  // Body
  const body = createFrame("Body", {
    layout: "VERTICAL",
    gap: 6,
    width: width - 2,
    padding: 24,
  });
  card.appendChild(body);

  card._body = body; // stashed for caller
  return card;
}

/* ── Standard card ─────────────────────────────────────────────── */
function createStandardCard(name, width) {
  const card = createFrame(name, {
    layout: "VERTICAL",
    gap: 8,
    width: width,
    padding: 24,
    radius: CARD_RADIUS,
    fill: COLORS.surfaceElevated,
  });
  applyStroke(card, COLORS.border, 1);
  card.effects = [
    { type: "DROP_SHADOW", color: { r: 0.06, g: 0.09, b: 0.16, a: 0.04 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0 },
    { type: "DROP_SHADOW", color: { r: 0.06, g: 0.09, b: 0.16, a: 0.12 }, offset: { x: 0, y: 12 }, radius: 40, spread: -16 },
  ];
  return card;
}

/* ── Swatch ────────────────────────────────────────────────────── */
function createSwatch(hex, name, value, opts = {}) {
  const col = createFrame(`Swatch: ${name}`, {
    layout: "VERTICAL",
    gap: 8,
    width: 160,
  });

  const swatch = createRect(160, 80, hex, {
    radius: 12,
    stroke: opts.border ? COLORS.border : undefined,
    strokeWeight: 1,
  });

  if (opts.textColor) {
    const aa = createText("Aa", FONTS.displayBold, 12, opts.textColor);
    aa.x = 12;
    aa.y = 80 - 24;
    swatch.appendChild(aa);
  }

  col.appendChild(swatch);

  const label = createText(name, FONTS.bodyMedium, 14, COLORS.foreground);
  col.appendChild(label);

  const val = createText(value, FONTS.mono, 11, COLORS.mutedText);
  col.appendChild(val);

  return col;
}

/* ── Button (primary blue gradient) ────────────────────────────── */
function createButtonPrimary(label) {
  const btn = createFrame(`Button: ${label}`, {
    layout: "HORIZONTAL",
    gap: 0,
    paddingX: 24,
    paddingY: 12,
    radius: BUTTON_RADIUS,
    primaryAxisAlign: "CENTER",
    counterAxisAlign: "CENTER",
  });
  btn.resize(180, 48);
  btn.fills = [{
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0.38, g: 0.65, b: 0.98, a: 1 } },  // #60A5FA
      { position: 1, color: { r: 0.23, g: 0.51, b: 0.96, a: 1 } },  // #3B82F6
    ],
    gradientTransform: [[1, 0, 0], [0, 0, 0]],
  }];
  btn.effects = [{ type: "DROP_SHADOW", color: { r: 0.23, g: 0.51, b: 0.96, a: 0.35 }, offset: { x: 0, y: 4 }, radius: 12, spread: 0 }];
  const txt = createText(label, FONTS.display, 15, "#FFFFFF");
  btn.appendChild(txt);
  return btn;
}

/* ── Button (secondary white) ──────────────────────────────────── */
function createButtonSecondary(label) {
  const btn = createFrame(`Button: ${label}`, {
    layout: "HORIZONTAL",
    gap: 0,
    paddingX: 24,
    paddingY: 12,
    radius: BUTTON_RADIUS,
    fill: COLORS.surfaceElevated,
    primaryAxisAlign: "CENTER",
    counterAxisAlign: "CENTER",
  });
  btn.resize(180, 48);
  applyStroke(btn, COLORS.border, 1);
  const txt = createText(label, FONTS.bodyMedium, 15, COLORS.foreground);
  btn.appendChild(txt);
  return btn;
}

/* ── Button (RevEngg green) ────────────────────────────────────── */
function createButtonGreen(label) {
  const btn = createFrame(`Button: ${label}`, {
    layout: "HORIZONTAL",
    gap: 0,
    paddingX: 24,
    paddingY: 12,
    radius: BUTTON_RADIUS,
    fill: COLORS.gothicGreen,
    primaryAxisAlign: "CENTER",
    counterAxisAlign: "CENTER",
  });
  btn.resize(180, 48);
  const txt = createText(label, FONTS.display, 15, "#111111");
  btn.appendChild(txt);
  return btn;
}

/* ── Button (RevEngg primary blue trial) ───────────────────────── */
function createButtonRevPrimary(label) {
  const btn = createFrame(`Button: ${label}`, {
    layout: "HORIZONTAL",
    gap: 0,
    paddingX: 24,
    paddingY: 12,
    radius: BUTTON_RADIUS,
    fill: COLORS.foreground,
    primaryAxisAlign: "CENTER",
    counterAxisAlign: "CENTER",
  });
  btn.resize(180, 48);
  const txt = createText(label, FONTS.display, 15, "#FFFFFF");
  btn.appendChild(txt);
  return btn;
}

/* ── Badge pill ────────────────────────────────────────────────── */
function createBadgePill(label, opts = {}) {
  const pill = createFrame(`Badge: ${label}`, {
    layout: "HORIZONTAL",
    gap: 6,
    paddingX: 14,
    paddingY: 6,
    radius: PILL_RADIUS,
    primaryAxisAlign: "CENTER",
    counterAxisAlign: "CENTER",
  });
  if (opts.fill) applyFill(pill, opts.fill);
  if (opts.stroke) applyStroke(pill, opts.stroke, 1);
  if (opts.dot) {
    const dot = createRect(6, 6, opts.dot, { radius: 999 });
    pill.appendChild(dot);
  }
  const txt = createText(label, FONTS.monoMedium, 11, opts.textColor || COLORS.foreground, {
    letterSpacing: 1.0, textCase: "UPPER",
  });
  pill.appendChild(txt);
  return pill;
}

/* ── Type row ──────────────────────────────────────────────────── */
function createTypeRow(name, spec, sampleNode) {
  const row = createFrame(`Type: ${name}`, {
    layout: "HORIZONTAL",
    gap: 24,
    width: CONTENT_WIDTH - 64,
    paddingY: 20,
    counterAxisAlign: "CENTER",
  });

  const nameNode = createText(name, FONTS.monoMedium, 12, COLORS.mutedText, {
    letterSpacing: 1.0, textCase: "UPPER",
  });
  nameNode.resize(176, nameNode.height);
  row.appendChild(nameNode);

  // Sample (flexible middle)
  if (typeof sampleNode === "string") {
    const s = createText(sampleNode, FONTS.body, 16, COLORS.foreground);
    row.appendChild(s);
  } else {
    row.appendChild(sampleNode);
  }

  const specNode = createText(spec, FONTS.mono, 11, COLORS.subtleText);
  row.appendChild(specNode);

  // Bottom border
  applyStroke(row, COLORS.border, 1);
  row.strokesIncludedInLayout = false;

  return row;
}

/* ── Motion row ────────────────────────────────────────────────── */
function createMotionRow(name, value, usage) {
  const row = createFrame(`Motion: ${name}`, {
    layout: "HORIZONTAL",
    gap: 24,
    width: CONTENT_WIDTH - 64,
    paddingY: 16,
    counterAxisAlign: "TOP",
  });

  const left = createFrame("Left", { layout: "VERTICAL", gap: 4, width: 208 });
  const nameNode = createText(name, FONTS.bodyMedium, 14, COLORS.foreground);
  left.appendChild(nameNode);
  row.appendChild(left);

  const right = createFrame("Right", { layout: "VERTICAL", gap: 4, width: CONTENT_WIDTH - 64 - 208 - 24 });
  const valNode = createText(value, FONTS.mono, 12, COLORS.blueEmber);
  right.appendChild(valNode);
  const useNode = createText(usage, FONTS.body, 13, COLORS.mutedText, {
    lineHeight: { value: 150, unit: "PERCENT" },
  });
  right.appendChild(useNode);
  row.appendChild(right);

  applyStroke(row, COLORS.border, 1);
  row.strokesIncludedInLayout = false;
  return row;
}

/* ════════════════════════════════════════════════════════════════
   Section 00 — Cover / Header
═══════════════════════════════════════════════════════════════ */
function buildCover() {
  const frame = createFrame("Header", {
    layout: "VERTICAL",
    gap: 0,
    width: CONTENT_WIDTH,
    paddingY: 16,
  });

  // Top bar
  const bar = createFrame("Top Bar", {
    layout: "HORIZONTAL",
    width: CONTENT_WIDTH,
    primaryAxisAlign: "SPACE_BETWEEN",
    counterAxisAlign: "CENTER",
  });
  const wordmark = createText("helllo", FONTS.display, 18, COLORS.foreground);
  const dotAi = createText(".ai", FONTS.display, 18, COLORS.blueEmber);
  const dlsLabel = createText("DESIGN LANGUAGE SYSTEM", FONTS.monoMedium, 10, COLORS.mutedText, {
    letterSpacing: 1.2, textCase: "UPPER",
  });
  const wmFrame = createFrame("Wordmark", { layout: "HORIZONTAL", gap: 0 });
  wmFrame.appendChild(wordmark);
  wmFrame.appendChild(dotAi);
  bar.appendChild(wmFrame);
  bar.appendChild(dlsLabel);
  frame.appendChild(bar);

  // Bottom border
  const border = createRect(CONTENT_WIDTH, 1, COLORS.border);
  frame.appendChild(border);

  return frame;
}

/* ════════════════════════════════════════════════════════════════
   Intro section
═══════════════════════════════════════════════════════════════ */
function buildIntro() {
  const frame = createFrame("Intro", {
    layout: "VERTICAL",
    gap: 24,
    width: CONTENT_WIDTH,
    paddingY: 56,
  });

  // Badge
  const badge = createBadgePill("v1.0 · July 2026", {
    fill: COLORS.surface,
    stroke: COLORS.border,
    textColor: COLORS.foreground,
  });
  frame.appendChild(badge);

  // Hero headline
  const hero = createFrame("Hero", { layout: "VERTICAL", gap: 0, width: CONTENT_WIDTH });
  const line1 = createText("One language.", FONTS.display, 60, COLORS.foreground, { letterSpacing: -1.2 });
  const line2 = createText("Three products.", FONTS.display, 60, COLORS.blueEmber, { letterSpacing: -1.2 });
  hero.appendChild(line1);
  hero.appendChild(line2);
  frame.appendChild(hero);

  // Description
  const desc = createText(
    "The shared visual system behind RevEngg, Helllo Voice and Spark. A common foundation of neutrals, typography, surfaces and motion — with one accent per product doing all the talking.",
    FONTS.body, 18, COLORS.mutedText,
    { lineHeight: { value: 160, unit: "PERCENT" } }
  );
  desc.resize(CONTENT_WIDTH, desc.height);
  frame.appendChild(desc);

  // Principles grid (4 cards)
  const principles = [
    ["Light & luminous", "Cool slate neutrals on a near-white canvas. Aurora glows and dot grids stay under 5% prominence."],
    ["Product is the hero", "Custom SVG dashboards, diagrams and mockups — never stock imagery, robots or floating brains."],
    ["Motion means something", "Animation only narrates the product story: signals flow, numbers count, cards reveal. Nothing decorative."],
    ["One accent per product", "Shared neutrals everywhere; the family speaks blue. RevEngg is trialing the blue flavor — gothic green #9FEA28 is its legacy accent."],
  ];

  const grid = createFrame("Principles", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });

  for (const [title, body] of principles) {
    const card = createAccentCard(`Principle: ${title}`, (CONTENT_WIDTH - 48) / 4);
    const t = createText(title, FONTS.display, 16, COLORS.foreground);
    const b = createText(body, FONTS.body, 13, COLORS.mutedText, {
      lineHeight: { value: 150, unit: "PERCENT" },
    });
    card._body.appendChild(t);
    card._body.appendChild(b);
    grid.appendChild(card);
  }
  frame.appendChild(grid);

  return frame;
}

/* ════════════════════════════════════════════════════════════════
   Section 01 — Brand
═══════════════════════════════════════════════════════════════ */
function buildSection01Brand() {
  const section = createFrame("01 — Brand Architecture", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("01", "Brand architecture", "Three wordmarks,", "one family."));

  const grid = createFrame("Brand Grid", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });

  const cardW = (CONTENT_WIDTH - 32) / 3;

  // RevEngg wordmark placeholder
  const card1 = createGlassCard("RevEngg Wordmark", cardW);
  const revWm = createFrame("Wordmark Placeholder", {
    layout: "HORIZONTAL",
    gap: 0,
    width: cardW - 56,
    paddingY: 12,
    counterAxisAlign: "CENTER",
  });
  const revText = createText("Rev", FONTS.satoshi, 30, "#111111");
  const enggText = createText("Engg", FONTS.satoshiItalic, 30, COLORS.blueEmber);
  revWm.appendChild(revText);
  revWm.appendChild(enggText);
  card1.appendChild(revWm);
  card1.appendChild(createText("RevEngg — route /", FONTS.bodyMedium, 14, COLORS.foreground));
  card1.appendChild(createText(
    'Satoshi Black. "Rev" in near-black #111111, "Engg" in the product accent, bold italic — currently the blue flavor under review (legacy: gothic green #9FEA28). The only place Satoshi appears.',
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  grid.appendChild(card1);

  // Helllo Voice wordmark
  const card2 = createGlassCard("Helllo Voice Wordmark", cardW);
  const hellloWm = createFrame("Wordmark", { layout: "HORIZONTAL", gap: 0, paddingY: 12 });
  hellloWm.appendChild(createText("helllo", FONTS.display, 30, COLORS.foreground));
  hellloWm.appendChild(createText(".ai", FONTS.display, 30, COLORS.blueEmber));
  card2.appendChild(hellloWm);
  card2.appendChild(createText("Helllo Voice — route /helllo", FONTS.bodyMedium, 14, COLORS.foreground));
  card2.appendChild(createText(
    "Geist Semibold wordmark with .ai in the blue ember accent. The conversational voice AI product.",
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  grid.appendChild(card2);

  // Spark wordmark
  const card3 = createGlassCard("Spark Wordmark", cardW);
  const sparkWm = createFrame("Wordmark", { layout: "HORIZONTAL", gap: 12, paddingY: 8, counterAxisAlign: "CENTER" });
  // Spark logo placeholder (starburst SVG)
  const logoPlaceholder = createRect(30, 30, COLORS.blueSpark, { radius: 6 });
  logoPlaceholder.name = "Spark Logo Placeholder (upload SVG)";
  sparkWm.appendChild(logoPlaceholder);
  const sparkText = createFrame("Text", { layout: "VERTICAL", gap: 0 });
  sparkText.appendChild(createText("Spark", FONTS.display, 20, COLORS.foreground));
  sparkText.appendChild(createText("BY HELLO.AI", FONTS.monoMedium, 10, COLORS.mutedText, { letterSpacing: 1.2, textCase: "UPPER" }));
  sparkWm.appendChild(sparkText);
  card3.appendChild(sparkWm);
  card3.appendChild(createText("Spark — route /spark", FONTS.bodyMedium, 14, COLORS.foreground));
  card3.appendChild(createText(
    "Logomark + Geist wordmark. Web agent for SMB website owners.",
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  grid.appendChild(card3);

  section.appendChild(grid);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 02 — Color
═══════════════════════════════════════════════════════════════ */
function buildSection02Color() {
  const section = createFrame("02 — Color", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("02", "Color", "Slate neutrals,", "accent per product."));

  // Neutral foundation
  section.appendChild(createText("NEUTRAL FOUNDATION — SHARED BY EVERY PAGE", FONTS.monoMedium, 12, COLORS.mutedText, {
    letterSpacing: 1.2, textCase: "UPPER",
  }));

  const neutralGrid = createFrame("Neutral Swatches", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });
  const neutrals = [
    { hex: COLORS.background,      name: "Background",       value: "hsl(210 40% 98%)", border: true },
    { hex: COLORS.surfaceElevated, name: "Surface elevated", value: "#FFFFFF",          border: true },
    { hex: COLORS.surface,         name: "Surface",          value: "#F1F5F9",          border: true },
    { hex: COLORS.border,          name: "Border",           value: "hsl(214 32% 84%)" },
    { hex: COLORS.mutedText,       name: "Muted text",       value: "hsl(215 16% 47%)", textColor: "#fff" },
    { hex: COLORS.foreground,      name: "Foreground",       value: "hsl(215 28% 17%)", textColor: "#fff" },
  ];
  for (const s of neutrals) {
    neutralGrid.appendChild(createSwatch(s.hex, s.name, s.value, s));
  }
  section.appendChild(neutralGrid);

  // Blue + Green side by side
  const accentRow = createFrame("Accent Row", {
    layout: "HORIZONTAL",
    gap: 32,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });

  // Blue column
  const blueCol = createFrame("Blue", { layout: "VERTICAL", gap: 16, width: (CONTENT_WIDTH - 32) / 2 });
  blueCol.appendChild(createText("BLUE — SPARK & HELLO VOICE", FONTS.monoMedium, 12, COLORS.mutedText, {
    letterSpacing: 1.2, textCase: "UPPER",
  }));
  const blueGrid = createFrame("Blue Swatches", { layout: "HORIZONTAL", gap: 16, wrap: "WRAP" });
  blueGrid.appendChild(createSwatch(COLORS.blueGlow,  "Glow",  "#93C5FD"));
  blueGrid.appendChild(createSwatch(COLORS.blueSpark, "Spark", "#60A5FA", { textColor: "#fff" }));
  blueGrid.appendChild(createSwatch(COLORS.blueEmber, "Ember", "#3B82F6", { textColor: "#fff" }));
  blueCol.appendChild(blueGrid);
  blueCol.appendChild(createText(
    "CTA gradient: 135deg, #60A5FA → #3B82F6. Text on white uses hsl(217 84% 46%) for AA contrast.",
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  accentRow.appendChild(blueCol);

  // Green column
  const greenCol = createFrame("Green", { layout: "VERTICAL", gap: 16, width: (CONTENT_WIDTH - 32) / 2 });
  greenCol.appendChild(createText("GREEN — REVENGG LEGACY ACCENT (PAGE CURRENTLY TRIALING BLUE)", FONTS.monoMedium, 12, COLORS.mutedText, {
    letterSpacing: 1.2, textCase: "UPPER",
  }));
  const greenGrid = createFrame("Green Swatches", { layout: "HORIZONTAL", gap: 16, wrap: "WRAP" });
  greenGrid.appendChild(createSwatch(COLORS.gothicGreen, "Gothic green", "#9FEA28", { textColor: "#111" }));
  greenGrid.appendChild(createSwatch(COLORS.greenEmber,  "Green ember",  "#65A30D", { textColor: "#fff" }));
  greenGrid.appendChild(createSwatch(COLORS.greenDeep,   "Green deep",   "#4D7C0F", { textColor: "#fff" }));
  greenCol.appendChild(greenGrid);
  greenCol.appendChild(createText(
    "Held in reserve while the blue flavor is reviewed. To restore: swap the accent tokens in revengg.css back to these values. Small green text on light always uses green deep (AA-safe).",
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  accentRow.appendChild(greenCol);

  section.appendChild(accentRow);

  // Semantic
  section.appendChild(createText("SEMANTIC", FONTS.monoMedium, 12, COLORS.mutedText, {
    letterSpacing: 1.2, textCase: "UPPER",
  }));
  const semanticGrid = createFrame("Semantic Swatches", { layout: "HORIZONTAL", gap: 16, wrap: "WRAP" });
  semanticGrid.appendChild(createSwatch(COLORS.success,     "Success",     "#10B981", { textColor: "#fff" }));
  semanticGrid.appendChild(createSwatch(COLORS.warning,     "Warning",     "hsl(38 92% 50%)", { textColor: "#fff" }));
  semanticGrid.appendChild(createSwatch(COLORS.destructive, "Destructive", "hsl(0 72% 51%)", { textColor: "#fff" }));
  section.appendChild(semanticGrid);

  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 03 — Typography
═══════════════════════════════════════════════════════════════ */
function buildSection03Typography() {
  const section = createFrame("03 — Typography", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("03", "Typography", "Geist speaks,", "Inter explains, Mono labels."));

  const card = createGlassCard("Type Scale", CONTENT_WIDTH);

  // Display
  const displaySample = createText("Engineer revenue.", FONTS.display, 48, COLORS.foreground, { letterSpacing: -1.0 });
  card.appendChild(createTypeRow("Display", "Geist 600 · clamp(2.5–4rem) · -0.02em", displaySample));

  // Section head
  const sectionSample = createFrame("Section Sample", { layout: "HORIZONTAL", gap: 8 });
  sectionSample.appendChild(createText("Two-tone headline,", FONTS.display, 28, COLORS.foreground));
  sectionSample.appendChild(createText("muted follow-on.", FONTS.display, 28, COLORS.mutedText));
  card.appendChild(createTypeRow("Section head", "Geist 600 · clamp(1.75–2.75rem)", sectionSample));

  // H3
  card.appendChild(createTypeRow("H3", "Geist 600 · 1.25rem",
    createText("Card and panel titles", FONTS.display, 20, COLORS.foreground)));

  // Body
  const bodySample = createText("Body copy is Inter — quiet, legible, never competing with the product.", FONTS.body, 16, COLORS.foreground, {
    lineHeight: { value: 160, unit: "PERCENT" },
  });
  card.appendChild(createTypeRow("Body", "Inter 400 · 1rem · lh 1.6", bodySample));

  // Eyebrow
  const eyebrowSample = createFrame("Eyebrow Sample", { layout: "HORIZONTAL", gap: 8 });
  eyebrowSample.appendChild(createText("[01]", FONTS.monoMedium, 11, COLORS.blueEmber, { letterSpacing: 1.4 }));
  eyebrowSample.appendChild(createText("NUMBERED SECTION LABEL", FONTS.monoMedium, 11, COLORS.mutedText, { letterSpacing: 1.4 }));
  card.appendChild(createTypeRow("Eyebrow", "Geist Mono 500 · 11px · +0.14em · uppercase", eyebrowSample));

  // Data / mono
  card.appendChild(createTypeRow("Data / mono", "Geist Mono 400–500 · tabular",
    createText("$482,630 · +24.6% · 00:42", FONTS.mono, 14, COLORS.foreground)));

  section.appendChild(card);

  section.appendChild(createText(
    "Fonts load once, globally, from index.html. Satoshi is reserved exclusively for the RevEngg wordmark.",
    FONTS.body, 13, COLORS.mutedText
  ));

  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 04 — Surfaces
═══════════════════════════════════════════════════════════════ */
function buildSection04Surfaces() {
  const section = createFrame("04 — Surfaces & Elevation", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("04", "Surfaces & elevation", "Glass, cards", "and glowing seams."));

  // Three card types
  const grid = createFrame("Surface Cards", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });
  const cardW = (CONTENT_WIDTH - 32) / 3;

  // Glass
  const glassCard = createGlassCard("Glass", cardW);
  glassCard.appendChild(createText("Glass", FONTS.display, 16, COLORS.foreground));
  glassCard.appendChild(createText("72% white + 16px blur + hairline border. Navs, hero panels, spec sheets.", FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }));
  glassCard.appendChild(createText(".glass · .rev-glass", FONTS.mono, 10, COLORS.subtleText));
  grid.appendChild(glassCard);

  // Accent card
  const accentCard = createAccentCard("Accent Card", cardW);
  accentCard._body.appendChild(createText("Accent card", FONTS.display, 16, COLORS.foreground));
  accentCard._body.appendChild(createText("Elevated white card, 1.25rem radius, 3px gradient accent bar, −3px hover lift.", FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }));
  accentCard._body.appendChild(createText(".magic-card", FONTS.mono, 10, COLORS.subtleText));
  grid.appendChild(accentCard);

  // Standard card
  const stdCard = createStandardCard("Standard Card", cardW);
  stdCard.appendChild(createText("Standard card", FONTS.display, 16, COLORS.foreground));
  stdCard.appendChild(createText("White on hairline, soft slate shadow. The default container everywhere.", FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }));
  stdCard.appendChild(createText(".rev-card · shadow-medium", FONTS.mono, 10, COLORS.subtleText));
  grid.appendChild(stdCard);

  section.appendChild(grid);

  // Radius scale + Section seam
  const bottomRow = createFrame("Radius + Seam", {
    layout: "HORIZONTAL",
    gap: 32,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });

  // Radius scale
  const radiusCol = createFrame("Radius Scale", { layout: "VERTICAL", gap: 12, width: (CONTENT_WIDTH - 32) / 2 });
  radiusCol.appendChild(createText("RADIUS SCALE", FONTS.monoMedium, 12, COLORS.mutedText, { letterSpacing: 1.2, textCase: "UPPER" }));
  const radiusRow = createFrame("Radii", { layout: "HORIZONTAL", gap: 16, counterAxisAlign: "BOTTOM" });
  const radii = [
    { r: 8, label: "0.5rem", use: "inputs" },
    { r: 12, label: "0.75rem", use: "buttons" },
    { r: 20, label: "1.25rem", use: "cards" },
    { r: 999, label: "9999px", use: "pills" },
  ];
  for (const rad of radii) {
    const col = createFrame(`Radius ${rad.label}`, { layout: "VERTICAL", gap: 8, primaryAxisAlign: "CENTER", counterAxisAlign: "CENTER" });
    const sq = createRect(56, 56, COLORS.blueGlow, { radius: rad.r, stroke: COLORS.blueEmber, strokeWeight: 2 });
    col.appendChild(sq);
    col.appendChild(createText(rad.label, FONTS.mono, 10, COLORS.mutedText));
    col.appendChild(createText(rad.use, FONTS.body, 10, COLORS.subtleText));
    radiusRow.appendChild(col);
  }
  radiusCol.appendChild(radiusRow);
  bottomRow.appendChild(radiusCol);

  // Section seam
  const seamCol = createFrame("Section Seam", { layout: "VERTICAL", gap: 12, width: (CONTENT_WIDTH - 32) / 2 });
  seamCol.appendChild(createText("SECTION SEAM", FONTS.monoMedium, 12, COLORS.mutedText, { letterSpacing: 1.2, textCase: "UPPER" }));
  seamCol.appendChild(createGlowDivider());
  seamCol.appendChild(createText(
    "Sections are separated by a gradient glow divider — never heavy rules or background color blocks.",
    FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }
  ));
  seamCol.appendChild(createText(".glow-divider · .rev-divider", FONTS.mono, 11, COLORS.subtleText));
  bottomRow.appendChild(seamCol);

  section.appendChild(bottomRow);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 05 — Controls
═══════════════════════════════════════════════════════════════ */
function buildSection05Controls() {
  const section = createFrame("05 — Buttons & Controls", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("05", "Buttons & controls", "One shape,", "two voices."));

  const card = createGlassCard("Controls", CONTENT_WIDTH);

  // Buttons row
  const btnRow = createFrame("Buttons", { layout: "HORIZONTAL", gap: 16, width: CONTENT_WIDTH - 56, wrap: "WRAP" });
  btnRow.appendChild(createButtonPrimary("Book a Demo"));
  btnRow.appendChild(createButtonSecondary("Watch Platform"));
  btnRow.appendChild(createButtonGreen("Book a Demo"));
  btnRow.appendChild(createButtonRevPrimary("Talk to Sales"));
  card.appendChild(btnRow);

  // Badges & chips row
  const badgeRow = createFrame("Badges & Chips", { layout: "HORIZONTAL", gap: 12, width: CONTENT_WIDTH - 56, wrap: "WRAP" });
  badgeRow.appendChild(createBadgePill("Badge pill", { fill: COLORS.surface, stroke: COLORS.border, textColor: COLORS.foreground }));
  badgeRow.appendChild(createBadgePill("Neutral chip", { fill: COLORS.surface, stroke: COLORS.border, textColor: COLORS.foreground }));
  badgeRow.appendChild(createBadgePill("RevEngg badge", {
    fill: "rgba(159,234,40,0.14)", stroke: "rgba(159,234,40,0.4)", textColor: COLORS.greenDeep, dot: COLORS.gothicGreen,
  }));
  card.appendChild(badgeRow);

  // Notes
  const notes = createFrame("Notes", { layout: "VERTICAL", gap: 6, width: CONTENT_WIDTH - 56 });
  notes.appendChild(createText("· Primary CTA: accent gradient + glow shadow + 1px lift on hover. One per screen.", FONTS.body, 13, COLORS.mutedText));
  notes.appendChild(createText("· Secondary: white surface, hairline border, accent tint on hover.", FONTS.body, 13, COLORS.mutedText));
  notes.appendChild(createText("· Radius 0.75rem, min-height 44–48px, visible focus ring, 150–200ms transitions.", FONTS.body, 13, COLORS.mutedText));
  card.appendChild(notes);

  section.appendChild(card);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 06 — Motion
═══════════════════════════════════════════════════════════════ */
function buildSection06Motion() {
  const section = createFrame("06 — Motion", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("06", "Motion", "Animation narrates", "the product story."));

  const card = createGlassCard("Motion Specs", CONTENT_WIDTH);

  const motions = [
    { name: "Entrance rise",     value: "0.6s cubic-bezier(0.16, 1, 0.3, 1) · translateY(16–24px) → 0", usage: "Hero content and scroll reveals (.reveal/.in-view, .rev-reveal/.rev-in). Staggered 80–100ms per sibling." },
    { name: "Hover lift",        value: "0.18–0.22s ease · translateY(-1px to -3px) + shadow",            usage: "Buttons lift 1px, cards lift 3px. Restore on release." },
    { name: "Signal flow",       value: "4–7s linear infinite · stroke-dashoffset",                       usage: "Dashed SVG paths carrying leads, revenue and sync events. The family's signature motion." },
    { name: "Draw-in",           value: "1.6s cubic-bezier(0.3, 0, 0.2, 1) · stroke-dashoffset",          usage: "Chart lines and lifecycle paths draw once on first view." },
    { name: "Count-up",          value: "1.3–1.8s ease-out-cubic · rAF",                                   usage: "Metrics count from zero when they enter the viewport." },
    { name: "Panel crossfade",   value: "0.45s cubic-bezier(0.16, 1, 0.3, 1) · fade + 18px slide",        usage: "Content swaps in scrollytelling sections. No page refresh, no layout shift." },
  ];

  for (const m of motions) {
    card.appendChild(createMotionRow(m.name, m.value, m.usage));
  }

  card.appendChild(createText(
    "All motion is disabled under prefers-reduced-motion. Never animate width/height/top/left — transform and opacity only.",
    FONTS.body, 13, COLORS.mutedText
  ));

  section.appendChild(card);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 07 — Backgrounds
═══════════════════════════════════════════════════════════════ */
function buildSection07Backgrounds() {
  const section = createFrame("07 — Background Layers", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("07", "Background layers", "Atmosphere", "below 5% prominence."));

  const grid = createFrame("Background Cards", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });
  const cardW = (CONTENT_WIDTH - 32) / 3;

  const bgs = [
    { t: "Aurora",       b: "Fixed radial gradients in the product accent, ~45–50% layer opacity. Top-center glow + two corner washes.", c: ".spark-aurora · .rev-aurora" },
    { t: "Dot grid",     b: "28px radial-dot grid, slate at 25%, masked to the hero region, 35% layer opacity.", c: ".spark-grid · .rev-grid" },
    { t: "Signal field", b: "RevEngg only: canvas bezier trajectories with drifting particles — the revenue signal. Pauses when the tab hides.", c: "SignalField.tsx" },
  ];

  for (const bg of bgs) {
    const card = createAccentCard(`BG: ${bg.t}`, cardW);
    card._body.appendChild(createText(bg.t, FONTS.display, 16, COLORS.foreground));
    card._body.appendChild(createText(bg.b, FONTS.body, 13, COLORS.mutedText, { lineHeight: { value: 150, unit: "PERCENT" } }));
    card._body.appendChild(createText(bg.c, FONTS.mono, 10, COLORS.subtleText));
    grid.appendChild(card);
  }

  section.appendChild(grid);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Section 08 — Usage
═══════════════════════════════════════════════════════════════ */
function buildSection08Usage() {
  const section = createFrame("08 — Usage", {
    layout: "VERTICAL",
    gap: 32,
    width: CONTENT_WIDTH,
  });

  section.appendChild(createGlowDivider());
  section.appendChild(createSectionHead("08", "Usage", "Where the tokens live,", "and the rules of the road."));

  const grid = createFrame("Usage Grid", {
    layout: "HORIZONTAL",
    gap: 16,
    width: CONTENT_WIDTH,
    wrap: "WRAP",
  });
  const cardW = (CONTENT_WIDTH - 16) / 2;

  // Token sources
  const tokenCard = createGlassCard("Token Sources", cardW);
  tokenCard.appendChild(createText("TOKEN SOURCES", FONTS.monoMedium, 12, COLORS.mutedText, { letterSpacing: 1.2, textCase: "UPPER" }));
  const sources = [
    "src/index.css — global :root tokens (Tailwind semantic colors, shadows, fonts) → /helllo + app-wide",
    "src/pages/spark/spark.css — .spark-page scope → /spark",
    "src/pages/revengg/revengg.css — .rev-page scope → /",
    "index.html — Geist · Inter · Geist Mono (global font load)",
  ];
  for (const s of sources) {
    tokenCard.appendChild(createText(s, FONTS.mono, 12, COLORS.foreground, { lineHeight: { value: 180, unit: "PERCENT" } }));
  }
  grid.appendChild(tokenCard);

  // Do / Don't
  const rulesCard = createGlassCard("Do / Don't", cardW);
  rulesCard.appendChild(createText("DO / DON'T", FONTS.monoMedium, 12, COLORS.mutedText, { letterSpacing: 1.2, textCase: "UPPER" }));
  const rules = [
    { ok: true,  t: "Use semantic tokens; never raw hex in components (illustrations excepted)." },
    { ok: true,  t: "One accent per page. Neutrals do the layout; accent marks meaning." },
    { ok: true,  t: "Custom SVG for every visual — dashboards, flows, lifecycle diagrams." },
    { ok: false, t: "No stock photos, robot art, dark cyberpunk themes or gradient text bombs." },
    { ok: false, t: "No decorative animation. If it doesn't narrate the product, it doesn't move." },
    { ok: false, t: "No second accent on a page. The family speaks blue; don't dilute it." },
  ];
  for (const r of rules) {
    const mark = r.ok ? "✓" : "✗";
    const color = r.ok ? COLORS.foreground : COLORS.mutedText;
    rulesCard.appendChild(createText(`${mark}  ${r.t}`, FONTS.body, 13, color, { lineHeight: { value: 160, unit: "PERCENT" } }));
  }
  grid.appendChild(rulesCard);

  section.appendChild(grid);
  return section;
}

/* ════════════════════════════════════════════════════════════════
   Aurora background layer
═══════════════════════════════════════════════════════════════ */
function createAuroraBackground(width, height) {
  const bg = figma.createFrame();
  bg.name = "Aurora Background";
  bg.resize(width, height);
  bg.fills = [{
    type: "GRADIENT_LINEAR",
    gradientStops: [
      { position: 0, color: { r: 0.97, g: 0.98, b: 0.99, a: 1 } },
      { position: 1, color: { r: 0.95, g: 0.96, b: 0.98, a: 1 } },
    ],
    gradientTransform: [[0, 1, 0], [1, 0, 0]],
  }];

  // Top-center blue glow
  const glow1 = figma.createEllipse();
  glow1.resize(800, 400);
  glow1.x = width / 2 - 400;
  glow1.y = -100;
  glow1.fills = [{ type: "SOLID", color: { r: 0.58, g: 0.77, b: 0.99, a: 0.15 } }];
  glow1.effects = [{ type: "LAYER_BLUR", radius: 120 }];
  glow1.name = "Aurora Glow Top";
  bg.appendChild(glow1);

  // Corner wash left
  const glow2 = figma.createEllipse();
  glow2.resize(500, 500);
  glow2.x = -150;
  glow2.y = height * 0.3;
  glow2.fills = [{ type: "SOLID", color: { r: 0.58, g: 0.77, b: 0.99, a: 0.08 } }];
  glow2.effects = [{ type: "LAYER_BLUR", radius: 100 }];
  glow2.name = "Aurora Glow Left";
  bg.appendChild(glow2);

  // Corner wash right
  const glow3 = figma.createEllipse();
  glow3.resize(500, 500);
  glow3.x = width - 350;
  glow3.y = height * 0.6;
  glow3.fills = [{ type: "SOLID", color: { r: 0.58, g: 0.77, b: 0.99, a: 0.08 } }];
  glow3.effects = [{ type: "LAYER_BLUR", radius: 100 }];
  glow3.name = "Aurora Glow Right";
  bg.appendChild(glow3);

  return bg;
}

/* ════════════════════════════════════════════════════════════════
   Main
═══════════════════════════════════════════════════════════════ */
async function main() {
  await figma.loadAllPagesAsync();
  await loadAllFonts();

  // Create styles
  await createPaintStyles();
  await createTextStyles();

  // Create a new page
  const page = figma.createPage();
  page.name = "Helllo DLS";
  figma.currentPage = page;

  // Main container
  const container = createFrame("Helllo Design Language System", {
    layout: "VERTICAL",
    gap: SECTION_GAP,
    width: PAGE_WIDTH,
    padding: PAGE_PADDING,
    fill: COLORS.background,
  });

  // Build all sections
  container.appendChild(buildCover());
  container.appendChild(buildIntro());
  container.appendChild(buildSection01Brand());
  container.appendChild(buildSection02Color());
  container.appendChild(buildSection03Typography());
  container.appendChild(buildSection04Surfaces());
  container.appendChild(buildSection05Controls());
  container.appendChild(buildSection06Motion());
  container.appendChild(buildSection07Backgrounds());
  container.appendChild(buildSection08Usage());

  // Add aurora background behind everything
  const totalHeight = container.height;
  const aurora = createAuroraBackground(PAGE_WIDTH, totalHeight);
  aurora.x = 0;
  aurora.y = 0;
  page.appendChild(aurora);

  // Position container
  container.x = 0;
  container.y = 0;
  page.appendChild(container);

  // Center viewport
  figma.viewport.scrollAndZoomIntoView([container]);

  // Create components from button samples
  // (Optional: convert buttons to components for reuse)
  const buttons = container.findOne(n => n.name === "Buttons");
  if (buttons && buttons.type === "FRAME") {
    for (const child of buttons.children) {
      if (child.name.startsWith("Button:")) {
        try {
          const comp = figma.createComponentFromNode(child);
          comp.name = child.name.replace("Button: ", "Button/");
        } catch (e) {
          // Skip if can't convert
        }
      }
    }
  }

  figma.notify("✓ Helllo DLS generated — all 8 sections, color styles, text styles, and components created.");
}

main().catch(err => {
  figma.notify("Error: " + err.message, { error: true });
  figma.closePlugin();
});
