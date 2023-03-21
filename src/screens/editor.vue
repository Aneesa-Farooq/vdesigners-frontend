<template>
    <div id="tui-image-editor-container"></div>
</template>
  
<script>
export default {
  name: "Editor",
  mounted() {
    // Image editor
    var imageEditor = new tui.ImageEditor('#tui-image-editor-container', {
      includeUI: {
        loadImage: {
          path: '/img/white-panel.jpg',
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

    //document.querySelector(".tui-image-editor-header-logo").innerHTML = '<img src="/img/logo.png" style="height:70px; width:auto" alt="logo" />';
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

.tui-image-editor-help-menu{
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

.tui-image-editor-menu use.normal.use-default, .tui-image-editor-help-menu use.normal.use-default {
    fill-rule: evenodd;
    fill: white !important;
    stroke: white !important;
}
svg[display=none]{
  display: none !important;
  height: 0 !important;
}
</style>
  