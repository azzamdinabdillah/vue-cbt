<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
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
import { useMutation, useQuery } from "@tanstack/vue-query";
import {
  deleteFile,
  getFileAsFile,
  uploadFile,
} from "../../../../appwrite/storage";
import {
  createData,
  getSingleData,
  updateData,
} from "../../../../appwrite/api";
import type { CollectionCourseIF } from "../../../../interface/databaseCollection";
import type { ToastIF } from "../../../../interface/commonInterface";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import SkeletonInput from "../../../../components/skeleton/SkeletonInput.vue";

const toast = inject<ToastIF>("toast")!;
const route = useRoute();

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

const {
  errors,
  handleSubmit,
  defineField,
  setFieldValue,
  resetForm,
  setValues,
} = useForm({
  validationSchema: toTypedSchema(schema),
});

const [name, nameAttr] = defineField("name");
const [category, categoryAttr] = defineField("category");
const [level, levelAttr] = defineField("level");

const { data: singleCourse, isPending: singleCourseLoading } = useQuery({
  queryKey: ["singleCourse", route.params.courseId],
  enabled: computed(() => !!route.params.courseId),
  queryFn: async (): Promise<CollectionCourseIF> => {
    const datas = await getSingleData({
      collection: "courses",
      documentId: route.params.courseId as string,
    });

    return {
      id: datas.$id,
      name: datas.name,
      category: datas.category,
      level: datas.level,
      image: datas.image,
      created_at: datas.created_at,
    };
  },
});

const { data: singleImageCourse, isPending: singleImageCourseLoading } =
  useQuery({
    enabled: computed(() => !!singleCourse.value),
    queryKey: computed(() => ["imageCourse", singleCourse.value?.image]),
    queryFn: async (): Promise<any> => {
      if (!singleCourse.value) {
        throw new Error("Course image not found");
      }

      const file = await getFileAsFile(singleCourse.value.image ?? "");
      return {
        file,
        urlFile: URL.createObjectURL(file),
      };
    },
  });

watch(singleCourse, () => {
  if (singleCourse.value && route.params.courseId) {
    setValues({
      category: singleCourse.value.category,
      level: singleCourse.value.level,
      name: singleCourse.value.name,
    });
  }
});

watch(singleImageCourse, () => {
  if (singleImageCourse.value) {
    setFieldValue("image", singleImageCourse.value.file);
  }
});

onMounted(() => {
  if (!route.params.courseId) {
    resetForm();
  } else {
    if (singleCourse.value) {
      setValues({
        category: singleCourse.value.category,
        level: singleCourse.value.level,
        name: singleCourse.value.name,
      });
    }
  }
});

const onSubmit = handleSubmit(async (data) => {
  try {
    if (route.params.courseId) {
      const datas = {
        name: data.name,
        category: data.category,
        level: data.level,
      };
      if (image.value) {
        const uploadUpdate = await mutationUploadUpdate();
        await mutationCourseUpdate({
          datas: {
            image: image.value ? uploadUpdate : singleImageCourse.value.fileId,
            ...datas,
          },
          documentId: route.params.courseId as string,
        });
      } else {
        await mutationCourseUpdate({
          datas,
          documentId: route.params.courseId as string,
        });
      }
      toast.open("Course updated successfully", "success");
    } else {
      const upload = await mutationUpload();
      await mutationCourse({
        image: upload,
        name: data.name,
        category: data.category,
        level: data.level,
        created_at: new Date(),
      });

      toast.open("Course created successfully", "success");
    }
    resetForm();
  } catch (error: any) {
    console.log(error);

    toast.open(`${error.message}`, "error");
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

const { mutateAsync: mutationUploadUpdate, isPending: isUploadPendingUpdate } =
  useMutation({
    mutationFn: async () => {
      console.log(singleCourse.value?.image);
      await deleteFile(singleCourse.value?.image ?? "");
      const upload = await uploadFile(image.value as File);

      return upload;
    },
  });

const { mutateAsync: mutationCourseUpdate, isPending: isCoursePendingUpdate } =
  useMutation({
    mutationFn: async ({
      datas,
      documentId,
    }: {
      datas: CollectionCourseIF;
      documentId: string;
    }) => {
      return await updateData({
        collection: "courses",
        datas,
        documentId,
      });
    },
  });

function imageOnChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    console.log("asdasda");

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
          <div
            class="w-[100px] h-[100px] rounded-full object-cover bg-gray/20 animate-pulse"
            v-if="route.params.courseId && singleImageCourseLoading"
          ></div>
          <img
            v-else
            :src="
              imageUrl
                ? imageUrl
                : singleImageCourse?.urlFile
                ? singleImageCourse?.urlFile
                : '/images/profile-placeholder.png'
            "
            alt=""
            class="w-[100px] h-[100px] rounded-full object-cover"
          />
          <!-- <img
            v-if="imageUrl || !route.params.courseId"
            :src="imageUrl ? imageUrl : '/images/profile-placeholder.png'"
            alt=""
            class="w-[100px] h-[100px] rounded-full object-cover"
          />
          <div
            class="w-[100px] h-[100px] rounded-full object-cover bg-gray/20 animate-pulse"
            v-else-if="route.params.courseId && singleImageCourseLoading"
          ></div>
          <img
            class="w-[100px] h-[100px] rounded-full object-cover"
            v-else
            :src="urlFileStorage(singleImageCourse.$id)"
            alt=""
          /> -->
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

        <!-- <p class="text-12 font-medium text-red">
          {{ errors.image }}
        </p> -->
        <p class="text-12 font-medium text-red">
          {{ errors.image }}
        </p>
      </div>

      <SkeletonInput
        v-for="i in 3"
        v-if="singleCourseLoading && route.params.courseId"
        :key="i"
      />
      <div v-else class="flex-col-wrapper">
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
      </div>

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
        :disabled="
          isCoursePending ||
          isUploadPending ||
          isCoursePendingUpdate ||
          isUploadPendingUpdate
        "
        type="submit"
        variant="blue"
        customClass="w-full"
        >{{
          isCoursePending ||
          isUploadPending ||
          isCoursePendingUpdate ||
          isUploadPendingUpdate
            ? "Loading..."
            : "Create Course"
        }}</Button
      >
    </form>
  </div>
</template>

<style scoped></style>
