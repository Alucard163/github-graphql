import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import { ROUTES, ROUTE_URL } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_URL.HOME,
      name: ROUTES.HOME,
      component: HomeView
    },
    {
      path: ROUTE_URL.SEARCH,
      name: ROUTES.SEARCH,
      // route level code-splitting
      // this generates a separate chunk (SearchView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SearchView.vue')
    },
    {
      path: ROUTE_URL.REPOSITORY,
      name: ROUTES.REPOSITORY,
      component: () => import('../views/RepositoryView.vue')
    },
    {
      path: ROUTE_URL.REPOSITORIES,
      name: ROUTES.REPOSITORIES,
      component: () => import('../views/RepositoriesView.vue')
    },

  ]
})

export default router
