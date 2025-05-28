<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrump from "../../../../components/Breadcrump.vue";
import Button from "../../../../components/Button.vue";
import InputGroup from "../../../../components/InputGroup.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { createData, getSingleData } from "../../../../appwrite/api";
import { urlFileStorage } from "../../../../appwrite/storage";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import SkeletonDetailCourse from "../../../../components/skeleton/SkeletonDetailCourse.vue";
import type { CollectionQuestionIF } from "../../../../interface/databaseCollection";
import type { ToastIF } from "../../../../interface/commonInterface";
import { inject } from "vue";

const route = useRoute();
const toast = inject<ToastIF>("toast")!;
const { data, isPending } = useQuery({
  enabled: !!route.params.courseId,
  queryKey: ["manageCourse", route.params.courseId],
  queryFn: async () => {
    return await getSingleData({
      collection: "courses",
      documentId: route.params.courseId as string,
    });
  },
});

const schema = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .min(3, "Minimum 3 characters"),
  option1: z
    .string()
    .min(1, "Question is required")
    .min(3, "Minimum 3 characters"),
  option2: z
    .string()
    .min(1, "Question is required")
    .min(3, "Minimum 3 characters"),
  option3: z
    .string()
    .min(1, "Question is required")
    .min(3, "Minimum 3 characters"),
  option4: z
    .string()
    .min(1, "Question is required")
    .min(3, "Minimum 3 characters"),
  correct_option: z.enum(["option1", "option2", "option3", "option4"], {
    message: "Correct option is required",
  }),
});
const { errors, defineField, handleSubmit } = useForm<CollectionQuestionIF>({
  validationSchema: toTypedSchema(schema),
});

const [question, questionAttr] = defineField("question");
const [option1, option1Attr] = defineField("option1");
const [option2, option2Attr] = defineField("option2");
const [option3, option3Attr] = defineField("option3");
const [option4, option4Attr] = defineField("option4");
const [correctOption, correctOptionAttr] = defineField("correct_option");

const { mutate: mutationQuestion, isPending: isPendingQuestion } = useMutation({
  mutationFn: async (datas: CollectionQuestionIF) => {
    return await createData({
      collection: "questions",
      datas: {
        ...datas,
        course_id: route.params.courseId as string,
      },
    });
  },

  onSuccess: () => {
    toast.open("Question created successfully", "success");
  },

  onError: (error: any) => {
    toast.open("Error : " + error.message, "error");
  },
});

const onSubmit = handleSubmit(async (data) => {
  mutationQuestion(data);
});
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
          name: 'Manage Course',
          path: `/course/manage-course/${$route.params.courseId}`,
        },
        {
          name: 'New Question',
          path: '/course/manage-course/new-question',
        },
      ]"
    ></Breadcrump>

    <form
      @submit.prevent="onSubmit"
      class="flex-col-wrapper max-w-[612px] md:pl-[50px] lg:pl-[70px]"
    >
      <SkeletonDetailCourse v-if="isPending"></SkeletonDetailCourse>
      <div class="flex items-center gap-6 flex-wrap" v-else>
        <img
          :src="urlFileStorage(data?.image)"
          alt=""
          class="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full object-cover"
        />
        <h1 class="text-2xl md:text-3xl text-black font-bold capitalize">
          {{ data?.name || "Course Name" }}
        </h1>
      </div>

      <div class="flex flex-col gap-4 md:gap-5">
        <h1 class="text-24 font-bold text-black">Add New Question</h1>

        <InputGroup
          :error="errors.question"
          v-model="question"
          v-bind="questionAttr"
          id="question"
          prefix="/icons/note-text.svg"
          label="Question"
          placeholder="Write your question here"
          type="text"
          class="w-full"
        ></InputGroup>

        <div class="gap-2.5 flex flex-col">
          <h2 class="text-16 text-black font-semibold">Answers</h2>
          <p v-if="errors.correct_option" class="text-red text-12 font-medium">
            {{ errors.correct_option }}
          </p>
          <div class="flex items-center gap-4">
            <InputGroup
              :error="errors.option1"
              v-model="option1"
              v-bind="option1Attr"
              id="answer1"
              prefix="/icons/edit.svg"
              placeholder="Write answer option"
              type="text"
              class="w-full"
            ></InputGroup>

            <div class="flex gap-2.5">
              <input
                :id="`aggree1`"
                type="radio"
                name="correct-option"
                class="checkbox-style"
                value="option1"
                v-model="correctOption"
                v-bind="correctOptionAttr"
              />
              <label
                :for="`aggree1`"
                class="text-16 cursor-pointer font-semibold text-black"
              >
                Correct
              </label>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <InputGroup
              :error="errors.option2"
              v-model="option2"
              v-bind="option2Attr"
              id="answer2"
              prefix="/icons/edit.svg"
              placeholder="Write answer option"
              type="text"
              class="w-full"
            ></InputGroup>

            <div class="flex gap-2.5">
              <input
                :id="`aggree2`"
                type="radio"
                value="option2"
                name="correct-option"
                class="checkbox-style"
                v-model="correctOption"
                v-bind="correctOptionAttr"
              />
              <label
                :for="`aggree2`"
                class="text-16 cursor-pointer font-semibold text-black"
              >
                Correct
              </label>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <InputGroup
              :error="errors.option3"
              v-model="option3"
              v-bind="option3Attr"
              id="answer3"
              prefix="/icons/edit.svg"
              placeholder="Write answer option"
              type="text"
              class="w-full"
            ></InputGroup>

            <div class="flex gap-2.5">
              <input
                :id="`aggree3`"
                type="radio"
                name="correct-option"
                value="option3"
                class="checkbox-style"
                v-model="correctOption"
                v-bind="correctOptionAttr"
              />
              <label
                :for="`aggree3`"
                class="text-16 cursor-pointer font-semibold text-black"
              >
                Correct
              </label>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <InputGroup
              :error="errors.option4"
              v-model="option4"
              v-bind="option4Attr"
              id="answer4"
              prefix="/icons/edit.svg"
              placeholder="Write answer option"
              type="text"
              class="w-full"
            ></InputGroup>

            <div class="flex gap-2.5">
              <input
                :id="`aggree4`"
                type="radio"
                value="option4"
                name="correct-option"
                class="checkbox-style"
                v-model="correctOption"
                v-bind="correctOptionAttr"
              />
              <label
                :for="`aggree4`"
                class="text-16 cursor-pointer font-semibold text-black"
              >
                Correct
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button
        :disabled="isPendingQuestion"
        type="submit"
        variant="blue"
        customClass="w-full"
        >{{ isPendingQuestion ? "Loading..." : "Create Question" }}</Button
      >
    </form>
  </div>
</template>

<style scoped></style>
