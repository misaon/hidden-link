// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', 'nuxt-icon', '@nuxtjs/eslint-module'],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
  },
});
