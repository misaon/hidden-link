<template>
  <div class="container flex max-w-screen-lg flex-col gap-8">
    <div v-if="remainingTime.seconds !== undefined" class="flex justify-center">
      <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
        <div v-if="remainingTime.days" class="flex flex-col items-center">
          <span class="countdown text-4xl">
            <span :style="`--value:${remainingTime.days}`"></span>
          </span>
          <span>days</span>
        </div>
        <div v-if="remainingTime.hours" class="flex flex-col items-center">
          <span class="countdown text-4xl">
            <span :style="`--value:${remainingTime.hours}`"></span>
          </span>
          <span>hours</span>
        </div>
        <div v-if="remainingTime.minutes" class="flex flex-col items-center">
          <span class="countdown text-4xl">
            <span :style="`--value:${remainingTime.minutes}`"></span>
          </span>
          <span>min</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="countdown text-4xl">
            <span :style="`--value:${remainingTime.seconds}`"></span>
          </span>
          <span>sec</span>
        </div>
      </div>
    </div>

    <FormDecrypt :hash="hash!" :raw-content="rawContent!" />

    <div class="flex flex-col gap-4">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentGetRequest, ContentGetResponse, ContentDeleteRequest } from '~/types';

definePageMeta({
  title: 'pages.title.content',
});

const route = useRoute();
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
  });
}

const { status: deleteStatus, execute: deleteExecute } = await useAsyncData(
  'delete-process',
  async () => {
    await $fetch<void>('/api/content-delete', {
      method: 'DELETE',
      body: { identifier: `${id}:${expireIn}` } as ContentDeleteRequest,
    });
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    await navigateTo(localePath({ name: 'index' }));
  },
  {
    immediate: false,
  }
);

const { formatDistance, getRemainingTime } = useDateFns();

const remainingTime = ref(getRemainingTime(expireInDate));
const expireInFormatted = ref(await formatDistance(expireInDate));

setInterval(async () => {
  remainingTime.value = getRemainingTime(expireInDate);
  expireInFormatted.value = await formatDistance(expireInDate);
}, 1000);
</script>
