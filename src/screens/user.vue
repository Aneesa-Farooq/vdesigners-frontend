<template>
   <div class="app">
     <SideBar :userType="$route.params.type"/>
     <main class="bg-background">
      <NavBar :class="`${is3d ? 'hidden' : ''}`" :title= "$route.params.pageName"/>
     <router-view></router-view>
     </main>
    
   </div>
</template>

<script>
import SideBar from "../components/sideBar.vue"
import NavBar from "../components/navBar.vue";
export default {

  name: "User",
  components:{
      SideBar,
      NavBar

   },
   data () {
    return {
      is3d: false
    }},
   mounted(){
    if (this.$route.params.pageName =="3D" || this.$route.params.pageName =="AI" || this.$route.params.pageName =="Editor"){
      this.is3d = true;
    }
   }
}
</script>