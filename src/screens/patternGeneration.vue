<template>
 <div id="iframeContainerPattern">

 </div>
    <!-- <iframe class="h-[calc(100vh-68px-3rem)] w-full" src="https://pattern-generation-main-i38ao3d3e-alishbaiftikhar.vercel.app/" title="3D viewer"></iframe> -->
  
</template>

<script>

export default {
  name: "PatternGeneration",
  data() {
    return {
      id:"",
    }
  },
  mounted() {
    const User=localStorage.getItem("user-info");
    const user1=JSON.parse(User);
    this.id=user1.user._id;
    console.log("id is printed")
    console.log(this.id);
    const message = this.id;
    const iframe = document.createElement("iframe");
    iframe.src = `https://pattern-generation-main.vercel.app/?data=${message}`;
    iframe.classList.add("h-[calc(100vh-68px-3rem)]", "w-full");
    document.querySelector("#iframeContainerPattern").appendChild(iframe);
  }
};
</script>

