<script setup lang="ts">
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import InputGroup from "../../../../components/InputGroup.vue";
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
          path: `/course/manage-course/${$route.params.courseId}`,
        },
        {
          name: 'New Question',
          path: '/course/manage-course/new-question',
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
        <h1 class="text-24 font-bold text-black">Add New Question</h1>

        <InputGroup
          id="question"
          prefix="/icons/note-text.svg"
          label="Question"
          placeholder="Write your question here"
          type="text"
          class="w-full"
        ></InputGroup>

        <div class="gap-2.5 flex flex-col">
          <h2 class="text-16 text-black font-semibold">Answers</h2>
          <div class="flex items-center gap-4" v-for="i in 4" :key="i">
            <InputGroup
              id="answer1"
              prefix="/icons/edit.svg"
              placeholder="Write answer option"
              type="text"
              class="w-full"
            ></InputGroup>

            <div class="flex gap-2.5">
              <input
                :id="`aggree${i}`"
                type="radio"
                name="correct-option"
                class="checkbox-style"
              />
              <label
                :for="`aggree${i}`"
                class="text-16 cursor-pointer font-semibold text-black"
              >
                Correct
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button type="button" variant="blue" customClass="w-full"
        >Save Question</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
