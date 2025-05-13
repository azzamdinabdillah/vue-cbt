<script setup lang="ts">
defineProps<{
  title: string;
  subTitle: string;
}>();
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-3">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl md:text-3xl text-black font-extrabold">
        {{ title }}
      </h1>
      <p class="text-16 text-gray">{{ subTitle }}</p>
    </div>

    <slot name="rightElement"></slot>
  </div>
</template>

<style scoped></style>
