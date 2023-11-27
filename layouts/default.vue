<template>
  <div class="flex h-full flex-col">
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>

        <Meta name="description" content="" />

        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <div class="bg-gradient-to-t from-blue-900 to-blue-700 text-white">
          <div class="container flex max-w-screen-xl flex-col pt-8">
            <AppHeader />

            <div class="grid grid-cols-1 gap-10 py-10 lg:container lg:grid-cols-2 lg:py-14">
              <div class="flex flex-col gap-8">
                <h1 class="text-5xl font-bold">{{ $t('header.title') }}</h1>
                <p class="text-white/75">{{ $t('header.subtitle') }}</p>
              </div>

              <FormEncrypt />
            </div>
          </div>
        </div>

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
