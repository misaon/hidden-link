<template>
  <div class="flex h-full flex-col gap-12">
    <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">
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
        <div class="bg-gradient-to-t from-base-100 to-base-200">
          <div class="container flex max-w-screen-xl flex-col gap-12 pt-8">
            <AppHeader />

            <div v-if="route.path === '/'" class="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div class="flex flex-col gap-8">
                <h1 class="text-5xl font-bold text-accent-content">{{ $t('header.title') }}</h1>
                <p>{{ $t('header.subtitle') }}</p>
              </div>

              <FormEncrypt />
            </div>
            <div v-else class="text-center lg:container">
              <h1 class="text-5xl font-bold">{{ $t('decryptForm.title') }}</h1>
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
