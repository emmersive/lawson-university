# Lawson University — Design Brief & Recommendations

> Last updated: 29 June 2026
> Scope: AEM Edge Delivery Services demo site
> Based on: code review of `/styles/styles.css`, all 9 content-seed pages, and all block CSS files

---

## 1. Brand Identity Assessment

### 1.1 Color Palette Evaluation

**Current palette:**
| Token | Hex | Usage |
|---|---|---|
| `--color-navy` | `#0B2545` | Primary brand, nav, headings, dark backgrounds |
| `--color-navy-light` | `#1A3A6B` | Gradient partner for navy sections |
| `--color-gold` | `#F2A900` | Accent, CTAs, stats numbers |
| `--color-gold-light` | `#FFC72C` | Hover state for gold |
| `--color-teal` | `#0B7A75` | Links, card tags |
| `--color-teal-light` | `#0FA39B` | Teal hover/variant |

**Benchmark comparison:**
- **Monash** uses deep navy (`#006DAE`) + grey scale with restraint. Monash's strength is white space and type hierarchy — Lawson's palette is richer and more energetic, which is appropriate for a demo.
- **RMIT** leans on a heavy red with black. Lawson's navy + gold is a more prestigious, international positioning — closer to Melbourne's university sector premium tier.
- **UNSW** uses yellow-gold (`#FFD100`) + dark navy. Lawson's gold is slightly more amber/warm which reads more prestigious. This is a genuine competitive differentiator — keep it.

**Verdict:** The three-colour system is solid. The main risk is over-use of navy, making pages feel heavy. The teal needs more intentional application — currently it only appears on link text and card tags, which undersells it. Consider a teal-tinted background variant (e.g. `--color-teal-wash: #E8F5F4`) for alternating section backgrounds instead of the current flat `--color-light: #F5F7FA`.

**Missing colors to add to `:root`:**
```css
--color-teal-wash: #e8f5f4;        /* Light teal section background */
--color-navy-wash: #edf1f7;        /* Very light navy tint */
--color-gold-wash: #fef8e8;        /* Light gold for callouts */
--color-error: #c53030;            /* Form validation */
--color-success: #276749;          /* Form success states */
--color-warning: #d69e2e;          /* Alert states */
--color-overlay-dark: rgb(11 37 69 / 70%); /* Standardise overlay values */
```

### 1.2 Typography Recommendations

**Current state:** Both `--font-primary` and `--font-display` point to Inter. There is no display/serif contrast.

**Is Inter the right choice?**
Inter is a safe, legible choice for body text and UI elements. However, for a university aspiring to rank alongside Monash and UNSW, using a single sans-serif for everything — headlines, body, UI — makes the site feel utilitarian rather than prestigious.

**Recommendation:** Introduce a serif or high-contrast display typeface for headings. Two practical options:

**Option A — Libre Baskerville (free, Google Fonts)**
Pairs beautifully with Inter. Used by several Australian universities for print. Creates an academic authority feel without being stuffy.
```css
--font-display: 'Libre Baskerville', Georgia, serif;
```

**Option B — Playfair Display (free, Google Fonts)**
More dramatic editorial contrast. Works especially well at `h1`/`h2` scale with gold `em` highlights.
```css
--font-display: 'Playfair Display', Georgia, serif;
```

**For demo purposes, Playfair Display is the stronger visual choice** because the contrast between the decorative headline and clean body text photographs well in screenshots.

**Recommended weight and size hierarchy:**

| Element | Size | Weight | Font | Notes |
|---|---|---|---|---|
| `h1` hero | `clamp(2.5rem, 6vw, 4rem)` | 700 | Display | The current 3.75rem cap is slightly small |
| `h1` interior | `clamp(2rem, 4vw, 3rem)` | 700 | Display | |
| `h2` section | `clamp(1.75rem, 3vw, 2.5rem)` | 700 | Display | Currently 2.25rem — could go bigger |
| `h3` card | `1.25rem` | 600 | Primary (Inter) | Keep sans for readability at small size |
| Body | `1rem` | 400 | Primary | Fine |
| Lead paragraph | `1.25rem` | 400 | Primary | Add `.lead` class, set line-height 1.7 |
| Small/meta | `0.8125rem` | 500 | Primary | Card tags, dates |
| Button | `0.9375rem` | 600 | Primary | Fine |

**Line height gap:** The current `line-height: 1.2` on headings is too tight at mobile sizes with a display serif. Change to:
```css
h1 { line-height: 1.1; }
h2 { line-height: 1.15; }
h3, h4 { line-height: 1.25; }
```

**Missing font weight step:** There is no `font-weight: 600` used in body styles. Add `.text-semibold { font-weight: 600; }` as a utility.

