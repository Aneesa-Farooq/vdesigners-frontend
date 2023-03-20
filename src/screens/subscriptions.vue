<template>
    <div class="bg-background flex flex-col justify-center items-center">
    <h2
      class="text-center text-xl font-bold tablet:font-bold tablet:text-2xl"
    >
      Choose your Subscription!
    </h2>
    <div class="flex gap-3">
      <router-link to="/user/Checkout/checkout/price_1Mht7sBRretLP9OvbEjwoxDw/Standard Plan/10" class="text-center text-xl font-bold tablet:font-bold tablet:text-2xl">Subscriptions</router-link>
      <!-- Build your card component -->
      <SubsCard
        :title="'Standard Plan'"
        :amount="10"
        :icon1="'2 team members'"
        :icon2="'5gb'"
        @click="standardPlan"
      />
      <SubsCard
        :title="'Premium Plan'"
        :amount="20"
        :icon1="'team members'"
        :icon2="'10gb'"
        @click="premiumPlan"
      />
      <SubsCard
        :title="'Weekly Plan'"
        :amount="20"
        :icon1="'team members'"
        :icon2="'10gb'"
        @click="premiumPlan"
      />
    </div>
  </div>
 
 
</template>
<script>
import SubsCard from "../components/subsCard.vue";
export default {
  name: "Subscriptions",
  components: { SubsCard },
  data() {
    return {
      title: "",
      amount: "10",
      icon1: "",
      icon2: "",
    };
  },
  
  methods: {
    standardPlan() {
      const priceId = "price_1Mhsg9BRretLP9OvwtWcfhWs";
      const price = "10.00";
      const plan = "Basic";
      this.$router.push({
        name: "Checkout",
        params: {priceId, price, plan },
      });
    },

    premiumPlan() {
      const priceId = "price_1Mht7sBRretLP9OvbEjwoxDw";
      const price = "20.00";
      const plan = "Premium";
      this.$router.push({
        name: "Checkout",
        params: { priceId, price, plan },
      });
    },

    standardPlan() {
      const priceId = "price_1Mhsg9BRretLP9OvwtWcfhWs";
      const price = "10.00";
      const plan = "Basic";
      this.$router.push({
        name: "Checkout",
        params: { priceId, price, plan },
      });
    },
  },
};
</script>
