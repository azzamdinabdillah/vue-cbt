<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
// import Pagination from "../../../components/Pagination.vue";
import Title from "../../../components/Title.vue";
import dayjs from "dayjs";
import type { Category } from "../../../interface/commonType";
import { useQuery } from "@tanstack/vue-query";
import { getData } from "../../../appwrite/api";
import { Query } from "appwrite";
import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { computed, toRaw, watch } from "vue";
import type { CollectionCourseIF } from "../../../interface/databaseCollection";
import { urlFileStorage } from "../../../appwrite/storage";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const {
  data: courses,
  isPending: loadingCourses,
  error: errorCourses,
  isRefetching: loadingRefetchCourses,
} = useQuery({
  queryKey: ["courses"],
  queryFn: async () => {
    const studentCourses = await getData({
      collection: "students_course",
      query: [Query.equal("user_id", user.$id)],
    });

    const courseIds = studentCourses.map((item) => item.course_id);

    if (studentCourses.length > 0) {
      const courses = await getData({
        collection: "courses",
        query: [Query.equal("$id", courseIds)],
      });

      return courses.map(
        (
          item,
          index
        ): CollectionCourseIF & {
          isPassed: boolean;
          studentCourseId: string;
          score: number;
        } => {
          return {
            // ...item,
            id: item.$id,
            name: item.name,
            studentCourseId: studentCourses[index].$id,
            score: studentCourses[index].score,
            category: item.category,
            level: item.level,
            image: item.image,
            created_at: new Date(item.$createdAt),
            isPassed: studentCourses[index].is_passed,
          };
        }
      );
    } else {
      return [];
    }
  },
});

const tableInstance = useVueTable({
  data: computed(() => courses.value ?? []),
  columns: [
    {
      accessorKey: "course",
      header: "Course",
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "action",
      header: "Action",
    },
  ],

  getCoreRowModel: getCoreRowModel(),
});

watch(courses, () => {
  // console.log(tableInstance.getHeaderGroups()[0].headers);

  // console.log(toRaw(tableInstance.getRowModel().rows[0].original));
  // console.log(tableInstance.getAllColumns()[0]);

  console.log(toRaw(courses.value));
});
</script>

<template>
  <div class="flex-col-wrapper">
    <Title title="My Courses" subTitle="Finish all given tests to grow">
    </Title>

    <div v-if="courses?.length === 0">
      <div class="flex-col-wrapper justify-center items-center py-5">
        <div class="flex-col-1">
          <h1 class="text-18 text-center text-black font-bold">
            No Course Found
          </h1>
          <p class="text-14 text-gray text-center leading-5">
            You don't have any course yet
          </p>
        </div>
      </div>
    </div>

    <div v-else class="overflow-x-auto overflow-y-hidden w-full pb-6 lg:pb-0">
      <table class="w-max md:w-full">
        <thead>
          <tr>
            <th
              v-for="(header, index) in tableInstance.getHeaderGroups()[0]
                .headers"
              :class="{
                'text-start': index === 0,
              }"
            >
              {{ header.column.columnDef.header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="errorCourses">
            <td colspan="4" v-if="errorCourses">Error : {{ errorCourses }}</td>
          </tr>
          <tr
            :key="u"
            v-for="u in 5"
            v-else-if="loadingCourses || loadingRefetchCourses"
          >
            <td
              v-for="i in tableInstance.getHeaderGroups()[0].headers.length"
              :key="i"
            >
              <div
                class="w-[120px] md:w-full h-[30px] rounded-lg animate-pulse bg-gray-100"
              ></div>
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, index) in tableInstance.getRowModel().rows"
            :key="index"
          >
            <td v-for="(cell, index) in row.getVisibleCells()" :key="index">
              <template v-if="cell.column.id === 'course'">
                <div class="flex items-center gap-4 lg:max-w-[200px]">
                  <img
                    :src="urlFileStorage(cell.row.original.image || '')"
                    alt=""
                    class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
                  />
                  <div class="flex-col-1">
                    <h4
                      class="text-18 font-bold text-black capitalize text-start max-w-[180px] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {{ cell.row.original.name }}
                    </h4>
                    <p
                      class="text-16 text-gray text-start font-normal capitalize"
                    >
                      {{ cell.row.original.level }}
                    </p>
                  </div>
                </div>
              </template>

              <template v-else-if="cell.column.id === 'dateCreated'">
                {{ dayjs(cell.row.original.created_at).format("DD MMMM YYYY") }}
              </template>

              <template v-else-if="cell.column.id === 'category'">
                <CategoryBadge
                  :category="cell.row.original.category as Category"
                ></CategoryBadge>
              </template>

              <template v-else-if="cell.column.id === 'action'">
                <RouterLink
                  v-if="cell.row.original.score !== null"
                  :to="{
                    name: 'raport-details',
                    params: {
                      courseId: cell.row.original.id,
                      studentCourseId: cell.row.original.studentCourseId,
                    },
                  }"
                >
                  <Button custom-class="!w-[120px] py-[10px]" variant="black"
                    >Rapport</Button
                  >
                </RouterLink>
                <RouterLink
                  v-else
                  :to="{
                    name: 'learning',
                    params: {
                      courseId: cell.row.original.id,
                      studentCourseId: cell.row.original.studentCourseId,
                    },
                  }"
                >
                  <Button custom-class="!w-[120px] py-[10px]" variant="blue"
                    >Start Test</Button
                  >
                </RouterLink>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex gap-4 items-center">
      <!-- <Pagination v-for="i in 5" :page="i" :isActive="i === 3 ? true : false" /> -->
    </div>
  </div>
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
