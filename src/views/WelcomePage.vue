<template>
  <main class="welcome--content-wrapper" ref="listContent">
    <div class="welcome-text">
      <h1>We Are Crafted.
        Design & Development
        Service Provider.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed d</p>
    </div>
   <div class="welcome-content">
     <WelcomeImg v-if="true" class="welcome-img"/>
   </div>
  </main >
</template>

<script>

import IconFont from "../components/img/IconFont.vue";
import WelcomeImg from "../components/img/WelcomeImg.vue";
export default {
  name: "WelcomePage",
  components: { WelcomeImg, IconFont},
  inject:['getShowMenu','getListType'],
  watch: {
    getShowMenu: {
      handler(val) {
        this.isMenuOpen = val
        this.navigationDomManipulate()
      },
      deep: true,
    },
    getListType: {
      handler(val) {
        this.isListType = val
      },
      deep: true,
    }
  },

  data(){
    return{
      isListType:null,
      isMenuOpen:null,
    }
  },
  computed:{},
  methods:{
    navigationDomManipulate(){
      const nav = document.querySelector('.app-navigation')
      if(window.innerWidth > 768){
        this.$refs.listContent.style.marginLeft = 'clamp(245px,17vw,320px)'
        if(this.isMenuOpen === true){
          nav.style.position = "absolute"
          this.$refs.listContent.style.marginLeft = 'clamp(245px,17vw,320px)'
        } else {
          this.$refs.listContent.style.marginLeft = '0'
          setTimeout(()=>{
            nav.style.position = "unset"
          },1000)
        }
      }
    },
  },
  async mounted() {
    this.isMenuOpen = this.getShowMenu
    this.navigationDomManipulate()
    this.isListType = this.getListType
  },
}
</script>

<style scoped>

</style>
