<template>
   <div class="app">
     <SideBar />
     <main class="bg-background">
      <NavBar :title= "$route.params.pageName"/>
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

   }
};
</script>