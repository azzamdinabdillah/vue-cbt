<script setup lang="ts">
defineProps<{
  category: "Design" | "Programming" | "Marketing";
}>();

const variant: Record<string, string> = {
  Design: "bg-[#FFF2E6] text-[#F6770B]",
  Programming: "bg-[#EAE8FE] text-[#6436F1]",
  Marketing: "bg-[#D5EFFE] text-[#066DFE]",
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
