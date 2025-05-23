<script setup lang="ts">
import { provide, reactive } from "vue";
import type { ToastIF } from "./interface/commonInterface";
import Toast from "./components/Toast.vue";

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
    }, 5000);
  },
  close: () => {
    toast.isOpen = false;
  },
});

provide("toast", toast);
</script>

<template>
  <div>
    <Toast
      :message="toast.message"
      :status="toast.status"
      :is-open="toast.isOpen"
      @close="toast.close"
    />
    <RouterView />
  </div>
</template>

<style scoped></style>
