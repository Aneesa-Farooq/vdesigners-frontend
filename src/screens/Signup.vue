<template>
  <div class="block md:flex flex-row">
    <div class="hidden lg:flex items-center justify-center flex-[1] bg-[#F2D184] h-[330px] md:h-screen p-6">
      <img class="h-full w-auto md:w-full md:h-auto max-w-[440px]" src="/img/SignupIllustration.png" alt="" />
    </div>
    <div class="h-screen overflow-auto flex-[1] xl:flex-[2] py-14">
      <div class="flex flex-col p-6 relative items-center justify-center">
        <div class="w-full flex flex-col items-center max-w-[500px]">
          <p class="self-start block font-poppins font-extrabold text-2xl text-grey">Sign Up For Brands</p>
          <br />
          <GoogleLogin class="flex self-start" :callback="callback" />
          <hr class="border-t-[1px] border-solid w-full border-[#e0e0e0] overflow-visible m-12 after:content-['or'] after:relative text-center after:bg-white after:px-[16px] after:top-[-14px]" />

          <form @submit="submitForm" class="w-full flex flex-col items-center max-w-[500px]">
            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Brand Name </label>
            <InputField type="text" id="name" place_holder="Enter Brand Name" class="my-2" v-model="formValues.brandName" />
            <p id="eName" class="invalid hidden m-2">only upper and lowercase letters</p>

            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Email </label>
            <InputField type="text" id="email" place_holder="Enter Email" @Click="clearInput('email')" class="my-2" v-model="formValues.email" />
            <p id="eEmail" class="invalid hidden m-2">follow format abc@gmail.com</p>

            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Contact </label>
            <InputField type="text" id="contact" place_holder="Enter contact number" class="my-2" v-model="formValues.contact" />
            <p id="eContact" class="invalid hidden m-2">11 digit contact number</p>

            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Location </label>
            <InputField type="text" place_holder="Enter Location" class="my-2" v-model="formValues.location" />

            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Password </label>
            <p class="w-full flex relative items-center">
              <InputField type="Password" id="psw" name="psw" place_holder="Enter Password" @Click="clearInput('password')" class="my-2 w-full" v-model="formValues.password" />
              <button class="absolute right-[20px] hidden"><Icon @click="togglePass('psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-outline" /></button>
              <button class="absolute right-[20px]"><Icon @click="togglePass('psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-off-outline" /></button>
            </p>

            <div id="message">
              <h3>Password must contain the following:</h3>
              <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
              <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
              <p id="number" class="invalid">A <b>number</b></p>
              <p id="length" class="invalid">Minimum <b>8 characters</b></p>
            </div>

            <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Confirm Password </label>
            <p class="w-full flex relative items-center">
              <InputField id="confirm-psw" place_holder="Confirm Password" type="Password" class="my-2" v-model="formValues.confirmPassword" />
              <button class="absolute right-[20px] hidden"><Icon @click="togglePass('confirm-psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-outline" /></button>
              <button class="absolute right-[20px]"><Icon @click="togglePass('confirm-psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-off-outline" /></button>
            </p>
            <p id="eCpsw" class="invalid hidden m-2">Password does not match</p>

            <div class="flex flex-col xl:flex-row gap-4 w-full xl:justify-between mt-4 xl:items-end my-[1.6rem]">
              <input class="self-start block bg-[#F33757] border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-8 py-[6px] transition duration-[0.5s] hover:opacity-80" type="submit" value=" Create Account" />
              <div class="flex items-center mt-1 gap-[.8rem] text-base font-normal">
                <p>Already have an account?</p>
                <router-link class="bg-transparent text-[#F33757] border-none cursor-pointer font-medium tracking-[.3px] hover:opacity-70" to="/login"> SignIn </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import InputField from "../components/inputField.vue";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { useRouter, useRoute } from "vue-router";


