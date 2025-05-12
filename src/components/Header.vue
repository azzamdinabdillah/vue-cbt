<script setup lang="ts">
import InputGroup from "./InputGroup.vue";
</script>

<template>
  <div
    class="p-4 md:p-5 flex justify-between items-center gap-4 border-b border-b-ee"
  >
    <div class="lg:max-w-[400px] lg:w-full">
      <InputGroup
        id="search"
        placeholder="Search by report, student, etc"
        suffix="/icons/search-header.svg"
      />
    </div>

    <div class="md:flex gap-7.5 items-center">
      <div class="gap-3.5 hidden md:flex">
        <img src="/icons/receipt.svg" alt="" />
        <img src="/icons/notif.svg" alt="" />
      </div>
      <div class="w-[1px] h-11.5 bg-ee hidden md:inline-block"></div>
      <div class="gap-3.5 flex items-center">
        <div class="flex items-center gap-3">
          <div class="flex-col hidden md:flex">
            <p class="text-14 text-gray text-end">Howdy</p>
            <p class="text-black text-16 font-semibold">Fany Alqo</p>
          </div>
          <div @click="$emit('toggleSidebar')" class="md:w-[46px] object-cover">
            <img src="/icons/photo.svg" alt="" class="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