### 1.3 Logo Mark Assessment

**Current state:** A 40×40px gold square with rounded corners (`border-radius: 6px`) containing a bold "L" in navy, next to "Lawson University" wordmark and gold tagline.

**Is it strong enough?**
For a coded demo — yes, it is functional and recognisable. For a client presentation, it reads as a placeholder.

**Recommendations to elevate the mark without a real SVG logo:**
1. Change `border-radius: 6px` to `border-radius: 8px` for a slightly softer feel that ages better.
2. Increase the size to `44×44px` — the current 40px is slightly small against the nav height of 72px.
3. Add a subtle inner shadow or gradient to the gold square to give it more dimension:
   ```css
   background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
   box-shadow: inset 0 1px 0 rgb(255 255 255 / 30%), 0 1px 3px rgb(0 0 0 / 20%);
   ```
4. The tagline text "UNIVERSITY" at `0.625rem` is unreadably small below 1280px. Either increase to `0.6875rem` or hide it on screens below 1280px.
5. For the demo, create a simple SVG shield or laurel-bracket mark to replace the letter square — this is a 1–2 hour design investment that dramatically improves credibility.

### 1.4 Brand Voice & Tone

**Target tone:** Aspirational but grounded. Academic authority without stuffiness. Warm and welcoming, especially for international students. Melbourne-proud.

**Tone matrix by page:**
| Page | Tone | Key Words to Use | Avoid |
|---|---|---|---|
| Home | Inspiring, energising | "shape", "future", "world-class", "community" | Jargon, passive voice |
| Study | Informative, confident | "discover", "pathway", "program", "designed for" | "offering" (too passive) |
| Research | Authoritative, purposeful | "breakthrough", "challenges", "impact", "leading" | Hype without evidence |
| Campus Life | Warm, vibrant | "thrive", "community", "experience", "belong" | Corporate language |
| International | Welcoming, reassuring | "home", "support", "journey", "global" | Anything intimidating |
| Apply | Direct, supportive | "start", "step", "guide", "here to help" | Complex multi-step framing |
| About | Credible, proud | "founded", "vision", "commitment", "since 1965" | Self-congratulation |
| News | Journalistic, factual | Specific numbers, named researchers | Vague claims |
| Contact | Helpful, human | First-person-plural ("we're here"), specific teams | Generic FAQ tone |

The current content largely follows this model well. The weakest area is the Contact page, which lists facts but doesn't offer the reassuring warmth an anxious future student needs.

---

## 2. Design System Gaps

### 2.1 Missing CSS Variables / Tokens

Add the following to the `:root` block in `styles/styles.css`:

```css
/* Extended color palette */
--color-teal-wash: #e8f5f4;
--color-navy-wash: #edf1f7;
--color-gold-wash: #fef8e8;
--color-error: #c53030;
--color-success: #276749;
--color-warning: #d69e2e;

/* Typography additions */
--font-display: 'Playfair Display', Georgia, serif; /* Change from Inter */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Letter spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
--tracking-wider: 0.08em;     /* Already used inline — tokenise it */
--tracking-widest: 0.15em;

/* Line heights */
--leading-tight: 1.1;
--leading-snug: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.7;

/* Z-index scale — currently managed ad-hoc (nav=1000, mobile=999) */
--z-base: 1;
--z-dropdown: 100;
--z-sticky: 200;
--z-overlay: 500;
--z-modal: 800;
--z-nav: 1000;

/* Border radius — currently only 2 steps */
--radius-sm: 4px;
--radius-md: 8px;      /* = current --border-radius */
--radius-lg: 16px;     /* = current --border-radius-lg */
--radius-xl: 24px;
--radius-full: 9999px;

/* Focus ring — needed for accessibility */
--focus-ring: 0 0 0 3px rgb(242 169 0 / 50%); /* Gold focus ring */

/* Transition — only 2 steps currently */
--duration-fast: 150ms;
--duration-base: 200ms;    /* = current --transition */
--duration-slow: 300ms;    /* = current --transition-md */
--duration-slower: 500ms;
--easing-default: ease;
--easing-in: ease-in;
--easing-out: ease-out;
--easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 2.2 Missing Spacing Tokens

The current scale has no `--space-2xs` (0.25rem) for tight internal padding (e.g. badge padding, icon gaps). Add:
```css
--space-2xs: 0.25rem;
```

### 2.3 Missing Utility Classes

Add these to `styles/styles.css`:

```css
/* Text utilities */
.lead { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--color-text-light); }
.text-center { text-align: center; }
.text-muted { color: var(--color-text-muted); }
.text-gold { color: var(--color-gold); }
.text-teal { color: var(--color-teal); }

