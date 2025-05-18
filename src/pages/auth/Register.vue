<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
import type { CollectionUserIF } from "../../interface/databaseCollection";
import { createData } from "../../appwrite/api";
import { useMutation } from "@tanstack/vue-query";

const form = reactive<CollectionUserIF>({
  role: "student",
  name: "",
  email: "",
  password: "",
  created_at: new Date(),
});

const { isPending, error, data, mutate } = useMutation({
  mutationFn: async () => {
    return await createData({
      collection: "users",
      datas: form,
    });
  },
});
</script>

<template>
  <form
    @submit.prevent="() => mutate()"
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign Up</h1>

    <InputGroup
      v-model="form.name"
      id="name"
      label="Complete Name"
      placeholder="Azam Din Abdillah"
      prefix="/icons/profile.svg"
      type="text"
    />

    <InputGroup
      v-model="form.email"
      id="email"
      label="Email Address"
      placeholder="azamdinabdillah@gmail.com"
      prefix="/icons/sms.svg"
      type="email"
    />

    <InputGroup
      v-model="form.password"
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

    <Button :disabled="isPending" type="submit" custom-class="w-full">{{
      isPending ? "Loading..." : "Create My Account"
    }}</Button>
  </form>
</template>

<style scoped></style>
