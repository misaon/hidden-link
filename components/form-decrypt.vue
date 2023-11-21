<template>
  <form class="flex flex-col gap-4" autocomplete="off" spellcheck="false">
    <div class="flex flex-col overflow-hidden rounded bg-white/25 shadow-md">
      <QuillEditor v-model="content" :readonly="true" :show-toolbar="false" :editor-height="500" />
    </div>
  </form>
</template>

<script setup lang="ts">
const content = ref('<p>test content</p>');
</script>
