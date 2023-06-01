<template>
  <div class="bg-background flex flex-col justify-center">
    <!-- <img v-if="postData == ''" class="flex self-center" src="/img/loading.gif" alt="" /> -->
    <p v-if="postData == ''" class="flex self-center my-20 font-bold text-2xl">No Posts Found</p>
    <div v-else class="flex flex-col w-full" v-for="(post, index) in postData" :key="index">
      <div class="flex flex-col lg:flex-row lg:gap-6 w-full p-5 bg-white rounded-md mb-3">
        <div class="h-[150px] w-full lg:w-[190px] overflow-hidden bg-lightgrey rounded-md relative flex items-center justify-center mb-2">
          <img class="img-fluid absolute" :src="post.image" alt="" />
        </div>
        <div class="self-center">
          <div class="flex items-center gap-2 lg:gap-5 mb-2">
            <div class="bg-white h-6 w-6 lg:h-10 lg:w-10 overflow-hidden rounded-full">
              <img class="h-auto w-auto" :src="post.designerId.designerImg" alt="" />
            </div>
            <p class="flex items-center text-base lg:text-lg font-bold text-black">{{ post.designerId.designerName }}</p>
            <p v-if="post.status == 'pending'" class="flex bg-yellow-300 blink_me items-center justify-center text-[10px] lg:text-xs tracking-wide font-medium text-white p-1 lg:px-3 text-center rounded-xl w-fit h-fit">{{ post.status }}</p>
            <p v-if="post.status == 'accepted'" class="flex bg-green-600 items-center justify-center text-[10px] lg:text-xs tracking-wide font-medium text-white p-1 lg:px-3 text-center rounded-xl w-fit h-fit">{{ post.status }}</p>
            <p v-if="post.status == 'rejected'" class="flex bg-[#FA5252] items-center justify-center text-[10px] lg:text-xs tracking-wide font-medium text-white p-1 lg:px-3 text-center rounded-xl w-fit h-fit">{{ post.status }}</p>
          </div>
          <p class="text-base font-semibold text-[#616161] mb-2">{{ post.patternName }}</p>
          <p class="text-xs tracking-wide text-navIcons mb-2">{{ post.description }}</p>
          <p class="inline-block decidedBG text-xs text-white py-1 px-3 text-center rounded-xl w-fit mb-2">{{ post.category }}</p>
        </div>
        <div class="flex ml-auto self-center mr-2 gap-4">
          <button @click="deletePost(post._id)" class="bg-lightgrey text-black px-8 py-2 rounded-md">Delete</button>
          <router-link :to="`/user/Post Detail/${userType}/viewPost/${post._id}`">
            <button class="decidedBG text-white px-8 py-2 rounded-md hover:opacity-70">View Post</button>
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
      loggedinuser: "",
    };
  },

  mounted() {
    const User = localStorage.getItem("user-info");
    const user1 = JSON.parse(User);
    this.userType = this.$route.params.type;
    this.loggedinuser = user1.user._id;
    console.log("Logged in user",this.loggedinuser);

    if (this.userType == "admin") {
      this.getData();
    } else if (this.userType == "designer") {
      this.getOneDesignerPosts();
    } else {
      this.getDesignersForOneBrand();
    }
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

    getOneDesignerPosts() {
      console.log("here");
      axios
        .get(`https://vdesigners.herokuapp.com/api/pattern/getonePosts/?designerId=${this.loggedinuser}`)
        .then((response) => {
          console.log(response.data);
          this.postData = response.data;
          console.log("Data is printed");
          console.log(this.postData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDesignersForOneBrand() {
      axios
        .get(`http://localhost:5172/api/pattern/branddesign/${this.loggedinuser}`)
        .then((response) => {
          // console.log(response.data);
          console.log(response.data);
          let data=response.data[0];
          console.log(data);
            if(data.length == 0){
              this.postData = [];
            }
            else{
              this.postData = data;
            }
          })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`https://vdesigners.herokuapp.com/api/pattern/deletePost/${id}`)
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
