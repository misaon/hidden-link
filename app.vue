<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  @apply transition-all ease-in-out duration-500;
}

.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur-lg;
}
</style>
