<template>
  <TransitionGroup tag="div" name="wrapper" class="relative">
    <form
      v-if="status === 'idle'"
      ref="formWrapper"
      class="flex flex-col gap-4"
      autocomplete="off"
      spellcheck="false"
      @submit.prevent="handleFormSubmit"
    >
      <div class="flex flex-col overflow-hidden rounded bg-white/25 shadow-md">
        <QuillEditor v-model="content" :placeholder="$t('encryptForm.contentPlaceholder')" />
      </div>
      <button
        class="flex select-none items-center justify-center gap-2 rounded bg-primary p-4 text-center font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
        type="submit"
      >
        {{ $t('encryptForm.send') }}
      </button>
    </form>

    <div
      v-else-if="pending"
      class="flex flex-col justify-center"
      :style="{ height: `${formWrapperHeight}px` }"
    >
      <TransitionGroup tag="div" name="progress" class="flex flex-col gap-4">
        <div
          v-for="item in progress"
          :key="item.text"
          class="flex items-center gap-4 rounded bg-white/25 p-4 shadow-md"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/25">
            <Icon
              :name="item.isDone ? 'mdi:check' : 'mdi:loading'"
              class="text-3xl transition-all"
              :class="{ 'animate-spin': !item.isDone }"
            />
          </div>
          <span>{{ item.text }}</span>
        </div>
      </TransitionGroup>
    </div>

    <div v-else class="flex flex-col justify-center" :style="{ height: `${formWrapperHeight}px` }">
      <div class="flex flex-col gap-4">
        <div class="rounded bg-white/25 p-4 shadow-md">
          <p v-html="$t('encryptForm.progressDoneText')"></p>
        </div>

        <div class="flex gap-4">
          <button
            class="flex flex-1 select-none items-center justify-center gap-2 rounded bg-primary p-4 text-center font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
            @click="copy(contentLink || '')"
          >
            <Icon name="mdi:link-variant" class="text-2xl" />
            <span v-text="copied ? $t('encryptForm.copied') : $t('encryptForm.copyLink')"></span>
          </button>
          <button
            class="flex flex-1 select-none items-center justify-center gap-2 rounded bg-white/25 p-4 text-center font-bold uppercase shadow-md transition-colors duration-300 hover:bg-white/50"
            @click="resetForm"
          >
            {{ $t('encryptForm.createAnother') }}
          </button>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { ContentCreateRequest, ContentCreateResponse } from '~/types';

const { t } = useI18n();
const localePath = useLocalePath();
const { generateIdentifier, generateHash } = useIdentifier();
const { generateRandomKey, generateRandomIVKey } = useRandomKey();
const { generateAesKey, encryptAes } = useAes();
const { stringToBuffer, cryptoKeyToBase64, bufferToBase64 } = useEncoder();
const { copy, copied } = useClipboard();

const formWrapper = ref<HTMLFormElement>();
const formWrapperHeight = ref();

const content = ref('');
const progress = ref<{ text: string; isDone: boolean }[]>([]);

onMounted(() => {
  formWrapperHeight.value = formWrapper.value?.offsetHeight;
});

const updateProgress = (value: string | boolean) => {
  if (typeof value === 'boolean') {
    if (!value && progress.value.length > 0) {
      progress.value.at(-1)!.isDone = true;
    }

    return;
  }

  if (progress.value.length > 0) {
    progress.value.at(-1)!.isDone = true;
  }

  progress.value.push({ text: value, isDone: false });
};

const {
  data: contentLink,
  pending,
  execute,
  status,
} = await useAsyncData(
  'encrypt-process',
  async () => {
    updateProgress(t('encryptForm.progress.generatingEncryptionKeys'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

    const [id, aesKey, aesIVKey] = await Promise.all([
      generateRandomKey(64),
      generateAesKey(),
      generateRandomIVKey(),
    ]);

    updateProgress(t('encryptForm.progress.yourContentIsBeingEncrypted'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));

    const [aesKeyBase64, encryptedData] = await Promise.all([
      cryptoKeyToBase64(aesKey),
      encryptAes(aesIVKey, aesKey, stringToBuffer(content.value, false)),
    ]);

    updateProgress(t('encryptForm.progress.encryptingYourDataForTransmissionUsingRSAKeys'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

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

    updateProgress(t('encryptForm.progress.generatingHashLink'));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

    const hash = generateHash({
      identifier: createContentResponse.identifier,
      key: aesKeyBase64,
    });

    const contentHashLink = localePath({
      name: 'content',
      hash: `#${hash}`,
    });

    updateProgress(false);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

    return window.location.origin + contentHashLink;
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
  progress.value = [];
};
</script>

<style lang="postcss" scoped>
.progress,
.wrapper {
  &-move,
  &-enter-active,
  &-leave-active {
    @apply transition-all ease-in-out duration-500;
  }

  &-enter-from,
  &-leave-to {
    @apply opacity-0;
  }

  &-leave-active {
    @apply absolute w-full;
  }
}

.progress {
  &-enter-from,
  &-leave-to {
    @apply translate-x-8;
  }
}
</style>
