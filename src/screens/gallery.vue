<template>
  <div class="bg-background">
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        <div class="max-h-[250px] overflow-hidden bg-white relative" v-for="(post, index) in GalleryData" :key="index">
          <img class="img-fluid" :src="post.image" alt="" />
        </div>
    </div>
    
  </div>
</template>

<script>

import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  name: "Gallery",
  components: {
    Icon,
  },
  data() {
    return {
      GalleryData: {},
      userType: "",
    };
  },
  mounted() {
        this.userType = this.$route.params.type;
        axios
            .get(`https://vdesigners.herokuapp.com/api/project/getProjects`)
            .then((response) => {
                console.log(response.data);
                this.GalleryData = response.data;
                console.log(this.GalleryData);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
</script>