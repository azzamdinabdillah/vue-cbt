<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
import Pagination from "../../../components/Pagination.vue";
import TableSelectAction from "../../../components/TableSelectAction.vue";
import Title from "../../../components/Title.vue";
import dayjs from "dayjs";

interface TableIF {
  course: {
    image: string;
    title: string;
    subtitle: string;
  };
  dateCreated: Date;
  category: "Product Design" | "Programming" | "Marketing";
}

const table: TableIF[] = [
  {
    course: {
      image: "/icons/last-course-1.svg",
      title: "Design Interview",
      subtitle: "Beginners",
    },
    dateCreated: new Date("2024-08-22"),
    category: "Product Design",
  },
  {
    course: {
      image: "/icons/last-course-2.svg",
      title: "Intro to Full-Stack",
      subtitle: "Beginners",
    },
    dateCreated: new Date("2024-03-11"),
    category: "Programming",
  },
  {
    course: {
      image: "/icons/last-course-3.svg",
      title: "Digital Marketing 101",
      subtitle: "Beginners",
    },
    dateCreated: new Date("2024-03-11"),
    category: "Marketing",
  },
  {
    course: {
      image: "/icons/last-course-4.svg",
      title: "Usability-Testing",
      subtitle: "Beginners",
    },
    dateCreated: new Date("2024-06-30"),
    category: "Product Design",
  },
  {
    course: {
      image: "/icons/last-course-5.svg",
      title: "Web Development",
      subtitle: "Beginners",
    },
    dateCreated: new Date("2024-06-30"),
    category: "Programming",
  },
];
</script>

<template>
  <div class="flex-col-wrapper">
    <Title
      title="Manage Course"
      subTitle="Provide high quality for best students"
    >
      <template #rightElement>
        <RouterLink :to="{ name: 'create-course' }">
          <Button>Add New Course</Button>
        </RouterLink>
      </template>
    </Title>

    <div class="overflow-x-auto overflow-y-hidden w-full pb-6 lg:pb-0">
      <table class="w-max md:w-full">
        <thead>
          <tr>
            <th class="text-start">Course</th>
            <th>Date Created</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in table">
            <td>
              <div class="flex items-center gap-4">
                <img
                  :src="row.course.image"
                  alt=""
                  class="w-[50px] md:w-[64px]"
                />
                <div class="flex-col-1">
                  <h4 class="text-18 font-bold text-black">
                    {{ row.course.title }}
                  </h4>
                  <p class="text-16 text-gray text-start font-normal">
                    {{ row.course.subtitle }}
                  </p>
                </div>
              </div>
            </td>
            <td>{{ dayjs(row.dateCreated).format("DD MMMM YYYY") }}</td>
            <td>
              <CategoryBadge :category="row.category" />
            </td>
            <td>
              <TableSelectAction :direction="`${index > 3 ? 'top' : 'bottom'}`">
                <RouterLink
                  :to="{ name: 'manage-course', params: { courseId: index } }"
                  class=""
                  >Manage</RouterLink
                >
                <RouterLink
                  :to="{ name: 'student', params: { courseId: index } }"
                  class=""
                  >Students</RouterLink
                >
                <p class="">Edit Course</p>
                <p class="text-red">Delete</p>
              </TableSelectAction>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex gap-4 items-center">
      <Pagination v-for="i in 5" :page="i" :isActive="i === 3 ? true : false" />
    </div>
  </div>

  <RouterView></RouterView>
</template>

<style scoped>
table thead tr {
  border-bottom: 1px solid #eee;
}

th {
  padding-bottom: 16px;
  color: #7f8190;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

tbody tr:first-child td {
  padding-top: 20px;
}

td {
  padding-right: 20px;
  padding-left: 20px;
  overflow: visible;
  padding-top: 30px;
  color: #0a090b;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

td:first-child {
  padding-left: 0;
}
</style>
