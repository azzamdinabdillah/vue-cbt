<script setup lang="ts">
import { computed, reactive, ref, toRaw, watch } from "vue";
import Button from "../../../components/Button.vue";
import FloatingMenu from "../../../components/FloatingMenu.vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { getData, getSingleData } from "../../../appwrite/api";
import { Query } from "appwrite";
import type { CollectionQuestionIF } from "../../../interface/databaseCollection";
import Loader from "../../../components/Loader.vue";
import { urlFileStorage } from "../../../appwrite/storage";

const user = computed(() => JSON.parse(localStorage.getItem("user") || "{}"));
console.log(user.value);

const route = useRoute();

const { data } = useQuery({
  queryKey: ["course", route.params.courseId],
  refetchOnWindowFocus: false,
  queryFn: async () => {
    const course = await getSingleData({
      collection: "courses",
      documentId: route.params.courseId as string,
    });

    const courseMap = {
      id: course.$id,
      name: course.name,
      category: course.category,
      level: course.level,
      image: course.image,
      created_at: new Date(course.$createdAt),
    };

    const questions = await getData({
      collection: "questions",
      query: [Query.equal("course_id", course.$id)],
    });

    const questionMap: CollectionQuestionIF[] = questions.map((item) => {
      return {
        id: item.$id,
        question: item.question,
        option1: item.option1,
        option2: item.option2,
        option3: item.option3,
        option4: item.option4,
        correct_option: item.correct_option,
        course_id: item.course_id,
      };
    });

    return {
      ...courseMap,
      questions: questionMap,
    };
  },
});

const selectedQuestion = ref<number>(1);
const mapQuestion = reactive<
  (CollectionQuestionIF & {
    isAnswered: number;
    userAnswer?: string;
    options: { id: number; title: string }[];
  })[]
>([]);

const openMenu = ref(false);
const isCourseCompleted = ref(false);

watch(data, () => {
  if (data.value) {
    mapQuestion.push(
      ...data.value.questions.map((question, index) => {
        return {
          ...question,
          id: index + 1,
          options: [
            {
              id: 1,
              title: question.option1,
            },
            {
              id: 2,
              title: question.option2,
            },
            {
              id: 3,
              title: question.option3,
            },
            {
              id: 4,
              title: question.option4,
            },
          ],
          isAnswered: -1,
        };
      })
    );
  }
});

function endCourseHandler() {
  isCourseCompleted.value = true;

  const correctAnswer = mapQuestion.filter(
    (q) => q.userAnswer === q.correct_option
  );
  const result: number = Math.round((correctAnswer.length / mapQuestion.length) * 100);
  console.log(result);

  console.log(toRaw(correctAnswer));
}
</script>

