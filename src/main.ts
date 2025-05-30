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
import Learning from "./pages/student/course/Learning.vue";
import RaportDetails from "./pages/student/course/RaportDetails.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

const router = createRouter({
  routes: [
    {
      path: "/auth",
      component: Auth,
      beforeEnter: (_to, _from, next) => {
        const user = localStorage.getItem("user");

        if (user) {
          if (JSON.parse(user).role === "student") {
            next({ name: "student-overview" });
          } else {
            next({ name: "overview" });
          }
        } else {
          next();
        }
      },
      children: [
        {
          path: "login",
          component: Login,
          name: "login",
        },
        {
          path: "register",
          component: Register,
          name: "register",
        },
      ],
    },
    {
      path: "/",
      component: Dashboard,
      beforeEnter: (to, _from, next) => {
        const user = localStorage.getItem("user");

        if (!user) {
          if (to.name !== "login") {
            return next({ name: "login" });
          }
          return next();
        }

        const parsedUser = JSON.parse(user);
        const role = parsedUser.role;

        if (
          role === "student" &&
          to.name !== "student-overview" &&
          to.path === "/"
        ) {
          return next({ name: "student-overview" });
        }

        if (role !== "student" && to.name !== "overview" && to.path === "/") {
          return next({ name: "overview" });
        }

        return next();
      },
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
              path: "edit-course/:courseId",
              component: CreateCourse,
              name: "edit-course",
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
              path: "manage-course/:courseId/new-question/:questionId",
              component: NewQuestion,
              name: "edit-question",
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
      beforeEnter: (to, _from, next) => {
        const user = localStorage.getItem("user");

        if (!user) {
          if (to.name !== "login") {
            return next({ name: "login" });
          }
          return next();
        }

        const parsedUser = JSON.parse(user);
        const role = parsedUser.role;

        if (
          role === "student" &&
          to.name !== "student-overview" &&
          to.path === "/"
        ) {
          return next({ name: "student-overview" });
        }

        if (
          role !== "student" &&
          to.name !== "student-overview" &&
          to.path === "/"
        ) {
          return next({ name: "student-overview" });
        }

        return next();
      },
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
            {
              path: "raport-details/:courseId",
              component: RaportDetails,
              name: "raport-details",
            },
          ],
        },
      ],
    },
    {
      path: "/learning/:courseId",
      component: Learning,
      name: "learning",
    },
  ],
  history: createWebHistory(),
});

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
