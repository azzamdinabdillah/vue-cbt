<script setup lang="ts">
import { ref } from "vue";
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import CategoryBadge from "../../../../components/CategoryBadge.vue";
import FloatingMenu from "../../../../components/FloatingMenu.vue";

const questions = [
  {
    question: "Why do we need to do marketing?",
    answer: "To reach a wider audience and increase sales.",
  },
  {
    question: "What is the best way to market a product?",
    answer: "Through social media and online advertising.",
  },
  {
    question: "How can we measure the success of our marketing efforts?",
    answer: "By tracking sales and customer engagement.",
  },
];

const openMenu = ref(false);
</script>

<template>
  <div class="flex-col-wrapper">
    <Breadcrump
      :url="[
        {
          name: 'Course',
          path: '/course',
        },
        {
          name: 'Manage Course',
          path: '/course/manage-course',
        },
      ]"
    ></Breadcrump>

    <div class="lg:max-w-[90%] mx-auto w-full flex-col-wrapper">
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
                <img
                  @click="openMenu = !openMenu"
                  src="/images/more.png"
                  alt=""
                  class="w-11.5 cursor-pointer hover:scale-110 transition"
                />
                <FloatingMenu :isOpen="openMenu">
                  <div class="flex gap-2.5 items-center">
                    <img class="w-5" src="/icons/profile-2user.svg" alt="" />
                    <p class="text-14 font-semibold text-black">Add Students</p>
                  </div>
                  <div class="flex gap-2.5 items-center">
                    <img
                      class="w-5"
                      src="/icons/note-favorite-black.svg"
                      alt=""
                    />
                    <p class="text-14 font-semibold text-black">
                      Edit Course Details
                    </p>
                  </div>
                  <div class="flex gap-2.5 items-center">
                    <img class="w-5" src="/icons/crown.svg" alt="" />
                    <p class="text-14 font-semibold text-black">
                      Upload Certificate
                    </p>
                  </div>
                  <div class="flex gap-2.5 items-center">
                    <img class="w-5" src="/icons/trash-plain.svg" alt="" />
                    <p class="text-14 font-semibold text-red">Delete Course</p>
                  </div>
                </FloatingMenu>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 md:gap-5">
            <h1 class="text-2xl md:text-3xl text-black font-bold">
              Digital Marketing 101
            </h1>
            <div class="flex gap-4 md:gap-5 items-center flex-wrap">
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/calendar-add.svg" alt="" />
                <p class="text-16 text-black font-semibold">22 August 2024</p>
              </div>
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/profile-2user.svg" alt="" />
                <p class="text-16 text-black font-semibold">489,509 students</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative hidden md:inline-block">
          <img
            @click="openMenu = !openMenu"
            src="/images/more.png"
            alt=""
            class="w-11.5 cursor-pointer hover:scale-110 transition"
          />
          <FloatingMenu :isOpen="openMenu" left="-left-[220px]">
            <div class="flex gap-2.5 items-center">
              <img class="w-5" src="/icons/profile-2user.svg" alt="" />
              <p class="text-14 font-semibold text-black">Add Students</p>
            </div>
            <div class="flex gap-2.5 items-center">
              <img class="w-5" src="/icons/note-favorite-black.svg" alt="" />
              <p class="text-14 font-semibold text-black">
                Edit Course Details
              </p>
            </div>
            <div class="flex gap-2.5 items-center">
              <img class="w-5" src="/icons/crown.svg" alt="" />
              <p class="text-14 font-semibold text-black">Upload Certificate</p>
            </div>
            <div class="flex gap-2.5 items-center">
              <img class="w-5" src="/icons/trash-plain.svg" alt="" />
              <p class="text-14 font-semibold text-red">Delete Course</p>
            </div>
          </FloatingMenu>
        </div>
      </div>

      <div class="flex-col-30">
        <div class="flex flex-col gap-2">
          <h1 class="text-24 font-bold text-black">Course Tests</h1>
          <div
            class="box group cursor-pointer transition-all flex justify-center items-center gap-2 md:gap-5 h-[92px]"
          >
            <img
              class="group-hover:scale-110 transition"
              src="/icons/note-add.svg"
              alt=""
            />
            <h2
              class="text-20 text-black font-bold group-hover:scale-110 transition"
            >
              Add New Question
            </h2>
          </div>
        </div>

        <div
          v-for="(question, index) in questions"
          :key="index"
          class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-3 flex-wrap justify-between items-center"
        >
          <div class="flex flex-col gap-1.5">
            <h4 class="text-16 text-gray">Question</h4>
            <p class="text-20 text-black font-bold">
              {{ question.question }}
            </p>
          </div>

          <div
            class="flex gap-2 md:gap-3.5 justify-end items-center w-full md:w-fit"
          >
            <Button
              variant="black"
              type="button"
              :shadow="false"
              custom-class="px-[30px]"
            >
              Edit
            </Button>
            <img src="/icons/trash.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%230A090BFF' stroke-width='4' stroke-dasharray='4' stroke-dashoffset='5' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 20px;
}
</style>
