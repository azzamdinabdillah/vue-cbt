<script setup>
import { RouterLink } from "vue-router";
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
</script>

<template>
  <div
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign In</h1>

    <InputGroup
      id="email"
      label="Email Address"
      placeholder="azamdinabdillah@gmail.com"
      prefix="/icons/sms.svg"
      type="email"
    />

    <InputGroup
      id="password"
      label="Password"
      placeholder="**************"
      prefix="/icons/lock.svg"
      type="password"
    />

    <RouterLink :to="{ name: 'overview' }" class="w-full">
      <Button custom-class="w-full">Sign In to my Account</Button>
    </RouterLink>
  </div>
</template>

<style scoped></style>
