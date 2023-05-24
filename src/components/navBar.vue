<template>
  <div class="py-4 mb-4 flex items-center justify-between">
    <p class="self-start block font-poppins font-bold text-3xl text-lightBlack ml-12">{{ title }}</p>
    <div class="flex items-center gap-4">
      <!-- <ion-icon class="text-2xl rounded-full p-1 text-[#FFB62E] hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)]" name="moon-outline"></ion-icon> -->
      <button @click="updateProfile" class="flex items-center justify-center h-[34px] w-[34px] relative overflow-hidden rounded-full hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1">
        <img v-if="image==null || image==''" src="/img/profile.jpg" alt="" class="absolute top-0 right-0 h-auto w-full" />
        <img v-else :src="image" alt="" class="absolute top-0 right-0 h-auto w-full" />
      </button>
      <div class="relative">
        <ion-icon class="text-2xl rounded-full text-navIcons hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1" name="notifications-outline" @click="toggleDropdown"></ion-icon>
        <div v-show="isDropdownVisible" class="absolute right-0 bg-white shadow-lg rounded mt-2 w-64 z-[100]">
          <div v-for="(notification, index) in notifications" :key="index" class="border-b border-gray-100 px-4 py-2">
            {{ notification }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import swal from "sweetalert";
import { getDownloadURL, ref as firebaseRef, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { ref as vueRef, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

export default {
  name: "NavBar",
  props: ["title"],
  data() {
    return {
      url: "",
      image: "",
      isDropdownVisible: false,
      userType: "",
    };
  },
  mounted() {
    const User = localStorage.getItem("user-info");
    console.log("user",User);
    const user1 = JSON.parse(User);
    console.log("user1",User);
    this.userType = this.$route.params.type;
    if (this.userType == "admin") {
      this.image = user1.user.adminImg;
    }
    else if (this.userType == "brand") {
      const isSocialLogin=localStorage.getItem("isSocialLogin");
      console.log(isSocialLogin);
      if(isSocialLogin){
        this.image = user1.picture;
        console.log(this.image);
      }
      else{
        this.image = user1.user.brandImg;
      }
    }
    else{
        this.image = user1.user.designerImg;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
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
        const storageRef = firebaseRef(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const val = await getDownloadURL(snapshot.ref);
        this.url = val;
        console.log("hello" + this.url);

        if (this.url) {
          const user = localStorage.getItem("user-info");
          const id = JSON.parse(user)._id;
          console.log(id)
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
  setup() {
    const notifications = vueRef([]);

    let socket;

    onMounted(() => {
      // Connect to your server-side websocket
      socket = io("http://localhost:5171");

      // Listen for the 'notification' event from the server
      socket.on("notification", (newNotification) => {
        // Prepend the new notification to our list
        notifications.value.unshift(newNotification.message);
      });
    });

    onUnmounted(() => {
      // Disconnect when the component unmounts
      if (socket) {
        socket.disconnect();
      }
    });

    return {
      notifications,
    };
  },
};
</script>
