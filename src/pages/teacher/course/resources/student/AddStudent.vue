<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrump from "../../../../../components/Breadcrump.vue";
import Button from "../../../../../components/Button.vue";
import InputGroup from "../../../../../components/InputGroup.vue";
import {
  createData,
  getData,
  getSingleData,
} from "../../../../../appwrite/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import SkeletonDetailCourse from "../../../../../components/skeleton/SkeletonDetailCourse.vue";
import { urlFileStorage } from "../../../../../appwrite/storage";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { CollectionStudentCourseIF } from "../../../../../interface/databaseCollection";
import { Query } from "appwrite";
import type { ToastIF } from "../../../../../interface/commonInterface";
import { inject } from "vue";

const route = useRoute();
const toast = inject<ToastIF>("toast")!;
const queryClient = useQueryClient();

const schema = z.object({
  email: z.string().email("Email is invalid"),
});

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
});

const [email, emailAttr] = defineField("email");

const onSubmit = handleSubmit(async (data) => {
  studentCourseMutate({
    course_id: route.params.courseId as string,
    user_id: data.email,
  });
});

const { mutate: studentCourseMutate, isPending: loadingStudentCourseMutate } =
  useMutation({
    mutationFn: async (datas: CollectionStudentCourseIF) => {
      const student = await getData({
        collection: "users",
        query: [Query.equal("email", datas.user_id)],
      });

      if (student.length <= 0) {
        throw new Error(
          "Email not found, please make sure your student email is registered"
        );
      } else {
        const studentCourse = await getData({
          collection: "students_course",
          query: [
            Query.equal("course_id", datas.course_id),
            Query.equal("user_id", student[0].$id),
          ],
        });

        if (studentCourse.length > 0) {
          throw new Error("Student already added");
        } else {
          const result = await createData({
            collection: "students_course",
            datas: {
              course_id: datas.course_id,
              user_id: student[0].$id,
            },
          });

          return result;
        }
      }
    },

    onSuccess: () => {
      resetForm();
      toast.open("Student added successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["studentCourse", route.params.courseId],
      });
    },

    onError: (error: any) => {
      toast.open(error.message, "error");
    },
  });

const { data: singleCourseData, isPending: loadingSingleCourseData } = useQuery(
  {
    enabled: !!route.params.courseId,
    queryKey: ["course", route.params.courseId],
    queryFn: async () => {
      return await getSingleData({
        collection: "courses",
        documentId: route.params.courseId as string,
      });
    },
  }
);
</script>

<template>
  <div class="flex-col-wrapper">
    <Breadcrump
      :url="[
        {
          name: 'Course',
          path: '/course',
        },
        {
          name: 'Students',
          path: `/course/student/${$route.params.courseId}`,
        },
        {
          name: 'Add Students',
          path: `/student/add-student`,
        },
      ]"
    ></Breadcrump>

    <form
      @submit.prevent="onSubmit"
      class="flex-col-wrapper max-w-[612px] md:pl-[50px] lg:pl-[70px]"
    >
      <SkeletonDetailCourse
        v-if="loadingSingleCourseData"
      ></SkeletonDetailCourse>

      <div v-else class="flex items-center gap-6 flex-wrap">
        <img
          :src="urlFileStorage(singleCourseData?.image)"
          alt=""
          class="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover"
        />
        <h1 class="text-2xl md:text-3xl text-black font-bold">
          {{ singleCourseData?.name || "Course Name" }}
        </h1>
      </div>

      <div class="flex flex-col gap-4 md:gap-5">
        <h1 class="text-24 font-bold text-black">Add New Student</h1>

        <InputGroup
          id="email"
          prefix="/icons/sms-plain.svg"
          label="Email Address"
          placeholder="Write your student email here"
          type="email"
          class="w-full"
          v-model="email"
          v-bind="emailAttr"
          :error="errors.email"
        ></InputGroup>
      </div>

      <Button
        :disabled="loadingStudentCourseMutate"
        type="submit"
        variant="blue"
        customClass="w-full"
        >{{
          loadingStudentCourseMutate ? "Loading..." : "Add Now to Course"
        }}</Button
      >
    </form>
  </div>
</template>

<style scoped></style>
