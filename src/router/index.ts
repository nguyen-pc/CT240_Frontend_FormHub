import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import FormPage from '../views/FormPage.vue'
import ResultPage from '../views/ResultPage.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'main',
      component: MainPage,
      meta: { breadcrumb: "Trang chủ"},
    },
    {
      path: '/main/project',
      name: 'project',
      component: ProjectPage,
      meta: { breadcrumb: "Dự án"}
    },
    {
      path: '/main/project/file',
      name: 'project-file',
      component: import('../components/File.vue'),
      meta: { breadcrumb: "Tài liệu"}
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
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      //hide header
       meta: { hideHeader: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
       //hide header
       meta: { hideHeader: true }
    }
  ]
})
export default router