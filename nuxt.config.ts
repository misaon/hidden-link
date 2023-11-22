export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },
  modules: [
    'nuxt-security',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-icon',
    '@nuxtjs/eslint-module',
  ],
  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#1d4ed8',
        },
      ],
      meta: [
        {
          name: 'msapplication-TileColor',
          content: '#1d4ed8',
        },
        {
          name: 'theme-color',
          content: '#1d4ed8',
        },
      ],
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
    // Temporary flag
    removeLoggers: false,
  },
  routeRules: {
    '/content': {
      ssr: false,
    },
  },
  i18n: {
    baseUrl: 'https://hidden-link.com',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
  },
});
