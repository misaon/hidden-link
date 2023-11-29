<template>
  <form class="flex flex-col gap-4" autocomplete="off" spellcheck="false" data-cy="editor">
    <div class="flex flex-col overflow-hidden rounded bg-white/25 shadow-md">
      <QuillEditor v-model="content" :readonly="true" :show-toolbar="false" :editor-height="500" />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ContentGetRequest, ContentGetResponse } from '~/types';

type Props = {
  hash: string;
};

const props = defineProps<Props>();

const { parseHash } = useIdentifier();
const { base64ToCryptoKey, base64ToBuffer, bufferToString } = useEncoder();
const { decryptAes } = useAes();

const { id, expireIn, key } = parseHash(props.hash);

const content = ref();

const { data } = await useFetch<ContentGetResponse>('/api/content-get', {
  method: 'POST',
  body: { identifier: `${id}:${expireIn}` } as ContentGetRequest,
});

const encryptedContent = await decryptAes(
  base64ToBuffer(data.value!.content.iv),
  await base64ToCryptoKey(key, ALGORITHM),
  base64ToBuffer(data.value!.content.data)
);

content.value = bufferToString(encryptedContent, false);
</script>
