<template>
  <main class="list--content-wrapper" ref="listContent">
      <div class="list-property-wrapper">
        <div class="info-area">
          <h4>{{`${this.$route.params.tag.toUpperCase()} Tag Önerileri`}}</h4>
          <p>{{ `${followList?.length} kişi bulundu` }}</p>
        </div>
        <div class="search-area">
          <input type="text" placeholder="Search" v-model="searchValue">
          <IconSearch />
        </div>

      </div>
      <template v-if="searchValue.length > 0">
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
          <ItemsNotFound v-if="searchList.length < 1"/>
        </div>
      </template>

      <template v-else>
        <div class="general-wrapper" v-for="(data,key) in searchList" :key="key">
          <div class="tag-list-header" >
            {{data.name}}
          </div>
          <div class="list-wrapper">
            <div class="list-item" v-for="(data,key) in data.takip" :key="key" :class="{'list-view' : isListType === 'list'}">
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
        </div>
      </template>

    </main >
</template>

<script>
import IconLink from "../components/icons/IconLink.vue";
import IconSearch from "../components/icons/IconSearch.vue";
import ItemsNotFound from "../components/ItemsNotFound.vue";
export default {
  name: "MainPage",
  components: {ItemsNotFound, IconSearch, IconLink},
  inject:['getShowMenu','getListType'],
  watch: {
    $route: function (val) {
      this.followData = []
      this.followList = []
      let allSocial = ['bonus-source','codepen','facebook',
        'google-play','instagram','medium','npm','podcast',
        'repos','superpeer','telegram','tools', 'twitter','youtube']

      allSocial.forEach((el)=>{
        this.fetchFollowList(el)
      })
    },
    getShowMenu: {
      handler(val) {
        console.log(val)
        this.isMenuOpen = val
        this.navigationDomManipulate()
      },
      deep: true,
    },
    getListType: {
      handler(val) {
        console.log(val)
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
      followData:[],
      followList:[],
      numberOfItem:null,
    }
  },
  computed:{
    searchList() {
      let list = []
      if(this.searchValue.length > 0){
        let tagData = this.followList
        list = tagData.filter((val) =>
            val.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.description.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.tags?.includes(this.searchValue.toLowerCase())
        );
      } else {
        let tagData = this.followData
         list = tagData.filter((val) =>
            val.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.description.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            val.tags?.includes(this.searchValue.toLowerCase())
        );
      }


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
    fetchFollowList(el){
      return fetch(`/data/${el}.json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {
        let finalData = response.takip.filter((val) => val?.tags?.includes(this.$route.params.tag))
        if(finalData.length > 0){
          response.takip = finalData
          this.followData.push(response)
          this.followList.push(...response.takip)
        }
      }).then(()=>{
        console.log(this.followData)
      })
    }
  },
  async mounted() {
    this.isMenuOpen = this.getShowMenu
    this.navigationDomManipulate()
    this.isListType = this.getListType
  },

  created() {
    let allSocial = ['bonus-source','codepen','facebook',
      'google-play','instagram','medium','npm','podcast',
      'repos','superpeer','telegram','tools', 'twitter','youtube']

    allSocial.forEach((el)=>{
      this.fetchFollowList(el)
    })
  }

}
</script>

<style scoped>

</style>
