import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(),
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
