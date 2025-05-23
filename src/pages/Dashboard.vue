<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import { provide, reactive, ref } from "vue";
import Toast from "../components/Toast.vue";
import type { ToastIF } from "../interface/commonInterface";

const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const toast = reactive<ToastIF>({
  isOpen: false,
  message: "",
  status: "success",
  open: (message: string, status: "success" | "error") => {
    toast.isOpen = true;
    toast.message = message;
    toast.status = status;

    setTimeout(() => {
      toast.isOpen = false;
    }, 3000);
  },
  close: () => {
    toast.isOpen = false;
  },
});

provide("toast", toast);
</script>

<template>
  <div class="">
    <Toast
      :message="toast.message"
      :status="toast.status"
      :is-open="toast.isOpen"
      @close="toast.close"
    />
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
