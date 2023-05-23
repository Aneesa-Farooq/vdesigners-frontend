<template>
  <div class="bg-background px-[48px] justify-center">
    <div class="flex flex-col justify-center items-center">
      <div class="w-2/4">
        <button @click="toggleModal" class="bg-[#E3F4F7] h-60 w-full overflow-hidden rounded-xl border border-dashed border-[#799be6] flex flex-col gap-4 justify-center items-center py-4">
          <div :class="`${isUrls ? 'hidden' : ''}`">
            <img class="h-36 w-auto rounded-lg" src="/img/uploadImage.png" alt="" />
            <p class="text-[#526faf]">Upload your image here</p>
          </div>
          <div class="overflow-scroll flex gap-2" :class="`${isUrls ? '' : 'hidden'}`">
            <img v-for="(url, index) in urls" :key="index" class="h-36 w-auto rounded-lg" :src="url" alt="" />
          </div>
        </button>
        <p class="text-red text-base font-normal self-start">{{ imageMesg }} &emsp;</p>

        <div class="flex items-end gap-4">
          <label class="block font-poppins tracking-[1px] text-lg font-bold text-gray-700 mt-4 mb-2"> Name </label>
          <p class="text-red text-base font-normal self-start mt-4 mb-2">{{ nameMesg }}</p>
        </div>
        <InputField type="text" id="name" place_holder="Enter post Name" v-model="patternName" class="w-full my-2" />

        <div class="flex items-end gap-4">
          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Category</label>
          <p class="text-red text-base font-normal self-start my-2">{{ catMesg }}</p>
        </div>
        <InputField type="text" id="category" place_holder="Enter post category" v-model="category" class="w-full my-2" />

        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Description </label>
        <InputField type="text" id="name" place_holder="Add description" v-model="description" class="w-full my-2" />

        <button @click="postImage" class="my-[22px] w-full self-center block decidedBG border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s]">Post</button>
      </div>
    </div>
  </div>
  <ViewDetail @close="toggleModal" :modalActive="modalActive">
    <div class="flex w-full max-w-[800px] bg-white rounded-[15px] h-full items-center justify-center gap-[100px]">
      <button @click="newPost" class="flex flex-col justify-center items-center">
        <img class="h-20 w-auto rounded-lg" src="/img/PC-icon.png" alt="" />
        <p>Device</p>
      </button>
      <button @click="setFalse" class="flex flex-col justify-center items-center">
        <img class="h-20 w-auto rounded-lg" src="/img/gallery.png" alt="" />
        <p>Gallery</p>
      </button>
    </div>
  </ViewDetail>

  <ViewDetail @close="toggleModal1" :modalActive="modalActive1">
    <div class="grid h-[calc(100vh-200px)] w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 overflow-y-auto">
      <div @click="toggleSelected(post)" class="image-container max-h-[250px] bg-yellow-400 relative z-0" v-for="(post, index) in GalleryData" :key="index">
        <img class="img-fluid" :src="post.image" alt="" />
        <div :class="`${post.selected ? '' : 'hidden'}`" class="h-full w-full top-0 right-0 left-0 bottom-0 absolute bg-black opacity-50 flex justify-center items-center">
          <Icon class="text-2xl text-white" icon="mdi:tick-circle" />
        </div>
      </div>
    </div>
    <button @click="checkURL" class="my-[22px] w-full self-center block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s]">Done</button>
  </ViewDetail>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import swal from "sweetalert";
import ViewDetail from "../components/viewDetail.vue";
import InputField from "../components/inputField.vue";
import { ref as vueRef } from "vue";
import mongoose from "mongoose";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../firebase";
import { Icon } from "@iconify/vue";
import { io } from "socket.io-client";
let socket = io("http://localhost:5171");

