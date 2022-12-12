import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/WelcomePage.vue'),
    },
    {
      path: '/:social',
      component: () => import('@/views/MainPage.vue'),
      props:true,
      meta:{
        listIcon: true
      }
    },
    {
      path: '/tags/:tag',
      component: () => import('@/views/MainPageTags.vue'),
      props:true,
      meta:{
        listIcon:true
      }
    }
  ]
})

export default router
