<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{
  modelValue?: string;
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
        autocomplete="true"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :class="`w-full text-16 font-semibold focus:outline-none transition-shadow shadow-[0_0_0_1px_#EEE] focus:shadow-[0_0_0_2px_black] placeholder:text-16 placeholder:text-gray placeholder:font-normal bg-white rounded-full py-3.5 px-4 ${
          suffix ? 'pr-[60px]' : ''
        } ${prefix ? 'pl-[50px]' : ''}`"
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