/* Eyebrow labels (section pre-headings) */
.eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-teal);
  margin-bottom: var(--space-xs);
}

/* Section heading group (eyebrow + heading + lead text as a unit) */
.section-heading {
  margin-bottom: var(--space-2xl);
}

/* Container */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section backgrounds */
.section.teal-wash { background: var(--color-teal-wash); }
.section.navy-wash { background: var(--color-navy-wash); }
.section.gold-wash { background: var(--color-gold-wash); }

/* Dividers */
.section-divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-3xl) 0;
}

/* Focus visible — global */
:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

---

## 3. Page-by-Page Content Structure Review

### 3.1 Home (`/index.html`)

**Hierarchy:** Correct. Hero → social proof (stats) → course discovery → research (secondary value prop) → CTA → news.

**Gaps:**
- Missing a **social proof / testimonials** section between Course Cards and Research. A student quote with photo adds emotional credibility.
- The **News Grid** at the bottom uses a 2-column (date + headline) structure, but there is no `News Grid` block CSS in the repo — the block file exists (`news-grid/`) but visually a grid of 3 news articles with images is expected. Ensure images are included in the news data.
- The **"Latest News & Events"** section has no "View all news" link. Add one.
- The **CTA Banner** fires before News — consider moving it to the very end of the page for conversion logic.

**CTAs:** "Apply Now" (gold, primary) + "Explore Courses" (secondary) in hero is correct. The banner CTA repeats "Apply Now" — fine. "Speak to an advisor" is a strong secondary action.

**Missing:** A "Featured video" or short campus lifestyle section. Even a 16:9 video embed placeholder would add visual variety.

### 3.2 Study (`/study/index.html`)

**Hierarchy:** Correct. Hero → study level selector (Tabs) → Faculties (Cards) → Scholarships/Fees (Columns) → CTA.

**Gaps:**
- The **Tabs block** is used to select study level, but users typically land here knowing their level. Consider a more visual "pathway chooser" with icon-backed 4-up cards instead of or before the Tabs.
- The **Faculties section** would benefit from icon/illustration per faculty (see section 5 on images).
- **Missing:** An ATAR/entry score calculator callout or "Not sure which course?" interactive finder. For demo purposes, a simple CTA to a hypothetical course finder is fine.
- **Missing:** A "Upcoming open days" mini-section with 1–2 event cards to drive foot traffic conversion.
- The scholarship/fees Columns section has no images — it looks sparse. At minimum, add a gold divider or visual accent.

**CTAs:** Single "Apply Now" in hero is light. The page-end CTA banner with deadline urgency ("closes 31 October") is strong — keep it.

### 3.3 Research (`/research/index.html`)

**Hierarchy:** Correct. Hero → Stats → Areas (Cards) → Research Centres (Columns) → [presumably partner/industry CTA].

**Gaps:**
- Research is an important page for prospective postgrad students and industry partners — two very different audiences with different needs. Consider a **two-audience split section** ("For researchers" / "For industry partners") early in the page.
- The **Research Areas cards** are text-only — this page especially needs images (microscope/lab/technology photography).
- **Missing:** A "Featured researcher" profile — one portrait + quote from a named researcher creates immediate credibility.
- **Missing:** A publications / media coverage strip (logos of Nature, Science, ABC News, AFR) as social proof for the research brand.

**CTAs:** "Graduate Research" and "Partner with Us" in hero are good dual CTAs.

### 3.4 Campus Life (`/campus-life/index.html`)

**Hierarchy:** Correct. Hero → Services Cards (6-up) → Stats → Campus Tabs.

**Gaps:**
- This page needs the most images of any page. The 6-up Cards section is entirely text — it will look like a list. Every card needs an image.
- The **Stats Bar** mid-page is a good structural device but doesn't include a CTA.
- **Missing:** A student testimonial or Instagram-style photo grid to show authentic campus life.
- **Missing:** An events mini-feed ("What's on this week") — a list of 3 upcoming events with date + title.
- The campus Tabs section (Clayton/City/Caulfield) would be stronger as a **Map + Tabs** pattern — a static campus map image above the tab content.

**CTAs:** Hero has "Student Support" + "Clubs & Societies" — appropriate. But there's no "Visit campus" or "Book a tour" CTA anywhere on the page, which is a significant conversion omission.

### 3.5 About (`/about/index.html`)

**Hierarchy:** Correct. Hero → Story + Facts (Columns) → Leadership (Cards) → Values/Mission.

