<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Breadcrump from "../../../components/Breadcrump.vue";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
import IsPassed from "../../../components/IsPassed.vue";
import { useRoute } from "vue-router";
import { getSingleData } from "../../../appwrite/api";
import SkeletonDetailCourse from "../../../components/skeleton/SkeletonDetailCourse.vue";
import type {
  CollectionCourseIF,
  CollectionQuestionIF,
  CollectionStudentCourseIF,
} from "../../../interface/databaseCollection";
import { urlFileStorage } from "../../../appwrite/storage";
import type { Category } from "../../../interface/commonType";
import SkeletonStudentList from "../../../components/skeleton/SkeletonStudentList.vue";

const route = useRoute();

const {
  data,
  isPending: loadingData,
  isRefetching: loadingRefetchData,
} = useQuery({
  queryKey: ["singleCourse", route.params.courseId],
  queryFn: async (): Promise<{
    course: CollectionCourseIF;
    studentCourse: CollectionStudentCourseIF;
    questions: (CollectionQuestionIF & { userAnswer: string })[];
  }> => {
    const data = await getSingleData({
      collection: "students_course",
      documentId: route.params.studentCourseId as string,
    });

    const courseData = await getSingleData({
      collection: "courses",
      documentId: route.params.courseId as string,
    });

    console.log(data);
    console.log(JSON.parse(data.result));
    console.log(courseData);

    return {
      course: {
        category: courseData.category as Category,
        level: courseData.level,
        name: courseData.name,
        image: courseData.image,
      },
      studentCourse: {
        score: data.score,
        is_passed: data.is_passed,
      },
      questions: JSON.parse(data.result),
    };
  },
});
</script>

<template>
  <div class="flex-col-wrapper">
    <Breadcrump
      :url="[
        {
          name: 'My Course',
          path: '/student/course',
        },
        {
          name: 'Raport Details',
          path: `/student/course/raport-details/${$route.params.courseId}`,
        },
      ]"
    ></Breadcrump>

    <div class="max-w-[870px] mx-auto w-full flex-col-wrapper">
      <SkeletonDetailCourse v-if="loadingData || loadingRefetchData" />
      <div v-else class="md:flex justify-between items-center">
        <div
          class="flex gap-4 md:gap-6 flex-col items-start md:flex-row md:items-center"
        >
          <div class="image w-full md:w-fit">
            <div
              class="flex justify-between items-center w-full md:inline-block"
            >
              <div class="relative">
                <img
                  :src="urlFileStorage(data?.course.image ?? '')"
                  alt=""
                  class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  <CategoryBadge
                    :category="data?.course.category as Category"
                  />
                </div>
              </div>
              <div class="relative md:hidden">
                <IsPassed
                  :isPassed="data?.studentCourse.is_passed ?? false"
                  size="md"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 md:gap-5">
            <h1 class="text-2xl md:text-3xl text-black font-bold capitalize">
              {{ data?.course.name }}
            </h1>
            <div class="flex gap-4 md:gap-5 items-center flex-wrap">
              <div class="flex gap-1.5 md:gap-2.5 items-center">
                <img class="w-5 md:w-6" src="/icons/note-text.svg" alt="" />
                <p class="text-16 text-black font-semibold">
                  {{
                    data?.questions.filter(
                      (q) => q.correct_option === q.userAnswer
                    ).length
                  }}
                  of {{ data?.questions.length }} correct | Score :
                  {{ data?.studentCourse.score }} / 100
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative hidden md:inline-block">
          <IsPassed
            :isPassed="data?.studentCourse.is_passed ?? false"
            size="md"
          />
        </div>
      </div>

      <div class="flex gap-5 flex-col">
        <SkeletonStudentList
          v-if="loadingRefetchData || loadingData"
          v-for="i in 3"
          :key="i"
        />
        <div
          v-else
          v-for="(question, index) in data?.questions"
          :key="index"
          class="border border-ee rounded-2xl md:rounded-[20px] p-4 flex gap-5 justify-between items-center"
        >
          <div class="flex-col flex gap-1 md:gap-1.5">
            <p class="text-16 text-gray">Question</p>
            <h2
              class="text-20 text-black font-bold capitalize"
            >
              {{ question.question }}
            </h2>
          </div>

          <div
            :class="[
              'py-2 px-5 rounded-full text-14 font-semibold',
              question.userAnswer === question.correct_option
                ? 'bg-green text-white'
                : 'bg-red text-white',
            ]"
          >
            {{
              question.userAnswer === question.correct_option
                ? "Correct"
                : "Incorrect"
            }}
          </div>
        </div>
      </div>

      <div
        class="gap-5 flex items-center"
        v-if="!loadingRefetchData && !loadingData"
      >
        <RouterLink
          :to="{
            name: 'learning',
            params: {
              courseId: route.params.courseId,
              studentCourseId: route.params.studentCourseId,
            },
          }"
        >
          <Button variant="black" custom-class="px-5">Retake Course</Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
