<template>
  <main class="list--content-wrapper" ref="listContent">
      <div class="list-property-wrapper">
        <div class="info-area">
          <h4>{{followData.name}}</h4>
          <p>{{ `${searchList?.length} kişi bulundu` }}</p>
        </div>
        <div class="search-area">
          <input type="text" placeholder="Search" v-model="searchValue">
          <IconSearch />
        </div>

      </div>
      <div class="list-wrapper">
        <div class="list-item" v-for="(data,key) in searchList" :key="key" :class="{'list-view' : isListType === 'list'}">
          <div class="list-sub-content">
            <div class="list-header">
              <h2>{{data.name}}</h2>
              <a :href="data.url" target="_blank">
                <IconLink />
              </a>
            </div>
            <p class="list-description">{{data.description}}</p>
          </div>


          <div class="tag-items-wrapper">
            <div class="tag-item" :class="`tag-${data}`" v-for="(data,key) in data.tags" :key="key" @click="$router.push(`/tags/${data}`)">
              {{data.toUpperCase()}}
            </div>
          </div>

        </div>
      </div>
    </main >
</template>

<script>
import IconLink from "../components/icons/IconLink.vue";
import IconSearch from "../components/icons/IconSearch.vue";
export default {
  name: "MainPage",
  components: {IconSearch, IconLink},
  inject:['getShowMenu','getListType'],
  watch: {
    $route: function (val) {
      this.activePage = this.$route.params.social
      this.fetchFollowList(this.activePage)
    },
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
      searchValue:'',
      activePage:'MainPage',
      followData:{},
      followList:[],
    }
  },
  computed:{
    searchList() {
      let list = this.followList.filter((val) =>
            val.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.description.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.tags?.includes(this.searchValue.toLowerCase())
        );

      return  list.sort((a,b) => {
        let fa = a.name.toLowerCase(), fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
    },
  },
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
    fetchFollowList(fileName){
      fetch(`/public/data/${fileName}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        this.followData = response
        this.followList = response.takip
      })
    }
  },
  async mounted() {
    this.activePage = this.$route.params.social
    this.fetchFollowList(this.activePage)

    this.isMenuOpen = this.getShowMenu
    this.navigationDomManipulate()
    this.isListType = this.getListType
  },
}
</script>

<style scoped>

</style>
