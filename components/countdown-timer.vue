<template>
  <div v-if="remainingTime.seconds !== undefined" class="flex justify-center">
    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div v-if="remainingTime.days" class="flex flex-col items-center">
        <span class="countdown text-4xl">
          <span :style="`--value:${remainingTime.days}`"></span>
        </span>
        <span>{{ $t('countdown.days') }}</span>
      </div>
      <div v-if="remainingTime.hours" class="flex flex-col items-center">
        <span class="countdown text-4xl">
          <span :style="`--value:${remainingTime.hours}`"></span>
        </span>
        <span>{{ $t('countdown.hours') }}</span>
      </div>
      <div v-if="remainingTime.minutes" class="flex flex-col items-center">
        <span class="countdown text-4xl">
          <span :style="`--value:${remainingTime.minutes}`"></span>
        </span>
        <span>{{ $t('countdown.minutes') }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="countdown text-4xl">
          <span :style="`--value:${remainingTime.seconds}`"></span>
        </span>
        <span>{{ $t('countdown.seconds') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  expireInDate: Date;
}

const props = defineProps<Props>();

const { getRemainingTime } = useDateFns();

const remainingTime = ref(getRemainingTime(props.expireInDate));

setInterval(async () => {
  remainingTime.value = getRemainingTime(props.expireInDate);
}, 1000);
</script>
