<script setup lang="ts">
import Breadcrump from "../../../components/Breadcrump.vue";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
import IsPassed from "../../../components/IsPassed.vue";

const questions = [
  {
    question: "What is the capital of France?",
    isCorrect: false,
  },
  {
    question: "What is the capital of Germany?",
    isCorrect: true,
  },
  {
    question: "What is the capital of United States?",
    isCorrect: false,
  },
  {
    question: "What is the capital of United Kingdom?",
    isCorrect: true,
  },
];
</script>

<template>
  <div class="flex-col-wrapper">
    <Breadcrump
      :url="[
        {
          name: 'My Course',
          path: '/student/course',
        },
        {
          name: 'Raport Details',
          path: `/student/course/raport-details/${$route.params.courseId}`,
        },
      ]"
    ></Breadcrump>

    <div class="max-w-[870px] mx-auto w-full flex-col-wrapper">
      <div class="md:flex justify-between items-center">
        <div
          class="flex gap-4 md:gap-6 flex-col items-start md:flex-row md:items-center"
        >
          <div class="image w-full md:w-fit">
            <div
              class="flex justify-between items-center w-full md:inline-block"
            >
              <div class="relative">
                <img
                  src="/icons/last-course-1.svg"
                  alt=""
                  class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  <CategoryBadge category="Product Design" />
                </div>
              </div>
              <div class="relative md:hidden">
                <IsPassed :isPassed="false" size="md" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 md:gap-5">
            <h1 class="text-2xl md:text-3xl text-black font-bold">
              Digital Marketing 101
            </h1>
            <div class="flex gap-4 md:gap-5 items-center flex-wrap">
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/note-text.svg" alt="" />
                <p class="text-16 text-black font-semibold">4 of 6 correct</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative hidden md:inline-block">
          <IsPassed :isPassed="false" size="md" />
        </div>
      </div>

      <div class="flex gap-5 flex-col">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-3 flex-wrap justify-between items-center"
        >
          <div class="flex-col flex gap-1 md:gap-1.5">
            <p class="text-16 text-gray">Question</p>
            <h2 class="text-20 text-black font-bold">
              {{ question.question }}
            </h2>
          </div>

          <div
            :class="[
              'py-2 px-5 rounded-full text-14 font-semibold',
              question.isCorrect ? 'bg-green text-white' : 'bg-red text-white',
            ]"
          >
            {{ question.isCorrect ? "Correct" : "Incorrect" }}
          </div>
        </div>
      </div>

      <div class="gap-5 flex items-center">
        <Button variant="black" custom-class="px-5">Retake Course</Button>
      </div>
    </div>
  </div>
</template>
