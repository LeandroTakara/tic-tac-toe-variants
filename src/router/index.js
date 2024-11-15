import { createRouter, createWebHistory } from 'vue-router'
import TicTacToe from '@/views/TicTacToe.vue'
import TicTacToeInfinite from '@/views/TicTacToeInfinite.vue'
import TicTacToeSuper from '@/views/TicTacToeSuper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TicTacToe,
    },
    {
      path: '/infinite',
      component: TicTacToeInfinite,
    },
    {
      path: '/super',
      component: TicTacToeSuper,
    },
  ],
})

export default router
