<template>
  <div class="flex flex-col gap-12">
    <section class="text-center">
      <h1 class="text-5xl font-bold">{{ $t('decryptForm.title') }}</h1>
    </section>

    <section class="flex flex-col gap-4">
      <CountdownTimer :expire-in-date="expireInDate" />

      <FormDecrypt :hash="hash!" :raw-content="rawContent!" />

      <span class="text-center"
        >{{ $t('decryptForm.countdown') }} <b data-cy="expire-in">{{ expireInFormatted }}</b></span
      >

      <div class="flex justify-center">
        <button class="btn btn-error" @click="() => deleteExecute()">
          <span class="swap">
            <Icon
              name="mdi:delete"
              class="h-6 w-6"
              :class="[deleteStatus !== 'pending' ? 'swap-off' : 'swap-on']"
            />
            <span
              class="swap-off loading loading-spinner h-6 w-6"
              :class="[deleteStatus === 'pending' ? 'swap-off' : 'swap-on']"
            ></span>
          </span>
          <span>{{ $t('decryptForm.deleteNow') }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ContentGetRequest, ContentGetResponse, ContentDeleteRequest } from '~/types';

definePageMeta({
  title: 'pages.title.content',
});

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const { parseHash } = useIdentifier();

const hash = route.hash.startsWith('#') ? route.hash.slice(1) : undefined;

if (!hash) {
  throw createError({
    fatal: true,
    statusCode: 404,
  });
}

const { id, expireIn, expireInDate } = parseHash(hash);

if (new Date() > expireInDate) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: t('error.contentNotExist'),
  });
}

const { data: rawContent, error } = await useFetch<ContentGetResponse>('/api/content-get', {
  method: 'POST',
  body: { identifier: `${id}:${expireIn}` } as ContentGetRequest,
});

if (error.value) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: t('error.contentNotExist'),
  });
}

const { status: deleteStatus, execute: deleteExecute } = await useAsyncData(
  'delete-process',
  async () => {
    await $fetch<void>('/api/content-delete', {
      method: 'DELETE',
      body: { identifier: `${id}:${expireIn}` } as ContentDeleteRequest,
    });
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    await navigateTo(localePath({ name: 'index' }));
  },
  {
    immediate: false,
  }
);

const { formatDistance } = useDateFns();

const expireInFormatted = ref(await formatDistance(expireInDate));

setInterval(async () => {
  expireInFormatted.value = await formatDistance(expireInDate);
}, 60_000);
</script>
