# LinguaFlow – Landing Page

Landing page for an online language school. Built with React + Vite, deployable to GitHub Pages.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (includes npm)
- Python 3.8+ (optional, for the deploy script)

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads on file save.

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
# or
python3 deploy.py --preview
```

## Deployment

### GitHub Actions (recommended)

1. Push this repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Every push to `main` triggers `.github/workflows/deploy.yml` and deploys automatically.

> **Important:** The `base` path in `vite.config.js` must match your repo name:
> ```js
> base: '/your-repo-name/',
> ```

### Cloudflare Pages

1. In the Cloudflare dashboard, create a Pages project and connect this repo.
2. Set the build configuration:
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Set environment variable **`NODE_VERSION=24`** (the repo's `.nvmrc` is also honored on newer Pages builds, but the env var is the reliable lever).

No further config is needed: `vite.config.js` detects Cloudflare's `CF_PAGES=1` build variable and serves assets from `/` instead of `/landing-demo/`.

### Python deploy script

Builds and pushes `dist/` to the `gh-pages` branch directly:

```bash
python3 deploy.py
```

To trigger the GitHub Actions workflow remotely instead:

```bash
GITHUB_TOKEN=your_token python3 deploy.py --trigger
```

## Project Structure

```
landing-demo/
├── src/
│   ├── components/       # Navbar, Hero, Features, Languages, Pricing, Testimonials, Footer
│   ├── data/             # Content: features.js, languages.js, pricing.js, testimonials.js
│   ├── hooks/            # useScrollSpy.js, useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Global CSS variables (design tokens)
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions deploy pipeline
├── deploy.py             # Python build + deploy helper
├── vite.config.js
└── index.html
```

## Customization

| What | Where |
|---|---|
| Text content, pricing, languages | `src/data/*.js` |
| Colors, fonts, spacing | `src/index.css` (CSS custom properties) |
| Section layout | `src/components/<Section>/<Section>.module.css` |
| Site metadata (title, description) | `index.html` |
| Repo name / base path | `vite.config.js` → `base` |
