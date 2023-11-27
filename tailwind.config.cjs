const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./nuxt.config.ts'],
  theme: {
    extend: {
      colors: {
        primary: colors.blue['600'],
      },
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
};