export default {
  name: "Signup",
  components: {
    InputField,
    Icon,
  },
  data() {
    return {
      formValues: {
        password: "",
        email: "email",
        location: "",
        brandName: "",
        confirmPassword: "",
        contact: "",
      },
    };
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const callback = (response) => {
      console.log("Handle the response", response);
      const repayload = jwt_decode(response.credential);
      console.log(repayload);

      axios
        .get(`https://vdesigners.herokuapp.com/api/brands/checkregister/${repayload.email}`)
        .then((response) => {
          if (response.data.msg == "user doesnot exist") {
            console.log(response.data.msg);

            (async () => {
              const { value: plan } = await Swal.fire({
                title: "Select field validation",
                input: "select",
                inputOptions: {
                  monthly: "Monthly",
                  yearly: "Yearly",
                  premium: "Premium",
                },
                inputPlaceholder: "Select your Susbscription Plan",
                showCancelButton: true,
                inputValidator: (value) => {
                  return new Promise((resolve) => {
                    if (value) {
                      resolve();
                    } else {
                      resolve("You need to select a plan :)");
                    }
                  });
                },
              });

              if (plan) {
                (async () => {
                  try {
                    const someRes = await axios.post("https://vdesigners.herokuapp.com/api/brands/socialLogin", {
                      brandName: repayload.given_name,
                      brandEmail: repayload.email,
                      subscriptionplan: plan,
                      brandImg: repayload.picture,
                    });
                    console.log(someRes);
                    if (someRes.statusText == "Created") {
                      swal("Successfully Registered", {
                        icon: "success",
                        button: true,
                      }).then(() => {
                        location.reload();
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
              }
            })();
          } else {
            localStorage.setItem("user-info", JSON.stringify(repayload));
            localStorage.setItem("isSocialLogin", true);
            console.log("here")
            router.push({ name: "DashboardBrand", params: { pageName: "Dashboard", type: "brand" } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { callback };
  },
  methods: {
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

    clearInput(inputField) {
     this.formValues[inputField] = "";
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
          }

          else {
            const optp = await axios.post("https://vdesigners.herokuapp.com/api/brands/verifyAccount", { brandEmail: this.formValues.email });
            console.log("optp");
            console.log(optp.data.number);

            const { value: ipAddress } = await Swal.fire({
              title: "Enter your optp code",
              input: "text",
              inputLabel: "Enter code",
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return "You need to write something!";
                } else if (value != optp.data.number) {
                  return "Invalid optp code";
                }
              },
            });

            if (ipAddress == optp.data.number) {
              const someRes = await axios.post("https://vdesigners.herokuapp.com/api/brands", {
                brandName: this.formValues.brandName,
                brandEmail: this.formValues.email,
                brandContactnumber: this.formValues.contact,
                brandAddress: this.formValues.location,
                password: this.formValues.password,
              });
              console.log(someRes.statusText);

              if (someRes.statusText == "Created") {
                swal("Successfully Registered", {
                  icon: "success",
                  button: true,
                }).then(() => {
                  this.$router.push({ name: "Login" });
                });
              } else if (someRes.data.msg == "User Already Exists") {
                swal({
                  title: `${someRes.data.msg}`,
                  icon: "error",
                  button: true,
                });
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
  },

  mounted() {
    localStorage.clear();
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
      var letters = /^[A-Za-z]+$/;
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
    console.log("hello");
    console.log(this.formValues);
    console.log(this.formValues.email);
  },
};
</script>

<style>
.swal-button--confirm {
  padding: 7px 19px;
  border-radius: 2px;
  background-color: #f3677f !important;
  font-size: 12px;
  border: 1px solid #f3677f !important;
  text-shadow: 0px -1px 0px rgba(243, 55, 86, 0.25) !important;
}

.swal-button--confirm:hover {
  background-color: rgb(243, 55, 86) !important;
}

/* The message box is shown when the user clicks on the password field */
#message {
  display: none;
  background: #f4f6f9;
  color: #000;
  position: relative;
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

#message p {
  padding: 10px 35px;
  font-size: 18px;
}

/* Add a green text color and a checkmark when the requirements are right */
.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: -15px;
  content: "Valid";
}

/* Add a red text color and an "x" icon when the requirements are wrong */
.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: -15px;
  content: "Invalid";
}
</style>
