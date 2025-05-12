import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Auth from "./pages/auth/Auth.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";

const router = createRouter({
  routes: [
    { path: "/", component: App },
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
  ],
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
