<script setup lang="ts">
import { inject, onMounted, ref, toRaw, watchEffect } from "vue";
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import CategoryBadge from "../../../../components/CategoryBadge.vue";
import FloatingMenu from "../../../../components/FloatingMenu.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { deleteData, getData, getSingleData } from "../../../../appwrite/api";
import { urlFileStorage } from "../../../../appwrite/storage";
import dayjs from "dayjs";
import { Query } from "appwrite";
import SkeletonDetailCourse from "../../../../components/skeleton/SkeletonDetailCourse.vue";
import type { ToastIF } from "../../../../interface/commonInterface";

const openMenu = ref(false);
const route = useRoute();
const toast = inject<ToastIF>("toast")!;

const { data, isPending } = useQuery({
  enabled: !!route.params.courseId,
  queryKey: ["manageCourse", route.params.courseId],
  queryFn: async () => {
    return await getSingleData({
      collection: "courses",
      documentId: route.params.courseId as string,
    });
  },
});

const {
  data: questionDatas,
  isPending: loadingQuestionDatas,
  refetch,
} = useQuery({
  enabled: !!data.value?.$id,
  queryKey: ["questionDatas", data.value?.$id],
  queryFn: async () => {
    return await getData({
      collection: "questions",
      query: [Query.equal("course_id", route.params.courseId ?? "")],
    });
  },
});

const { mutate: deleteQuestionMutate, isPending: loadingDeleteQuestion } =
  useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteData({
        collection: "questions",
        documentId: documentId,
      });
    },

    onSuccess: () => {
      toast.open("Question deleted successfully", "success");
      refetch();
    },
  });

onMounted(() => {
  refetch();
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
          name: 'Manage Course',
          path: '/course/manage-course',
        },
      ]"
    ></Breadcrump>

    <div class="lg:max-w-[90%] mx-auto w-full flex-col-wrapper">
      <div class="md:flex justify-between items-center">
        <SkeletonDetailCourse v-if="isPending"></SkeletonDetailCourse>

        <div
          v-else
          class="flex gap-4 md:gap-6 flex-col items-start md:flex-row md:items-center"
        >
          <div class="image w-full md:w-fit">
            <div
              class="flex justify-between items-center w-full md:inline-block"
            >
              <div class="relative">
                <img
                  :src="urlFileStorage(data?.image)"
                  alt=""
                  class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
                <div
                  class="absolute -bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  <CategoryBadge :category="data?.category" />
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
            <h1 class="text-2xl md:text-3xl text-black font-bold capitalize">
              {{ data?.name || "Course Name" }}
            </h1>
            <div class="flex gap-4 md:gap-5 items-center flex-wrap">
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/calendar-add.svg" alt="" />
                <p class="text-16 text-black font-semibold">
                  {{ dayjs(data?.$createdAt).format("DD MMMM YYYY") }}
                </p>
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
          <FloatingMenu
            :isOpen="openMenu"
            position="top-1/2 -translate-y-1/2 -left-[220px]"
          >
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

      <div
        v-if="loadingQuestionDatas"
        v-for="n in 5"
        :key="n"
        class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-3 flex-wrap justify-between items-center animate-pulse"
      >
        <div class="flex flex-col gap-1.5">
          <div class="h-4 w-24 bg-gray/15 rounded md:w-28"></div>
          <div class="h-6 w-40 bg-gray/15 rounded md:w-60"></div>
        </div>

        <div
          class="flex gap-2 md:gap-3.5 justify-end items-center w-full md:w-fit"
        >
          <div class="h-10 w-[100px] bg-gray/15 rounded md:w-[120px]"></div>
          <div class="h-10 w-10 bg-gray/15 rounded"></div>
        </div>
      </div>

      <div class="flex-col-30" v-if="questionDatas">
        <div class="flex flex-col gap-2">
          <h1 class="text-24 font-bold text-black">Course Tests</h1>
          <RouterLink
            :to="{
              name: 'new-question',
              params: { courseId: $route.params.courseId },
            }"
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
          </RouterLink>
        </div>

        <h1
          v-if="!questionDatas.length"
          class="text-16 text-black font-semibold text-center"
        >
          Question Is Empty, please add question
        </h1>

        <div
          v-for="(question, index) in questionDatas"
          :key="index"
          class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-3 flex-wrap justify-between items-center"
        >
          <div class="flex flex-col gap-1.5">
            <h4 class="text-16 text-gray">Question</h4>
            <p class="text-20 text-black font-bold capitalize">
              {{ question.question }}
            </p>
          </div>

          <div
            class="flex gap-2 md:gap-3.5 justify-end items-center w-full md:w-fit"
          >
            <RouterLink
              :to="{
                name: 'edit-question',
                params: { questionId: question.$id },
              }"
            >
              <Button
                variant="black"
                type="button"
                :shadow="false"
                custom-class="px-[30px]"
              >
                Edit
              </Button>
            </RouterLink>
            <button
              class="hover:scale-105 transition cursor-pointer disabled:opacity-20"
              :disabled="loadingDeleteQuestion"
            >
              <img
                @click="deleteQuestionMutate(question.$id)"
                src="/icons/trash.svg"
                alt=""
              />
            </button>
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
