<template>
  <footer class="bg-blue-900 text-white">
    <div class="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
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
