<template>
<header class="header-class">
  <div class="logo-wrap">
    <div class="logo">
      <router-link to="/">
        {{ '<LinkList />' }}
      </router-link>
    </div>
  </div>
  <div class="property-icon">
    <IconRows @click="toggleListType('list')" v-if="listType === 'grid' && isListPage"/>
    <IconGrid @click="toggleListType('grid')" v-if="listType === 'list' && isListPage"/>
    <IconSun @click="toggleTheme('theme-light')" v-if="darkTheme"/>
    <IconMoon @click="toggleTheme('theme-dark')" v-if="!darkTheme"/>
  </div>
</header>
</template>

<script>
import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";
import IconRows from "./icons/IconRows.vue";
import IconGrid from "./icons/IconGrid.vue";
export default {
  name: "Header",
  components: {IconGrid, IconRows, IconSun, IconMoon},
  watch: {
    $route: function (val) {
     this.$route.meta.listIcon === undefined ? this.isListPage = false : this.isListPage = true
    },
  },
  data(){
    return{
      darkTheme:'',
      listType: 'grid',
      isListPage:true
    }
  },
  methods:{
    toggleTheme(theme){
      this.$emit('changeTheme',theme)
      theme === 'theme-dark' ? this.darkTheme = true : this.darkTheme = false
    },
    toggleListType(type){
      this.$emit('changeListType',type)
      this.listType = type

      /*const listItem = document.querySelectorAll('.list-wrapper .list-item')
      listItem.forEach(el=>{
        if(type === "list"){
          el.style.flex = "1 100%"
        } else {
          el.style.flex = "1 20%"
        }
      })*/
    }
  },
  mounted() {
    const theme = localStorage.getItem('selectedTheme')
    if(theme !== null){
      theme === 'theme-dark' ? this.darkTheme = true : this.darkTheme = false
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkTheme = true
        localStorage.setItem('selectedTheme','theme-dark')
      }  else {
        this.darkTheme = false
        localStorage.setItem('selectedTheme','theme-light')
      }
    }
  }
}
</script>
<style scoped lang="scss">

.theme-dark{
  .logo{
    font-palette: --Logo;
  }
}

.theme-light{
  .logo{
    font-palette: --Logo2;
  }
}
.header-class{
  padding-inline: 20px;
  height: 4rem;
  min-height: clamp(2rem,3.5vw,4rem);

  background: var(--card-background);
  box-shadow:0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-wrap{
    display: flex;
    align-items: center;
    column-gap: 40px;
    width: clamp(220px,16vw,300px);
    justify-content: space-between;
  }


  .logo{
    font-family: 'Nabla', cursive;
    font-size: 20px;
    a{
      text-decoration: none;
    }

  }

  .property-icon{
    display: flex;
    align-items: center;
    column-gap: 8px;
    >svg{
      cursor: pointer;
    }
  }
}
</style>
