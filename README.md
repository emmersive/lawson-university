# Lawson University — AEM Edge Delivery Website

A fictitious university demo website built on Adobe Experience Manager Edge Delivery Services (DA.live).

## Brand

- **Name:** Lawson University
- **Tagline:** Shape Your Future
- **Location:** Melbourne, Australia (fictitious)
- **Colors:** Navy `#0B2545` · Gold `#F2A900` · Teal `#0B7A75`
- **Font:** Inter

## Project Structure

```
├── blocks/           # AEM blocks (components)
│   ├── header/       # Site navigation
│   ├── footer/       # Site footer
│   ├── hero/         # Hero banner
│   ├── cards/        # Card grid
│   ├── columns/      # Multi-column layout
│   ├── stats-bar/    # University statistics strip
│   ├── course-cards/ # Filterable course listing
│   ├── news-grid/    # News article grid
│   ├── cta-banner/   # Call-to-action banner
│   ├── accordion/    # Expandable FAQ sections
│   ├── tabs/         # Tabbed content
│   ├── embed/        # Video embeds
│   └── fragment/     # Content fragment inclusion
├── scripts/          # Global JS (aem.js, scripts.js, delayed.js)
├── styles/           # Global CSS (styles.css, lazy-styles.css)
├── content-seed/     # HTML seed files for DA.live upload
│   ├── index.html        → / (Home)
│   ├── nav.html          → /nav
│   ├── study/            → /study
│   ├── research/         → /research
│   ├── campus-life/      → /campus-life
│   ├── about/            → /about
│   ├── news/             → /news
│   ├── international/    → /international
│   ├── apply/            → /apply
│   └── contact/          → /contact
├── tools/
│   └── seed.js       # Content seeding script
├── fstab.yaml        # DA.live content source config
└── head.html         # <head> injection
```

## Getting Started

### 1. Install dependencies
```bash
npm install
npm install -g @adobe/aem-cli
```

### 2. Local development
```bash
aem up
# → http://localhost:3000
```

### 3. GitHub Setup
1. Create a new GitHub repository (public recommended)
2. Push this code to the `main` branch
3. Install the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) on your repo

### 4. Connect DA.live
1. Visit [da.live](https://da.live) and sign in with your Adobe ID
2. Create a new organisation and site matching your `fstab.yaml` values
3. Update `fstab.yaml` with your actual org/site URL

### 5. Seed content into DA.live
```bash
# Upload all pages
node tools/seed.js --org <your-org> --site <your-site> --token <your-token>

# Preview without uploading
node tools/seed.js --org <your-org> --site <your-site> --token <your-token> --dry-run

# Seed a single page
node tools/seed.js --org <your-org> --site <your-site> --token <your-token> --path /study
```

Get your DA.live API token from: https://da.live → Settings → API Tokens

### 6. Preview & Publish
After seeding, open the Sidekick extension on:
```
https://main--<repo>--<owner>.aem.page/
```
Click **Publish** on each page to make it live at:
```
https://main--<repo>--<owner>.aem.live/
```

## Re-deploying to a Fresh Environment

Since demo environments don't persist, re-deployment is a two-step process:

1. **Code** — push/verify the `main` branch is deployed (automatic via AEM Code Sync)
2. **Content** — re-seed all pages:
   ```bash
   node tools/seed.js --org <new-org> --site <new-site> --token <token>
   ```
   Then bulk-publish from DA.live or via the Admin API.

## Pages

| Path | Title |
|------|-------|
| `/` | Home |
| `/study` | Study at Lawson |
| `/research` | Research |
| `/campus-life` | Campus Life |
| `/about` | About Lawson |
| `/news` | News & Events |
| `/international` | International Students |
| `/apply` | Apply |
| `/contact` | Contact |

## Blocks Reference

| Block | Usage | Variants |
|-------|-------|----------|
| `hero` | Full-width page hero | `centered`, `short` |
| `cards` | Content card grid | `four-up`, `two-up`, `horizontal` |
| `columns` | Two/three column layout | `wide`, `wide-reverse`, `three` |
| `stats-bar` | University stats strip | — |
| `course-cards` | Filterable course listing | — |
| `news-grid` | News article grid | `featured` |
| `cta-banner` | Call-to-action section | `gold`, `centered` |
| `accordion` | Expandable FAQ | — |
| `tabs` | Tabbed content | — |
| `embed` | YouTube / video embed | — |
| `fragment` | Reusable content include | — |

## Linting
```bash
npm run lint
```

