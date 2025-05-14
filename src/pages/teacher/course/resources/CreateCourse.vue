<script setup lang="ts">
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import Title from "../../../../components/Title.vue";
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
          name: 'Create Course',
          path: '/course/create-course',
        },
      ]"
    ></Breadcrump>
    <Title
      title="New Course"
      subTitle="Provide high quality for best students"
    ></Title>

    <form class="flex-col-wrapper">
      <div class="flex items-center gap-5">
        <img
          src="/icons/profile-placeholder.svg"
          alt=""
          class="w-[100px] h-[100px] rounded-full"
        />
        <Button variant="black">Add Icon</Button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
