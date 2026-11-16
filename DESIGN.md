---
name: Alfredo Brocal Serrano · Portfolio
description: A Swiss International Style data poster where every figure is the author's own data.
colors:
  paper: "#f4f4f1"
  ink: "#111111"
  signal-red: "#d0201a"
  ink-2: "#5c5c58"
  paper-dim: "#c9c9c4"
  signal-red-on-ink: "#ff5a4e"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(clamp(3.5rem, 2rem + 6.6vw, 9.25rem), 13.5vh)"
    fontWeight: 860
    lineHeight: 0.84
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 78"
  display-key:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 6.6vw, 9.25rem)"
    fontWeight: 860
    lineHeight: 0.86
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 72"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.8vw, 4.25rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 80"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.4vw, 2.5rem)"
    fontWeight: 820
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 85"
  figure-number:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.4vw, 2.5rem)"
    fontWeight: 820
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 75"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  caption:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0.04em"
rounded:
  none: "0"
spacing:
  gutter: "clamp(16px, 3.4vw, 48px)"
  col-gap: "clamp(12px, 1.7vw, 24px)"
  nav-h: "56px"
  section-top: "clamp(56px, 8vw, 120px)"
  section-bottom: "clamp(56px, 7vw, 104px)"
  rule: "6px"
  hair: "1.5px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 1.25em"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.paper}"
  button-signal:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 1.25em"
    height: "52px"
  button-signal-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.25em"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    padding: "0 0.9em"
    height: "40px"
  lang-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "40px"
    width: "44px"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.nav-h}"
    padding: "0 {spacing.gutter}"
  contact-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "{spacing.section-top} {spacing.gutter} {spacing.gutter}"
---

# Design System: Alfredo Brocal Serrano · Portfolio

## Overview

**Creative North Star: "The Data Poster"**

The site is a Swiss International Style poster printed in two inks on off-white stock, and every figure on it is plotted from the author's own CSVs. One grotesk family carries everything; it compresses and thickens for display, opens up for reading, and always sets numbers in tabular lining figures. Structure comes from a strict twelve-column grid and from black rules of two weights, never from boxes, cards or shadows.

Density is poster-like: huge condensed numbers and names, then compact captions and stamped sources underneath. Each project is a full-viewport plate opened by a thick rule, with its headline number in red on the left and its figures on the right. Red is a signal, not a decoration: it marks the one thing to act on or the one number to read.

Confirmed rejections: the previous editorial look (cream paper, serif italics, marquees, manifesto, preloader), the dev-portfolio hero plus card grid, gradients, shadows and rounded corners.

**Key Characteristics:**
- Two inks plus paper: black for mass, red for signal, a grey only for secondary text.
- One variable family (Archivo, wdth 62–125, wght 100–900), heavy and condensed for display, tabular numerals everywhere.
- Strict 12-column grid, flush-left, ragged-right.
- Thick 6px rules open sections; 1.5px hairlines divide rows.
- Square corners on everything; flat, no shadows, no gradients.
- Charts in two inks with hatching, series labelled on the shape, every figure stamped with its source file.
- One motion: a left-to-right plotter wipe on figures, off under reduced motion.

## Colors

Two inks on poster stock: a near-black that does all the structural work and a single warm signal red used sparingly.

### Primary
- **Signal Red** (`signal-red`): the call to look or act. Used for the primary "see the projects" button, the "busco prácticas" phrase in the role line, each plate's key number, step counters, the current nav link and its underline, hover state on links and index numbers, the source stamp square, the red hatching series in charts, focus outlines and text selection. On paper it passes AA for body text.
- **Signal Red on Ink** (`signal-red-on-ink`): a lighter red used only for hover text on the black contact band, where Signal Red would fall below AA.

### Neutral
- **Poster Stock** (`paper`): the page background and the text colour on black surfaces.
- **Press Black** (`ink`): all text, rules, hairlines, chart mass and the default button. Also the full-bleed background of the contact band.
- **Graphite** (`ink-2`): secondary text only: figure sources, Q&A notes, dimmed chart labels, the footer divider on the black band.
- **Pale Stock** (`paper-dim`): secondary text on the black band (link keys, footer).

### Named Rules
**The Two Inks Rule.** Paper, black and red are the whole palette. Graphite and Pale Stock are tints of text, never fills, panels or chart series.

