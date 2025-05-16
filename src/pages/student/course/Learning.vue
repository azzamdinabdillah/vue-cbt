<script setup lang="ts">
import { ref } from "vue";
import Button from "../../../components/Button.vue";

const options = [
  {
    id: 1,
    title: "Enhancing product aesthetics",
  },
  {
    id: 2,
    title: "Improving usability and accessibility",
  },
  {
    id: 3,
    title: "Increasing product sales",
  },
  {
    id: 4,
    title: "Creating a user-friendly interface",
  },
];

const selectedOption = ref<number | null>(null);
</script>

<template>
  <div>
    <div class="header p-5 border-b border-ee">
      <div class="flex justify-between items-center flex-wrap gap-3">
        <div class="flex gap-3 md:gap-4 items-center">
          <img class="w-12.5" src="/icons/last-course-1.svg" alt="" />
          <div class="flex-col-1">
            <h1 class="text-18 font-bold text-black">Digital Marketing 101</h1>
            <p class="text-14 text-gray">Beginners</p>
          </div>
        </div>
        <div class="flex gap-3 md:gap-4 items-center md:flex-row-reverse">
          <img class="w-12.5" src="/icons/photo.svg" alt="" />
          <div class="flex-col-1">
            <p class="text-14 text-gray md:text-end">Howdy</p>
            <h1 class="text-16 font-bold text-black md:text-end">
              Bondan Poro
            </h1>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-8 md:gap-[50px] py-8 md:py-8.5 px-3.5 max-w-[821px] mx-auto w-full"
    >
      <h1
        class="text-3xl text-black text-center font-bold md:text-[46px] leading-10 md:leading-16"
      >
        What is the primary focus on User Experience (UX) Design?
      </h1>

      <div class="flex-col-wrapper md:max-w-[85%] mx-auto w-full">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectedOption = option.id"
          :class="[
            'py-3 hover:opacity-50 transition-all cursor-pointer relative md:py-4.5 px-3.5 md:px-5 pr-7 rounded-full flex justify-between items-center',
            selectedOption === option.id
              ? 'shadow-[0_0_0_2px_black]'
              : 'shadow-[0_0_0_1px_#EEE]',
          ]"
        >
          <div class="gap-2 md:gap-3.5 flex items-center">
            <img
              class="w-5 md:w-6"
              src="/icons/arrow-circle-right.svg"
              alt=""
            />
            <p class="text-sm md:text-xl text-black font-semibold">
              {{ option.title }}
            </p>
          </div>

          <img
            :class="[
              'w-5 md:w-6 absolute right-4 top-1/2 -translate-y-1/2 transition-all',
              selectedOption === option.id ? 'opacity-100' : 'opacity-0',
            ]"
            src="/icons/tick-circle.svg"
            alt=""
          />
        </div>
      </div>

      <Button variant="blue" class="max-w-[254px] w-full mx-auto">
        Save & Next Question
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
