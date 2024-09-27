import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import netlify from '@astrojs/netlify'

import sitemap from '@astrojs/sitemap'

const site = import.meta.env.FRONTEND_URL

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site,
  adapter: netlify(),
  integrations: [tailwind(), icon(), sitemap()],
  devToolbar: {
    enabled: false
  }
})
