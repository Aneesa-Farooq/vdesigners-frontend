<template>
  <div id="tui-image-editor-container"></div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      imgPath: "",
    };
  },
  mounted() {
    // Ensure the route param is correctly received
    console.log("Route param:", this.$route.params.path);

    // Decode and handle the URL as you mentioned
    let imgUrl = decodeURIComponent(this.$route.params.path);
    imgUrl = imgUrl.replace('PLACEHOLDER', '%2F');

    this.imgPath = imgUrl;
    console.log("Image Path:", this.imgPath);

    // Initialize the image editor
    const imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
      includeUI: {
        loadImage: {
          path: this.imgPath,
          name: 'SampleImage',
        },
        theme: blackTheme, // or whiteTheme
        initMenu: 'filter',
        menuBarPosition: 'bottom',
      },
      cssMaxWidth: 1000,
      cssMaxHeight: 600,
      usageStatistics: false,
    });

    window.onresize = function () {
      imageEditor.ui.resizeEditor();
    };
  },
};
</script>
  
<style>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans);

html,
body {
  height: 100%;
  margin: 0;
  /* overflow: hidden; */
}

#tui-image-editor-container {
  height: 100vh !important;
}

.tui-image-editor-help-menu {
  background-color: #1e1e1e !important;
}

.tui-image-editor-download-btn {
  background-color: #F33757 !important;
  border: #F33757 !important;
}

.tui-image-editor-header-buttons {
  display: flex;
  gap: .5rem;
}

.tui-image-editor-menu use.normal.use-default,
.tui-image-editor-help-menu use.normal.use-default {
  fill-rule: evenodd;
  fill: white !important;
  stroke: white !important;
}

svg[display=none] {
  display: none !important;
  height: 0 !important;
}
</style>
  