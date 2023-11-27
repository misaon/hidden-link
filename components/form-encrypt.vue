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
const { generateIdentifier, generateHash } = useIdentifier();
const { generateRandomKey, generateRandomIVKey } = useRandomKey();
const { generateAesKey, encryptAes } = useAes256gcm();
const { stringToBuffer, cryptoKeyToBase64, bufferToBase64 } = useEncoder();

const content = ref('');

const {
  data: contentLink,
  pending,
  execute,
  status,
} = await useAsyncData(
  'encrypt-process',
  async () => {
    const [id, aesKey, aesIVKey] = await Promise.all([
      generateRandomKey(64),
      generateAesKey(),
      generateRandomIVKey(),
    ]);

    const [aesKeyBase64, encryptedData] = await Promise.all([
      cryptoKeyToBase64(aesKey),
      encryptAes(aesIVKey, aesKey, await stringToBuffer(content.value)),
    ]);

    const identifier = generateIdentifier({
      id: id as string,
      expireIn: 259_200, // 3 days
    });

    const createContentResponse = await $fetch<ContentCreateResponse>('/api/content-create', {
      method: 'POST',
      body: {
        identifier,
        iv: bufferToBase64(aesIVKey),
        content: bufferToBase64(encryptedData),
      } as ContentCreateRequest,
    });

    const hash = generateHash({
      identifier: createContentResponse.identifier,
      key: aesKeyBase64,
    });

    return localePath({
      name: 'content',
      hash: `#${hash}`,
    });
  },
  {
    immediate: false,
  }
);

const handleFormSubmit = async () => {
  await execute();
};

const resetForm = () => {
  content.value = '';
  status.value = 'idle';
};
</script>
