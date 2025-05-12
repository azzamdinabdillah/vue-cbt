<script setup lang="ts">
defineProps<{
  customClass?: string;
}>();
</script>

<template>
  <button
    :class="`bg-blue rounded-full py-3.5 px-5 text-white text-16 font-bold text-16 w-fit cursor-pointer hover:opacity-80 transition-all ${customClass}`"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  box-shadow: 0px 4px 15px 0px rgba(100, 54, 241, 0.3);
}
</style>
