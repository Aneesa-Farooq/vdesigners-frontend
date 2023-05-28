<template>
  <div class="bg-background flex flex-col justify-center items-center">
  <h2
    class="text-center text-xl font-bold md:font-bold md:text-2xl mb-8"
  >
    Choose your Subscription!
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Build your card component -->
    <SubsCard
      :title="'Standard Plan'"
      :amount="10"
      :icon1="'100 design patterns with simple Editor'"
      :icon2="'AR+3D view unlimited'"
      :time="'month'"
      @click="standardPlan"
    />
    <SubsCard
      :title="'Premium Plan'"
      :amount="20"
      :icon1="'unlimited Design Pattern with privideged editor tools'"
      :icon2="'AR+3D view unlimited'"
      :time="'year'"
      @click="premiumPlan"
    />
    <SubsCard
      :title="'Weekly Plan'"
      :amount="5"
      :icon1="'60 design patterns with simple Editor'"
      :icon2="'AR+3D view unlimited'"
      :time="'week'"
      @click="weeklyPlan"
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
    time:"",
    userType: "",
  };
},
mounted() {
  this.userType = this.$route.params.type;
  console.log(this.userType);
},

methods: {
  weeklyPlan() {
    const priceId = "price_1Mhsg9BRretLP9OvwtWcfhWs";
    const price = "5.00";
    const plan = "Basic";
    this.$router.push(`/user/Checkout/${this.userType}/checkout/${priceId}/${price}/${plan}`);
  },

  premiumPlan() {
    const priceId = "price_1Mht7sBRretLP9OvbEjwoxDw";
    const price = "30.00";
    const plan = "Premium";
    this.$router.push(`/user/Checkout/${this.userType}/checkout/${priceId}/${price}/${plan}`);
  },

  standardPlan() {
    const priceId = "price_1Mhsg9BRretLP9OvwtWcfhWs";
    const price = "10.00";
    const plan = "Standard";
    this.$router.push(`/user/Checkout/${this.userType}/checkout/${priceId}/${price}/${plan}`);
  },
},
};
</script>
