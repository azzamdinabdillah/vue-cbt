<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import type { CollectionCourseIF } from "../interface/databaseCollection";

defineProps<{
  tableInstance: Table<CollectionCourseIF>;
}>();
</script>

<template>
  <div class="flex justify-center items-center flex-wrap gap-3">
    <button
      :disabled="!tableInstance.getCanPreviousPage()"
      v-on:click="tableInstance.previousPage()"
      :class="[
        'cursor-pointer rotate-90 border border-ee w-[40px] h-[40px] rounded-full flex place-content-center',
        !tableInstance.getCanPreviousPage() ? 'opacity-30' : 'opcacity-100',
      ]"
    >
      <img src="/icons/arrow-down.svg" alt="" class="w-3 md:w-4" />
    </button>
    <div
      v-for="i in Math.min(tableInstance.getPageCount(), 3)"
      @click="tableInstance.setPageIndex(i - 1)"
      :class="[
        'border border-ee flex justify-center items-center text-16 hover:bg-black hover:text-white cursor-pointer text-gray font-semibold w-[40px] h-[40px] rounded-full transition-all',
        tableInstance.getState().pagination.pageIndex === i - 1
          ? 'bg-black border-none text-white'
          : '',
      ]"
    >
      {{
        i >= 3
          ? tableInstance.getState().pagination.pageIndex >= 2
            ? tableInstance.getState().pagination.pageIndex + 1
            : 3
          : i
      }}
    </div>
    <button
      :disabled="!tableInstance.getCanNextPage()"
      v-on:click="tableInstance.nextPage()"
      :class="[
        'cursor-pointer rotate-270 border border-ee w-[40px] h-[40px] rounded-full flex place-content-center',
        !tableInstance.getCanNextPage() ? 'opacity-30' : 'opcacity-100',
      ]"
    >
      <img src="/icons/arrow-down.svg" alt="" class="w-3 md:w-4" />
    </button>
  </div>
</template>

<style scoped></style>