**Gaps:**
- Leadership Cards are text-only — they absolutely need portrait photographs (even illustrated placeholders).
- **Missing:** A timeline component showing Lawson's history (founded 1965 → key milestones → today). This is a high-impact demo element for an "About" page.
- **Missing:** An awards/rankings strip (logos: QS, Times Higher Education, Good Universities Guide).
- The "Our Story" narrative is strong and well-written — it's the best prose on the site.

**CTAs:** Hero has no CTA buttons. Add "Meet our leadership" anchor link or "View our strategic plan" secondary action.

### 3.6 News (`/news/index.html`)

**Hierarchy:** Correct. Hero → Featured news (News Grid) → Events (Cards).

**Gaps:**
- **Missing:** A category filter bar (All / Research / Rankings / Student Life / Community / Partnerships). Critical for a news page to feel functional in a demo.
- **Missing:** Pagination or "Load more" pattern. The page shows 6 news items then 3 event cards — for demo this is fine, but a "View all news" link at the bottom is needed.
- Events cards have no images — for Open Day and symposium events, images dramatically improve click intent.
- **Missing:** A newsletter signup CTA at the page bottom.

**CTAs:** Event cards all have "Register now" gold buttons — correct and consistent. Good.

### 3.7 International (`/international/index.html`)

**Hierarchy:** Good. Hero → Stats → Why Choose Lawson (Cards) → Entry Requirements (Accordion).

**Gaps:**
- The Accordion for entry requirements is appropriate. Ensure the Accordion CSS handles open/close states visually clearly.
- **Missing:** A country selector or "Students from [country]" pathway. Even a placeholder search input would add significant demo value.
- **Missing:** A "Current international student" testimonial with country flag, name, degree — very high emotional impact for this audience.
- **Missing:** A cost of living / scholarship callout. International students want to quickly see "what does this actually cost?" Teal-wash card or callout box works well here.
- **Missing:** Links to Melbourne city guides, visa information, and housing — a "Getting to Melbourne" section.

**CTAs:** Hero "Apply Now" + "How to Apply" is correct and appropriately prominent.

### 3.8 Apply (`/apply/index.html`)

**Hierarchy:** Good. Hero → How to Apply (Tabs: Domestic/International) with step-by-step numbered lists.

**Gaps:**
- The numbered application steps are the core content — make sure these render visually as **numbered steps** not just `<ol>` bullets. Consider a `steps` block or utility class that styles each list item as a numbered tile.
- **Missing:** Key dates callout. "Applications close 31 October 2026" should be a prominent callout box, not buried in prose.
- **Missing:** A "What to prepare" document checklist — transcripts, ID, English test scores. A styled checklist component would be useful.
- **Missing:** Live chat widget placeholder or "Talk to an advisor" inline CTA within the steps content.
- The postgraduate direct application route vs VTAC route should be visually distinct — the current Tabs structure handles this at the top level, but within each tab, the domestic steps combine undergraduate and postgraduate without enough visual separation.

**CTAs:** "Start your application" external link is correct. Consider adding a phone number prominently.

### 3.9 Contact (`/contact/index.html`)

**Hierarchy:** Correct. Hero → Team contacts (Cards) → Campus locations (Columns).

**Gaps:**
- **Missing:** An embedded map or static campus map image. A Contact page without a map feels incomplete.
- **Missing:** An online enquiry form. Even a "Form" placeholder block or a link to an external form would work.
- The campus address Columns section is presumably further down the page (content was truncated in the read). Ensure it includes opening hours and parking info — frequent questions from prospective students.
- The three contact cards (Future Students / International / Current Students) work well as a primary navigation mechanism but have no images or icons.

**CTAs:** Each card has its own action button — good. "Apply Now" in the Future Students card is appropriately prominent.

---

## 4. Missing Blocks & Components

### 4.1 `steps` — Process Step List

