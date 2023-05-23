<template>
  <div class="bg-background">
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
      <div class="max-h-[250px] overflow-hidden bg-white relative" v-for="(post, index) in GalleryData" :key="index">
        <img class="img-fluid" :src="post.image" alt="" />
        <div class="h-full w-full absolute top-0 bottom-0 left-0 right-0 bg-black opacity-0 hover:opacity-50 flex justify-center items-center gap-3">
          <Icon icon="material-symbols:edit-square-outline" class="operation-icon text-white text-4xl font-bold cursor-pointer" @click="navigate(post.image[0])"></Icon>
          <Icon icon="tabler:trash" class="operation-icon text-white text-4xl font-bold cursor-pointer" @click="deletePattern(post._id)"></Icon>
        </div>
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
  methods: {
    navigate(image) {
      const encodedPart = "%2F";
      const placeholder = "PLACEHOLDER";
      image = image.replace(encodedPart, placeholder);
      console.log(image);
      this.$router.push(`/user/Editor/${this.userType}/editor/${encodeURIComponent(image)}`);
    },

    deletePattern(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://localhost:5172/api/project/deletePost/${id}`)
            .then((response) => {
              console.log(response.status);
            })

            .catch((error) => {
              console.log(error.response.status);
            });

          swal("Deleted!", {
            icon: "success",
            button: true,
          }).then(() => {
            location.reload();
          });
        }
      });
    },
  },
};
</script>
