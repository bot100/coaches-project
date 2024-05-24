import { createRouter, createWebHistory } from "vue-router";
import CoachesSection from "./pages/coaches/CoachesSection.vue";
import store from "./store/store.js";

const CoachDetail = () => import("./pages/coaches/CoachDetail.vue");
const CoachRegistration = () => import("./pages/coaches/CoachRegistration.vue");

const CoachContact = () => import("./pages/coaches/CoachContact.vue");
const NotFound = () => import("./pages/NotFound.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const RequestsList = () => import("./pages/requests/RequestsList.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesSection },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true, // automatic add props into component by id (to CoachDetail)
      children: [{ path: "contact", component: CoachContact }],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsList,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// Navigation Guard
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
