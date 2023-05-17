<template>
   <div class="app">
     <SideBar :userType="$route.params.type"/>
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
      NavBar,
      
   },
   data () {
    return {
      userType: this.$route.params.type,
    }},
   mounted(){
    if (this.userType === "admin") {
      this.applyImportantStyleToClass("decidedBG", "background-color", "#20c997")
    } else if (this.userType === "designer") {
      this.applyImportantStyleToClass("decidedBG", "background-color", "#F3677F")
    } else {
      this.applyImportantStyleToClass("decidedBG", "background-color", "#F77062")    }
   },
   methods: {
    applyImportantStyleToClass(className, property, value) {
      var style = document.createElement('style');
      var cssRule = `.${className} { ${property}: ${value} !important; }`;

      if (style.styleSheet) {
        // For Internet Explorer
        style.styleSheet.cssText = cssRule;
      } else {
        // For other browsers
        style.appendChild(document.createTextNode(cssRule));
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    },
}
}

</script>

<style>
.decidedBG{
  background-color: #F5F5F5;
}
</style>