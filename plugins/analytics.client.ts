export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    if (!import.meta.dev) {
      const analytics = await import('@vercel/analytics');
      analytics.inject();
    }
  },
});
