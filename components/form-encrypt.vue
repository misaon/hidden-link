<template>
  <form
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
</template>

<script setup lang="ts">
const { generateIdentifier } = useIdentifier();

const content = ref('');

const handleFormSubmit = async () => {
  const identifier = await generateIdentifier({
    expireIn: 259_200, // 3 days in seconds
  });
  console.log(identifier, content.value);
};
</script>
