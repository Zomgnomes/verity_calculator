import { createRouter, createWebHistory } from 'vue-router'
import OutsideView from '../views/OutsideView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'outside',
      component: OutsideView
    },
    {
      path: '/inside',
      name: 'inside',
      component: () => import('../views/InsideView.vue')
    }
  ]
})

export default router
