<template>
  <form class="flex flex-col gap-4" autocomplete="off" spellcheck="false">
    <div class="flex flex-col overflow-hidden rounded bg-white/25 shadow-md">
      <QuillEditor v-model="content" :readonly="true" :show-toolbar="false" :editor-height="500" />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ContentGetRequest, ContentGetResponse } from '~/types';

const route = useRoute();
const { parseHash } = useIdentifier();
const { base64ToCryptoKey, base64ToBuffer, bufferToString } = useEncoder();
const { decryptAes } = useAes256gcm();

const hash = route.hash.startsWith('#') ? route.hash.slice(1) : undefined;

if (!hash) {
  throw createError({
    statusCode: 404,
  });
}

const { id, expireIn, key } = parseHash(hash);

const content = ref();

const { data } = await useFetch<ContentGetResponse>('/api/content-get', {
  method: 'POST',
  body: { identifier: `${id}:${expireIn}` } as ContentGetRequest,
});

const encryptedContent = await decryptAes(
  base64ToBuffer(data.value?.content.iv),
  await base64ToCryptoKey(key, ALGORITHM),
  base64ToBuffer(data.value?.content.data)
);

content.value = bufferToString(encryptedContent);
</script>
