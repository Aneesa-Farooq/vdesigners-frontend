<template>
  <div class="bg-background p-4">
    <form @submit="submitForm" class="w-full flex flex-col items-center">
      <div class="flex flex-col w-full">
        <div class="flex flex-col md:flex-row w-full gap-6">
          <div class="flex flex-col flex-[1]">
            <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Designer Name </label>
            <InputField type="text" id="name" place_holder="Enter Designer Name" class="my-2" v-model="formValues.designerName" />
            <p id="eName" class="invalid hidden m-2">only upper and lowercase letters</p>

            <div v-if="userType == 'admin'">
              <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Brand </label>
              <select v-model="formValues.brandId" class="my-2 w-full h-[50px] p-4 rounded-[7px] font-poppins outline-none text-base tracking-[0.5px] bg-lightgrey border border-borderColor hover:bg-white hover:border-borderColor hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-border-color-focus focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:bg-white">
                <option value="">Select Brand</option>
                <option v-for="(option, index) in options" :key="index" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>

            <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Email </label>
            <InputField type="text" id="email" place_holder="Enter Email" class="my-2"  @Click="clearInput('email')" v-model="formValues.email" />
            <p id="eEmail" class="invalid hidden m-2">follow format abc@gmail.com</p>

            <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Contact </label>
            <InputField type="text" id="contact" place_holder="Enter contact number" class="my-2" v-model="formValues.contact" />
            <p id="eContact" class="invalid hidden m-2">11 digit contact number</p>

            <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Location </label>
            <InputField type="text" place_holder="Enter Location" class="my-2" v-model="formValues.location" />
          </div>
          <div class="flex flex-col flex-[1]">
            <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Password </label>
            <p class="w-full flex relative items-center">
              <InputField type="Password" id="psw" name="psw" place_holder="Enter Password"  @Click="clearInput('password')" class="my-2 w-full" v-model="formValues.password" />
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
            <div class="flex my-2 gap-4 items-center justify-between">
              <button type="button" @click="updateProfile" class="bg-white h-[180px] w-[200px] overflow-hidden rounded-xl flex justify-center items-center">
                <img :class="`${isUrl ? 'hidden' : ''}`" class="h-auto w-auto" src="/img/uploadProfile.png" alt="" />
                <img :class="`${isUrl ? '' : 'hidden'}`" class="h-auto w-auto" :src="formValues.url" alt="" />
              </button>
              <div class="flex flex-col gap-6">
                <button type="button" @click="toggleURL" class="block decidedBG border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-70 transition duration-[0.5s]">Remove</button>
                <button type="button" @click="updateProfile" class="block decidedBG border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] hover:opacity-70 transition duration-[0.5s]">upload</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row w-full gap-6">
          <router-link to="/user/Dashboard/admin/dbAdmin" class="my-[22px] w-full text-center self-start block bg-white border border-Green text-Green font-[700] text-lg cursor-pointer rounded-[7px] px-10 py-[10px] transition duration-[0.5s] hover:text-white hover:bg-Green">Back</router-link>
          <input class="my-[22px] w-full self-start block decidedBG border-none text-white font-[700] text-lg cursor-pointer hover:opacity-70 rounded-[7px] px-10 py-[10px] transition duration-[0.5s]" type="submit" value="Add" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from "../components/inputField.vue";
import { Icon } from "@iconify/vue";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "AddDesigner",
  components: {
    InputField,
    Icon,
  },
  data() {
    return {
      isUrl: false,
      formValues: {
        designerName: "",
        email: "",
        contact: "",
        location: "",
        password: "",
        confirmPassword: "",
        url: "",
        brandId: "",
      },
      options: [],
      userType: "",
    };
  },

  mounted() {
    this.userType = this.$route.params.type;
    console.log(this.userType);
    if (this.userType == "admin") {
      this.getBrands();
    } else {
      const User = localStorage.getItem("user-info");
      const user1 = JSON.parse(User);
      this.formValues.brandId = user1.user._id;
    }

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
    console.log("FormValues");
    console.log(this.formValues);
    console.log(this.formValues.email);
  },

  methods: {
    clearInput(inputField) {
     this.formValues[inputField] = "";
    }, 
    getBrands() {
      axios
        .get("https://vdesigners.herokuapp.com/api/admin/getAllbrands")
        .then((response) => {
          console.log(response.data);
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            this.options.push({
              value: data[i]._id,
              text: data[i].brandName,
            });
          }
          console.log(111, this.options);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm(e) {
      e.preventDefault();
      (async () => {
        try {
          let isEmpty = Object.values(this.formValues).some((el) => el == "");
          if (isEmpty) {
            swal({
              title: "All Fields are required",
              icon: "error",
              button: true,
            });
          } else {
            const someRes = await axios.post("https://vdesigners.herokuapp.com/api/designers/", {
              designerName: this.formValues.designerName,
              designerEmail: this.formValues.email,
              designerContactnumber: this.formValues.contact,
              designerAddress: this.formValues.location,
              password: this.formValues.password,
              brandId: this.formValues.brandId,
            });
            console.log(someRes);

            if (someRes.statusText == "Created") {
              const id = someRes.data._id;
              console.log(id);
              const someRes1 = await axios.put(`https://vdesigners.herokuapp.com/api/designers/updateProfile/${id}`, {
                designerImg: this.formValues.url,
              });

              if (someRes1.status == "200") {
                swal("Successfully Registered", {
                  icon: "success",
                  button: true,
                }).then(() => {
                  this.$router.push({ name: "ViewDesigners", params: { pageName: "Designers" } });
                });
              } else {
                swal({
                  title: "profile not updated!",
                  icon: "error",
                  button: true,
                });
              }
            } else if (someRes.data.msg == "User Already Exists") {
              swal({
                title: `${someRes.data.msg}`,
                icon: "error",
                button: true,
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },

    toggleURL() {
      this.isUrl = !this.isUrl;
      this.formValues.url = "";
    },

    togglePass(id) {
      var x = document.getElementById(id);
      if (x.type === "password") {
        x.parentElement.children[1].style.display = "block";
        x.parentElement.children[2].style.display = "none";
        x.type = "text";
      } else {
        x.parentElement.children[1].style.display = "none";
        x.parentElement.children[2].style.display = "block";
        x.type = "password";
      }
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
};
</script>
