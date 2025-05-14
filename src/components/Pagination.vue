<script setup lang="ts">
defineProps<{
  page: number;
  isActive: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'border flex-wrap border-ee text-16 hover:bg-black hover:text-white cursor-pointer text-gray font-semibold w-[40px] h-[40px] flex justify-center items-center rounded-full transition-all',
      isActive ? 'bg-black border-none text-white' : '',
    ]"
  >
    {{ page }}
  </div>
</template>

<style scoped></style>
