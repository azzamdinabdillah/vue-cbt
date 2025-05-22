<script setup lang="ts">
import { ref } from "vue";

withDefaults(
  defineProps<{
    icon?: string;
    placeholder?: string;
    option: string[];
    label?: string;
    direction?: "top" | "bottom";
    error?: string;
  }>(),
  {
    icon: "/icons/placeholder.svg",
    placeholder: "Select an option",
    label: "Select",
    direction: "bottom",
  }
);

const modelValue = defineModel<string>();

const isOpen = ref(false);
// const selected = ref("");
</script>

<template>
  <div class="flex flex-col gap-2">
    <h5 class="text-16 font-semibold text-black">{{ label }}</h5>
    <div class="relative">
      <div class="flex flex-col gap-3">
        <div
          @click="isOpen = !isOpen"
          :class="[
            'top cursor-pointer flex justify-between transition-all items-center py-3 md:py-3.5 px-4 rounded-full',
            isOpen ? 'border-shadow-active-black' : 'border-shadow-gray',
          ]"
        >
          <div class="flex items-center gap-3.5">
            <img :src="icon" alt="" />
            <p
              :class="[
                'text-16',
                modelValue
                  ? 'text-black font-semibold'
                  : 'text-gray font-normal',
              ]"
            >
              {{ modelValue ? modelValue : placeholder }}
            </p>
          </div>
          <img
            :class="['transition-all', isOpen ? 'rotate-180' : '']"
            src="/icons/arrow-down.svg"
            alt=""
          />
        </div>

        <p v-if="error" class="text-12 text-red font-medium">{{ error }}</p>
      </div>

      <div
        :class="[
          'border shadow transition-all z-10 border-ee py-3.5 px-4 rounded-xl absolute bg-white gap-3 flex flex-col w-[100%] left-0 right-0',
          isOpen
            ? 'opacity-100 pointer-events-auto select-auto'
            : 'opacity-0 pointer-events-none select-none',
          direction === 'top' ? 'bottom-[60px]' : 'top-[60px]',
        ]"
      >
        <div
          @click="
            () => {
              modelValue = i;
              isOpen = false;
            }
          "
          v-bind="$attrs"
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
