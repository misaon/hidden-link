<template>
  <Html>
    <Head>
      <Meta name="theme-color" :content="themeColor" />
      <Meta name="msapplication-TileColor" :content="themeColor" />

      <Link rel="mask-icon" href="/safari-pinned-tab.svg" :content="themeColor" />
    </Head>
    <Body>
      <AppHeader />

      <main class="flex grow flex-col items-center justify-center gap-8">
        <div class="flex flex-col gap-4 text-center">
          <h2 class="text-9xl font-bold text-accent-content">{{ props.error.statusCode }}</h2>
          <p v-if="props.error.statusMessage">{{ props.error.statusMessage }}</p>
        </div>
        <button class="btn btn-primary" @click="handleError">
          {{ $t('general.backToHomepage') }}
        </button>
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>

<script setup lang="ts">
type Props = {
  error: {
    statusCode: number;
    statusMessage: string;
  };
};

const props = defineProps<Props>();

const localePath = useLocalePath();
const colorMode = useColorMode();

const handleError = () => clearError({ redirect: localePath({ name: 'index' }) });

const themeColor = computed<string>(() => {
  return colorMode.value === 'light' ? '#1d4ed8' : '#334155';
});
</script>
