import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPage from '../views/MainPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import FormPage from '../views/FormPage.vue'
import ResultPage from '../views/ResultPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
      meta: { breadcrumb: "Trang chủ"}
    },
    {
      path: '/main/project',
      name: 'project',
      component: ProjectPage,
      meta: { breadcrumb: "Dự án"}
    },
    {
      path: '/main/project/form',
      name: 'form',
      component: FormPage,
      meta: { breadcrumb: "Khảo sát"}
    },
    {
      path: '/main/project/form/result',
      name: 'form-result',
      component: ResultPage,
      meta: { breadcrumb: "Phản hồi"}
    }
  ]
})
export default router
