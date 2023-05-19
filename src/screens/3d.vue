<template>
  <iframe id="iframe_id" class="h-[calc(100vh-68px-3rem)] w-full" src="https://3d-vue-app.vercel.app/?id=3" title="3D viewer"></iframe>
</template>

<script>

export default {
  name: "ThreeD",

  mounted(){
    // Obtain a reference to the iframe element
   const iframe = document.getElementById('iframe_id');

// Send a message to the iframe
const message = {
  parameter: 'example value',
};
iframe.contentWindow.postMessage(message, 'https://3d-vue-app.vercel.app/?id=3');
  }
};
</script>
