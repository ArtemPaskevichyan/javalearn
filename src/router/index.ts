import {createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import QuestionsPage from "@/pages/QuestionsPage.vue";

const routes: RouteRecordRaw[] = [
  {
    component: QuestionsPage,
    path: "/questions",
    name: "questions",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