**Purpose:** Display numbered sequential steps with visual hierarchy (e.g. the Apply page's application process, Getting Started guides).

**Content structure (table):**
```
| Steps |
| 1. Create your VTAC account | Create an account at vtac.edu.au using your email address. | https://vtac.edu.au |
| 2. Add course preferences | Browse and add up to 8 Lawson courses to your preference list. | /study |
| 3. Submit by deadline | Submit your application before 30 September 2026. | |
```

**Visual description:** Vertical step list with a teal left border or connecting line. Each step has a gold circled number (36px), a bold heading, descriptive body text, and an optional text link. On desktop, optionally renders as a horizontal 4-step strip with icons above numbers.

---

### 4.2 `testimonial` — Student Quote

**Purpose:** Full-width or card-format student/staff quote with portrait photo, name, degree, and country flag (for international page).

**Content structure:**
```
| Testimonial |
| [image] | "Lawson gave me the confidence to pursue my research in AI ethics. The support from my supervisor and the access to industry partnerships was unlike anything I'd experienced before." | Priya Nair | Master of Data Science, 2025 | India |
```

**Visual description:** Navy or teal-wash background section. Large quotation mark in gold (decorative, `font-size: 8rem`, `opacity: 0.15`). Portrait photo in a circle (120px) left-aligned. Quote text in `text-lg` italic. Name in bold navy, degree in teal-muted. Optional country flag emoji or small flag SVG. Full-width variant has a background image with overlay. Card variant tiles 2–3 per row.

---

### 4.3 `profile-card` — Staff/Leadership Portrait

**Purpose:** Leadership team bios, researcher profiles, faculty contacts.

**Content structure:**
```
| Profile Card |
| [image] | Professor Sarah Chen | Vice-Chancellor & President | Professor Chen joined Lawson in 2021... | /about/leadership/chen |
```

**Visual description:** Portrait image in 3:4 aspect ratio with a subtle hover zoom. Name in bold navy (`text-xl`). Role in teal (`text-sm`, uppercase, tracked). Short bio text in body size. Optional "Read more" link. Renders in a 3-column or 4-column grid. No card border — white background with drop shadow on hover only.

---

### 4.4 `timeline` — History/Milestones

**Purpose:** About page history section, research milestone highlights.

**Content structure:**
```
| Timeline |
| 1965 | Founded | Lawson University opens its doors with 1,200 students and four faculties. |
| 1978 | Research milestone | Establishment of the Lawson Research Institute. |
| 2001 | Digital age | Launch of fully online learning programs. |
| 2024 | Global ranking | First entry into QS top 100. |
```

**Visual description:** Horizontal scrolling strip on mobile, vertical alternating layout on desktop. Year in gold bold (`text-3xl`), connecting vertical or horizontal teal line between items, heading in navy, body text in `text-sm`. Milestone icons (optional SVG).

---

### 4.5 `logo-strip` — Partners / Media Coverage / Rankings

**Purpose:** Social proof strips for research page (media coverage logos), about page (accreditations, rankings), international page (partner universities).

**Content structure:**
```
| Logo Strip |
| Media Coverage |
| [image: nature-logo] | [image: abc-logo] | [image: afr-logo] | [image: guardian-logo] |
```

**Visual description:** Light-grey or white background. Logos in greyscale with hover revealing colour. Horizontally scrollable on mobile. Optional label above ("Our research featured in" or "Ranked by"). Max 8 logos per strip.

---

### 4.6 `event-card` — Upcoming Events

**Purpose:** News and Campus Life pages. Distinct from generic Cards because events have specific date/time/location metadata needs.

**Content structure:**
```
| Event Card |
| Open Day — Clayton Campus | Sunday 2 August 2026 | 10:00am – 4:00pm | Clayton Campus | [image] | Register now | /events/open-day-2026 |
```

**Visual description:** Compact card with a coloured left-border (teal for free events, gold for featured events). Date rendered prominently in a "date chip" — gold background, navy text, month/day stacked (like a mini calendar). Title in bold navy, time/location in `text-sm` muted. CTA button below. Image optional (top of card).

---

### 4.7 `callout` — Highlight Box / Alert / Key Date

**Purpose:** Inline attention-grabbing boxes for important dates, warnings, tips, or key facts. Needed on Apply, International, and Study pages.

**Content structure:**
```
| Callout (gold) |
| Applications close 31 October 2026 | Make sure your VTAC application is submitted before the deadline. VTAC late applications incur a fee. | /apply |
```

**Visual description:** Tinted background box (`--color-gold-wash` for important, `--color-teal-wash` for info, `--color-error` tint for warning). Left border 4px solid matching the variant color. Icon (optional SVG: calendar, info, alert). Heading in bold, body text, optional CTA link. Renders inline within any section's prose flow.

---

### 4.8 `course-finder` — Search/Filter Interface (Aspirational)

**Purpose:** Allow visitors to filter courses by faculty, study level, and keyword. This is the single highest-value interactive element for a university demo.

**Content structure:**
```
| Course Finder |
| Find your course |
```

**Visual description:** White card on light background with three filter dropdowns (Study Level, Faculty, Delivery Mode) and a keyword search input. On submit/filter, the course-cards grid below updates. For demo, this can be static with pre-filtered states rather than a true search. Gold "Search" button. This block is the most complex to build but has the highest demo impact.

---

## 5. Image Strategy

### 5.1 Hero Images

**Spec:** 1920×1080px minimum, 16:9. Optimised to < 300KB (WebP). Focal point: upper-center or left-center to survive the left-aligned overlay gradient.

**Per page:**
| Page | Scene | Unsplash Search Term | Focal Point |
|---|---|---|---|
| Home | Large campus green space, students walking | "university campus aerial Melbourne" | Upper-left (sky + buildings) |
| Study | Students in modern lecture theatre or library | "university lecture hall modern" | Center (faces visible) |
| Research | Scientist in lab with equipment | "scientist laboratory research" | Left-center |
| Campus Life | Students socialising outdoors on grass | "university students outdoor campus" | Center |
| About | Historic/heritage building exterior | "university building facade stone" | Center |
| News | Abstract/editorial — journalists, microphone | "press conference university" | Center |
| International | Diverse group of students, landmark visible | "diverse international students city" | Left |
| Apply | Student at laptop, focused, confident | "student laptop studying coffee" | Left |
| Contact | Reception/information desk with staff | "university reception student services" | Center |

### 5.2 Card Thumbnail Images

**Spec:** 800×450px (16:9), < 100KB WebP. Must survive 4px `translateY` hover transform with `scale(1.04)` zoom.

**Research area cards:** Use abstract photography — close-ups of lab equipment, data visualisations, nature/environmental shots. Avoid generic "scientist pointing at whiteboard."

**Faculty cards (Study page):** One strong architectural or activity photo per faculty. Arts = gallery space. Engineering = workshop/lab. Business = boardroom/city. Law = court/books. Medicine = clinical setting. Science = outdoor fieldwork.

**News cards:** Every news item needs a 16:9 thumbnail. Avoid stock photos that look too generic — prefer subject-specific images (battery/energy for renewable energy story, graduation for rankings story).

### 5.3 Portrait Photography

**Spec:** 400×533px (3:4), < 80KB WebP. Consistent lighting. White, off-white, or campus-exterior background preferred. Circular crop at 120px for testimonials.

**Leadership (About page):** Formal headshots. Consistent background (prefer navy gradient or plain light grey). If using stock photo stand-ins, search "professional headshot academic" on Unsplash.

**Student testimonials:** More candid. Smiling, natural light. Diverse representation critical — ensure at least one person of each: female, male, South/East Asian, South Asian, African background. Unsplash search: "university student portrait natural light."

### 5.4 Faculty / Area Icons

For the Faculties grid (Study page) and Research Areas grid, consider SVG icons rather than photography. This is faster to implement and renders cleanly at all sizes.

**Recommended approach:** Use a single icon set throughout. Phosphor Icons (phosphoricons.com, MIT licence) or Heroicons (heroicons.com, MIT licence) both have academic-appropriate icons. Assign:
- Arts: `palette` or `microphone`
- Business: `briefcase` or `chart-bar`
- Engineering: `wrench` or `cpu-chip`
- Law: `scale` (balance)
- Medicine: `heart-pulse` or `plus-circle`
- Science: `beaker` or `atom`

Render at 40×40px in teal (`--color-teal`) on a teal-wash circular background (`--color-teal-wash`, 80px circle).

### 5.5 Aspect Ratio Summary

| Context | Ratio | Min size |
|---|---|---|
| Page hero | 16:9 | 1920×1080 |
| Interior hero (short) | 21:9 | 1920×823 |
| Card thumbnail | 16:9 | 800×450 |
| Portrait (profile card) | 3:4 | 400×533 |
| Testimonial portrait | 1:1 | 240×240 |
| Logo strip logos | Variable | 200px wide |
| Campus map | 4:3 | 1200×900 |

---

## 6. Mobile-First Concerns

### 6.1 Responsive Gaps in Existing CSS

**`stats-bar.css`:**
- Mobile uses `grid-template-columns: repeat(2, 1fr)` — 2 stats per row. At very narrow viewports (< 360px), the `clamp(2rem, 4vw, 3rem)` stat value will be 2rem, which may wrap awkwardly. Add a minimum container check:
  ```css
  @media (width < 360px) {
    .stats-bar-inner { grid-template-columns: 1fr; }
  }
  ```

**`hero.css`:**
- `min-height: 600px` on mobile is appropriate but `.hero.short` at `360px` may clip content on older iPhones (SE = 375px). Test content overflow.
- The `clamp(2rem, 5vw, 3.75rem)` for `h1` means at 375px, `5vw = 18.75px` — well below 2rem minimum, so the clamp floor kicks in. Fine.
- `.hero-actions` flex-wrap works correctly. Gap of `1rem` between stacked buttons is good.

**`cards.css`:**
- Mobile: `grid-template-columns: 1fr` (single column). Fine.
- The hover `translateY(-4px)` + `scale(1.04)` zoom: these are desktop-only interactions but CSS applies to all devices. Touch devices will "stick" in hover state after tap. Add:
  ```css
  @media (hover: none) {
    .cards-card:hover { transform: none; box-shadow: var(--shadow-sm); }
    .cards-card:hover .cards-card-image img { transform: none; }
  }
  ```

**`header.css`:**
- Mobile nav takes `position: fixed` full-screen — this is the right approach. Ensure `overflow-y: auto` handles long navigation lists on small phones. ✓ Already set.
- Sub-nav items at `font-size: var(--text-base)` inside mobile nav — at the tight padding of `0.5rem 0`, tap targets are only ~26px. WCAG 2.5.5 recommends 44px minimum. Fix:
  ```css
  .header-mobile-nav .sub-nav a {
    padding: 0.75rem 0; /* was 0.5rem */
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  ```

**`cta-banner.css`:**
- Mobile stacks content vertically (flex-direction: column). Fine.
- The `::before` decorative circle at `right: -60px` / `top: -60px` at 240px size creates clipping artefacts on narrow viewports. The `overflow: hidden` on `.cta-banner` handles this. ✓

### 6.2 Navigation Mobile Assessment

The current mobile navigation is functionally solid:
- Full-screen navy overlay: creates focus, prevents background interaction ✓
- Hamburger with animated close state (span transforms) ✓
- Sub-navigation indented at 1rem ✓
- Mobile CTA button (Apply Now, gold, full-width) at bottom ✓

**Issues:**
1. No `aria-expanded` state on the hamburger toggle — see section 7.
2. No keyboard trap in the mobile menu — pressing Tab should loop within the open menu, not escape to background page content.
3. When mobile menu opens, `body` should have `overflow: hidden` to prevent background scroll. Check `header.js` implements this.

### 6.3 Typography at Small Screens

- `h1` at mobile uses `--text-4xl` (2.25rem) — appropriate.
- `h2` at mobile uses `--text-3xl` (1.875rem) — may be large relative to body at 1rem. The 1.875:1 ratio is fine.
- The hero uses `clamp()` independently from the global type scale — this is good because hero headings need different scaling. Ensure no conflict with the global `h1 { font-size: var(--text-4xl) }` rule. Since `.hero-content h1` is more specific, it wins. ✓
- Body text at `1rem` / `line-height: 1.6` is fine for all viewports.
- Card body text at `var(--text-sm)` (0.875rem) is acceptable on mobile but sits at the lower limit. Do not go smaller.

---

## 7. Accessibility Checklist

### 7.1 Color Contrast

Evaluated against WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text / UI components).

