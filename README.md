Awesome—let’s ship **seersearch.com** fast with **Astro + Cloudflare Pages**. Below is a copy-paste spec for your coding agent: exact tech choices, file layout, commands, page structure, component list, and code snippets (incl. Calendly). It follows the Haize Labs vibe (clean, serif headline, generous whitespace) and uses your dashboard mockups as hero + product art.

---

# Build spec — Seer website (Astro + Cloudflare Pages)

## 0) Tech & design system

* **Framework:** Astro (static, zero-JS by default)
* **Styling:** Tailwind CSS + a minimal design token layer
* **Fonts:**

  * Headline: `Besley` (serif) or `Playfair Display` (Google Fonts)
  * Body/UI: `Inter` (Google Fonts)
* **Color palette (light mode first):**

  * `--bg: #0B0E12` (near black) or white depending on theme choice (pick one; spec below assumes **light**)
  * `--text: #0E1217`
  * `--muted: #5B6472`
  * `--brand: #0A84FF` (primary CTA)
  * `--surface: #F6F7F9` (cards)
  * Success chip: `#1DB954`
* **Icons:** Lucide (SVG)
* **Analytics:** Cloudflare Web Analytics (free)
* **Forms:** None (just Calendly)
* **Images:** Place provided screenshots in `/public/assets/…`; we’ll use `.webp` where possible.

---

## 1) Repo bootstrap

```bash
# Create project
npm create astro@latest seer-web -- --template minimal
cd seer-web

# Tailwind
npx astro add tailwind

# Dependencies
npm i @fontsource/inter @fontsource/playfair-display lucide-static

# Dev
npm run dev
```

**astro.config.mjs** (ensure static output):

```js
import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static'
});
```

**tailwind.config.cjs** tweaks:

```js
module.exports = {
  content: ['./src/**/*.{astro,html,md,mdx,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0A84FF',
        surface: '#F6F7F9',
        text: '#0E1217',
        muted: '#5B6472',
        success: '#1DB954',
      },
      boxShadow: {
        card: '0 6px 30px rgba(2, 8, 23, 0.06)'
      },
      borderRadius: { xl2: '1.25rem' }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['"Playfair Display"', 'serif']
    }
  }
};
```

**src/styles/global.css**:

```css
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/playfair-display/600.css";
@tailwind base; @tailwind components; @tailwind utilities;

:root {
  --container: 1200px;
}
.container { max-width: var(--container); margin-inline: auto; padding-inline: 1rem; }
.card { @apply bg-white shadow-card rounded-2xl; }
.chip { @apply inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-surface text-text; }
```

---

## 2) File tree

```
seer-web/
  public/
    assets/
      hero-dashboard.webp
      perf-charts-1.webp
      perf-charts-2.webp
      ab-funnel.webp
      recall-cards.webp
      badge-variant-wins.webp
      # (use your screenshots; rename logically)
    favicon.svg
  src/
    components/
      Header.astro
      Footer.astro
      Hero.astro
      StatCard.astro
      FeatureIcon.astro
      LogoGrid.astro
      Section.astro
      MetricCard.astro
      ComparisonTable.astro
      CTA.astro
      CalendlyEmbed.astro
      NavBar.astro
    layouts/
      Base.astro
    pages/
      index.astro
      products/
        change-testing.astro
        monitoring.astro
      book-demo.astro
      404.astro
    content/
      copy.ts
```

---

## 3) Shared layout & header/footer

**src/layouts/Base.astro**

```astro
---
const { title = 'Seer — Evaluate & Monitor RAG', description = 'Self-improving search: change testing & production monitoring with small, private evaluator models.' } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" />
    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/assets/hero-dashboard.webp" />
  </head>
  <body class="font-sans text-text bg-white antialiased">
    <NavBar />
    <slot />
    <Footer />
    <!-- Cloudflare Web Analytics -->
    <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "REPLACE_WITH_TOKEN"}'></script>
  </body>
</html>
```

**src/components/NavBar.astro**

```astro
---
const links = [
  { href: '/products/change-testing', label: 'Change testing' },
  { href: '/products/monitoring', label: 'Monitoring' },
  { href: '/book-demo', label: 'Book a demo' },
];
---
<header class="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-gray-100">
  <div class="container flex h-14 items-center justify-between">
    <a href="/" class="font-serif text-2xl">Seer</a>
    <nav class="hidden md:flex items-center gap-8">
      {links.map(l => <a class="text-sm text-muted hover:text-text" href={l.href}>{l.label}</a>)}
    </nav>
    <a href="/book-demo" class="ml-4 inline-flex items-center rounded-full bg-brand text-white px-4 py-2 text-sm">Book demo</a>
  </div>
</header>
```

