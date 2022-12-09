<template>
  <teleport to=".header-class .logo-wrap" v-if="isMounted">
    <div class="hamburger-menu">
      <IconHamburgerMenu @click="toggleMenu(true)"/>
    </div>
  </teleport>
  <transition-group name="slide-fade">
    <nav class="app-navigation" v-if="showMenu">
      <ul>
        <li class="close-wrapper" v-if="isMobile">
          <h3>MENU</h3> <IconClose @click="toggleMenu(false)"/>
        </li>
        <template v-if="isMenuType === 'social'">
          <li v-for="(data,key) in itemsForMenu" :key="key" @click="toggleMenu(false)">
            <router-link :to="data.link">
              <component :is="data.icon" /> {{ data.name }}
            </router-link>
          </li>
        </template>
        <template v-if="isMenuType === 'tag'">
          <li v-for="(data,key) in itemsForTag" :key="key" class="menu-tag-item" @click="toggleMenu(false)">
           <router-link :to="`/tags/${data}`" :class="`tag-item tag-${data}`">
            {{data}}
           </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </transition-group>
</template>

<script>
import {defineAsyncComponent} from "vue";
import IconClose from "./icons/IconClose.vue";
import IconHamburgerMenu from "./icons/IconHamburgerMenu.vue";
export default {
  name: "Navigation",
  components: {IconHamburgerMenu, IconClose},
  watch: {
    $route: function (val) {
      if(this.$route.params.tag !== undefined){
        this.isMenuType = 'tag'
      } else {
        this.isMenuType = 'social'
      }
    },
  },
  data(){
    return{
      isMenuType:'social',
      isMobile:false,
      showMenu:true,
      isMounted:false,
      itemsForMenu:[
        {
          name:'Twitter',
          link:'/twitter',
          icon: defineAsyncComponent(()=> import(`./icons/IconTwitter.vue` /*@vite-ignore*/ ))
        },
        {
          name:'İnstagram',
          link:'/instagram',
          icon:defineAsyncComponent(()=> import(`./icons/IconInstagram.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Facebook',
          link:'/facebook',
          icon:defineAsyncComponent(()=> import(`./icons/IconFacebook.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Telegram',
          link:'/telegram',
          icon:defineAsyncComponent(()=> import(`./icons/IconTelegram.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Medium',
          link:'/medium',
          icon:defineAsyncComponent(()=> import(`./icons/IconMedium.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Youtube',
          link:'/youtube',
          icon:defineAsyncComponent(()=> import(`./icons/IconYoutube.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Google Play',
          link:'/google-play',
          icon:defineAsyncComponent(()=> import(`./icons/IconGooglePlay.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Codepen',
          link:'/codepen',
          icon:defineAsyncComponent(()=> import(`./icons/IconCodepen.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Tools',
          link:'/tools',
          icon:defineAsyncComponent(()=> import(`./icons/IconTools.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Repos',
          link:'/repos',
          icon:defineAsyncComponent(()=> import(`./icons/IconRepos.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Npm Package',
          link:'/npm',
          icon:defineAsyncComponent(()=> import(`./icons/IconNpm.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Bonus Source',
          link:'/bonus-source',
          icon:defineAsyncComponent(()=> import(`./icons/IconBonus.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Superpeer',
          link:'/superpeer',
          icon:defineAsyncComponent(()=> import(`./icons/IconSuperpeer.vue` /*@vite-ignore*/ ))
        },
        {
          name:'Podcast',
          link:'/podcast',
          icon:defineAsyncComponent(()=> import(`./icons/IconPodcast.vue` /*@vite-ignore*/ ))
        }
      ],
      itemsForTag:[]
    }
  },
  methods:{
    fetchFollowList(el){
      return fetch(`/public/data/${el}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        response.takip.forEach((el)=>{
          if(el?.tags?.length>0)
          this.itemsForTag.push(...el.tags)
        })
      }).then(()=>{
        this.itemsForTag = [...new Set(this.itemsForTag)]
      })
    },
    resizeHandler(){
      window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false
      window.innerWidth < 769 ? this.showMenu = false : this.showMenu = true
    },
    toggleMenu(condition){
      window.innerWidth < 769 ? this.showMenu = condition : this.showMenu =! this.showMenu
      this.$emit('showMenu',this.showMenu)
    },
  },

  created() {
    if (window.innerWidth < 769){
      this.showMenu = false
    }
    if(this.$route.params.tag !== undefined){
      this.isMenuType = 'tag'
    } else {
      this.isMenuType = 'social'
    }
    window.addEventListener("resize", this.resizeHandler);
    let allSocial = ['bonus-source','codepen','facebook',
      'google-play','instagram','medium','npm','podcast',
      'repos','superpeer','telegram','tools', 'twitter','youtube']

    allSocial.forEach((el)=>{
      this.fetchFollowList(el)
    })
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted() {
    window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false
    window.innerWidth < 769 ? this.showMenu = false : this.showMenu = true
    this.isMounted = true
    this.$emit('showMenu',this.showMenu)

  },
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-250px);
  opacity: 0;
}
</style>
