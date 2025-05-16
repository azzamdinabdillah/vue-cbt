<script setup>
import Button from "../../../components/Button.vue";
import Title from "../../../components/Title.vue";

const stats = [
  {
    title: "Completed Courses",
    value: "15,098",
    image: "/icons/last-course-1.svg",
  },
  {
    title: "Active Enrollments",
    value: "3,200",
    image: "/icons/last-course-2.svg",
  },
  {
    title: "Certificates Earned",
    value: "5,478",
    image: "/icons/last-course-3.svg",
  },
];

const recentCoursesEnrolled = [
  {
    id: 1,
    title: "Advanced Data Science",
    subtitle: "Intermediate",
    image: "/icons/last-course-1.svg",
  },
  {
    id: 2,
    title: "Machine Learning",
    subtitle: "Intermediate",
    image: "/icons/last-course-2.svg",
  },
  {
    id: 3,
    title: "Cloud Computing",
    subtitle: "Intermediate",
    image: "/icons/last-course-3.svg",
  },
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

        <div class="flex flex-col gap-5">
          <div
            v-for="(course, index) in recentCoursesEnrolled"
            :key="index"
            class="flex items-center gap-4"
          >
            <img :src="course.image" alt="" class="w-[50px] md:w-[64px]" />
            <div class="flex-col-1">
              <h4 class="text-18 font-bold text-black">{{ course.title }}</h4>
              <p class="text-16 text-gray">{{ course.subtitle }}</p>
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
