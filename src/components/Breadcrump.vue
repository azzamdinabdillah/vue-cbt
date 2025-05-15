<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps<{
  url: {
    name: string;
    path: string;
  }[];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-5 md:gap-7.5">
    <RouterLink
      v-for="(u, index) in url"
      :to="u.path"
      :class="[
        'flex group gap-5 md:gap-7.5 text-16',
        index === url.length - 1 ? 'text-black font-semibold' : 'text-gray',
      ]"
    >
      <p class="group-hover:text-black transition-all">{{ u.name }}</p>
      <span v-if="index !== url.length - 1">/</span>
    </RouterLink>
  </div>
</template>

<style scoped></style>