**src/components/Footer.astro**

```astro
<footer class="mt-24 border-t border-gray-100">
  <div class="container py-10 text-sm text-muted flex items-center justify-between">
    <span>© {new Date().getFullYear()} Seer</span>
    <div class="flex gap-6">
      <a href="/products/change-testing">Change testing</a>
      <a href="/products/monitoring">Monitoring</a>
      <a href="/book-demo">Book demo</a>
    </div>
  </div>
</footer>
```

---

## 4) Home page (index)

**Hero**: left copy + CTAs, right large dashboard mockup.

**src/components/Hero.astro**

```astro
---
const { title, subtitle, img } = Astro.props;
---
<section class="container grid lg:grid-cols-2 gap-10 items-center py-16">
  <div>
    <h1 class="font-serif text-5xl leading-tight">Evaluate & monitor your RAG like a pro.</h1>
    <p class="mt-4 text-lg text-muted">{subtitle}</p>
    <div class="mt-8 flex gap-3">
      <a href="/book-demo" class="inline-flex items-center rounded-full bg-brand text-white px-5 py-3">Book a demo</a>
      <a href="/products/change-testing" class="inline-flex items-center rounded-full bg-surface px-5 py-3">See products</a>
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <span class="chip">Private LoRA evaluators</span>
      <span class="chip">Change testing in CI</span>
      <span class="chip">Real-time production monitoring</span>
    </div>
  </div>
  <img src={img} alt="Seer dashboard" class="rounded-2xl shadow-card" loading="eager" width="1200" height="720" />
</section>
```

**src/pages/index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
import MetricCard from '../components/MetricCard.astro';
import ComparisonTable from '../components/ComparisonTable.astro';
---
<Base title="Seer — Search change testing & monitoring" description="Small privacy-safe evaluator models that auto-grade RAG quality.">
  <Hero
    title="Evaluate & monitor your RAG like a pro."
    subtitle="Seer uses small open-source models fine-tuned to auto-grade retrieval quality—groundedness, coverage, and per-passage attributions. Ship changes safely and catch regressions in production."
    img="/assets/hero-dashboard.webp" />

  <Section title="Why Seer">
    <div class="grid md:grid-cols-3 gap-6">
      <MetricCard title="SOTA accuracy" desc="4B LoRA matches GPT-5 on HotpotQA while costing ~4–8× less per eval." />
      <MetricCard title="CI change testing" desc="Grade unlabeled diffs on every PR with clear win/loss verdicts." />
      <MetricCard title="Production monitoring" desc="Continuous KPIs (recall@k, precision@k, groundedness, citations) with alerts." />
    </div>
  </Section>

  <Section title="What you’ll see (real screenshots)">
    <div class="grid md:grid-cols-2 gap-6">
      <img src="/assets/ab-funnel.webp" class="card" alt="A/B funnel" />
      <img src="/assets/recall-cards.webp" class="card" alt="Retrieval cards" />
      <img src="/assets/perf-charts-1.webp" class="card" alt="Performance charts" />
      <img src="/assets/perf-charts-2.webp" class="card" alt="More charts" />
    </div>
  </Section>

  <Section title="Benchmarks">
    <ComparisonTable />
  </Section>

  <Section>
    <div class="card p-8 flex items-center justify-between gap-6">
      <div>
        <h3 class="font-serif text-3xl">Ready to evaluate your search?</h3>
        <p class="text-muted mt-2">Book a 30-min walkthrough with live metrics from your data.</p>
      </div>
      <a href="/book-demo" class="inline-flex items-center rounded-full bg-brand text-white px-6 py-3">Book a demo</a>
    </div>
  </Section>
</Base>
```

**src/components/Section.astro**

```astro
---
const { title } = Astro.props;
---
<section class="container py-14">
  {title && <h2 class="font-serif text-3xl mb-6">{title}</h2>}
  <slot />
</section>
```

**src/components/MetricCard.astro**

```astro
---
const { title, desc } = Astro.props;
---
<div class="card p-6">
  <h3 class="font-semibold">{title}</h3>
  <p class="text-muted mt-2">{desc}</p>
