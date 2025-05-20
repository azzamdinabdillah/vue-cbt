<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/Button.vue";
import InputGroup from "../../components/InputGroup.vue";
import type { CollectionUserIF } from "../../interface/databaseCollection";
import { createData, getData } from "../../appwrite/api";
import { useMutation } from "@tanstack/vue-query";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Query } from "appwrite";
import { useRouter } from "vue-router";

const router = useRouter();

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Minimum 3 characters"),
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { errors, defineField, handleSubmit, resetForm } =
  useForm<CollectionUserIF>({
    validationSchema: toTypedSchema(schema),
  });

const [name, nameAttr] = defineField("name");
const [email, emailAttr] = defineField("email");
const [password, passwordAttr] = defineField("password");

const confirmPassword = ref("");

const onSubmit = handleSubmit(async (data) => {
  const datas: CollectionUserIF = {
    ...data,
    created_at: new Date(),
    role: "student",
  };

  mutate(datas);
});

const { isPending, error, mutate } = useMutation({
  mutationFn: async (datas: CollectionUserIF) => {
    const checkEmail = await getData({
      collection: "users",
      query: [Query.equal("email", datas.email)],
    });

    if (checkEmail.length > 0) {
      throw new Error("Email has been registered, please login directly");
    } else {
      const create = await createData({
        collection: "users",
        datas: datas,
      });

      return create;
    }
  },

  onSuccess: () => {
    resetForm();
    confirmPassword.value = "";
    router.push({ name: "login" });
  },
});
</script>

<template>
  <form
    @submit.prevent="password === confirmPassword ? onSubmit() : ''"
    class="mt-4 lg:mt-0 flex justify-center items-start flex-col gap-5 lg:gap-7.5 lg:h-full lg:justify-center lg:max-w-[450px] lg:mx-auto"
  >
    <h1 class="text-xl lg:text-2xl font-bold text-black">Sign Up</h1>

    <h2 v-if="error" class="text-18 text-red font-medium">{{ error }}</h2>

    <InputGroup
      :error="errors.name"
      :required="true"
      v-model="name"
      :attrs="nameAttr"
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
      :attrs="emailAttr"
      id="email"
      label="Email Address"
      placeholder="azamdinabdillah@gmail.com"
      prefix="/icons/sms.svg"
      type="email"
    />

    <InputGroup
      :attrs="passwordAttr"
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
      :error="
        confirmPassword !== password && password !== undefined
          ? 'Password does not match'
          : ''
      "
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
