<template>
  <form autocomplete="off" spellcheck="false" data-cy="editor">
    <QuillEditor v-model="content" :readonly="true" :show-toolbar="false" :editor-height="500" />
  </form>
</template>

<script setup lang="ts">
import type { ContentGetResponse } from '~/types';

type Props = {
  hash: string;
  rawContent: ContentGetResponse;
};

const props = defineProps<Props>();

const { parseHash } = useIdentifier();
const { base64ToCryptoKey, base64ToBuffer, bufferToString } = useEncoder();
const { decryptAes } = useAes();

const { key } = parseHash(props.hash);

const content = ref();

const encryptedContent = await decryptAes(
  base64ToBuffer(props.rawContent!.content.iv),
  await base64ToCryptoKey(key, ALGORITHM),
  base64ToBuffer(props.rawContent!.content.data)
);

content.value = bufferToString(encryptedContent, false);
</script>
