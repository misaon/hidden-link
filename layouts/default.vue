<template>
  <div class="flex h-full flex-col">
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>

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
          <slot />
        </main>

        <AppFooter />
      </Body>
    </Html>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
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
</script>
