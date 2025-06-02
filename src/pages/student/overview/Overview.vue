<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import Button from "../../../components/Button.vue";
import Title from "../../../components/Title.vue";
import { getData } from "../../../appwrite/api";
import { computed, watch } from "vue";
import { Query } from "appwrite";
import type { CollectionCourseIF } from "../../../interface/databaseCollection";
import { urlFileStorage } from "../../../appwrite/storage";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const { data: lastCourseData } = useQuery({
  queryKey: ["lastCourse"],
  queryFn: async () => {
    const studentCoursesData = await getData({
      collection: "students_course",
      query: [Query.equal("user_id", user.$id)],
    });

    return studentCoursesData;
  },
});

const {
  data: courses,
  isPending: loadingCourses,
  isRefetching: loadingRefetchCourses,
} = useQuery({
  enabled: computed(() => !!lastCourseData.value),
  queryKey: computed(() => ["courses", lastCourseData.value]),
  queryFn: async (): Promise<CollectionCourseIF[]> => {
    const result = await getData({
      collection: "courses",
      query: [
        Query.equal(
          "$id",
          (lastCourseData.value ?? []).map((item) => item.course_id)
        ),
        Query.orderDesc("$createdAt"),
        Query.limit(3),
      ],
    });

    return result.map((item) => {
      return {
        id: item.$id,
        name: item.name,
        category: item.category,
        level: item.level,
        image: item.image,
        created_at: new Date(item.$createdAt),
      };
    });
  },
});

watch(courses, () => {
  if (lastCourseData.value) {
    console.log("courses", courses.value);
  }
});

const stats = [
  {
    title: "Completed Courses",
    value: computed(
      () => lastCourseData.value?.filter((item) => item.result !== null).length
    ),
    image: "/icons/last-course-1.svg",
  },
  {
    title: "Active Enrollments",
    value: computed(() => lastCourseData.value?.length),
    image: "/icons/last-course-2.svg",
  },
  // {
  //   title: "Certificates Earned",
  //   value: "5,478",
  //   image: "/icons/last-course-3.svg",
  // },
];
</script>

<template>
  <div class="flex-col-wrapper">
    <div
      class="banner md:h-[200px] flex-col-30 p-5 md:p-7.5 rounded-2xl md:rounded-[20px]"
    >
      <div class="flex-col-1">
        <h1 class="text-lg md:text-[22px] text-white font-bold">
          Improve Your Skills
        </h1>
        <p class="text-14 text-white leading-5">
          Our great system good for your career
        </p>
      </div>

      <Button variant="orange">Join Exam</Button>
    </div>

    <Title title="Overview" subTitle="Help student achieve career">
      <template #rightElement>
        <Button>Export Reports</Button>
      </template>
    </Title>

    <div class="flex-col-16">
      <h1 class="text-18 text-black font-bold">Last Courses Added</h1>

      <div class="flex gap-5 md:gap-9.5 flex-wrap">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex-grow p-3.5 md:p-5 flex justify-between items-center bg-ea rounded-2xl md:rounded-[20px] gap-6"
        >
          <div class="flex-col-1">
            <h3 class="tex-xl text-black font-bold md:text-[26px]">
              {{ stat.value }}
            </h3>
            <p class="text-16 text-black">{{ stat.title }}</p>
          </div>
          <img class="w-[70px] md:w-[90px]" :src="stat.image" alt="" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7.5">
      <div class="flex-col-16">
        <h1 class="text-18 text-black font-bold">Last Course Enrolled</h1>

        <div
          class="flex flex-col gap-5"
          v-if="loadingCourses || loadingRefetchCourses"
        >
          <div
            v-for="i in 3"
            :key="i"
            class="flex items-center gap-4 animate-pulse"
          >
            <div
              alt=""
              class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full bg-gray-200"
            ></div>
            <div class="flex flex-col gap-2 flex-grow">
              <h4
                class="text-18 font-bold text-black w-[70%] h-6 rounded bg-gray-100"
              ></h4>
              <p class="text-16 text-gray w-[40%] h-5 rounded bg-gray-100"></p>
            </div>
          </div>
        </div>

        <p
          v-else-if="courses && courses.length <= 0"
          class="text-16 text-gray capitalize"
        >
          no courses enrolled yet
        </p>

        <div v-else class="flex flex-col gap-5">
          <div
            v-for="(course, index) in courses"
            :key="index"
            class="flex items-center gap-4"
          >
            <img
              :src="urlFileStorage(course.image ?? '')"
              alt=""
              class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
            />
            <div class="flex-col-1">
              <h4 class="text-18 font-bold text-black capitalize">{{ course.name }}</h4>
              <p class="text-16 text-gray">{{ course.level }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="flex-col-16">
        <h1 class="text-18 text-black font-bold">New Students Added</h1>

        <div class="flex flex-col gap-5">
          <div
            v-for="(student, index) in lastStudentsAdded"
            :key="index"
            class="flex items-center gap-4"
          >
            <img :src="student.image" alt="" class="w-[50px] md:w-[64px]" />
            <div class="flex-col-1">
              <h4 class="text-18 font-bold text-black">{{ student.name }}</h4>
              <p class="text-16 text-gray">{{ student.subtitle }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.banner {
  background-image: url("/images/banner.png");
  background-position: center;
  background-size: cover;
}
</style>
