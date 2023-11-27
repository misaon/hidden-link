import { inject } from '@vercel/analytics';

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    inject();
  },
});
