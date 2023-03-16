<template>
  <body class="bg-background px-[48px]">
    <div class="flex flex-col justify-center">
      <div class="w-2/4">
        <button @click="newPost" class="bg-[#E3F4F7] h-60 w-full overflow-hidden rounded-xl border border-dashed border-[#799be6] flex flex-col gap-4 justify-center items-center py-4">
        <div :class="`${isUrls ? 'hidden' : ''}`">
          <img class="h-36 w-auto rounded-lg" src="/img/uploadImage.png" alt="" />
          <p class="text-[#526faf]">Upload your image here</p>
        </div>
        <div class="overflow-scroll flex gap-2" :class="`${isUrls ? '' : 'hidden'}`">
          <img v-for="(url, index) in urls" :key="index" class="h-36 w-auto rounded-lg" :src="url" alt="" />
        </div>
      </button>
        <label class="block font-poppins tracking-[1px] text-lg font-bold text-gray-700 mt-4 mb-2"> Name </label>
        <InputField type="text" id="name" place_holder="Enter post Name" v-model="patternName" class="w-full my-2" />

        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Category</label>
        <InputField type="text" id="category" place_holder="Enter post category" v-model="category" class="w-full my-2" />

        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Description </label>
        <InputField type="text" id="name" place_holder="Add description" v-model="description" class="w-full my-2" />

        <button @click="postImage" class="my-[22px] w-full self-center block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s]">Post</button>
      </div>
    </div>
  </body>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import swal from "sweetalert";
import InputField from "../components/inputField.vue";
import mongoose from "mongoose";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default {
  name: "CreatePost",
  components: {
    InputField,
  },
  data() {
    return {
      isUrls: false,
      urls: [],
      patternName: "",
      description: "",
      category: "",
    };
  },
  methods: {
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
      // const user = localStorage.getItem("user-info");
      // console.log(user);
      // const id = JSON.parse(user)._id;
      const someRes = axios.post(`https://vdesigners.herokuapp.com/api/pattern/`, {
        image: this.urls,
        // designerId: mongoose.Types.ObjectId(),
        designerId: "63ff3d6cf4dc279c6e0edc03",
        category: this.category,
        description: this.description,
        patternName: this.patternName,
      });
      console.log(someRes);
      if (someRes) {
        swal("Uploaded Successfully!", {
          icon: "success",
          button: true,
        }).then(() => {
          this.$emit("close");
          this.$router.push({ name: "ViewPosts" , params: { pageName: 'Posts' } });
        });
      } else {
        swal("Something went wrong!", {
          icon: "error",
          button: true,
        }).then(() => {
          this.$emit("close");
        });
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
