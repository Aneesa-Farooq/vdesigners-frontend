<template>
  <div id="iframeContainer"></div>
  <!-- <iframe id="iframe_id" class="h-[calc(100vh-68px-3rem)] w-full" src="http://localhost:5174?data=123" title="3D viewer"></iframe> -->
</template>

<script>
export default {
  name: "ThreeD",

  mounted() {
    const message = "Hello-from-the-main-page!";
    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:5174?data=${message}`;
    iframe.classList.add("h-[calc(100vh-68px-3rem)]", "w-full");
    document.querySelector("#iframeContainer").appendChild(iframe);
  },
};
</script>
