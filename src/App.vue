<template>
  <main class="app-wrapper" :class="activeTheme">
    <Header @changeTheme="toggleTheme" @changeListType="getListType"></Header>
    <section class="section-wrapper">
      <Navigation @showMenu="getShowMenu"/>
      <RouterView />
    </section>
    <Footer></Footer>
  </main>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {computed} from "vue";
export default {
  components: {Footer, Header, Navigation},
  emits:['changeTheme','showMenu'],
  provide(){
    return{
      getShowMenu: computed(() => this.isMenuOpen),
      getListType: computed(() => this.isListType)
    }
  },
  methods:{
    toggleTheme(theme){
      this.activeTheme = theme
      localStorage.setItem('selectedTheme',theme)
    },
    getShowMenu(condition){
      this.isMenuOpen = condition
    },
    getListType(type){
      this.isListType = type
    }
  },
  data(){
   return{
     activeTheme:'',
     isMenuOpen:'',
     isListType: ''
   }
  },
  mounted() {
    const selectedTheme = localStorage.getItem('selectedTheme')
    if(selectedTheme !== null){
      this.activeTheme = selectedTheme
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.activeTheme = 'theme-dark'
        localStorage.setItem('selectedTheme','theme-dark')
      }  else {
        this.activeTheme = 'theme-light'
        localStorage.setItem('selectedTheme','theme-light')
      }
    }

  }
}
</script>



<style lang="scss">


</style>
