<template>
  <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">
    <Head>
      <Title>{{ title }}</Title>

      <Meta name="description" content="" />
      <Meta name="theme-color" :content="themeColor" />
      <Meta name="msapplication-TileColor" :content="themeColor" />

      <Link rel="mask-icon" href="/safari-pinned-tab.svg" :content="themeColor" />

      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <AppHeader />

      <main class="grow">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();
const route = useRoute();
const { t } = useI18n();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});

const title = computed(() =>
  route.meta.title ? `${t(route.meta.title as string)} | ${appConfig.name}` : appConfig.name
);

const themeColor = computed<string>(() => {
  return colorMode.value === 'light' ? '#1d4ed8' : '#334155';
});
</script>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  @apply transition-all ease-in-out duration-500;
}

.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur-lg;
}
</style>
