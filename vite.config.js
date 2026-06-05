import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// GitHub Pages serves the site under /landing-demo/; the workflow sets GH_PAGES=1.
// Everywhere else (Cloudflare Workers/Pages, local dev) serves from the root.
const base = process.env.GH_PAGES ? '/landing-demo/' : '/'

export default defineConfig({
  plugins: [react(), cloudflare()],
  base,
})