<template>
  <div class="block md:flex flex-row">
    <div class="hidden lg:flex items-center justify-center flex-[1] bg-[#F1CDD7] h-[330px] md:h-screen p-6">
      <img class="h-full w-auto md:w-full md:h-auto max-w-[440px]" src="/img/LoginIllustration.png" alt="" />
    </div>
    <div class="flex flex-col flex-[1] xl:flex-[2] h-screen p-6 relative items-center justify-center">
      <div class="w-full flex flex-col items-center max-w-[500px]">
        <p class="self-start block font-poppins font-extrabold text-2xl text-grey">Sign In to V-Designers</p>
        <br />
        <GoogleLogin class="flex self-start" :callback="callback" />
        <hr class="border-t-[1px] border-solid w-full border-[#e0e0e0] overflow-visible m-12 after:content-['or'] after:relative text-center after:bg-white after:px-[16px] after:top-[-14px]" />
        <form @submit="submitForm" class="w-full flex flex-col items-center max-w-[500px]">
          <!-- <label class="self-start block font-poppins tracking-[1px] text-base">Email</label> -->
          <SelectField class="my-2" v-model="formValues.actor" />

          <label class="self-start block font-poppins tracking-[1px] text-base">Email</label>
          <InputField type="text" place_holder="Enter email" class="my-2" v-model="formValues.email" />
          <div class="flex items-center w-full justify-between mt-2">
            <label class="self-start font-poppins tracking-[1px] text-base">Password</label>
            <button class="self-end block font-poppins font-normal text-sm text-[#F33757] hover:opacity-70" type="button" @click="toggleModal">Forgot Password?</button>
          </div>

          <InputField place_holder="Enter Password" type="Password" class="my-2" v-model="formValues.password" />
          <p class="text-red text-base font-normal self-start">{{ formValues.errorMesg }}</p>
          <div class="flex flex-col xl:flex-row gap-2 w-full xl:justify-between mt-2 xl:items-end my-[1.6rem]">
            <input class="self-start block bg-[#F33757] border-none text-white font-[700] text-lg cursor-pointer rounded-[7px] px-8 py-[6px] transition duration-[0.5s] hover:opacity-70" type="submit" value="Sign In" />
            <div class="flex items-center mt-1 gap-[.8rem] text-base font-normal">
              <p>Do not have an account?</p>
              <router-link class="bg-transparent text-[#F33757] border-none cursor-pointer font-medium tracking-[.3px] hover:opacity-70" to="/">Signup</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>

    <ForgetPass @close="toggleModal" :modalActive="modalActive"> </ForgetPass>
  </div>
</template>

<script>
import axios from "axios";
import ForgetPass from "../components/forgetPass.vue";
import InputField from "../components/inputField.vue";
import SelectField from "../components/selectField.vue";
import { ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default {
  name: "Login",
  components: {
    // Button,
    InputField,
    ForgetPass,
    SelectField,
  },
  setup() {
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

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
                        localStorage.setItem("user-info", JSON.stringify(repayload));
                        window.location.href = "/user/Dashboard/dbAdmin";
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
            window.location.href = "/user/Dashboard/dbAdmin";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { modalActive, toggleModal, callback };
  },
  data() {
    return {
      modalActive1: false,

      formValues: {
        email: "",
        password: "",
        errorMesg: "",
        actor: "",
      },
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      (async () => {
        try {
          if (this.formValues.actor == "Admin") {
            const someRes = await axios.post("https://vdesigners.herokuapp.com/api/admin/loginAdmin", {
              adminEmail: this.formValues.email,
              password: this.formValues.password,
            });
            console.log(someRes);
            if (someRes.status == "200") {
              localStorage.setItem("user-info", JSON.stringify(someRes.data));
              this.$router.push({ name: "Admin", params: { pageName: "Dashboard" } });
            }
          }

          else if (this.formValues.actor == "Brand") {
            console.log("brand");
          }

          else if (this.formValues.actor == "Designer") {
            console.log("designer");
          }
          
        } catch (e) {
          console.log(e);
          this.formValues.errorMesg = e.response.data.mesg;
        }
      })();
    },
  },

  // mounted() {
  //   let user = localStorage.getItem("user-info");
  //   if (user) {
  //     this.$router.push({ name: "Admin" , params: { pageName: 'Dashboard' } });
  //   }
  // },
};
</script>

<style>
.swal2-styled.swal2-confirm {
  padding: 10px 32px;
  background-color: #f3677f !important;
}

.swal2-styled.swal2-confirm:focus {
  box-shadow: 0 0 0 3px rgb(243, 55, 86) !important;
}

.swal2-title {
  color: rgb(74, 77, 81) !important;
}
</style>
