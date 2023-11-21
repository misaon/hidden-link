<template>
  <footer class="border-t border-t-white/25 bg-blue-900 text-white/75">
    <div
      class="container flex max-w-screen-xl flex-col items-center gap-4 py-8 md:justify-between lg:flex-row"
    >
      <p>
        Copyright © {{ currentYear }} <span class="font-bold">{{ appConfig.name }}</span>
      </p>
      <p>
        {{ $t('footer.licensedUnder') }}
        <NuxtLink
          to="https://github.com/misaon/hidden-link/blob/main/LICENSE"
          target="_blank"
          class="underline hover:text-white/75"
          >Apache License 2.0</NuxtLink
        >
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const currentYear = useDateFormat(useNow(), 'YYYY');
</script>
