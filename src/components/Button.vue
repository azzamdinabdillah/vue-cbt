<script setup lang="ts">
withDefaults(
  defineProps<{
    customClass?: string;
    variant?: "blue" | "orange" | "black";
    shadow?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "blue",
    shadow: true,
    type: "button",
  }
);

const variantClass = {
  blue: "bg-blue text-white",
  orange: "bg-orange text-white",
  black: "bg-black text-white",
};
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="`${variantClass[variant]} ${
      shadow ? 'shadow' : ''
    } disabled:opacity-50 rounded-full py-3.5 px-5 text-16 font-bold text-16 w-fit cursor-pointer hover:opacity-80 transition-all ${customClass}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.shadow {
  box-shadow: 0px 4px 15px 0px rgba(100, 54, 241, 0.3);
}
</style>