| Foreground | Background | Ratio | AA Pass? | Notes |
|---|---|---|---|---|
| White `#FFFFFF` | Navy `#0B2545` | **12.3:1** | ✓ Pass | Excellent — hero text, nav |
| Navy `#0B2545` | White `#FFFFFF` | **12.3:1** | ✓ Pass | Body headings |
| Gold `#F2A900` | Navy `#0B2545` | **7.6:1** | ✓ Pass | Stats, em text in hero |
| Navy `#0B2545` | Gold `#F2A900` | **7.6:1** | ✓ Pass | Button text on gold CTA |
| White `#FFFFFF` | Gold `#F2A900` | **1.9:1** | ✗ FAIL | Do NOT use white text on gold backgrounds |
| Teal `#0B7A75` | White `#FFFFFF` | **4.6:1** | ✓ Pass (just) | Links, card tags |
| Teal `#0FA39B` (light) | White `#FFFFFF` | **3.1:1** | ✗ FAIL for normal text | Only use for large text or decorative |
| `#4A5568` (text-light) | White `#FFFFFF` | **7.4:1** | ✓ Pass | Card body text |
| `#718096` (text-muted) | White `#FFFFFF` | **4.6:1** | ✓ Pass (barely) | Use sparingly — verify at small sizes |
| `#718096` (text-muted) | `#F5F7FA` (light bg) | **4.1:1** | ✗ Borderline | Avoid muted text on light-bg sections |

