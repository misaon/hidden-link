<template>
  <div class="container flex max-w-screen-lg flex-col gap-8 pb-8">
    <FormDecrypt :hash="hash!" />

    <span class="text-center"
      >{{ $t('decryptForm.countdown') }} <b>{{ expireIn }}</b></span
    >

    <div class="flex justify-center">
      <button
        class="flex select-none items-center justify-center gap-2 rounded bg-primary p-4 text-center font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
      >
        <Icon name="mdi:delete" class="text-2xl" />
        <span>{{ $t('decryptForm.deleteNow') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'pages.title.content',
  layout: 'content',
});

const route = useRoute();
const { parseHash } = useIdentifier();

const hash = route.hash.startsWith('#') ? route.hash.slice(1) : undefined;

if (!hash) {
  throw createError({
    fatal: true,
    statusCode: 404,
  });
}

const { expireInDate } = parseHash(hash);

if (new Date() > expireInDate) {
  throw createError({
    fatal: true,
    statusCode: 404,
  });
}

const { formatDistance } = useDateFns();

const getDuration = () => formatDistance(expireInDate);

const expireIn = ref(await getDuration());

setInterval(async () => {
  expireIn.value = await getDuration();
}, 1000);
</script>
