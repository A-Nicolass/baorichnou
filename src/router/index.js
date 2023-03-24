import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useStore } from "@/stores/store.js";

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

router.beforeEach((to, from, next) => {
  const store = useStore();
  const userRole = store.getUserRole;
  const token = store.getToken;

  if (to.meta.requiresAuth && token) {
    if (userRole.owner && to.path === "/client") {
      next("/chief");
    } else if (userRole.editor && to.path === "/chief") {
      next("/client");
    } else {
      next();
    }
  } else if (to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
export default router;
