<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  label?: string;
  id: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
}>();
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label v-if="label" :for="id" class="text-16 font-semibold text-black">{{
      label
    }}</label>
    <div class="relative">
      <img
        :src="prefix"
        alt=""
        v-if="prefix"
        class="absolute left-4 top-1/2 transform -translate-y-1/2"
      />
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :class="`w-full text-16 font-semibold text- outline-none focus:border-2 focus:border-black transition-all placeholder:text-16 placeholder:text-gray placeholder:font-normal border border-[#EEE] bg-white rounded-full py-3.5 px-4 ${suffix ? 'pr-[60px]' : ''} ${
          prefix ? 'pl-[50px]' : ''
        }`"
      />
      <img
        :src="suffix"
        alt=""
        v-if="suffix"
        class="absolute right-4 top-1/2 transform -translate-y-1/2"
      />
    </div>
  </div>
</template>

<style scoped></style>
