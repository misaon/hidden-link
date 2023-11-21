<template>
  <div v-if="showToolbar" id="editorToolbar" class="flex border-b-2 border-b-white/10">
    <div class="flex grow lg:gap-4">
      <div class="flex">
        <button class="ql-bold flex h-10 w-10 items-center justify-center hover:bg-white/25">
          <Icon name="mdi:format-bold" class="text-xl" />
        </button>
        <button class="ql-italic flex h-10 w-10 items-center justify-center hover:bg-white/25">
          <Icon name="mdi:format-italic" class="text-xl" />
        </button>
        <button class="ql-underline flex h-10 w-10 items-center justify-center hover:bg-white/25">
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
      <button type="button" class="flex h-10 w-10 items-center justify-center hover:bg-white/25">
        <Icon name="mdi:cog" class="text-xl" />
      </button>
    </div>
  </div>
  <div ref="editorElement" class="p-4" :style="{ height: `${props.editorHeight}px` }"></div>
</template>

<script setup lang="ts">
import type { Quill, TextChangeHandler } from 'quill';

interface Props {
  modelValue: string;
  placeholder?: string;
  readonly?: boolean;
  showToolbar?: boolean;
  editorHeight?: number;
}

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  readonly: false,
  showToolbar: true,
  editorHeight: 290,
});

const editorInstance = ref<Quill>();
const editorElement = ref<Element>();

onMounted(async () => {
  if (editorElement.value) {
    if (process.server) {
      return;
    }

    const { default: Quill } = await import('quill');

    editorInstance.value = new Quill(editorElement.value, {
      placeholder: props.placeholder,
      readOnly: props.readonly,
      modules: {
        toolbar: props.showToolbar ? '#editorToolbar' : undefined,
      },
    });

    if (props.modelValue.length > 0) {
      editorInstance.value.clipboard.dangerouslyPasteHTML(props.modelValue);
    }

    if (!props.readonly) {
      editorInstance.value.on('text-change', handleTextChange);
    }
  }
});

const handleTextChange: TextChangeHandler = (delta, oldContents, source) => {
  if (source === 'user') {
    emit('update:modelValue', editorInstance.value?.root.innerHTML);
  }
};

defineExpose({
  editorInstance,
});
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
  @apply relative outline-0 overflow-y-auto h-full focus:outline-0;

  &::-webkit-scrollbar {
    @apply w-2;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-white/25 rounded hover:bg-white/50;
  }

  &.ql-blank:before {
    @apply pointer-events-none absolute;
    content: attr(data-placeholder);
  }

  ol,
  ul {
    @apply pl-[1.5em];
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
