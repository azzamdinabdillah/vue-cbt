<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import Breadcrump from "../../../../../components/Breadcrump.vue";
import Button from "../../../../../components/Button.vue";
import CategoryBadge from "../../../../../components/CategoryBadge.vue";
import IsPassed from "../../../../../components/IsPassed.vue";
import { computed, toRaw, watch, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getData, getSingleData } from "../../../../../appwrite/api";
import SkeletonDetailCourse from "../../../../../components/skeleton/SkeletonDetailCourse.vue";
import { urlFileStorage } from "../../../../../appwrite/storage";
import dayjs from "dayjs";
import { Query } from "appwrite";
import SkeletonStudentList from "../../../../../components/skeleton/SkeletonStudentList.vue";
import type {
  CollectionStudentCourseIF,
  CollectionUserIF,
} from "../../../../../interface/databaseCollection";

const route = useRoute();

const { data: singleCourseData, isPending: loadingSingleCourseData } = useQuery(
  {
    enabled: !!route.params.courseId,
    queryKey: ["manageCourse", route.params.courseId],
    queryFn: async () => {
      return await getSingleData({
        collection: "courses",
        documentId: route.params.courseId as string,
      });
    },
  }
);

const { data: studentsCourseData, isPending: loadingStudentsCourse } = useQuery(
  {
    enabled: computed(() => !!route.fullPath),
    queryKey: ["studentCourse", route.fullPath],
    queryFn: async () => {
      return await getData({
        collection: "students_course",
        query: [Query.equal("course_id", route.params.courseId ?? "")],
      });
    },
  }
);

const {
  data: studentsData,
  isPending: loadingStudentsData,
  refetch: refetchStudents,
} = useQuery({
  refetchOnMount: true,
  enabled: computed(() => !!studentsCourseData.value),
  queryKey: ["student", studentsCourseData.value],
  queryFn: async (): Promise<{
    user: CollectionUserIF[];
    studentCourse: CollectionStudentCourseIF[];
  }> => {
    if (!studentsCourseData.value || studentsCourseData.value.length === 0) {
      console.log("studentsCourseData kosong atau undefined");
      return { user: [], studentCourse: [] };
    }

    const userIds = studentsCourseData.value.map((item) => item.user_id);

    console.log(toRaw(studentsCourseData.value));

    const result = await getData({
      collection: "users",
      query: [Query.equal("$id", userIds)],
    });

    return {
      user: result.map((item) => {
        return {
          id: item.$id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: new Date(item.$createdAt),
        };
      }),
      studentCourse: studentsCourseData.value.map((item) => {
        return {
          is_passed: item.is_passed,
          score: item.score,
        };
      }),
    };
  },
});

watch(studentsCourseData, () => {
  if (studentsCourseData.value) {
    // console.log(toRaw(studentsCourseData.value));

    refetchStudents();
    // console.log("asdasd", toRaw(studentsData.value));
  }
});

watchEffect(() => {
  // console.log(toRaw(studentsCourseData.value));
  console.log("mnmnm", toRaw(studentsData.value));
  // console.log(route.fullPath);
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
          name: 'Students',
          path: '/course/students',
        },
      ]"
    ></Breadcrump>

    <div class="max-w-[870px] mx-auto w-full flex-col-wrapper">
      <div class="md:flex justify-between items-center">
        <SkeletonDetailCourse
          v-if="loadingSingleCourseData"
        ></SkeletonDetailCourse>

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
                  :src="urlFileStorage(singleCourseData?.image)"
                  alt=""
                  class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  <CategoryBadge :category="singleCourseData?.category" />
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
              {{ singleCourseData?.name || "Course Name" }}
            </h1>
            <div class="flex gap-4 md:gap-5 items-center flex-wrap">
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/calendar-add.svg" alt="" />
                <p class="text-16 text-black font-semibold">
                  {{
                    dayjs(singleCourseData?.$createdAt).format("DD MMMM YYYY")
                  }}
                </p>
              </div>
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/profile-2user.svg" alt="" />
                <p class="text-16 text-black font-semibold">
                  {{ studentsData?.user.length }} students
                </p>
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
          <SkeletonStudentList
            v-if="loadingStudentsData || loadingStudentsCourse"
            v-for="i in 3"
            :key="i"
          ></SkeletonStudentList>

          <template v-else>
            <h1
              v-if="!studentsData?.user.length"
              class="text-16 text-black font-semibold text-center"
            >
              students is empty, please add student first
            </h1>

            <div
              v-else
              v-for="(student, index) in studentsData.user"
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

              <p
                class="capitalize text-16 text-gray font-semibold"
                v-if="(studentsData.studentCourse[index].score ?? 0) <= 0"
              >
                no results yet
              </p>
              <IsPassed
                v-else
                size="sm"
                :is-passed="
                  studentsData.studentCourse[index].is_passed ?? false
                "
              />

              <!-- <IsPassed v-else size="sm" :is-passed="false" /> -->
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
