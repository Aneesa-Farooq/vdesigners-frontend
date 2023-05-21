<template>
  <div>
    <ul role="list" class="my-7 mx-3 space-y-2">
      <li class="flex space-x-3">
        <!-- Icon -->
        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
        </svg>
        <span class="text-2xl font-normal leading-tight text-gray-500"
          >Total Amount: <b>{{ $route.params.price }}</b></span
        >
      </li>
      <li class="flex space-x-3">
        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
        </svg>
        <span class="text-2xl font-normal leading-tight text-gray-500"
          >Selected Plan: <b>{{ $route.params.plan }}</b></span
        >
      </li>
      <li class="flex space-x-3">
        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
        </svg>
        <span class="text-2xl font-normal leading-tight text-gray-500"
          >User Name: <b>{{name}}</b></span
        >
      </li>
    </ul>
    <div class="mt-5">
      <!-- stripe -->
      <div ref="card" class="mx-3 p-2.5 rounded-md border-2 border-solid"></div>

      <div id="card-errors" role="alert" class="mx-3 text-error-message text-lg font-semibold"></div>
      <div class="justify-center mx-3">
        <button class="w-full h-8 mb-3 text-white shadow-md decidedBG border mt-5 rounded-md hover:opaciy-70 pb-1" :disabled="disabled" @click="Submit">Pay with Stripe</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import swal from "sweetalert";
import { id } from "date-fns/locale";
import { useRouter, useRoute } from 'vue-router'

export default {
  name: "Checkout",

  name:'',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const Userid=ref('');
    const name=ref('');
    const userType=ref(route.params.type);
    const disabled = ref(false);
    const card = ref(null);
    const stripe = window.Stripe("pk_test_51MBkcnBRretLP9OvhqZg2LfOIC47Ld1uXxHuiFJ7jRz5adpDxqkgKr8v8Fiy1Wq5TVCpNAXF9258HuaE3oLPDiWa00QfqSRK0Y");
    const elements = stripe.elements();

    const style = {
      base: {
        color: "#32325d",
        colorPrimary: "#6366f1",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    const el = elements.create("card", { style: style });
    function displayError(event) {
      const displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    }

    onMounted(() => {
    
      const User = localStorage.getItem("user-info");
      const user1 = JSON.parse(User);
      console.log(userType.value)
      if (userType.value == "admin"){
        name.value=user1.user.adminName;
        console.log(name.value,111111);
      }
      else if (userName.value == "designer"){
       name.value=user1.user.designerName;
       console.log(name.value,22222111);
      }
      else if (this.userType == "brand"){
        name.value=user1.user.brandName;
        console.log(name.value,333331111);
      }
      
      console.log(user1.user._id)
      Userid.value = user1.user._id;
    //  name.value=user1.user.adminName;
      el.mount(card.value);
      card.value = el;
      el.on("change", (event) => {
        displayError(event);
      });
    });
    const Submit = async () => {
      const response = await axios.post("https://vdesigners.herokuapp.com/api/subscription/createPayment", {
        email: "alishbaiftikhar2001@gmail.com",
        priceId: "price_1Mht7sBRretLP9OvbEjwoxDw",
      });
      const { subscriptionId, clientSecret, subscriptionStatus } = response.data;
      console.log(clientSecret);

      disabled.value = true;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: el,
          billing_details: {
            name: "alishba",
          },
        },
      });
      console.log(".....",result);
      console.log(result.paymentIntent.amount);
      if (result.error) {
        disabled.value = false;
        alert(result.error.message);
      } else {
        //    Successful subscription payment
        //   The subscription automatically becomes active upon payment.
        const response = await axios.post("https://vdesigners.herokuapp.com/api/subscription/subscribe", {
          plan: "premium",
          price: result.paymentIntent.amount,
          status: result.paymentIntent.status,
          stripeSubscriptionId: subscriptionId,
          userid: Userid.value,
        });
        if (response.data.newSubscription.status == "succeeded" && result.paymentIntent.status == "succeeded") {
          swal("Transaction Successful", {
            icon: "success",
            button: true,
          }).then(() => {
            router.push({
              name: "ViewPayments",
              params: { pageName: "ViewPayments" },
            });
          });
        }
        console.log(response.data);
      }
    };

    return {
      disabled,
      card,
      Submit,
      name
    };
  },
};
</script>
