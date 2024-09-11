import Vue from "vue";
import Router from "vue-router";
import QuizPage from "@/views/QuizPage";
import AnswersPage from "@/views/AnswersPage";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "QuizPage",
      component: QuizPage,
    },
    {
      path: "/results",
      name: "AnswersPage",
      component: AnswersPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const answersCount = Object.keys(store.state.answers).length;
  if (to.path === "/" && answersCount >= 9) {
    next("/results");
  } else {
    next();
  }
});

export default router;
