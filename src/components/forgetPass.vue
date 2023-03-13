<template>
    <transition name="modal-animation">
      <div v-show="modalActive" class="absolute flex items-center justify-center bg-blackModal top-0 left-0 right-0 bottom-0 z-[98]">
        <transition name="modal-animation-inner">
          <div v-show="modalActive" class="flex flex-col z-[99] w-full max-w-[600px] bg-white rounded-[15px] py-[50px] px-[35px] h-[450px] items-center justify-center mx-4">
            <h1 class="self-start font-poppins font-semibold text-3xl text-[#F33757]">Forgot your Password?</h1>
  
            <p class="text-[#666] mt-5">PLease enter the email address you would like your password reset link sent to</p>
  
            <label class="self-start block font-poppins tracking-[1px] text-base font-medium mt-6 text-[#666]"> Enter email address </label>
            <InputField place_holder="Enter Email" type="text" class="my-2" v-model="formValues.email" />
            <button @click="sendEmail" class="self-start block bg-[#F33757] border-none text-white font-[500] text-lg cursor-pointer rounded-[7px] px-8 py-[7px] mt-4 w-full hover:opacity-80">Send reset link</button>
            <!-- <i @click="close" class="far fa-times-circle"></i> -->
            <!-- Modal Content -->
            <slot />
            <button class="bg-transparent text-[#F33757] border-none cursor-pointer font-medium tracking-[.3px] mt-4 hover:opacity-70" @click="close" type="button">Back to Login</button>
          </div>
        </transition>
      </div>
    </transition>
  </template>
  
  <script>
  import InputField from "./inputField.vue";
  import axios from "axios";
  export default {
    props: ["modalActive"],
    name: "ForgetPass",
    components: {
      InputField,
    },
    data() {
      return {
        formValues: {
          email: "",
        },
      };
    },
    setup(props, { emit }) {
      const close = () => {
        emit("close");
      };
  
      return { close };
    },
    methods: {
      sendEmail() {
        (async () => {
        try {
          const someRes = await axios.post('https://vdesigners.herokuapp.com/api/brands/forget-password',{brandEmail: this.formValues.email});
          console.log(someRes)
          if (someRes.data.success) {
            swal("Check your email", {
              icon: "success",
              button: true,
            }).then(() => {
              this.$emit("close");
            });
          } else {
            swal({
              title: `${someRes.data.msg}`,
              icon: "error",
              button: true,
            });
          }
         } 
        catch (e) {
          console.log(e);
      }
      }
      )();
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }
  
  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  
  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  
  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  
  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }
  
  /* i {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
  }
  i:hover {
    color: crimson;
  } */
  
  /* button {
    padding: 20px 30px;
    border: none;
    font-size: 16px;
    background-color: crimson;
    color: #fff;
    cursor: pointer;
  } */
  </style>
  