export default {
  name: "CreatePost",
  components: {
    InputField,
    ViewDetail,
    Icon,
  },
  data() {
    return {
      isUrls: false,
      selected: false,
      urls: [],
      patternName: "",
      description: "",
      category: "",
      GalleryData: {},
      designerId: "",
      imageMesg: "",
      nameMesg: "",
      catMesg: "",
    };
  },
  watch: {
    patternName: function (val) {
      if (val.length == 0) {
        this.nameMesg = "Please enter pattern name";
      } else {
        this.nameMesg = "";
      }
    },
    category: function (val) {
      if (val.length == 0) {
        this.catMesg = "Please enter category";
      } else {
        this.catMesg = "";
      }
    },
    urls: {
      handler(val, oldVal) {
        if (val.length == 0) {
          this.imageMesg = "Please select image";
        } else {
          this.imageMesg = "";
        }
      },
      deep: true,
    },
  },

  setup() {
    const modalActive = vueRef(false);
    const modalActive1 = vueRef(false);
    console.log("hello");
    console.log(modalActive);
    const toggleModal = () => {
      console.log("hello");
      console.log(modalActive);
      modalActive.value = !modalActive.value;
    };

    const toggleModal1 = () => {
      modalActive1.value = !modalActive1.value;
    };
    return { modalActive, toggleModal, modalActive1, toggleModal1 };
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    console.log(user);
    this.designerId = JSON.parse(user).user._id;
    console.log(this.designerId);
    this.getGallery();
  },

  methods: {
    setFalse() {
      this.urls = [];
      this.GalleryData = this.GalleryData.map((item) => ({
        ...item,
        selected: false, // Add this line
      }));
      this.GalleryData = this.GalleryData.filter((item) => !item.image[0].includes("replicate.delivery"));
      this.toggleModal();
      this.toggleModal1();
    },

    toggleSelected(post) {
      if (post.selected === false) {
        this.urls.push(post.image[0]);
        console.log("added");
        console.log(this.urls);
      } else {
        this.urls = this.urls.filter((url) => url !== post.image[0]);
        console.log("removed");
        console.log(this.urls);
      }
      post.selected = !post.selected;
    },

    checkURL() {
      if (this.urls.length > 0) {
        this.isUrls = true;
        this.toggleModal1();
      } else {
        this.isUrls = false;
        this.toggleModal1();
      }
    },

    getGallery() {
      axios
        .get(`http://localhost:5172/api/project/getProjects`)
        .then((response) => {
          this.GalleryData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newPost() {
      (async () => {
        try {
          const { value: files } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
              accept: "image/*",
              multiple: "multiple",
              "aria-label": "Upload picture",
            },
          });
          if (files) {
            console.log(files);
            this.uploadMultipleImage(files);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },

    postImage() {
      if (this.urls.length > 0 && this.designerId != "" && this.category != "" && this.patternName != "") {
        const someRes = axios.post(`http://localhost:5172/api/pattern/`, {
          image: this.urls,
          designerId: this.designerId,
          category: this.category,
          description: this.description,
          patternName: this.patternName,
        });
        console.log(someRes);
        if (someRes) {
          socket.emit("new post", { message: "new post added", dateTime: new Date(), userId: this.designerId });
          swal("Uploaded Successfully!", {
            icon: "success",
            button: true,
          }).then(() => {
            this.$emit("close");
            this.$router.push({ name: "ViewPosts", params: { pageName: "Posts" } });
          });
        }
      }
      if (this.urls.length == 0) {
        this.imageMesg = "Please select image";
      } else {
        this.imageMesg = "";
      }
      if (this.category == "") {
        this.catMesg = "Please enter category";
      }
      if (this.patternName == "") {
        this.nameMesg = "Please enter pattern name";
      }
    },
    async uploadMultipleImage(files) {
      this.urls = await Promise.all(
        Array.from(files).map(async (files) => {
          const url = this.uploadImage(files);
          return url;
        })
      );
      this.isUrls = true;
      console.log("urls");
      console.log(this.urls[0]);
    },
    async uploadImage(file) {
      try {
        if (file == null) {
          return null;
        }

        if (typeof file === "string") {
          return file;
        }

        const storageRef = ref(storage, `images/${file.name}`);
        console.log("storageRef", storageRef);
        const snapshot = await uploadBytes(storageRef, file);
        const val = await getDownloadURL(snapshot.ref);
        return val;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
