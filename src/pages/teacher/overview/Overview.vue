<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getData } from "../../../appwrite/api";
import Button from "../../../components/Button.vue";
import Title from "../../../components/Title.vue";
import { computed } from "vue";
import { Query } from "appwrite";
import type { CollectionCourseIF } from "../../../interface/databaseCollection";
import { urlFileStorage } from "../../../appwrite/storage";

const { data: courseData } = useQuery({
  queryKey: ["courses"],
  queryFn: async () => {
    return await getData({
      collection: "courses",
      query: [],
    });
  },
});

const { data: lastCourse, isPending: lastCourseLoading } = useQuery<
  CollectionCourseIF[]
>({
  queryKey: ["lastCourse"],
  queryFn: async () => {
    const datas = await getData({
      collection: "courses",
      query: [Query.orderDesc("$createdAt"), Query.limit(3)],
    });

    return datas.map((item): CollectionCourseIF => {
      return {
        name: item.name,
        category: item.category,
        level: item.level,
        image: item.image,
        created_at: new Date(item.$createdAt),
      };
    });
  },
});

const { data: totalStudents } = useQuery({
  queryKey: ["totalStudents"],
  queryFn: async () => {
    return await getData({
      collection: "users",
      query: [Query.equal("role", "student")],
    });
  },
});

const { data: newStudentsAddedDatas, isPending: loadingNewStudentsAddedDatas } =
  useQuery({
    queryKey: ["newStudentsAdded"],
    queryFn: async () => {
      const studentCourseData = await getData({
        collection: "students_course",
        query: [Query.orderDesc("$createdAt"), Query.limit(3)],
      });

      const usersId = studentCourseData.map((item) => item.user_id);

      const users = await getData({
        collection: "users",
        query: [Query.equal("$id", usersId)],
      });

      return users;
    },
  });

const stats = computed(() => [
  {
    title: "Total Courses",
    value: courseData.value?.length || 0,
    image: "/icons/last-course-1.svg",
  },
  {
    title: "Total Students",
    value: totalStudents.value?.length || 0,
    image: "/icons/last-course-2.svg",
  },
  {
    title: "Certificates",
    value: "379,409",
    image: "/icons/last-course-3.svg",
  },
]);
</script>

<template>
  <div class="flex-col-wrapper">
    <div
      class="banner md:h-[200px] flex-col-30 p-5 md:p-7.5 rounded-2xl md:rounded-[20px]"
    >
      <div class="flex-col-1">
        <h1 class="text-lg md:text-[22px] text-white font-bold">
          Improve Your Students Skills
        </h1>
        <p class="text-14 text-white leading-5">
          Our great system good for your schools/university
        </p>
      </div>

      <RouterLink :to="{ name: 'create-course' }">
        <Button variant="orange">Create Exam</Button>
      </RouterLink>
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
        <h1 class="text-18 text-black font-bold">Last Courses Added</h1>

        <div class="flex flex-col gap-5" v-if="lastCourseLoading">
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

        <div class="flex flex-col gap-5" v-else>
          <div
            v-for="(course, index) in lastCourse"
            :key="index"
            class="flex items-center gap-4"
          >
            <img
              :src="urlFileStorage(course.image ?? '')"
              alt=""
              class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
            />
            <div class="flex-col-1">
              <h4 class="text-18 font-bold text-black">{{ course.name }}</h4>
              <p class="text-16 text-gray">{{ course.level }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-col-16">
        <h1 class="text-18 text-black font-bold">New Students Added</h1>
        <div class="flex flex-col gap-5" v-if="loadingNewStudentsAddedDatas">
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

        <div class="flex flex-col gap-5" v-else>
          <div
            v-for="(student, index) in newStudentsAddedDatas"
            :key="index"
            class="flex items-center gap-4"
          >
            <img src="/icons/photo.svg" alt="" class="w-[50px] md:w-[64px]" />
            <div class="flex-col-1">
              <h4 class="text-18 font-bold text-black">{{ student.name }}</h4>
              <p class="text-16 text-gray">{{ student.role }}</p>
            </div>
          </div>
        </div>
      </div>
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