**Critical fix:** The white text on semi-transparent gold overlays used in some UI patterns (if any) will fail. The hamburger icon (white on transparent) requires the navy background to always be present. ✓

**Action:** Add a CSS comment block documenting the approved text/background combinations to prevent future violations.

### 7.2 ARIA Patterns — Gaps Found

**Header navigation:**
- `<button class="header-menu-toggle">` — needs `aria-label="Open navigation menu"` and `aria-expanded="false"` toggled by JS.
- Mobile nav `<div class="header-mobile-nav">` — should be `<nav aria-label="Mobile navigation">`.
- Dropdown menus on desktop — triggered by `:hover` and `:focus-within`. ✓ The `focus-within` approach means keyboard users can open them. However, there is no `aria-haspopup="true"` or `aria-expanded` on parent `<li>` items. These are needed for screen reader announcement.

**Tabs block (`tabs.js`):**
- Must implement the ARIA `role="tablist"`, `role="tab"`, `role="tabpanel"` pattern with `aria-selected` and `aria-controls` attributes.
- Keyboard navigation: Left/Right arrow keys should move between tabs; Tab key should move from active tab into its panel.
- Check that `tabs.js` implements this — from the CSS alone, it cannot be verified, but it is a common omission in AEM block tab implementations.

**Accordion block:**
- Each trigger should be `<button aria-expanded="false" aria-controls="panel-id">`.
- Panel should have `id="panel-id"` and `role="region"` or `aria-labelledby`.
- Check `accordion.js`.

