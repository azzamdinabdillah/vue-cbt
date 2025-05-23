<script setup lang="ts">
import { computed, inject, ref } from "vue";
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import InputGroup from "../../../../components/InputGroup.vue";
import Title from "../../../../components/Title.vue";
import CustomSelectGroup from "../../../../components/CustomSelectGroup.vue";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  CATEGORIES,
  LEVELS,
  type Category,
  type Level,
} from "../../../../interface/commonType";
import { useMutation } from "@tanstack/vue-query";
import { uploadFile } from "../../../../appwrite/storage";
import { createData } from "../../../../appwrite/api";
import type { CollectionCourseIF } from "../../../../interface/databaseCollection";
import type { ToastIF } from "../../../../interface/commonInterface";

const toast = inject<ToastIF>("toast")!;

const fileInput = ref<HTMLInputElement | null>(null);
const image = ref<File | null>(null);
const imageUrl = computed(() => {
  if (image.value) {
    return URL.createObjectURL(image.value);
  }
});

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Minimum 3 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .refine(
      (val) => {
        return CATEGORIES.includes(val as Category);
      },
      { message: "Category is required" }
    ),
  level: z
    .string()
    .min(1, "Level is required")
    .refine(
      (val) => {
        return LEVELS.includes(val as Level);
      },
      { message: "Level is required" }
    ),
  image: z
    .instanceof(File, { message: "Image is required" })
    // .optional()
    .refine((file) => file.size < 2 * 1024 * 1024, {
      message: "Image size must be less than 2MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "Image must be in jpeg, png, or jpg format",
      }
    ),
});

const { errors, handleSubmit, defineField, setFieldValue, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
});

const [name, nameAttr] = defineField("name");
const [category, categoryAttr] = defineField("category");
const [level, levelAttr] = defineField("level");

const onSubmit = handleSubmit(async (data) => {
  try {
    const upload = await mutationUpload();
    await mutationCourse({
      image: upload,
      name: data.name,
      category: data.category,
      level: data.level,
      created_at: new Date(),
    });

    toast.open("Course created successfully", "success");
    resetForm();
  } catch (error) {
    console.log(error);
  }
});

const { mutateAsync: mutationUpload, isPending: isUploadPending } = useMutation(
  {
    mutationFn: async () => {
      return await uploadFile(image.value as File);
    },
  }
);

const { mutateAsync: mutationCourse, isPending: isCoursePending } = useMutation(
  {
    mutationFn: async (datas: CollectionCourseIF) => {
      return await createData({
        collection: "courses",
        datas,
      });
    },
  }
);

function imageOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    image.value = target.files[0];
    setFieldValue("image", image.value);
  }
}
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

    <form
      @submit.prevent="onSubmit"
      class="flex-col-wrapper md:pl-8 lg:pl-12.5 md:max-w-[70%] lg:max-w-[500px] pb-10"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-5">
          <img
            :src="imageUrl ? imageUrl : '/images/profile-placeholder.png'"
            alt=""
            class="w-[100px] h-[100px] rounded-full object-cover"
          />
          <Button
            @click="() => fileInput?.click()"
            type="button"
            :shadow="false"
            variant="black"
            >Add Icon</Button
          >
          <input
            @change="imageOnChange"
            ref="fileInput"
            type="file"
            hidden
            accept="image/*"
            id="profileInput"
          />
        </div>

        <p class="text-12 font-medium text-red">{{ errors.image }}</p>
      </div>

      <InputGroup
        :error="errors.name"
        :required="true"
        v-model="name"
        v-bind="nameAttr"
        id="name"
        label="Course Name"
        placeholder="Write your better course name"
        prefix="/icons/note-favorite-black.svg"
        type="text"
      />

      <CustomSelectGroup
        :error="errors.category"
        v-bind="categoryAttr"
        v-model="category"
        label="Category"
        placeholder="Select Category"
        icon="/icons/bill.svg"
        :option="[...CATEGORIES]"
      />

      <CustomSelectGroup
        :error="errors.level"
        v-bind="levelAttr"
        v-model="level"
        direction="top"
        label="Level"
        placeholder="Select level"
        icon="/icons/security-user.svg"
        :option="[...LEVELS]"
      />

      <!-- <div class="flex gap-2.5">
        <input id="aggree" type="checkbox" class="checkbox-style" />
        <label
          for="aggree"
          class="text-16 cursor-pointer font-semibold text-black"
        >
          I have read terms and conditions
        </label>
      </div> -->

      <Button
        :disabled="isCoursePending || isUploadPending"
        type="submit"
        variant="blue"
        customClass="w-full"
        >{{
          isCoursePending || isUploadPending ? "Creating..." : "Create Course"
        }}</Button
      >
    </form>
  </div>
</template>

<style scoped></style>
