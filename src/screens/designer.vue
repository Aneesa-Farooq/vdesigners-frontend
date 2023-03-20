<template>
    <div class="app">
      <SideBarD />
      <main class="bg-background">
       <NavBar :class="`${is3d ? 'hidden' : ''}`" :title= "$route.params.pageName"/>
      <router-view></router-view>
      </main>
     
    </div>
 </template>
 
 <script>
 import SideBarD from "../components/sideBarD.vue"
 import NavBar from "../components/navBar.vue";
 export default {
 
   name: "Designer",
   components:{
       SideBarD,
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