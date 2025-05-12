<script setup>
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
</script>

<template>
  <div
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign Up</h1>

    <InputGroup
      id="name"
      label="Complete Name"
      placeholder="Azam Din Abdillah"
      prefix="/icons/profile.svg"
      type="text"
    />

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
      placeholder="Your password"
      prefix="/icons/lock.svg"
      type="password"
    />

    <InputGroup
      id="repeat-password"
      label="Confirm Password"
      placeholder="Repeat your password here..."
      prefix="/icons/lock.svg"
      type="password"
    />

    <Button custom-class="w-full">Create My Account</Button>
  </div>
</template>

<style scoped></style>