</div>
```

**src/components/ComparisonTable.astro** (use your numbers; edit later)

```astro
<table class="w-full text-sm card p-6">
  <thead class="text-left text-muted">
    <tr>
      <th class="py-2">Model</th>
      <th>Accuracy</th><th>Macro F1</th><th>Micro F1</th><th>Cost / req</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Seer (Qwen3-4B)</td><td>0.777</td><td>0.860</td><td>0.870</td><td>$0.0012–$0.0023</td></tr>
    <tr><td>GPT-5</td><td>0.776</td><td>0.878</td><td>0.866</td><td>$0.00812</td></tr>
    <tr><td>GPT-5-mini</td><td>0.733</td><td>0.868</td><td>0.843</td><td>$0.001624</td></tr>
    <tr><td>GPT-5-nano</td><td>0.628</td><td>0.721</td><td>0.752</td><td>$0.000325</td></tr>
    <tr><td>Seer (Qwen3-1.7B)</td><td>0.661</td><td>0.763</td><td>0.779</td><td>$0.0005–$0.0011</td></tr>
  </tbody>
</table>
```

---

## 5) Product pages

### A) Change testing — `/products/change-testing.astro`

* Hero: “Ship search changes with confidence.”
* Sections:

  1. **How it works** (CI hook → upload rollouts → Seer eval → A/B verdict card; use `badge-variant-wins.webp`)
  2. **Metrics we compute**: recall@k, precision@k, nDCG, groundedness, citation rate, answerable, hops/docs per query.
  3. **Integrations**: Github Actions snippet (pseudo) & API call example.
  4. **CTA**.

Skeleton:

```astro
---
import Base from '../../layouts/Base.astro';
import Section from '../../components/Section.astro';
---
<Base title="Change testing — Seer">
  <section class="container grid lg:grid-cols-2 gap-10 items-center py-16">
    <div>
      <h1 class="font-serif text-5xl">Ship search changes with confidence.</h1>
      <p class="mt-4 text-lg text-muted">Auto-grade unlabeled diffs on every PR. Clear win/loss and per-metric lift.</p>
      <a href="/book-demo" class="inline-flex mt-6 rounded-full bg-brand text-white px-5 py-3">Book a demo</a>
    </div>
    <img src="/assets/badge-variant-wins.webp" alt="Variant wins card" class="rounded-2xl shadow-card" />
  </section>

  <Section title="Metrics we compute">
    <ul class="grid md:grid-cols-3 gap-6 text-sm">
      <li class="card p-5">Recall@k & Precision@k</li>
      <li class="card p-5">nDCG & MRR</li>
      <li class="card p-5">Groundedness & Hallucination</li>
      <li class="card p-5">Citation rate & correctness</li>
      <li class="card p-5">Answerable (coverage)</li>
      <li class="card p-5">Docs/hops per query</li>
    </ul>
  </Section>

  <Section title="Example verdict">
    <img src="/assets/ab-funnel.webp" alt="A/B funnel" class="card" />
  </Section>

  <Section>
    <div class="card p-8 flex items-center justify-between gap-6">
      <div>
        <h3 class="font-serif text-3xl">Plug Seer into your CI</h3>
        <p class="text-muted mt-2">Send rollouts, receive verdicts & charts back.</p>
      </div>
      <a href="/book-demo" class="inline-flex items-center rounded-full bg-brand text-white px-6 py-3">Book a demo</a>
    </div>
  </Section>
</Base>
```

### B) Monitoring — `/products/monitoring.astro`

* Hero: “See your RAG drift before customers do.”
* Sections:

  1. **Live KPIs** (use time-series screenshots)
  2. **Alerting** (webhook/email/Slack copy)
  3. **Per-source breakdown** (embedding/BM25/KG/Web)
  4. **CTA**

Use the same pattern as above and drop in `perf-charts-1.webp`, `perf-charts-2.webp`.

---

## 6) Book demo page

**src/components/CalendlyEmbed.astro**

```astro
---
const org = 'benlc';
const url = `https://calendly.com/${org}`;
---
<section class="container py-16">
  <h1 class="font-serif text-4xl mb-4">Book a demo</h1>
  <p class="text-muted mb-8">Pick a time that works—we’ll walk through evaluation on your data.</p>
  <div class="card p-4">
    <div class="calendly-inline-widget" data-url={url} style="min-width:320px;height:760px;"></div>
  </div>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
</section>
```

**src/pages/book-demo.astro**

```astro
---
import Base from '../layouts/Base.astro';
import CalendlyEmbed from '../components/CalendlyEmbed.astro';
---
<Base title="Book a demo — Seer">
  <CalendlyEmbed />
