<template>
  <div class="container max-w-screen-xl">
    <div class="divider m-0"></div>

    <footer class="footer items-center gap-4 py-4">
      <p class="flex md:justify-self-start">Copyright © {{ currentYear }} - All right reserved</p>
      <p class="flex items-center md:justify-self-end">
        {{ $t('footer.licensedUnder') }}
        <NuxtLink
          to="https://github.com/misaon/hidden-link/blob/main/LICENSE"
          target="_blank"
          class="link"
          >Apache License 2.0</NuxtLink
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = useDateFormat(useNow(), 'YYYY');
</script>
