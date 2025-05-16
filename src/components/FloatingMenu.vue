<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  position?: string;
  customClass?: string;
}>();
</script>

<template>
  <div
    :class="[
      'p-5 shadow flex w-fit flex-col gap-4 text-14 text-black font-semibold absolute border border-ee transition-all rounded-[18px] bg-white z-10',
      isOpen
        ? 'opacity-100 select-auto pointer-events-auto'
        : 'opacity-0 select-none pointer-events-none',
      position ? position : `top-1/2 -translate-y-1/2 -left-[200px]`,
      customClass,
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0px 10px 16px 0px rgba(10, 9, 11, 0.05);
}
</style>
