<script setup lang="ts">
import type { Category } from '../interface/commonType';

defineProps<{
  category: Category;
}>();

const variant: Record<string, string> = {
  Design: "bg-[#FFF2E6] text-[#F6770B]",
  Programming: "bg-[#EAE8FE] text-[#6436F1]",
  Marketing: "bg-[#D5EFFE] text-[#066DFE]",
  Other: "bg-[#E7EFC7] text-[#0E2148]",
};
</script>

<template>
  <div
    :class="[
      'py-2 px-4 w-fit mx-auto text-14 font-bold rounded-full whitespace-nowrap',
      variant[category],
    ]"
  >
    {{ category }}
  </div>
</template>

<style scoped></style>
