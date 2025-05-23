<script setup lang="ts">
defineProps<{
  message: string;
  status: "success" | "error";
  isOpen: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'rounded-lg shadow p-3 px-5 pr-8 md:p-4 md:px-7 md:pr-10 fixed z-30 bg-white top-3 right-3 lg:bottom-5 lg:right-5 lg:top-[unset] border border-ee transition-all',
      isOpen ? 'opacity-100' : 'opacity-0 select-none pointer-events-none',
    ]"
  >
    <div class="flex flex-col">
      <h1
        :class="[
          'text-14 font-semibold capitalize',
          status === 'error' ? 'text-red' : 'text-green',
        ]"
      >
        {{ status }} :
      </h1>
      <p class="text-black font-medium text-16">{{ message }}</p>
    </div>
    <button
      @click="$emit('close')"
      class="absolute top-0 right-2 text-2xl hover:scale-110 cursor-pointer transition"
    >
      &times;
    </button>
  </div>
</template>

<style scoped></style>
