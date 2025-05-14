<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  direction: "top" | "bottom";
}>();
const isOpen = ref(false);
</script>

<template>
  <div
    :class="`w-[120px] cursor-pointer justify-center mx-auto border transition-all border-ee rounded-[18px] relative flex flex-col gap-3 ${
      isOpen
        ? direction === 'top'
          ? 'border-t-0 rounded-t-none table-select-action'
          : 'border-b-0 rounded-b-none table-select-action'
        : ''
    }`"
  >
    <div
      class="flex justify-between items-center py-[10px] px-4"
      @click="isOpen = !isOpen"
    >
      <h1 class="text-14 text-black font-semibold">Menu</h1>
      <img
        :class="isOpen ? 'rotate-180 transition-all' : 'transition-all'"
        src="/icons/arrow-down.svg"
        alt=""
      />
    </div>

    <div
      :class="`menu ${
        isOpen
          ? 'opacity-100 select-all pointer-events-auto'
          : 'opacity-0 select-none pointer-events-none'
      } flex z-10 text-14 text-black font-semibold transition-all flex-col gap-3 items-start absolute bg-white border border-ee py-[10px] px-4 ${
        direction === 'top'
          ? 'border-b-0 bottom-full pb-0 rounded-t-[18px]'
          : 'border-t-0 top-full pt-0 rounded-b-[18px]'
      } -left-[1px] -right-[1px]`"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.table-select-action {
  box-shadow: 0px 10px 16px 0px rgba(10, 9, 11, 0.05);
}
</style>
