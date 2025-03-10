import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import FormPage from '../views/FormPage.vue'
import ResultPage from '../views/ResultPage.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

import SurveyForm from '../views/SurveyForm.vue'

import { useAuthStore } from '@/stores/auth'
import ThankYouVue from '@/components/ThankYou.vue'

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
      meta: { breadcrumb: 'Trang chủ', requiresAuth: true }
    },
    {
      path: '/main/project/:id',
      name: 'project',
      component: ProjectPage,
      meta: { breadcrumb: 'Dự án', requiresAuth: true }
    },
    {
      path: '/main/project/:id/file',
      name: 'project-file',
      component: import('../components/File.vue'),
      meta: { breadcrumb: 'Tài liệu', requiresAuth: true }
    },
    {
      path: '/main/project/:id/file/:folderId',
      name: 'project-file-children',
      component: import('../components/FileChildren.vue'),
      meta: { breadcrumb: 'Tài liệu', requiresAuth: true }
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
      meta: { breadcrumb: 'Phản hồi', requiresAuth: true }
    },
    {
      path: '/main/project/:projectId/survey/:surveyId/question/all',
      name: 'surveyform',
      component: SurveyForm,
      meta: { hideHeader: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      //hide header
      meta: { hideHeader: true, breadcrumb: 'Phản hồi', requiresAuth: true }
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      //hide header
      meta: { hideHeader: true }
    },
    {
      path: '/thank-you',
      name: 'thank-you',
      component: ThankYouVue,
      meta: { hideHeader: true }
    }
  ]
})

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
