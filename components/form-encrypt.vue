<template>
  <form class="flex flex-col gap-4" autocomplete="off" @submit.prevent="handleFormSubmit">
    <textarea
      v-model.trim="content"
      required
      :placeholder="$t('encryptForm.contentPlaceholder')"
      class="resize-none overflow-hidden rounded-lg bg-white/25 p-4 shadow-md outline-0 transition-colors duration-300 placeholder:text-white hover:bg-white/30 focus:bg-white/30"
      :rows="13"
    />
    <button
      class="select-none rounded-lg bg-primary p-4 font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
      type="submit"
      :disabled="content.length === 0"
    >
      {{ $t('encryptForm.send') }}
    </button>
  </form>
</template>

<script setup lang="ts">
const { generate } = useIdentifier();

const content = ref('');

const handleFormSubmit = async () => {
  const identifier = await generate();
  console.log(identifier, content.value);
};
</script>
