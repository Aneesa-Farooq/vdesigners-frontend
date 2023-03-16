<template>
  <label class="self-start block font-poppins tracking-[1px] text-lg font-bold text-gray-700 my-2"> Password </label>
  <label class="self-start block font-poppins tracking-[1px] text-base my-2"> Password </label>
  <p class="w-full flex relative items-center">
    <input class="w-full h-[60px] p-4 rounded-[7px] font-poppins outline-none text-base tracking-[0.5px] bg-lightgrey border border-borderColor hover:bg-white hover:border-borderColor hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-border-color-focus focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:bg-white" v-bind="$attrs" :value="modelValue" :placeholder="place_holder" @input="$emit('update:modelValue', $event.target.value)" />
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
    <input class="w-full h-[60px] p-4 rounded-[7px] font-poppins outline-none text-base tracking-[0.5px] bg-lightgrey border border-borderColor hover:bg-white hover:border-borderColor hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-border-color-focus focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:bg-white" v-bind="$attrs" :value="modelValue1" :placeholder="place_holder" @input="$emit('update:modelValue1', $event.target.value)" />
    <button class="absolute right-[20px] hidden"><Icon @click="togglePass('confirm-psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-outline" /></button>
    <button class="absolute right-[20px]"><Icon @click="togglePass('confirm-psw')" class="w-[20px] h-[22px] text-gray-500" icon="mdi:eye-off-outline" /></button>
  </p>
  <p id="eCpsw" class="invalid hidden m-2">Password does not match</p>
</template>

<script>
import InputField from "../components/inputField.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "PassField",
  components: {
    InputField,
    Icon,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },

    modelValue1: {
      type: [String, Number],
      default: "",
    },

    place_holder: {
      type: String,
      default: "",
    },
  },

  mounted() {
    var password = document.getElementById("psw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var confirm_password = document.getElementById("confirm-psw");
    var errorConfirmPsw = document.getElementById("eCpsw");

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

    password.onchange = function () {
      if (password.value != confirm_password.value) {
        errorConfirmPsw.classList.remove("valid");
        errorConfirmPsw.classList.add("invalid");
      } else {
        errorConfirmPsw.classList.add("valid");
        errorConfirmPsw.classList.remove("invalid");
      }
    };
    // When the user clicks on the password field, show the message box
    password.onfocus = function () {
      document.getElementById("message").style.display = "block";
    };

    // When the user clicks outside of the password field, hide the message box
    password.onblur = function () {
      document.getElementById("message").style.display = "none";
    };

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
  },
};
</script>

<style>
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
