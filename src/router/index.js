import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/chief",
      name: "chief",
      component: () => import("../views/chiefView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/client",
      name: "client",
      component: () => import("../views/clientView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
