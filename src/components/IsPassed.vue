<script setup lang="ts">
defineProps<{
  isPassed: boolean;
  size: "sm" | "md" | "lg";
}>();

const sizeClasses = {
  sm: "py-1.5 px-2.5 text-12",
  md: "text-18 py-3 px-4 md:py-4 md:px-5",
  lg: "text-18",
};
</script>

<template>
  <div
    :class="[
      'border-3 md:border-4 border-dashed p-1 md:p-1.5 rounded-[10px]',
      isPassed ? 'border-[#06BC65]' : 'border-[#FD445E]',
    ]"
  >
    <div
      :class="[
        'rounded-lg font-bold text-white',
        sizeClasses[size],
        isPassed ? 'bg-[#06BC65]' : 'bg-[#FD445E]',
      ]"
    >
      {{ isPassed ? "Passed" : "Not Passed" }}
    </div>
  </div>
</template>

<style scoped></style>
