import Quill from 'quill';

export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    return {
      provide: {
        Quill,
      },
    };
  },
});