<template>
  <div class="flex flex-col min-h-dvh">
    <div class="header p-5 border-b border-ee">
      <div class="flex justify-between items-center flex-wrap gap-3">
        <div class="flex gap-3 md:gap-4 items-center">
          <img
            class="w-12.5 h-12.5 rounded-full object-cover"
            :src="urlFileStorage(data?.image)"
            alt=""
          />
          <div class="flex-col-1">
            <h1 class="text-18 font-bold text-black">{{ data?.name }}</h1>
            <p class="text-14 text-gray">{{ data?.level }}</p>
          </div>
        </div>
        <div
          class="flex justify-between items-center flex-row-reverse w-full md:w-fit"
        >
          <div
            :class="[
              'relative md:fixed md:top-30',
              isCourseCompleted || !data ? 'hidden' : '',
            ]"
          >
            <img
              @click="openMenu = !openMenu"
              src="/images/more.png"
              alt=""
              class="w-11.5 cursor-pointer hover:scale-110 transition"
            />
            <FloatingMenu
              position="bottom-0 translate-y-[105%] right-0"
              custom-class="p-5 !w-[290px]"
              :isOpen="openMenu"
            >
              <h1 class="text-16">Question Map :</h1>
              <div
                class="flex flex-wrap gap-2.5 items-center justify-center h-full"
              >
                <div
                  v-for="(i, index) in mapQuestion"
                  @click="
                    () => {
                      selectedQuestion = index + 1;
                      openMenu = false;
                    }
                  "
                  :class="[
                    'w-10 text-16 h-10 rounded-lg cursor-pointer hover:scale-105 transition-all border border-ee flex justify-center items-center',
                    i.isAnswered !== -1
                      ? 'text-white bg-black'
                      : 'bg-white text-black',
                  ]"
                >
                  {{ index + 1 }}
                </div>
              </div>
            </FloatingMenu>
          </div>
          <div class="flex gap-3 md:gap-4 items-center md:flex-row-reverse">
            <img class="w-12.5" src="/icons/photo.svg" alt="" />
            <div class="flex-col-1">
              <p class="text-14 text-gray md:text-end">{{ user.role }}</p>
              <h1 class="text-16 font-bold text-black md:text-end">
                {{ user.name }}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-full w-full justify-center items-center flex flex-grow"
      v-if="!data"
    >
      <Loader class="" />
    </div>

    <div
      v-else-if="!isCourseCompleted || data"
      class="flex md:flex-grow justify-center flex-col gap-8 md:gap-[50px] py-8 md:py-8.5 px-3.5 max-w-[821px] mx-auto w-full"
    >
      <div
        v-for="(question, index) in mapQuestion"
        :class="[
          'flex-col gap-8 md:gap-[50px]',
          selectedQuestion !== question.id
            ? 'opacity-0 hidden pointer-events-none select-none'
            : 'opacity-100 flex pointer-events-auto select-auto',
        ]"
      >
        <h1
          class="text-3xl text-black text-center font-bold md:text-[46px] leading-10 md:leading-16"
        >
          {{ index + 1 }}. {{ question.question }}
        </h1>

        <div class="flex-col-wrapper md:max-w-[85%] mx-auto w-full">
          <div
            v-for="(option, index) in question.options"
            :key="index"
            @click="
              () => {
                const questionOption = mapQuestion.findIndex(
                  (q) => q.id === question.id
                );

                mapQuestion[questionOption].isAnswered = option.id;
                mapQuestion[questionOption].userAnswer = `option${option.id}`;
              }
            "
            :class="[
              'py-3 hover:opacity-50 transition-all cursor-pointer relative md:py-4.5 px-3.5 md:px-5 pr-7 rounded-full flex justify-between items-center',
              question.isAnswered === option.id
                ? 'shadow-[0_0_0_2px_black]'
                : 'shadow-[0_0_0_1px_#EEE]',
            ]"
          >
            <div class="gap-2 md:gap-3.5 flex items-center">
              <img
                class="w-5 md:w-6"
                src="/icons/arrow-circle-right.svg"
                alt=""
              />
              <p class="text-sm md:text-xl text-black font-semibold capitalize">
                {{ option.title }}
              </p>
            </div>

            <img
              :class="[
                'w-5 md:w-6 absolute right-4 top-1/2 -translate-y-1/2 transition-all',
                question.isAnswered === option.id ? 'opacity-100' : 'opacity-0',
              ]"
              src="/icons/tick-circle.svg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <Button
          @click="selectedQuestion--"
          variant="black"
          :class="[
            'max-w-[254px] w-full mx-auto',
            selectedQuestion === 1 ? 'hidden' : 'inline-block',
          ]"
        >
          Previous Question
        </Button>
        <Button
          @click="selectedQuestion++"
          variant="blue"
          :class="[
            'max-w-[254px] w-full mx-auto',
            selectedQuestion === mapQuestion.length ? 'hidden' : 'inline-block',
          ]"
        >
          Next Question
        </Button>
      </div>
      <Button
        @click="endCourseHandler"
        variant="orange"
        v-if="mapQuestion.every((q) => q.isAnswered !== -1)"
        :class="['max-w-[254px] w-full mx-auto']"
      >
        End Course
      </Button>
    </div>

    <div
      v-else
      class="flex flex-grow h-full flex-col justify-center items-center gap-8 md:gap-[40px] py-8 md:py-8.5 px-3.5 max-w-[372px] mx-auto w-full md:p-0"
    >
      <img
        src="/icons/last-course-1.svg"
        alt=""
        class="w-[150px] md:w-[200px]"
      />

      <div class="flex flex-col gap-1 md:gap-2">
        <h1 class="text-xl md:text-2xl text-black font-bold text-center">
          Congratulations! You Have Finished Test
        </h1>
        <p class="text-16 text-gray leading-7 text-center">
          Hopefully you will get a better result to prepare your great future
          career soon enough
        </p>
      </div>

      <Button variant="blue" custom-class="md:!w-[193px]"
        >View Test Result</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
