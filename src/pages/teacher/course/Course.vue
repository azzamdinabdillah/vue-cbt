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
import { computed, inject } from "vue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { deleteData, getData } from "../../../appwrite/api";
import type { CollectionCourseIF } from "../../../interface/databaseCollection";
import type { Category } from "../../../interface/commonType";
import type { ToastIF } from "../../../interface/commonInterface";

const toast = inject<ToastIF>("toast")!;

const queryClient = useQueryClient();
const { mutate: deleteCourseMutate, isPending: loadingDeleteCourse } =
  useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteData({
        collection: "courses",
        documentId: documentId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.open("Course deleted successfully", "success");
    },
  });

const { data, error, isPending } = useQuery<CollectionCourseIF[]>({
  queryKey: ["courses"],
  queryFn: async () => {
    const datas = await getData({
      collection: "courses",
      query: [],
    });

    return datas.map((item): CollectionCourseIF => {
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

const tableInstance = useVueTable({
  data: computed(() => data.value ?? []),
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

function deleteCourse(documentId: string) {
  deleteCourseMutate(documentId);
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

    <div class="overflow-x-auto md:overflow-visible w-full pb-6 lg:pb-0">
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
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <template v-if="cell.column.id === 'course'">
                <div class="flex items-center gap-4">
                  <img
                    :src="urlFileStorage(cell.row.original.image)"
                    alt=""
                    class="w-[50px] h-[50px] md:w-[64px] md:h-[64px] object-cover rounded-full"
                  />
                  <div class="flex-col-1">
                    <h4 class="text-18 font-bold text-black capitalize text-start">
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
                <TableSelectAction direction="bottom">
                  <RouterLink
                    :to="{
                      name: 'manage-course',
                      params: {
                        courseId: cell.id,
                      },
                    }"
                    class=""
                    >Manage</RouterLink
                  >
                  <RouterLink
                    :to="{
                      name: 'student',
                      params: {
                        courseId: cell.id,
                      },
                    }"
                    class=""
                    >Students</RouterLink
                  >
                  <p class="">Edit Course</p>
                  <p
                    @click="() => deleteCourse(cell.row.original.id ?? '')"
                    :class="[
                      'text-red',
                      loadingDeleteCourse ? 'opacity-50' : '',
                    ]"
                  >
                    {{ loadingDeleteCourse ? "wait..." : "Delete" }}
                  </p>
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
