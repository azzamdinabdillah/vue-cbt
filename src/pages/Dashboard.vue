<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import { ref } from "vue";

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="">
    <Sidebar @toggle-sidebar="toggleSidebar" :isOpen="isOpen" />
    <div class="main mt-[80px] lg:mt-[95px]">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="p-5 md:p-8 lg:p-5 pb-12 lg:pb-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main {
    width: calc(100% - 270px);
    margin-left: 270px;
  }
}
</style>
