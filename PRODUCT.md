# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/vanilla JS, no framework and no build step (user's choice). Deployed on Vercel like the previous portfolio. Charts are hand-built SVG generated from the real CSV outputs of the projects.

## Users

- **Primary: recruiters and hiring managers for Data Science / Data Analytics internships** (prácticas), mostly in Spain. They skim in under a minute, often from a LinkedIn link, sometimes on a phone. Job: decide whether Alfredo is worth an interview.
- **Secondary: technical leads / tutors** who open a project to check depth: data handled, method, real results, code on GitHub.
- **Tertiary: people with a small freelance or collaboration request.** Welcome, but never the headline.

## Product Purpose

Personal portfolio of Alfredo Brocal Serrano. Success = a recruiter understands in one glance who he is (Data Science student at UCM looking for internships), sees proof of real work, and gets to the CV or a contact channel in one click.

## Positioning

A data student whose portfolio *is* data: findings with real numbers from his own datasets, each traceable to a repo. Background in information management (Gestión de Información y Contenidos Digitales) gives him a bias for traceability and clear communication of results.

## Operating Context

Visitors arrive from LinkedIn, the CV PDF, or GitHub. They compare many junior candidates. Mobile and desktop both matter. Spanish by default; international recruiters need English.

## Capabilities and Constraints

- Bilingual ES/EN; the chosen language persists across visits.
- Each project must be linkable (own URL/hash), keyboard accessible, and lead to its GitHub repo.
- CV downloadable as PDF (`assets/CV_Alfredo_Brocal_Serrano.pdf`).
- Availability: looking for internships (prácticas) while studying the MSc. No start date confirmed; do not invent one.
- Location (confirmed 2026-11-16): Elche (Alicante) · Madrid · remoto. UCM mentions stay as they are.

## Brand Commitments

- Name: Alfredo Brocal Serrano.
- Contact: alfredobrocalserrano@gmail.com, LinkedIn /in/alfredo-brocal-serrano-a0b1a73ab, GitHub @alfredobrocalserrano, CV PDF. Phone removed from the site at the user's request (2026-11-16).
- The previous editorial look (cream paper, Fraunces italics, marquees, manifesto, preloader) is explicitly being replaced; treat it as anti-reference.

## Evidence on Hand

- Education: Grado en Gestión de Información y Contenidos Digitales (completed); Google Data Analytics certificate (completed); Máster en Data Science, UCM (in progress).
- Projects (all with public repos under github.com/alfredobrocalserrano):
  0. **Hotel tourism forecast, Costa Blanca** (2026, added 2026-11-17, shown first) — INE Hotel Occupancy Survey since 1999 + Eurostat; DuckDB, statsmodels, LightGBM + SARIMAX, SHAP, GitHub Actions; live site on GitHub Pages. MAPE 3.56% (2023–2026). Figure data copied to data/raw/turismo_*.csv from the live datos.json (generated 2026-11-17). The 61% foreign share and the Easter effect come from the user, not from that file.
  1. **CO₂ emissions 1900–2021** (2026) — Pandas, SQL in DBeaver, Google Sheets dashboard; Global Carbon Budget 2022 data. Repo has CSV outputs (global evolution by source, top-10 ranking, countries improving).
  2. **RAG assistant over corporate annual reports** (2026) — ~2,199 pages from Iberdrola, BBVA, Santander, Inditex; LangChain, ChromaDB, HuggingFace embeddings, MMR, Llama 3.3 70B via Groq, Gradio. Repo has KPI and sentiment CSVs.
  3. **Google Play Store EDA** (2025) — 10K+ apps, Python (Colab), Power BI, DAX; paid apps +0.49 rating, 100 MB download barrier, 4-page dashboard.
  4. **Spanish tweet sentiment dataset cleaning** (2025) — 68,432 → 63,639 rows (4,125 duplicates, 602 nulls removed); class distribution Negative 19,569 · Positive 17,148 · Neutral 15,140 · Irrelevant 11,782.
- Assets: portrait.jpg, four project screenshots, CV PDF, 12 tool logos.
- Absent and must not be fabricated: work experience, testimonials, ML model metrics, RAG evaluation scores, start date.

## Product Principles

1. Evidence before adjectives: show the number and the repo, not "domino" or "alto impacto".
2. One glance answers who / what role / where / how to contact.
3. Every claim traces back to a project or a file.
4. Honest level: student seeking internships, proud of real work, no overclaiming.

## Accessibility & Inclusion

WCAG 2.1 AA: full keyboard access, visible focus, AA contrast, no text under 12px for meaningful content, respects prefers-reduced-motion.
