<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "../../../components/Button.vue";
import CategoryBadge from "../../../components/CategoryBadge.vue";
import Pagination from "../../../components/Pagination.vue";
import TableSelectAction from "../../../components/TableSelectAction.vue";
import Title from "../../../components/Title.vue";
import dayjs from "dayjs";
import { urlFileStorage } from "../../../appwrite/storage";
import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { ref, watchEffect } from "vue";
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

const { data, error, isPending } = useQuery<Models.Document[]>({
  queryKey: ["courses"],
  queryFn: async () => {
    return await getData({
      collection: "courses",
      query: [],
    });
  },
});

const tableData2 = ref<TableIF[]>([]);
watchEffect(() => {
  if (data.value) {
    tableData2.value = data.value.map((item) => ({
      course: {
        image: item.image,
        title: item.name,
        subtitle: item.level,
      },
      dateCreated: new Date(item.$createdAt),
      category: item.category,
    }));
  }
});

const tableInstance = useVueTable({
  data: tableData2,
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

    <div class="overflow-x-scroll overflow-y-visible md:overflow-visible w-full pb-6 lg:pb-0">
      <table class="w-max md:w-full">
        <thead>
          <tr>
            <th
              v-for="(header, index) in tableInstance.getHeaderGroups()[0]
                .headers"
              :key="header.id"
              :class="{
                'text-start': index === 0,
              }"
            >
              {{ header.column.columnDef.header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="error">
            <td colspan="4" v-if="error">Error : {{ error }}</td>
          </tr>
          <tr :key="u" v-for="u in 5" v-else-if="isPending">
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
            v-for="row in tableInstance.getRowModel().rows"
            :key="row.id"
          >
            <td v-for="(cell, index) in row.getVisibleCells()" :key="cell.id">
              <template v-if="cell.column.id === 'course'">
                <div class="flex items-center gap-4">
                  <img
                    :src="urlFileStorage((cell.getValue() as TableIF['course']).image)"
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
                  :direction="`${
                    index >= tableData2.length - 3 ? 'top' : 'bottom'
                  }`"
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
                <!-- <Teleport to="body">
                </Teleport> -->
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
