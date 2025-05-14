<script setup lang="ts">
import { computed, ref } from "vue";
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import InputGroup from "../../../../components/InputGroup.vue";
import Title from "../../../../components/Title.vue";

const fileInput = ref<HTMLInputElement | null>(null);
const profile = ref<File | null>(null);
const imageUrl = computed(() => {
  if (profile.value) {
    return URL.createObjectURL(profile.value);
  }
});
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
          :src="imageUrl ? imageUrl : '/images/profile-placeholder.png'"
          alt=""
          class="w-[100px] h-[100px] rounded-full"
        />
        <Button
          @click="() => fileInput?.click()"
          type="button"
          :shadow="false"
          variant="black"
          >Add Icon</Button
        >
        <input
          @change="(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files) {
              profile = target.files[0];
            }
          }"
          ref="fileInput"
          type="file"
          hidden
          accept="image/*"
          id="profileInput"
        />
      </div>

      <InputGroup
        id="name"
        label="Course Name"
        placeholder="Write your better course name"
        prefix="/icons/note-favorite-black.svg"
        type="text"
      />
    </form>
  </div>
</template>

<style scoped></style>
