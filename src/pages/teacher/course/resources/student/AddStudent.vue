<script setup lang="ts">
import Breadcrump from "../../../../../components/Breadcrump.vue";
import Button from "../../../../../components/Button.vue";
import InputGroup from "../../../../../components/InputGroup.vue";
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
          path: `/course/student/${$route.params.courseId}`,
        },
        {
          name: 'Add Students',
          path: `/student/add-student`,
        },
      ]"
    ></Breadcrump>

    <div class="flex-col-wrapper max-w-[612px] md:pl-[50px] lg:pl-[70px]">
      <div class="flex items-center gap-6 flex-wrap">
        <img src="/icons/last-course-1.svg" alt="" />
        <h1 class="text-2xl md:text-3xl text-black font-bold">
          Digital Marketing 101
        </h1>
      </div>

      <div class="flex flex-col gap-4 md:gap-5">
        <h1 class="text-24 font-bold text-black">Add New Student</h1>

        <InputGroup
          id="email"
          prefix="/icons/sms-plain.svg"
          label="Email Address"
          placeholder="Write your student email here"
          type="email"
          class="w-full"
        ></InputGroup>
      </div>

      <Button type="button" variant="blue" customClass="w-full"
        >Add Now to Course</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
