<template>
  <div class="bg-background">
    <div class="flex flex-col" v-for="(post, index) in postData" :key="index">
      <div class="flex flex-col lg:flex-row lg:gap-6 w-full p-5 bg-white rounded-md mb-3">
        <div class="h-[150px] w-full lg:w-[190px] overflow-hidden bg-lightgrey rounded-md relative flex items-center justify-center mb-2">
          <img class="img-fluid absolute" :src="post.image" alt="" />
        </div>
        <div class="self-center">
          <div class="flex items-center gap-2 lg:gap-5 mb-2">
            <div class="bg-white h-6 w-6 lg:h-10 lg:w-10 overflow-hidden rounded-full">
              <img class="h-auto w-auto" src="/img/profile.jpg" alt="" />
            </div>
            <p class="flex items-center text-base lg:text-lg font-medium text-green-600">{{ post.designerId }}</p>
            <p :class="`${post.status == 'pending' ? 'blink_me' : 'bg-Green'}`" class="flex bg-yellow-300 items-center justify-center text-[10px] lg:text-xs tracking-wide font-medium text-white p-1 lg:px-3 text-center rounded-xl w-fit h-fit">{{ post.status }}</p>
          </div>
          <p class="text-base font-semibold text-[#616161] mb-2">{{ post.patternName }}</p>
          <p class="text-xs tracking-wide text-navIcons mb-2">{{ post.description }}</p>
          <p class="inline-block decidedBG text-xs text-white py-1 px-3 text-center rounded-xl w-fit mb-2">{{ post.category }}</p>
        </div>
        <div class="flex ml-auto self-center mr-2 gap-4">
          <button class="bg-lightgrey text-black px-8 py-2 rounded-md">Delete</button>
          <router-link to="/user/Post Detail/{{userType}}/viewPost/{{ post._id }}">
            <button class="decidedBG text-white px-8 py-2 rounded-md">View Post</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { Icon } from "@iconify/vue";

export default {
  name: "ViewPosts",
  components: {
    Icon,
  },

  data() {
    return {
      postData: {},
      userType: "",
    };
  },

  mounted() {
    this.userType = this.$route.params.type;
    this.getData();
  },

  methods: {
    getData() {
      axios
        .get("https://vdesigners.herokuapp.com/api/pattern/getPosts")
        .then((response) => {
          // console.log(response.data);
          this.postData = response.data;
          console.log("Data is printed");
          console.log(this.postData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteBrand(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://localhost:5172/api/admin/deleteBrand/${id}`)
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

<style>
.swal-button--confirm {
  padding: 13px 35px;
  border-radius: 5px;
  background-color: #f3677f;
  font-size: 12px;
  border: 1px solid #f3677f;
  text-shadow: 0px -1px 0px rgba(243, 55, 86, 0.25);
}

.swal-button--confirm:hover {
  background-color: rgb(243, 55, 86) !important;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
