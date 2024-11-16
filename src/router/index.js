import { createRouter, createWebHistory } from 'vue-router'
import TicTacToe from '@/views/TicTacToe.vue'
import TicTacToeInfinite from '@/views/TicTacToeInfinite.vue'
import TicTacToeSuper from '@/views/TicTacToeSuper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'classic',
      component: TicTacToe,
    },
    {
      path: '/infinite',
      name: 'infinite',
      component: TicTacToeInfinite,
    },
    {
      path: '/super',
      name: 'super',
      component: TicTacToeSuper,
    },
  ],
})

export default router
