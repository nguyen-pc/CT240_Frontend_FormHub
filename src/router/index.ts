import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import FormPage from '../views/FormPage.vue'
import ResultPage from '../views/ResultPage.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

import SurveyForm from '../views/SurveyForm.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      //hide header
      meta: { hideHeader: true }
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      meta: { breadcrumb: 'Trang chủ' }
    },
    {
      path: '/main/project/:id',
      name: 'project',
      component: ProjectPage,
      meta: { breadcrumb: 'Dự án' }
    },
    {
      path: '/main/project/:id/file',
      name: 'project-file',
      component: import('../components/File.vue'),
      meta: { breadcrumb: 'Tài liệu' }
    },
    {
      path: '/main/project/:id/file/:folderId',
      name: 'project-file-children',
      component: import('../components/FileChildren.vue'),
      meta: { breadcrumb: 'Tài liệu' }
    },
    {
      path: '/main/project/:projectId/survey/:surveyId',
      name: 'form',
      component: FormPage,
      meta: { breadcrumb: 'Khảo sát' }
    },
    {
      path: '/main/project/:projectId/survey/:surveyId/result',
      name: 'form-result',
      component: ResultPage,
      meta: { breadcrumb: 'Phản hồi' }
    },
    {
      path: '/main/project/:projectId/survey/:surveyId/question/all',
      name: 'surveyform',
      component: SurveyForm
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      //hide header
      meta: { hideHeader: true, breadcrumb: 'Phản hồi' }
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

// requiresAuth: true

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'signin', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'main' })
  } else {
    return next()
  }
})
export default router
