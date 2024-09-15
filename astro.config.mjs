import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind(), icon()],
  devToolbar: {
    enabled: false
  }
})
