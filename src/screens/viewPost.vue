<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex gap-10 mb-10">
      <div class="flex flex-[1] carousel__item">
        <Carousel itemsToScroll="1" itemsToShow="1" :breakpoints="breakpoints" snapAlign="center">
          <Slide v-for="slide in postData.image" :key="slide">
            <img class="carousel__item" :src="slide" />
          </Slide>

          <template #addons>
            <Pagination />
            <Navigation />
          </template>
        </Carousel>
      </div>

      <!-- <img class="img-fluid flex-[1] rounded-lg" :src="postData.image" alt="" /> -->
      <div class="flex flex-col flex-[1]">
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-8">
            <div class="bg-white h-10 w-10 overflow-hidden rounded-full">
              <img class="h-auto w-auto" :src="postData.designerId.designerImg" alt="" />
            </div>
            <p class="flex items-center text-xl font-bold text-black">{{ postData.designerId.designerName }}</p>
            <!-- <p :class="`${post.status == 'pending' ? 'blink_me' : 'bg-Green'}`" class="flex bg-yellow-300 items-center justify-center text-[10px] lg:text-xs tracking-wide font-medium text-white p-1 lg:px-3 text-center rounded-xl w-fit h-fit">status</p> -->
          </div>

          <h1 class="text-gray-700 text-2xl font-bold mb-2 tracking-normal">{{ $filters.capitalizeWords(postData.patternName) }}</h1>
          <p class="text-gray-500 mb-8 tracking-wide">{{ $filters.formatDate(postData.createdAt, "MMM dd, yyyy, hh:mm:ss a") }}</p>
          <p class="text-gray-700 text-lg">{{ postData.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button :class="`${postData.status == 'pending' ? '' : 'hidden'}`" class="flex items-center p-2 justify-center h-[35px] bg-green-600 text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(postData, 'accept')"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Accepted</button>
          <button :class="`${postData.status == 'pending' ? '' : 'hidden'}`" class="flex items-center p-2 justify-center w-[105px] h-[35px] bg-[#FA5252] text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(postData, 'reject')"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Rejected</button>
        </div>
        <div>
          <p class="text-gray-700 text-2xl font-semibold mb-3 tracking-normal">Comments</p>
          <div v-if="Object.keys(postData).includes('comments')">
            <div class="bg-gray-100 p-4 rounded-lg">
              {{ postData.comments }}
            </div>
          </div>
          <div v-else>No comments to show.</div>

          <form @submit.prevent="addComment" class="mt-6">
            <label for="comment" class="block mb-2">Add a comment:</label>
            <textarea id="comment" v-model="newComment" class="w-full p-2 border border-gray-300 rounded-lg mb-4" rows="4" placeholder="Write your comment here..."></textarea>
            <button type="submit" class="decidedBG text-white px-4 py-2 rounded-lg" @click="addComment">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "ViewPost",
  components: {
    Icon,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  data() {
    return {
      postData: {
        patternName: "Text",
        createdAt: "2023-03-21T07:19:15.146Z",
        designerId: {
          designerImg: "https://i.pravatar.cc/150?img=3",
          designerName: "Text",
        },
      },
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
      newComment: "",
    };
  },

  mounted() {
    console.log(this.$route.params.id);
    axios
      .get(`http://localhost:5172/api/pattern/postid/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.postData = response.data;
        console.log(this.$route.params.id);
        console.log("post image --- ", this.postData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addComment() {
      console.log(this.newComment);
      axios
        .put(`http://localhost:5172/api/pattern/AddcommentStatus/${this.$route.params.id}`, { comments: this.newComment })
        .then((response) => {
          console.log(response.data);
          this.postData.comments = this.newComment;
          document.querySelector("#comment").value = "";
          // handle successful response
        })
        .catch((error) => {
          console.error(error);
          // handle error
        });
    },
  },
};
</script>
<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: white;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 0 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
