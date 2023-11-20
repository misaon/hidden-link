<template>
  <div class="bg-gradient-to-t from-blue-900 to-blue-700 text-white">
    <div class="container flex flex-col gap-10 p-8 md:gap-8">
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

      <div class="container grid grid-cols-1 gap-8 p-0 md:grid-cols-2 md:p-8">
        <div class="flex flex-col gap-8">
          <h1 class="text-5xl font-bold">{{ $t('header.title') }}</h1>
          <p class="text-white/75">{{ $t('header.subtitle') }}</p>
        </div>

        <FormEncrypt />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const localePath = useLocalePath();
</script>
