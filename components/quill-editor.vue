<template>
  <div class="relative overflow-hidden rounded bg-secondary shadow-md">
    <div v-if="showToolbar" id="editor-toolbar" class="flex border-b-2 border-b-white/10">
      <div class="flex grow">
        <div class="flex">
          <button class="ql-bold btn btn-ghost h-auto min-h-0 rounded-none p-2">
            <Icon name="mdi:format-bold" class="h-6 w-6" />
          </button>
          <button class="ql-italic btn btn-ghost h-auto min-h-0 rounded-none p-2">
            <Icon name="mdi:format-italic" class="h-6 w-6" />
          </button>
          <button class="ql-underline btn btn-ghost h-auto min-h-0 rounded-none p-2">
            <Icon name="mdi:format-underline" class="h-6 w-6" />
          </button>
          <button class="ql-strike btn btn-ghost h-auto min-h-0 rounded-none p-2">
            <Icon name="mdi:format-strikethrough-variant" class="h-6 w-6" />
          </button>
        </div>
        <div class="flex">
          <button class="ql-list btn btn-ghost h-auto min-h-0 rounded-none p-2" value="bullet">
            <Icon name="mdi:format-list-bulleted" class="h-6 w-6" />
          </button>
          <button class="ql-list btn btn-ghost h-auto min-h-0 rounded-none p-2" value="ordered">
            <Icon name="mdi:format-list-numbered" class="h-6 w-6" />
          </button>
        </div>
        <div class="flex">
          <button class="ql-clean btn btn-ghost h-auto min-h-0 rounded-none p-2">
            <Icon name="mdi:format-clear" class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!--    <div class="flex">
      <button type="button" class="btn btn-ghost h-auto min-h-0 rounded-none p-2">
        <Icon name="mdi:cog" class="h-6 w-6" />
      </button>
    </div>-->
    </div>
    <div ref="editorElement" class="p-4" :style="{ height: `${props.editorHeight}px` }"></div>
  </div>
</template>

<script setup lang="ts">
import type { Quill, TextChangeHandler } from 'quill';

interface Props {
  modelValue: string;
  placeholder?: string;
  readonly?: boolean;
  showToolbar?: boolean;
  editorHeight?: number;
  maxContentLength?: number;
}

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  readonly: false,
  showToolbar: true,
  editorHeight: 290,
  maxContentLength: 3000,
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
        toolbar: props.showToolbar ? '#editor-toolbar' : undefined,
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
    const contentLength = editorInstance.value?.getLength() || 0;

    if (contentLength >= props.maxContentLength) {
      editorInstance.value?.deleteText(props.maxContentLength, contentLength);
      return;
    }

    emit('update:modelValue', editorInstance.value?.root?.innerHTML);
  }
};

defineExpose({
  editorInstance,
});
</script>

<style lang="postcss">
button.ql-active {
  @apply btn-active;
}

.ql-editor {
  @apply relative outline-0 overflow-y-auto h-full select-text;

  &::-webkit-scrollbar {
    @apply w-2 bg-white/25;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-white/50 rounded cursor-pointer;
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
