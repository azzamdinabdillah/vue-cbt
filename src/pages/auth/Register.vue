<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
import type { CollectionUserIF } from "../../interface/databaseCollection";
import { createData } from "../../appwrite/api";
import { useMutation } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

const { errors, defineField, handleSubmit } = useForm<CollectionUserIF>({
  validationSchema: toTypedSchema(schema),
});

const [name] = defineField("name");
const [email] = defineField("email");
const [password] = defineField("password");

const confirmPassword = ref("");

const onSubmit = handleSubmit((data) => {
  console.log("Data:", data);
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
    @submit.prevent="onSubmit"
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign Up</h1>

    <InputGroup
      :error="errors.name"
      :required="true"
      v-model="name"
      id="name"
      label="Complete Name"
      placeholder="Azam Din Abdillah"
      prefix="/icons/profile.svg"
      type="text"
    />

    <InputGroup
      :error="errors.email"
      :required="true"
      v-model="email"
      id="email"
      label="Email Address"
      placeholder="azamdinabdillah@gmail.com"
      prefix="/icons/sms.svg"
      type="email"
    />

    <InputGroup
      :error="errors.password"
      :required="true"
      v-model="password"
      id="password"
      label="Password"
      placeholder="Your password"
      prefix="/icons/lock.svg"
      type="password"
    />

    <InputGroup
      :error="confirmPassword !== password ? 'Password does not match' : ''"
      v-model="confirmPassword"
      :required="true"
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
