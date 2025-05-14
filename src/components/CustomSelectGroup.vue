<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  icon?: string;
  placeholder?: string;
  option: string[];
  label?: string;
}>();

const isOpen = ref(false);
const selected = ref("");
</script>

<template>
  <div class="flex flex-col gap-2">
    <h5 class="text-16 font-semibold text-black">{{ label }}</h5>
    <div class="relative">
      <div
        @click="isOpen = !isOpen"
        class="top cursor-pointer flex justify-between transition-all items-center border border-ee py-3.5 px-4 rounded-full"
      >
        <div class="flex items-center gap-3.5">
          <img :src="icon" alt="" />
          <p
            :class="[
              'text-16',
              selected ? 'text-black font-semibold' : 'text-gray font-normal',
            ]"
          >
            {{ selected ? selected : placeholder }}
          </p>
        </div>
        <img
          :class="['transition-all', isOpen ? 'rotate-180' : '']"
          src="/icons/arrow-down.svg"
          alt=""
        />
      </div>

      <div
        :class="[
          'border shadow transition-all border-ee py-3.5 px-4 rounded-xl absolute top-[60px] bg-white gap-3 flex flex-col w-[100%] left-0 right-0',
          isOpen
            ? 'opacity-100 pointer-events-auto select-auto'
            : 'opacity-0 pointer-events-none select-none',
        ]"
      >
        <div
          @click="
            () => {
              selected = i;
              isOpen = false;
            }
          "
          class="group text-16 text-black font-semibold cursor-pointer w-full"
          v-for="i in option"
        >
          <p class="group-hover:scale-105 w-fit transition-all">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0px 10px 16px 0px rgba(10, 9, 11, 0.05);
}
</style>
