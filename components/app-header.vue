<template>
  <header class="flex items-center justify-between">
    <NuxtLink :to="localePath({ name: 'index' })" class="flex items-center gap-2">
      <Icon name="mdi:link-lock" class="text-4xl" />
      <span class="text-2xl font-bold">{{ appConfig.name }}</span>
    </NuxtLink>

    <nav>
      <NuxtLink
        to="https://github.com/misaon/hidden-link"
        target="_blank"
        class="hover:text-white/75"
      >
        <Icon name="mdi:github" class="text-4xl" />
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const localePath = useLocalePath();
</script>
