import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/MainView.vue')
    },
    {
      path: '/privacy_policy',
      name: 'privacy_policy',
      component: () => import('@views/PrivacyView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('@views/ErrorView.vue'),
    }
  ]
})

export default router
