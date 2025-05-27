<script setup lang="ts">
import { RouterLink } from "vue-router";
import Breadcrump from "../../../../../components/Breadcrump.vue";
import Button from "../../../../../components/Button.vue";
import CategoryBadge from "../../../../../components/CategoryBadge.vue";
import IsPassed from "../../../../../components/IsPassed.vue";

const students = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    name: "Wong Etan",
    email: "wong.etan@example.com",
  },
];
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
          name: 'Students',
          path: '/course/students',
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
                  <CategoryBadge category="Design" />
                </div>
              </div>
              <div class="relative md:hidden">
                <RouterLink
                  :to="{
                    name: 'add-student',
                    params: { courseId: $route.params.courseId },
                  }"
                >
                  <Button variant="blue">Add Student</Button>
                </RouterLink>
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
          <RouterLink
            :to="{
              name: 'add-student',
              params: { courseId: $route.params.courseId },
            }"
          >
            <Button variant="blue">Add Student</Button>
          </RouterLink>
        </div>
      </div>

      <div class="flex gap-3 flex-col">
        <h1 class="text-24 font-bold text-black">Students</h1>
        <div class="flex gap-5 flex-col">
          <div
            v-for="(student, index) in students"
            :key="index"
            class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-3 flex-wrap justify-between items-center"
          >
            <div class="flex gap-4 items-center">
              <img class="md:w-[50px]" src="/icons/photo.svg" alt="" />
              <div class="">
                <h3 class="text-20 text-black font-bold">
                  {{ student.name }}
                </h3>
                <p class="text-16 text-gray">{{ student.email }}</p>
              </div>
            </div>

            <IsPassed
              v-if="index % 2 === 0"
              size="sm"
              :is-passed="true"
            />

            <IsPassed v-else size="sm" :is-passed="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .border-dashed {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2306BC65FF' stroke-width='7' stroke-dasharray='9' stroke-dashoffset='5' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 10px;
  overflow: hidden;
} */
</style>
