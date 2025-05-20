<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
import Pagination from "../../../components/Pagination.vue";
import TableSelectAction from "../../../components/TableSelectAction.vue";
import Title from "../../../components/Title.vue";
import dayjs from "dayjs";
import { getFile, urlFileStorage } from "../../../appwrite/storage";
import {
  createColumnHelper,
  createTable,
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { computed, reactive, toRaw, watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getData } from "../../../appwrite/api";
import type { Models } from "appwrite";

// getFile();

interface TableIF {
  course: {
    image: string;
    title: string;
    subtitle: string;
  };
  dateCreated: Date;
  category: "Product Design" | "Programming" | "Marketing";
}

// const table = createTable()

// const { data: tableData, error } = useQuery<Models.Document[]>({
//   queryKey: ["courses"],
//   queryFn: async () => {
//     return await getData({
//       collection: "courses",
//       query: [],
//     });
//   },
// });

// watchEffect(() => console.log(toRaw(tableData.value)));

const tableData: TableIF[] = reactive([
  {
    course: {
      image: urlFileStorage("682c3b350001c9891acf"),
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
]);

// const safeTableData = reactive(data ?? []);

const tableInstance = useVueTable({
  data: tableData,
  columns: [
    {
      accessorKey: "course",
      header: "Course",
      cell: (info) => info.row.original.course,
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => info.getValue(),
    },
  ],
  getCoreRowModel: getCoreRowModel(),
});

function log(cell: any) {
  const course = cell.getValue() as TableIF["course"];
  console.log("Course:", course); // ✅ Akan tampil di console
  return course;
}
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
            <!-- <th class="text-start">Course</th>
            <th>Date Created</th>
            <th>Category</th>
            <th>Action</th> -->
            <th
              v-for="header in tableInstance.getHeaderGroups()[0].headers"
              :key="header.id"
            >
              {{ header.column.columnDef.header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- <tr v-for="(row, index) in table">
            <td>
              <div class="flex items-center gap-4">
                <img
                  :src="row.course.image"
                  alt=""
                  class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
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
          </tr> -->

          <tr v-for="row in tableInstance.getRowModel().rows" :key="row.id">
            <td v-for="(cell, index) in row.getVisibleCells()" :key="cell.id">
              <template v-if="cell.column.id === 'course'">
                <div class="flex items-center gap-4">
                  <img
                    :src="(cell.getValue() as TableIF['course']).image"
                    alt=""
                    class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
                  />
                  <div class="flex-col-1">
                    <h4 class="text-18 font-bold text-black">
                      {{ (cell.getValue() as TableIF["course"]).title }}
                    </h4>
                    <p class="text-16 text-gray text-start font-normal">
                      {{ (cell.getValue() as TableIF["course"]).subtitle }}
                    </p>
                  </div>
                </div>
              </template>

              <template v-else-if="cell.column.id === 'dateCreated'">
                {{
                  dayjs(cell.getValue() as TableIF["dateCreated"]).format(
                    "DD MMMM YYYY"
                  )
                }}
              </template>

              <template v-else-if="cell.column.id === 'category'">
                <CategoryBadge
                  :category="(cell.getValue() as TableIF['category'])"
                />
              </template>

              <template v-else-if="cell.column.id === 'action'">
                <TableSelectAction
                  :direction="`${index > 3 ? 'top' : 'bottom'}`"
                >
                  <RouterLink
                    :to="{
                      name: 'manage-course',
                      params: { courseId: cell.id },
                    }"
                    class=""
                    >Manage</RouterLink
                  >
                  <RouterLink
                    :to="{ name: 'student', params: { courseId: cell.id } }"
                    class=""
                    >Students</RouterLink
                  >
                  <p class="">Edit Course</p>
                  <p class="text-red">Delete</p>
                </TableSelectAction>
              </template>
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
