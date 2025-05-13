<script setup lang="ts">
import { ref, watchEffect } from "vue";

defineProps<{
  isOpen?: boolean;
}>();

const menus: {
  inactiveIcon: string;
  activeIcon: string;
  link: string;
  title: string;
}[] = [
  {
    inactiveIcon: "/icons/home-hashtag.svg",
    activeIcon: "/icons/home-hashtag-active.svg",
    link: "/",
    title: "Overview",
  },
  {
    inactiveIcon: "/icons/note-favorite.svg",
    activeIcon: "/icons/note-favorite-active.svg",
    link: "/courses",
    title: "Courses",
  },
];

const hoveredMenu = ref<number>(-1);
</script>

<template>
  <div
    @click="$emit('toggleSidebar')"
    :class="`h-dvh fixed bg-black/20 top-0 right-0 bottom-0 w-[100vw] z-20 transition-all lg:opacity-100 lg:w-[270px] lg:left-0 ${
      isOpen
        ? 'opacity-100'
        : 'opacity-0 select-none pointer-events-none lg:select-all lg:pointer-events-auto'
    }`"
  >
    <div
      class="bg-[#FBFBFB] border-l border-l-ee w-[70%] lg:w-full lg:border-r lg:border-r-ee lg:mr-auto lg:ml-0 h-full ml-auto p-6 lg:p-7.5 flex flex-col gap-6 lg:gap-7.5"
    >
      <div class="flex gap-3 items-center justify-center">
        <img src="/icons/logo.svg" alt="" />
        <h2 class="text-20 text-black font-extrabold">AzamCBT</h2>
      </div>

      <div class="flex gap-3 flex-col">
        <h3 class="text-a5 font-bold text-xs">DAILY USE</h3>

        <template v-for="(menu, index) in menus" :key="menu.link">
          <router-link
            :to="menu.link"
            class="menu flex gap-3 items-center py-2.5 px-4 rounded-full transition-all"
            @mouseover="hoveredMenu = index"
            @mouseleave="hoveredMenu = -1"
          >
            <img
              :src="
                hoveredMenu === index || $route.path === menu.link
                  ? menu.activeIcon
                  : menu.inactiveIcon
              "
              alt=""
            />
            <p class="text-16 text-black font-semibold">{{ menu.title }}</p>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu:hover,
.menu.router-link-active {
  background-color: #6456f1;
}

.menu:hover p,
.menu.router-link-active p {
  color: white;
}
</style>
