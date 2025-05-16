import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Auth from "./pages/auth/Auth.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Overview from "./pages/teacher/overview/Overview.vue";
import StudentOverview from "./pages/student/overview/Overview.vue";
import Dashboard from "./pages/Dashboard.vue";
import Course from "./pages/teacher/course/Course.vue";
import CreateCourse from "./pages/teacher/course/resources/CreateCourse.vue";
import CourseLayout from "./pages/teacher/course/CourseLayout.vue";
import ManageCourse from "./pages/teacher/course/resources/ManageCourse.vue";
import NewQuestion from "./pages/teacher/course/resources/NewQuestion.vue";
import Student from "./pages/teacher/course/resources/student/Student.vue";
import AddStudent from "./pages/teacher/course/resources/student/AddStudent.vue";
import StudentCourseLayout from "./pages/student/course/CourseLayout.vue";
import StudentCourse from "./pages/student/course/Course.vue";

const router = createRouter({
  routes: [
    {
      path: "/auth",
      component: Auth,
      children: [
        {
          path: "login",
          component: Login,
        },
        {
          path: "register",
          component: Register,
        },
      ],
    },
    {
      path: "/",
      component: Dashboard,
      children: [
        {
          path: "",
          component: Overview,
          name: "overview",
        },
        {
          path: "course",
          component: CourseLayout,
          name: "teacher-course",
          children: [
            {
              path: "",
              component: Course,
              name: "course",
            },
            {
              path: "create-course",
              component: CreateCourse,
              name: "create-course",
            },
            {
              path: "manage-course/:courseId",
              component: ManageCourse,
              name: "manage-course",
            },
            {
              path: "manage-course/:courseId/new-question",
              component: NewQuestion,
              name: "new-question",
            },
            {
              path: "student/:courseId",
              component: Student,
              name: "student",
            },
            {
              path: "student/:courseId/add-student",
              component: AddStudent,
              name: "add-student",
            },
          ],
        },
      ],
    },
    {
      path: "/student",
      component: Dashboard,
      children: [
        {
          path: "",
          component: StudentOverview,
          name: "student-overview",
        },
        {
          path: "course",
          component: StudentCourseLayout,
          children: [
            {
              path: "",
              component: StudentCourse,
              name: "student-course",
            },
          ],
        },
      ],
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
