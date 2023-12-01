<template>
  <header class="navbar items-center justify-between fill-accent-content p-0 text-accent-content">
    <NuxtLink :to="localePath({ name: 'index' })" class="flex items-center gap-2">
      <Icon name="mdi:link-lock" class="text-4xl" />
      <span class="text-2xl font-bold">{{ appConfig.name }}</span>
    </NuxtLink>

    <nav class="flex gap-2">
      <ClientOnly>
        <label
          class="btn btn-circle btn-ghost swap swap-rotate"
          @click="$colorMode.preference = $colorMode.preference === 'light' ? 'dark' : 'light'"
        >
          <Icon
            name="mdi:white-balance-sunny"
            :class="[$colorMode.preference === 'light' ? 'swap-on' : 'swap-off']"
            class="h-8 w-8"
          />
          <Icon
            name="mdi:weather-night"
            :class="[$colorMode.preference === 'light' ? 'swap-off' : 'swap-on']"
            class="h-8 w-8"
          />
        </label>
      </ClientOnly>

      <NuxtLink
        to="https://github.com/misaon/hidden-link"
        target="_blank"
        class="btn btn-circle btn-ghost"
      >
        <Icon name="mdi:github" class="h-8 w-8" />
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const localePath = useLocalePath();
</script>
