<script setup></script>

<template>
  <div class="grid lg:grid-cols-2 min-h-[100dvh] overflow-hidden">
    <div class="left p-5 lg:py-[30px] lg:px-[50px]">
      <div
        class="top flex justify-between items-center flex-col gap-2 lg:items-start"
      >
        <div class="flex gap-3 items-center">
          <img class="w-7 lg:w-9" src="/icons/logo.svg" alt="" />
          <p class="text-20 text-black font-extrabold">AzamCBT</p>
        </div>
        <div class="flex gap-5 lg:gap-7.5 items-center lg:hidden">
          <p class="text-black font-semibold text-16">Docs</p>
          <p class="text-black font-semibold text-16">About</p>
          <p class="text-black font-semibold text-16">Help</p>
          <RouterLink :to="{ name: 'register' }">
            <button
              class="bg-black rounded-full py-2.5 px-5 text-white lg:py-3.5 lg:px-7.5 text-16 font-semibold"
            >
              Sign Up
            </button>
          </RouterLink>
        </div>
      </div>
      <RouterView />
    </div>

    <div class="right bg-blue hidden overflow-hidden lg:flex flex-col">
      <div
        class="flex gap-5 lg:gap-7.5 items-center justify-end lg:py-[30px] lg:px-[50px]"
      >
        <p class="text-white font-semibold text-16">Docs</p>
        <p class="text-white font-semibold text-16">About</p>
        <p class="text-white font-semibold text-16">Help</p>
        <RouterLink :to="{ name: 'register' }">
          <button
            class="bg-black rounded-full py-2.5 px-5 text-white lg:py-3.5 lg:px-7.5 text-16 font-semibold"
          >
            Sign Up
          </button>
        </RouterLink>
      </div>

      <div
        class="flex flex-col gap-[100px] flex-grow h-full justify-center items-center"
      >
        <img
          src="/images/auth-image.png"
          alt=""
          class="max-w-[500px] xl:max-w-[80%] mx-auto px-[20px]"
        />

        <div class="marquee flex gap-[40px] items-center">
          <template v-for="i in 5" :key="i">
            <img src="/icons/auth-logo-1.svg" alt="" />
          </template>
          <template v-for="i in 5" :key="i">
            <img src="/icons/auth-logo-1.svg" alt="" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  width: 100%;
  /* overflow: hidden; */
  white-space: nowrap;
  box-sizing: border-box;
  animation: marquee 8s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