</Base>
```

---

## 7) Content file (single source of truth for key copy)

**src/content/copy.ts** — include your confidential product summary & benchmark numbers so we can reuse across pages later. (No runtime code depends on this for v1; optional.)

---

## 8) Accessibility & performance checklist

* `alt` text on all images, descriptive.
* Convert PNGs to **WebP** (`public/assets/*.webp`) and keep max width ~1600px.
* Add `loading="lazy"` on below-the-fold images.
* Use semantic headings in order (H1 → H2).
* Color contrast ≥ 4.5:1 (brand on white passes).
* Lighthouse target ≥ 95.

---

## 9) SEO, sitemap & robots

Add **sitemap** and **robots** statically:

`public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://seersearch.com/sitemap.xml
```

`public/sitemap.xml` (simple static for 4 pages; update if structure changes)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://seersearch.com/</loc></url>
  <url><loc>https://seersearch.com/products/change-testing</loc></url>
  <url><loc>https://seersearch.com/products/monitoring</loc></url>
  <url><loc>https://seersearch.com/book-demo</loc></url>
</urlset>
```

---

## 10) Deploy on Cloudflare Pages

**One-time:**

1. Push repo to GitHub (private or public).
2. In Cloudflare → **Pages** → “Create project” → connect GitHub → select `seer-web`.
3. **Build settings:**

   * Framework preset: **Astro**
   * Build command: `npm run build`
   * Build output dir: `dist`
   * Node version: `20`
4. Add **Custom domain** → `seersearch.com`.

   * DNS: Pages will suggest a CNAME; accept and verify.
5. Add **Analytics** (Cloudflare Web Analytics) and paste token in `Base.astro`.

**Local preview/deploy:**

```bash
npm run build
npm run preview
# commit & push; Pages auto-builds
```

---

## 11) Security headers (set in Pages → “Headers”)

Create `_headers` file in `public/`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self';
    img-src 'self' data:;
    style-src 'self' 'unsafe-inline' https://assets.calendly.com;
    script-src 'self' https://assets.calendly.com https://static.cloudflareinsights.com;
    connect-src 'self';
    frame-src https://calendly.com https://assets.calendly.com;
```

---

## 12) Copy draft (you can refine later)

**Hero:**

> Evaluate & monitor your RAG like a pro.
> Seer uses small privacy-safe evaluator models to grade retrieval quality—groundedness, coverage, and per-passage attributions—so you can ship changes safely and catch regressions in production.

**Value props:**

* **SOTA accuracy, tiny cost:** Our 4B LoRA matches GPT-5 quality on HotpotQA at 4–8× lower cost.
* **CI change testing:** Every PR gets a verdict with recall/precision lift and citation robustness.
* **Production monitoring:** Live KPIs, alerting, per-source breakdown, and trend charts.

**Benchmarks note:**
“Numbers shown are on HotpotQA using our gold-passage evaluator; more in the appendix during the demo.”

---

## 13) Nice-to-have polish (if time permits)

* Subtle card hover (`translate-y-0.5` + `shadow`).
* Scroll-reveal animations (Astro Islands + tiny JS).
* Dark mode (follow Tailwind `dark:` toggled via `data-theme="dark"` later).
* OG image generation (optional).

---

## 14) Exact tasks for the coding agent

1. Create Astro project + Tailwind (commands in §1).
2. Add global styles & theme tokens (§1).
3. Add components & layout files exactly as in §2–§6.
4. Put provided screenshots into `public/assets/` and convert to `.webp`.
5. Wire pages:

   * `/` (home) using components.
   * `/products/change-testing`
   * `/products/monitoring`
   * `/book-demo` with Calendly embed.
   * `/404.astro` (simple “Page not found”).
6. Add `robots.txt`, `sitemap.xml`, `favicon.svg`, `_headers`.
7. Replace `REPLACE_WITH_TOKEN` with Cloudflare Web Analytics token.
8. Run `npm run build && npm run preview` and fix any console warnings.
9. Push to GitHub and connect Cloudflare Pages; map `seersearch.com`.
10. After live, run Lighthouse and ensure Performance/SEO/Best Practices/Accessibility ≥ 95.

---

If you want, I can also supply a minimalist **Haize-like** hero typography CSS variant (bigger serif, tighter leading). But the spec above is ready for your agent to implement end-to-end.
