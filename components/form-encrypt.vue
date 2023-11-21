<template>
  <div>
    <form
      v-if="status === 'idle'"
      class="flex flex-col gap-4"
      autocomplete="off"
      spellcheck="false"
      @submit.prevent="handleFormSubmit"
    >
      <div class="flex flex-col overflow-hidden rounded bg-white/25 shadow-md">
        <QuillEditor v-model="content" :placeholder="$t('encryptForm.contentPlaceholder')" />
      </div>
      <button
        class="select-none rounded bg-primary p-4 font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
        type="submit"
      >
        {{ $t('encryptForm.send') }}
      </button>
    </form>
    <div v-else-if="pending">
      <span>načítám</span>
    </div>
    <div v-else class="flex flex-col gap-4">
      <NuxtLink :to="contentLink"> Odkaz na váš trezor </NuxtLink>

      <button @click="resetForm">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentCreateRequest, ContentCreateResponse } from '~/types';

const localePath = useLocalePath();
const { generateIdentifier } = useIdentifier();
const { generateRandomIVKey } = useRandomKey();
const { generateAesKey, encryptAes } = useAes256gcm();
const { toArrayBuffer } = useArrayBuffer();
const { bufferToBase64 } = useBase64();

const content = ref('');
const identifier = ref();

const {
  data: contentLink,
  pending,
  execute,
  status,
} = await useAsyncData(
  'encrypt-process',
  async () => {
    // 12 bytes is recommended size for key of AES-GCM algorithm
    const aesIVKey = await generateRandomIVKey(12);
    const aesKey = await generateAesKey();
    const encodedContent = toArrayBuffer(content.value);
    const encryptedData = await encryptAes(aesIVKey, aesKey, encodedContent);
    const encryptedDataBase64 = bufferToBase64(encryptedData);

    const createContentResponse = await $fetch<ContentCreateResponse>('/api/content-create', {
      method: 'POST',
      body: {
        identifier: identifier.value,
        iv: '',
        key: '',
        content: encryptedDataBase64,
      } as ContentCreateRequest,
    });

    console.log('publicKey', createContentResponse.publicKey);

    return localePath({
      name: 'content',
      hash: `#${createContentResponse.identifier}`,
    });
  },
  {
    immediate: false,
  }
);

const handleFormSubmit = async () => {
  identifier.value = await generateIdentifier({
    expireIn: 259_200,
  });

  await execute();
};

const resetForm = () => {
  content.value = '';
  status.value = 'idle';
};
</script>
