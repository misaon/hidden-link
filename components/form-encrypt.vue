<template>
  <form class="flex flex-col gap-4" autocomplete="off" @submit.prevent="handleFormSubmit">
    <div class="flex flex-col overflow-hidden rounded-lg bg-white/25 shadow-md">
      <div id="editorToolbar" class="flex border-b-2 border-b-white/10">
        <div class="flex grow gap-4">
          <div class="flex">
            <button class="ql-bold flex h-10 w-10 items-center justify-center hover:bg-white/25">
              <Icon name="mdi:format-bold" class="text-xl" />
            </button>
            <button class="ql-italic flex h-10 w-10 items-center justify-center hover:bg-white/25">
              <Icon name="mdi:format-italic" class="text-xl" />
            </button>
            <button
              class="ql-underline flex h-10 w-10 items-center justify-center hover:bg-white/25"
            >
              <Icon name="mdi:format-underline" class="text-xl" />
            </button>
            <button class="ql-strike flex h-10 w-10 items-center justify-center hover:bg-white/25">
              <Icon name="mdi:format-strikethrough-variant" class="text-xl" />
            </button>
          </div>
          <div class="flex">
            <button
              class="ql-list flex h-10 w-10 items-center justify-center hover:bg-white/25"
              value="bullet"
            >
              <Icon name="mdi:format-list-bulleted" class="text-xl" />
            </button>
            <button
              class="ql-list flex h-10 w-10 items-center justify-center hover:bg-white/25"
              value="ordered"
            >
              <Icon name="mdi:format-list-numbered" class="text-xl" />
            </button>
          </div>
          <div class="flex">
            <button class="ql-clean flex h-10 w-10 items-center justify-center hover:bg-white/25">
              <Icon name="mdi:format-clear" class="text-xl" />
            </button>
          </div>
        </div>

        <div class="flex">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center hover:bg-white/25"
          >
            <Icon name="mdi:cog" class="text-xl" />
          </button>
        </div>
      </div>
      <div ref="editorElement" class="h-[18rem] p-4"></div>
    </div>
    <button
      class="select-none rounded-lg bg-primary p-4 font-bold uppercase shadow-md transition-colors duration-300 hover:bg-blue-500"
      type="submit"
    >
      {{ $t('encryptForm.send') }}
    </button>
  </form>
</template>

<script setup lang="ts">
const { $Quill } = useNuxtApp();
const { t } = useI18n();
const { generateIdentifier } = useIdentifier();

const editor = ref();
const editorElement = ref<Element>();

onMounted(() => {
  if (editorElement.value) {
    editor.value = new $Quill(editorElement.value, {
      placeholder: t('encryptForm.contentPlaceholder'),
      modules: {
        toolbar: '#editorToolbar',
      },
    });
  }
});

const handleFormSubmit = async () => {
  const identifier = await generateIdentifier({
    expireIn: 259_200, // 3 days in seconds
  });
  console.log(identifier, editor.value.getContents());
};
</script>

<style lang="postcss">
.ql-toolbar {
  & > button {
    &.ql-active {
      @apply bg-white/25;
    }
  }
}

.ql-editor {
  @apply relative outline-0 overflow-y-auto h-full;

  &::-webkit-scrollbar {
    @apply w-2;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-white/25 rounded-2xl hover:bg-white/50;
  }

  &.ql-blank:before {
    @apply pointer-events-none absolute;
    content: attr(data-placeholder);
  }

  ol,
  ul {
    padding-left: 1.5em;
  }

  ol > li {
    @apply list-decimal;
  }

  ul > li {
    @apply list-disc;
  }
}

.ql-clipboard {
  @apply hidden;
}
</style>