**The Signal Rule.** Red marks one thing per region: the action, the key number or the current state. If two reds compete in the same view, one of them is wrong.

## Typography

**Display Font:** Archivo variable, self-hosted (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Archivo (same family)

**Character:** A single grotesk stretched across its width axis: compressed and near-black at 72–85% width for names, numbers and headings; normal width and regular weight for reading. Numbers are always tabular and lining, so figures stack in columns like a data table.

### Hierarchy
- **Display** (860, step-4 capped at 13.5vh, 0.84, wdth 78%, -0.035em): the name in the hero, three stacked lines.
- **Display Key** (860, step-4, 0.86, wdth 72%, -0.035em): each plate's headline number, in red.
- **Headline** (850, step-3, 0.92, wdth 80%, -0.03em): section headings and the contact heading; balanced wrapping.
- **Title** (820, step-2, 1.02, wdth 85%, -0.02em): project plate titles, max 26ch.
- **Figure Number** (820, step-2, 1, wdth 75%, -0.02em): the four numbers in the hero project index.
- **Lede** (600–650, step-1, 1.3): role line, key-number explanations, about lede, contact lede, stack rows; max 30–38ch.
- **Body** (400, step-0, 1.5): running text, max 62ch.
- **Caption** (400, step--1, 1.35): figure captions (with a bold "Fig. n"), sources, metadata, max 78ch.
- **Label** (800, step--1, 0.04em, uppercase): sub-section heads inside plates (sitting on a hairline), Q&A keys, education status, contact link keys.

The ramp is fluid: step--1 `clamp(0.875rem, …, 0.9375rem)`, step-0 `clamp(1rem, …, 1.125rem)`, step-1 `clamp(1.25rem, …, 1.625rem)`, step-2 `clamp(1.625rem, …, 2.5rem)`, step-3 `clamp(2.25rem, …, 4.25rem)`, step-4 `clamp(3.5rem, …, 9.25rem)`. Chart text uses fixed SVG sizes: 13px small, 15px/600 medium, 17px/800 large; the hero chart scales these up (17px, 19px/700), and phones scale them up again so labels stay legible after the SVG shrinks.

### Named Rules
**The Condensed Mass Rule.** The heavier the type, the narrower it gets. Display roles sit at 72–85% width and 820–860 weight with negative tracking; reading text stays at normal width and weight.

**The Tabular Rule.** Every number on the page uses tabular lining figures. Numbers are the content; they must align.

## Layout

A strict 12-column grid (`repeat(12, minmax(0, 1fr))`) with a fluid column gap (`col-gap`) and fluid side gutters (`gutter`). Everything is flush-left and ragged-right; nothing is centred.

- **Hero:** one viewport tall (100svh minus the nav, 600–1100px). Text takes columns 1–6, the CO₂ chart columns 7–12, and a four-up project index runs full width underneath on a 6px rule.
- **Section heads:** heading on columns 1–8, a short intro on 9–12, aligned to the bottom.
- **Plates:** each project is one viewport tall, opened by a 6px rule. Text on columns 1–5, figures on 7–12; above 1100px the shorter column sticks under the nav.
- **About:** photo on columns 1–4, text on 6–12. **Stack:** a 12-column definition table (3 / 6 / 3).
- **Contact:** a full-bleed black band with the email at poster scale.

Vertical rhythm: sections open with `section-top` and close with `section-bottom`; inside plates, rows are spaced by fluid gaps of roughly 20–44px.

Responsive: at 1100px the hero becomes 7/5 and plates 6/6. At 860px everything stacks to one column, the nav wraps to two rows (nav height becomes 100px) with horizontally scrolling links, and the index and contact links become 2-up. At 520px the index and links go to one column, the nav CV button drops its label, and the RAG flow becomes 2-up.

## Elevation & Depth

Completely flat. There are no shadows and no gradients. Depth comes from ink weight alone: the 6px rule opens a major block, the 1.5px hairline divides rows and frames screenshots, and the inverted black contact band closes the page. The sticky nav sits on solid paper with a hairline under it, not a shadow. The only `box-shadow` values in the build are inset strokes standing in for borders (the line button's 2px outline, the current nav link's 3px underline).

### Named Rules
**The Ink Weight Rule.** Hierarchy between blocks is a rule, never a lift. A 6px rule opens a section or plate; a 1.5px hairline separates items within it. No drop shadows, glows or blur.

## Shapes

Square corners everywhere (`rounded.none`). Shapes are rectangles: solid button blocks, solid square bullets (0.5em) for lists, a red square (0.6em) stamped before every source line, and bordered boxes only for screenshots. Charts use the same geometry: stacked areas, flat bars, square-cut hatching (2.6px strokes on a 7px tile, black at 45°, red at -45°) to tell series apart without a third colour. Photos are greyscale and multiplied into the paper; screenshots regain their colour on hover.

## Components

### Buttons
Solid, square ink blocks that read like poster labels.
- **Shape:** square corners (0), 52px tall, padding 0 1.25em, weight 700, with an optional 1em inline SVG icon.
- **Primary:** Press Black block with paper text (the CV download).
- **Signal:** Signal Red block with paper text (the single "see the projects" action).
- **Hover / Focus:** the two swap: black turns red, red turns black, over 0.2s. Focus is a 3px Signal Red outline offset by 3px. Transitions are removed under reduced motion.
- **Line:** transparent with a 2px inset black stroke; fills black on hover.
- **Compact (nav):** 40px tall, caption size; the label hides below 520px, leaving only the icon.

### Language toggle
Two square segmented buttons (ES / EN), at least 44×40px, with 2px black borders sharing one edge. The pressed state is a solid black fill with paper text.

### Navigation
A sticky paper bar (56px) with a hairline underneath: the name on the left in weight 800, section links at 600 on the right, then the language toggle and the compact CV button. The current section link turns red with a 3px red underline drawn as an inset stroke. Below 860px the links move to a second row and scroll horizontally.

### Figures
The core component. A figure is an SVG chart, then a caption ("Fig. n" in bold, then a plain description), then a source line in Graphite led by a red square stamp naming the CSV or query it came from. Charts are drawn in two inks with hatching, series are labelled directly on their shapes, axes are 2px black, and gridlines are 0.6px black at 35% opacity.

### Scrubbable hero chart (signature)
The CO₂ stacked area in the hero can be scrubbed: a crosshair cursor, a 1.5px vertical black line and a paper dot with a black ring follow the pointer, and the arrow keys step through the years when the chart has focus. A readout row above the caption, opened by a hairline, shows the year in bold at body size and each source's value; it is announced politely to screen readers. On touch, vertical scrolling stays native.

### Plotter wipe (motion)
Figures draw in once from left to right using a clip-path wipe (1.6s, `cubic-bezier(0.16, 1, 0.3, 1)`) when they scroll into view. Figures are visible by default; the wipe only runs when JavaScript, IntersectionObserver and motion are all available, and it is off under reduced motion.

### Index and plate key
The hero index is four links in a row on a 6px rule: a condensed number in Figure Number style, then a caption label; the number turns red on hover. Each plate leads with its Display Key number in red over a Lede sentence in black.

### Ruled lists and tables
Q&A, education and stack rows are all the same pattern: a 6px or 1.5px rule on top, then rows divided by hairlines, with uppercase Label keys on the left and content on the right. Lists use solid square bullets; numbered steps use red counters in weight 850.

## Do's and Don'ts

### Do:
- **Do** limit colour to paper, Press Black and Signal Red, with Graphite only for secondary text.
- **Do** open every section and project plate with a 6px black rule and divide rows with 1.5px hairlines.
- **Do** set display type condensed and heavy (wdth 72–85%, weight 820–860, negative tracking) and every number in tabular lining figures.
- **Do** place content on the 12-column grid, flush-left and ragged-right.
- **Do** stamp every figure with a caption and a source line naming the file it came from.
- **Do** label chart series on the shape and separate them with hatching, never with a third colour.
- **Do** keep the plotter wipe as the only entrance motion, start from a visible state, and turn it off under reduced motion.
- **Do** use Signal Red on Ink, not Signal Red, for small red text on the black band.

### Don't:
- **Don't** round corners, add drop shadows, or use gradients anywhere.
- **Don't** wrap content in cards or tinted panels; use rules and the grid.
- **Don't** introduce a second typeface or a serif; the old editorial look (cream paper, serif italics, marquees, preloader) is retired.
- **Don't** use red for more than one signal per region, or as a decorative fill.
- **Don't** add scroll-triggered fades, parallax or other motion beyond the plotter wipe and the 0.2s colour swaps on hover.
- **Don't** centre headings or body text.