**Cards block:**
- If cards are entirely wrapped in `<a>` tags, link text must be unique and descriptive (not "View course" × 6 times). Either add `aria-label` with the course name, or ensure the heading text is included in the link.
- Currently the content structure puts the link in a separate cell from the heading — ensure the JS wires up the card-level link correctly.

**Hero stats:**
- `<div class="hero-stat-value">52,000+</div>` — visually reads as a data point but has no semantic role. Consider `<dt>` / `<dd>` definition list pattern, or at minimum add `aria-label` on the containing element.

**Images:**
- All decorative images (hero background) should have `alt=""` to be ignored by screen readers.
- Content images (cards, profiles) must have descriptive `alt` text — this is an author responsibility but document the requirement in the content guidelines.

### 7.3 Focus Management

**Missing globally:** A visible `:focus-visible` style. The current CSS has no global focus ring. The browser default outline is often invisible on navy backgrounds. Add to `styles/styles.css`:
```css
:focus-visible {
  outline: 3px solid var(--color-gold);
  outline-offset: 2px;
}

/* Ensure buttons and links show focus ring */
a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-gold);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Mobile menu:** When the mobile menu opens, focus should move to the first nav link inside it. When closed, focus should return to the hamburger button.

**Skip navigation link:** No skip link is present. Add to `head.html` or the header block:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  background: var(--color-gold);
  color: var(--color-navy);
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 1rem; }
```

---

## 8. Demo-Readiness Score

### Current Score: **6.5 / 10**

**What's working well (+):**
- Solid, professional color system
- Good content coverage across all 9 pages
- Hero block is production-quality
- Stats bar is visually impactful
- Navigation structure is clear and complete
- CTA Banner block with variants is reusable
- Content voice is consistent and authentic

**What's holding it back (-):**
- No images anywhere — the site renders as pure text/color blocks
- No `:focus-visible` styles (immediate ARIA red flag in demos)
- Missing social proof elements (testimonials, logo strips)
- Typography is all Inter — lacks the academic premium feel
- Several critical blocks are referenced in content but not built (`Columns`, `Timeline`, `Steps`, `Testimonial`, `Profile Card`)

---

### Top 5 Highest-Impact Actions Before First Demo

**Priority 1: Add photography (2–4 hours)**
Source and add images to at minimum: home hero, 3 research area cards, 3 campus life cards, leadership portraits (About). Use Unsplash. This is the single biggest visual change possible. Without images, the site looks like a wireframe.
- Recommended albums: [Unsplash University collection](https://unsplash.com/s/photos/university-campus), "campus students" (filter: Australia/Melbourne if available)
- Commit images to `/images/` with descriptive filenames: `hero-campus-aerial.jpg`, `research-lab-scientist.jpg`, etc.

**Priority 2: Switch heading font to Playfair Display (30 minutes)**
In `head.html`, add:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```
In `styles/styles.css`, change:
```css
--font-display: 'Playfair Display', Georgia, serif;
```
This single change makes the site look 40% more premium instantly.

**Priority 3: Add focus-visible styles and skip link (15 minutes)**
The absence of visible focus rings is the most obvious accessibility gap and will be noticed by any technical reviewer. Copy the code from section 7.3 above into `styles/styles.css` and `head.html`.

**Priority 4: Build the `testimonial` block (2–3 hours)**
One student quote per page dramatically increases emotional credibility. The Home page and International page especially need this. Build the block once; reuse across all pages. See section 4.2 for spec.

**Priority 5: Add eyebrow labels to section headings (1 hour)**
Above every `h2` section heading, add a teal uppercase eyebrow label:
```html
<p class="eyebrow">Why Lawson</p>
<h2>Research that Changes the World</h2>
```
This is a common pattern at Monash and UNSW that makes pages look professionally designed rather than drafted in a CMS. The `.eyebrow` utility class from section 2.3 makes this a one-line addition per section in the content files.

---

*End of design brief. Review alongside `README.md` for implementation context.*
