import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from "@/views/WelcomePage.vue";
import MainPage from "@/views/MainPage.vue";
import MainPageTags from "@/views/MainPageTags.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: WelcomePage,
    },
    {
      path: '/:social',
      component: MainPage,
      props:true,
      meta:{
        listIcon: true
      }
    },
    {
      path: '/tags/:tag',
      component: MainPageTags,
      props:true,
      meta:{
        listIcon:true
      }
    }
  ]
})

export default router
