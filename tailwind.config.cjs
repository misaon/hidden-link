const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./nuxt.config.ts'],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
  },
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: colors.blue['600'],
          secondary: '#5674C8',
          info: colors.sky['600'],
          success: colors.lime['600'],
          warning: colors.amber['600'],
          error: colors.red['600'],
          'base-100': colors.blue['900'],
          'base-200': colors.blue['700'],
          'accent-content': colors.blue['50'],
          'base-content': colors.blue['100'],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: colors.blue['800'],
          // See https://www.tailwindshades.com for darker variant of light color version
          secondary: '#2B4283',
          info: colors.sky['800'],
          success: colors.lime['800'],
          warning: colors.amber['800'],
          error: colors.red['800'],
          'base-100': colors.slate['900'],
          'base-200': colors.slate['800'],
          'accent-content': colors.slate['50'],
          'base-content': colors.slate['100'],
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
