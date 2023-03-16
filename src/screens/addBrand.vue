<template>
  <body class="bg-background p-4">
    <form @submit="submitForm" class="w-full flex flex-col items-center">
      <div class="flex w-full gap-6">
        <div class="flex flex-col flex-[1]">
          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Brand Name </label>
          <InputField type="text" id="name" place_holder="Enter Brand Name" class="my-2" v-model="formValues.brandName" />
          <p id="eName" class="invalid hidden m-2">only upper and lowercase letters</p>

          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Email </label>
          <InputField type="text" id="email" place_holder="Enter Email" class="my-2" v-model="formValues.email" />
          <p id="eEmail" class="invalid hidden m-2">follow format abc@gmail.com</p>

          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Contact </label>
          <InputField type="text" id="contact" place_holder="Enter contact number" class="my-2" v-model="formValues.contact" />
          <p id="eContact" class="invalid hidden m-2">11 digit contact number</p>

          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Location </label>
          <InputField type="text" place_holder="Enter Location" class="my-2" v-model="formValues.location" />

          <input class="my-[22px] w-full self-start block bg-pink border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s]" type="submit" value="Add" />
        </div>

        <div class="flex flex-col flex-[1]">

          <PassField id="psw" place_holder="Enter Password" class="my-2" v-model="formValues.password" />
          
          <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Profile Picture </label>
          <div class="flex my-2 items-center justify-between">
            <button @click="newPost" class="bg-white h-[180px] w-[200px] overflow-hidden rounded-xl flex justify-center items-center">
              <img class="h-auto w-auto" src="/img/uploadProfile.png" alt="" />
            </button>
            <div class="flex flex-col gap-6">
              <button class="block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-80 transition duration-[0.5s]">Remove</button>
              <button class="block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-80 transition duration-[0.5s]">upload</button>
            </div>
          </div>
          <router-link to="/user/Dashboard/dbAdmin" class="my-[22px] w-full text-center self-start block bg-gray-200 border-none text-Pink font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s]">Back</router-link>
        </div>
      </div>
    </form>
  </body>
</template>

<script>
import InputField from "../components/inputField.vue";
import Sidebar from "../components/sideBar.vue";
import { Icon } from "@iconify/vue";
import PassField from "../components/passField.vue";

export default {
  name: "AddBrand",
  components: {
    InputField,
    Sidebar,
    Icon,
    PassField,
  },
  data() {
    return {
      formValues: {
        brandName: "",
        email: "",
        contact: "",
        location: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log(this.formValues);
    },
    togglePass() {
      var x = document.getElementById("psw");
      var y = document.getElementById("eye");
      var z = document.getElementById("eye-slash");
      if (x.type === "password") {
        x.type = "text";
        y.classList.remove("hidden");
        z.classList.add("hidden");
      } else {
        x.type = "password";
        y.classList.add("hidden");
        z.classList.remove("hidden");
      }
    },
    newPost() {
      document.getElementById("file").click();
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
          });

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              Swal.fire({
                title: "Your uploaded picture",
                imageUrl: e.target.result,
                imageAlt: "The uploaded picture",
              });
              console.log(e.target.result);
            };
            reader.readAsDataURL(file);

            const user = localStorage.getItem("user-info");
            console.log(user);
            const id = JSON.parse(user)._id;
            console.log(id);
            const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/admin/updateProfile/${id}`, {
              adminImg: file,
            });
            console.log(111112222233333, someRes);
            if (someRes.status == "200") {
              swal("Updated!", {
                icon: "success",
                button: true,
              }).then(() => {
                this.$emit("close");
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
  },
};
</script>
