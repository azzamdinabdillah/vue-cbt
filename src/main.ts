import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Auth from "./pages/auth/Auth.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Overview from "./pages/teacher/overview/Overview.vue";
import Dashboard from "./pages/Dashboard.vue";
import Course from "./pages/teacher/course/Course.vue";
import CreateCourse from "./pages/teacher/course/resources/CreateCourse.vue";
import CourseLayout from "./pages/teacher/course/CourseLayout.vue";
import ManageCourse from "./pages/teacher/course/resources/ManageCourse.vue";

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
          ],
        },
      ],
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
