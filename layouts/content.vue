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
        <div class="grow bg-gradient-to-t from-blue-900 to-blue-700 text-white">
          <div class="container flex max-w-screen-xl flex-col gap-16 p-8">
            <AppHeader />

            <div class="container gap-8 p-0 text-center lg:p-8">
              <h1 class="text-5xl font-bold">{{ $t('content.title') }}</h1>
            </div>
          </div>

          <main>
            <slot />
          </main>
        </div>

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
  addSeoAttributes: false,
});

const title = computed(() =>
  route.meta.title ? `${t(route.meta.title as string)} | ${appConfig.name}` : appConfig.name
);
</script>
