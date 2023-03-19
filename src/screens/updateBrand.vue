<template>
  <h5 class="mb-3 text-center font-bold text-3xl text-Green">Update {{ formValues.brandName }}'s details</h5>
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

        <router-link to="/user/Brands/viewBrands" class="mt-[42px] w-full text-center self-start block bg-white border border-Green text-Green font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s] hover:text-white hover:bg-Green">Back</router-link>
      </div>

      <div class="flex flex-col flex-[1]">
        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Password </label>
        <p class="w-full flex relative items-center">
          <InputField type="Password" id="psw" name="psw" place_holder="Enter Password" class="my-2 w-full" v-model="formValues.password" />
          <button type="button" @click="togglePass('psw')" class="absolute right-[20px] hidden"><Icon class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-outline" /></button>
          <button type="button" @click="togglePass('psw')" class="absolute right-[20px]"><Icon class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-off-outline" /></button>
        </p>

        <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
          <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
          <p id="number" class="invalid">A <b>number</b></p>
          <p id="length" class="invalid">Minimum <b>8 characters</b></p>
        </div>

        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Confirm Password </label>
        <p class="w-full flex relative items-center">
          <InputField id="confirm-psw" place_holder="Confirm Password" type="Password" class="my-2" v-model="formValues.confirmPassword" />
          <button type="button" @click="togglePass('confirm-psw')" class="absolute right-[20px] hidden"><Icon class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-outline" /></button>
          <button type="button" @click="togglePass('confirm-psw')" class="absolute right-[20px]"><Icon class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-off-outline" /></button>
        </p>
        <p id="eCpsw" class="invalid hidden m-2">Password does not match</p>

        <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Profile Picture </label>
        <div class="flex my-2 items-center justify-between">
          <button type="button" @click="updateProfile" class="bg-white h-[180px] w-[200px] overflow-hidden rounded-xl flex justify-center items-center">
            <img :class="`${isUrl ? 'hidden' : ''}`" class="h-auto w-auto" src="/img/uploadProfile.png" alt="" />
              <img :class="`${isUrl ? '' : 'hidden'}`" class="h-auto w-auto" :src="formValues.url" alt="" />
          </button>
          <div class="flex flex-col gap-6">
            <button type="button" @click="toggleURL" class="block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-70 transition duration-[0.5s]">Remove</button>
            <button type="button" @click="updateProfile" class="block bg-Green border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-70 transition duration-[0.5s]">upload</button>
          </div>
        </div>
        <input class="my-[22px] w-full self-start block bg-Green border-none text-white font-[700] text-lg cursor-pointer hover:opacity-70 rounded-[7px] px-10 py-[10px] transition duration-[0.5s]" type="submit" value="Add" />
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import InputField from "../components/inputField.vue";
import SelectField from "../components/inputField.vue";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import swal from "sweetalert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  name: "UpdateBrand",
  components: {
    InputField,
    SelectField,
  },
  data() {
    return {
      isUrl: true,
      formValues: {
        id: "",
        username: "",
        password: "",
        email: "",
        location: "",
        brandName: "",
        confirmPassword: "",
        contact: "",
        plan: "",
        url: "",
      },
    };
  },

  methods: {
    togglePass() {
      var x = document.getElementById("psw");
      if (x.type === "password") {
        document.getElementById("eye").style.display = "block";
        document.getElementById("eye-slash").style.display = "none";
        x.type = "text";
      } else {
        document.getElementById("eye-slash").style.display = "block";
        document.getElementById("eye").style.display = "none";
        x.type = "password";
      }
    },
    submitForm(e) {
      e.preventDefault();
      (async () => {
        try {
          const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/brands/updatebrand/${this.formValues.id}`, {
            brandName: this.formValues.brandName,
            brandEmail: this.formValues.email,
            brandContactnumber: this.formValues.contact,
            brandAddress: this.formValues.location,
            subscriptionplan: this.formValues.plan,
            password: this.formValues.password,
            brandImg: this.formValues.url,
          });

          if (someRes.statusText == "OK") {
            swal("Updated Successfully", {
              icon: "success",
              button: true,
            }).then(() => {
              this.$router.push({ name: "ViewBrands" });
            });
          } else {
            swal({
              title: `${someRes.data.msg}`,
              icon: "error",
              button: true,
            });
          }
        } catch (e) {
          swal({
            title: `${e.response.data.mesg}`,
            text: "Please Fill all Fields",
            icon: "error",
            button: true,
          });
        }
      })();
    },

    toggleURL() {
      this.isUrl = !this.isUrl;
      this.formValues.url = "";
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
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const val = await getDownloadURL(snapshot.ref);
        this.formValues.url = val;
        this.isUrl = true;
        console.log("hello" + this.formValues.url);
        return val;
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    let brand = JSON.parse(localStorage.getItem("brand-to-update"));
    console.log(brand);
    this.formValues.id = brand._id;
    this.formValues.brandName = brand.brandName;
    this.formValues.email = brand.brandEmail;
    this.formValues.contact = brand.brandContactnumber;
    this.formValues.location = brand.brandAddress;
    this.formValues.plan = brand.subscriptionplan;
    this.formValues.url = brand.brandImg;

    var myName = document.getElementById("name");
    var myEmail = document.getElementById("email");
    var myContact = document.getElementById("contact");
    var eName = document.getElementById("eName");
    var eEmail = document.getElementById("eEmail");
    var eContact = document.getElementById("eContact");
    var password = document.getElementById("psw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var confirm_password = document.getElementById("confirm-psw");
    var errorConfirmPsw = document.getElementById("eCpsw");

    password.onchange = function () {
      if (password.value != confirm_password.value) {
        errorConfirmPsw.classList.remove("valid");
        errorConfirmPsw.classList.add("invalid");
      } else {
        errorConfirmPsw.classList.add("valid");
        errorConfirmPsw.classList.remove("invalid");
      }
    };
    confirm_password.onkeyup = function () {
      if (password.value != confirm_password.value) {
        errorConfirmPsw.classList.remove("valid");
        errorConfirmPsw.classList.add("invalid");
      } else {
        errorConfirmPsw.classList.add("valid");
        errorConfirmPsw.classList.remove("invalid");
      }
    };

    confirm_password.onfocus = function () {
      document.getElementById("eCpsw").style.display = "block";
    };

    // When the user clicks outside of the password field, hide the message box
    confirm_password.onblur = function () {
      document.getElementById("eCpsw").style.display = "none";
    };

    // When the user clicks on the password field, show the message box
    password.onfocus = function () {
      document.getElementById("message").style.display = "block";
    };

    // When the user clicks outside of the password field, hide the message box
    password.onblur = function () {
      document.getElementById("message").style.display = "none";
    };

    // When the user clicks on the name field, show the message box
    myName.onfocus = function () {
      document.getElementById("eName").style.display = "block";
    };

    // When the user clicks outside of the name field, hide the message box
    myName.onblur = function () {
      document.getElementById("eName").style.display = "none";
    };
    // When the user starts to type something inside the name field
    myName.onkeyup = function () {
      // Validate lowercase letters
      var letters = /[a-zA-Z][a-zA-Z ]+/;
      if (myName.value.match(letters)) {
        eName.classList.remove("invalid");
        eName.classList.add("valid");
      } else {
        eName.classList.remove("valid");
        eName.classList.add("invalid");
      }
    };

    // When the user clicks on the contact field, show the message box
    myContact.onfocus = function () {
      document.getElementById("eContact").style.display = "block";
    };

    // When the user clicks outside of the contact field, hide the message box
    myContact.onblur = function () {
      document.getElementById("eContact").style.display = "none";
    };

    // When the user starts to type something inside the contact field
    myContact.onkeyup = function () {
      // Validate lowercase letters
      var phoneNo = /^\d{11}$/;
      if (myContact.value.match(phoneNo)) {
        eContact.classList.remove("invalid");
        eContact.classList.add("valid");
      } else {
        eContact.classList.remove("valid");
        eContact.classList.add("invalid");
      }
    };

    // When the user clicks on the Email field, show the message box
    myEmail.onfocus = function () {
      document.getElementById("eEmail").style.display = "block";
    };

    // When the user clicks outside of the Email field, hide the message box
    myEmail.onblur = function () {
      document.getElementById("eEmail").style.display = "none";
    };

    // When the user starts to type something inside the email field
    myEmail.onkeyup = function () {
      // Validate lowercase letters
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (myEmail.value.match(mailFormat)) {
        eEmail.classList.remove("invalid");
        eEmail.classList.add("valid");
      } else {
        eEmail.classList.remove("valid");
        eEmail.classList.add("invalid");
      }
    };

    // When the user starts to type something inside the password field
    password.onkeyup = function () {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (password.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (password.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (password.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }

      // Validate length
      if (password.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
    };
  },
};
</script>
