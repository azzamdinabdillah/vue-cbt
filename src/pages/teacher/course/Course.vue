<script setup>
import Button from "../../../components/Button.vue";
import TableSelectAction from "../../../components/TableSelectAction.vue";
import Title from "../../../components/Title.vue";
</script>

<template>
  <div class="flex-col-wrapper">
    <Title
      title="Manage Course"
      subTitle="Provide high quality for best students"
    >
      <template #rightElement>
        <Button>Add New Course</Button>
      </template>
    </Title>

    <div class="overflow-x-auto overflow-y-hidden w-full pb-6">
      <table class="w-max md:w-full">
        <thead>
          <tr>
            <th align="start">Course</th>
            <th>Date Created</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="i in 5">
            <td>
              <div class="flex items-center gap-4">
                <img
                  src="/icons/last-course-1.svg"
                  alt=""
                  class="w-[50px] md:w-[64px]"
                />
                <div class="flex-col-1">
                  <h4 class="text-18 font-bold text-black">Design Interview</h4>
                  <p class="text-16 text-gray text-start font-normal">
                    Beginners
                  </p>
                </div>
              </div>
            </td>
            <td>22 August 2024</td>
            <td>
              <div
                class="py-2 px-4 w-fit mx-auto bg-[#FFF2E6] text-14 font-bold text-[#F6770B] rounded-full"
              >
                Product Design
              </div>
            </td>
            <td>
              <TableSelectAction :direction="`${i > 3 ? 'top' : 'bottom'}`">
                <p class="">Manage</p>
                <p class="">Students</p>
                <p class="">Edit Course</p>
                <p class="text-red">Delete</p>
              </TableSelectAction>
            </td>
          </tr>
        </tbody>
      </table>
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
