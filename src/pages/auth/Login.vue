<script setup lang="ts">
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useMutation } from "@tanstack/vue-query";
import { getData } from "../../appwrite/api";
import { Query } from "appwrite";
import { useRouter } from "vue-router";
// import type { CollectionUserIF } from "../../interface/databaseCollection";

const router = useRouter();

const schema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { errors, defineField, handleSubmit } = useForm<{
  email: string;
  password: string;
}>({
  validationSchema: toTypedSchema(schema),
});

const [email, emailAttr] = defineField("email");
const [password, passwordAttr] = defineField("password");

const {
  isPending,
  error: errorMutation,
  mutate,
} = useMutation({
  mutationFn: async () => {
    const data = await getData({
      collection: "users",
      query: [
        Query.equal("email", email.value),
        Query.equal("password", password.value),
      ],
    });

    if (data.length === 0) {
      throw new Error("Email or password is incorrect");
    }

    return data;
  },

  onSuccess: (data) => {
    const user = data[0];
    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "student") {
      router.push({ name: "student-overview" });
    } else {
      router.push({ name: "overview" });
    }
  },
});

const onSubmit = handleSubmit(async () => {
  mutate();
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign In</h1>

    <h2 class="text-18 text-red font-medium">{{ errorMutation }}</h2>

    <InputGroup
      :error="errors.email"
      v-bind="emailAttr"
      v-model="email"
      id="email"
      required
      label="Email Address"
      placeholder="azamdinabdillah@gmail.com"
      prefix="/icons/sms.svg"
      type="email"
    />

    <InputGroup
      :error="errors.password"
      v-bind="passwordAttr"
      v-model="password"
      id="password"
      required
      label="Password"
      placeholder="**************"
      prefix="/icons/lock.svg"
      type="password"
    />

    <Button type="submit" :disabled="isPending" custom-class="w-full">{{
      isPending ? "Loading..." : "Sign In to my Account"
    }}</Button>
    <!-- <RouterLink :to="{ name: 'overview' }" class="w-full">
    </RouterLink> -->
  </form>
</template>

<style scoped></style>
