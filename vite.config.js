import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages sets CF_PAGES=1 in its build environment; serve from root there.
// GitHub Pages serves the site under /landing-demo/, so keep that as the default.
const base = process.env.CF_PAGES ? '/' : '/landing-demo/'

export default defineConfig({
  plugins: [react()],
  base,
})
