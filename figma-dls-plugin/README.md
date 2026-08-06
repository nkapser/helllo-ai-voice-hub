# Helllo DLS — Figma Plugin Builder

A Figma plugin that generates the complete Helllo Design Language System as a native `.fig` file. Run it once inside Figma and it builds all 8 sections, color styles, text styles, button components, and surface samples from the live DLS at `/design-language-system`.

## What it generates

| Section | Content |
|---------|---------|
| **Header** | helllo.ai wordmark + DLS label |
| **Intro** | v1.0 badge, hero headline, 4 principle cards |
| **01 Brand** | RevEngg / Helllo Voice / Spark wordmark cards with placeholders for SVG assets |
| **02 Color** | 6 neutral swatches, 3 blue swatches, 3 green swatches, 3 semantic swatches + 17 Figma paint styles |
| **03 Typography** | 6 type-scale rows (Display → Mono) + 11 Figma text styles |
| **04 Surfaces** | Glass card, accent card, standard card, radius scale (4 sizes), glow divider |
| **05 Controls** | 4 button samples (primary, secondary, green, RevEngg primary) → converted to Figma components, 3 badge/chip samples |
| **06 Motion** | 6 motion spec rows with easing curves and usage notes |
| **07 Backgrounds** | Aurora, dot grid, signal field description cards |
| **08 Usage** | Token source paths + do/don't rules |

## How to run

### Step 1 — Open Figma

1. Open Figma (desktop or browser)
2. Create a **new design file** (File → New File)

### Step 2 — Load the plugin

1. Go to **Figma Menu → Plugins → Development → Import plugin from manifest…**
2. Select `manifest.json` from this folder:
   ```
   /Users/sandilya/CascadeProjects/helllo-ai-voice-hub/figma-dls-plugin/manifest.json
   ```

### Step 3 — Run it

1. Go to **Figma Menu → Plugins → Development → Helllo DLS Builder**
2. The plugin runs once and populates the file with the entire design system
3. You'll see a notification: `✓ Helllo DLS generated`

### Step 4 — Upload fonts (for accurate typography)

The plugin tries to use **Geist**, **Geist Mono**, **Inter**, and **Satoshi**. If these aren't installed in your Figma account, it falls back to Inter/Roboto Mono automatically.

To get the real fonts:

1. In Figma, go to **Account Settings → Fonts**
2. Upload the font files:
   - `Geist-Regular.ttf`, `Geist-Semibold.ttf`, `Geist-Bold.ttf`
   - `GeistMono-Regular.ttf`, `GeistMono-Medium.ttf`
   - `Inter-Regular.ttf`, `Inter-Medium.ttf`
   - `Satoshi-Bold.ttf`, `Satoshi-BoldItalic.ttf`
3. **Re-run the plugin** — it will now use the correct fonts

### Step 5 — Upload brand assets (wordmarks & logos)

The plugin creates **placeholder rectangles** where the SVG wordmarks/logos go:

1. **RevEngg wordmark** — replace the "Rev" + "Engg" text in the `01 — Brand Architecture` section with your SVG
2. **Spark logo** — replace the "Spark Logo Placeholder" rectangle with the Spark logomark SVG
3. **Helllo Voice wordmark** — already rendered as text (Geist Semibold), but you can swap in an SVG if preferred

To replace:
- Right-click the placeholder → **Paste over selection** (with SVG copied to clipboard)
- Or drag the SVG file directly onto the placeholder

### Step 6 — Save as .fig

1. **File → Save Local Copy…** → saves a `.fig` file to your machine
2. Upload that `.fig` file to your target platform

## File structure

```
figma-dls-plugin/
├── manifest.json    # Figma plugin manifest
├── code.js          # Plugin script (builds the entire DLS)
└── README.md        # This file
```

## Color tokens generated as Figma Paint Styles

```
Neutral/Background          #F8FAFC
Neutral/Surface Elevated    #FFFFFF
Neutral/Surface             #F1F5F9
Neutral/Border              #CBD5E1
Neutral/Muted Text          #64748B
Neutral/Foreground          #1E293B
Neutral/Subtle Text         #94A3B8
Blue/Glow                   #93C5FD
Blue/Spark                  #60A5FA
Blue/Ember                  #3B82F6
Blue/Text on White          #1D4ED8
Green/Gothic Green          #9FEA28
Green/Ember                 #65A30D
Green/Deep                  #4D7C0F
Semantic/Success            #10B981
Semantic/Warning            #F59E0B
Semantic/Destructive        #DC2626
```

## Text styles generated

```
Display/Hero                Geist Semibold · 60px · -1.2px tracking
Display/Section Head        Geist Semibold · 44px · -0.8px tracking
Display/H3                  Geist Semibold · 20px
Display/Card Title          Geist Semibold · 16px
Body/Regular                Inter Regular · 16px · 160% line-height
Body/Small                  Inter Regular · 13px · 160% line-height
Body/Medium                 Inter Medium · 16px
Eyebrow/Label               Geist Mono Medium · 11px · +1.4px tracking · UPPER
Mono/Data                   Geist Mono Regular · 14px
Mono/Small                  Geist Mono Regular · 11px
Satoshi/Wordmark            Satoshi Bold · 30px
```

## Components generated

- `Button/Book a Demo` — primary blue gradient CTA
- `Button/Watch Platform` — secondary white with border
- `Button/Book a Demo (Green)` — RevEngg legacy green
- `Button/Talk to Sales` — RevEngg primary dark

## Troubleshooting

**Plugin won't import?**
- Make sure you're using Figma desktop or the web editor (not FigJam)
- Check that `manifest.json` and `code.js` are in the same folder

**Fonts look wrong?**
- The plugin falls back to Inter/Roboto if Geist/Satoshi aren't installed
- Upload fonts to your Figma account settings and re-run

**Want to regenerate?**
- Delete the generated page and run the plugin again
- Or create a new file and run it there
