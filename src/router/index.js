import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('/src/views/WelcomePage.vue'),
    },
    {
      path: '/:social',
      component: () => import('/src/views/MainPage.vue'),
      props:true,
      meta:{
        listIcon: true
      }
    },
    {
      path: '/tags/:tag',
      component: () => import('/src/views/MainPageTags.vue'),
      props:true,
      meta:{
        listIcon:true
      }
    }
  ]
})

export default router
