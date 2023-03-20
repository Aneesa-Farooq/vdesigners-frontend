<template>
  <div class="py-4 mb-4 flex items-center justify-between">
    <p class="self-start block font-poppins font-bold text-3xl text-lightBlack ml-12">{{ title }}</p>
    <div class="flex items-center gap-4">
      <!-- <ion-icon class="text-2xl rounded-full p-1 text-[#FFB62E] hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)]" name="moon-outline"></ion-icon> -->
      <button @click="updateProfile" class="flex items-center justify-center h-[34px] w-[34px]">
        <img :src="image" alt="" class="h-full w-full rounded-full hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1" />
      </button>
      <!-- <ion-icon class="text-2xl rounded-full text-navIcons hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1" name="notifications-outline"></ion-icon> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import swal from "sweetalert";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default {
  name: "NavBar",
  props: ["title"],
  data() {
    return {
      url: "",
      image: "",
    };
  },
  // mounted() {
  //   const User = localStorage.getItem("user-info");
  //   const user1 = JSON.parse(User);
  //   this.image = user1.user.adminImg;
  // },
  methods: {
    updateProfile() {
      (async () => {
        try {
          const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
              accept: "image/*",
              "aria-label": "Upload your profile picture",
            },
            inputValidator: (result) => {
              return !result && "Please select an image!";
            },
          });

          if (file) {
            this.uploadImage(file);
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },

    async uploadImage(file) {
      try {
        console.log("innnn");
        if (file == null) {
          return null;
        }
        if (typeof file === "string") {
          return file;
        }
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const val = await getDownloadURL(snapshot.ref);
        this.url = val;
        console.log("hello" + this.url);

        if (this.url) {
          const user = localStorage.getItem("user-info");
          const id = JSON.parse(user)._id;
          const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/admin/updateProfile/${id}`, {
            adminImg: this.url,
          });

          if (someRes.status == "200") {
            swal("Updated!", {
              icon: "success",
              button: true,
            }).then(() => {
              this.$emit("close");
            });
          }
        } else {
          swal("Profile not updated", {
            icon: "error",
            button: true,
          }).then(() => {
            this.$emit("close");
          });
        }
        return val;
      } catch (e) {
        console.log(e);
        swal("Profile not updated, Network Error", {
          icon: "error",
          button: true,
        }).then(() => {
          this.$emit("close");
        });
      }
    },
  },
};
</script>
