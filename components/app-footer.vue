<template>
  <footer class="footer items-center gap-2 py-8">
    <p class="flex md:justify-self-start">{{ t('footer.copyright', { currentYear }) }}</p>
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
</template>

<script setup lang="ts">
const { t } = useI18n();
const currentYear = useDateFormat(useNow(), 'YYYY');
</script>
