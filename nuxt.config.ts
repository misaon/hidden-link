export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    build: {
      rollupOptions: {
        external: ['node:crypto'],
      },
    },
  },
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
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
      ],
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
    // removeLoggers: false,
  },
  routeRules: {
    '/content': {
      ssr: false,
    },
  },
  eslint: {
    lintOnStart: false,
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
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
    storageKey: 'color-mode',
  },
});
