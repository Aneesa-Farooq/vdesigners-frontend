<template>
  <div class="bg-white flex flex-col rounded-lg shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] pt-2 relative">
    <div :class="`${backGround} ${shadow}`" class="h-[64px] w-[64px] absolute rounded-[15px] top-[-15px] mx-4 flex justify-center items-center">
      <Icon class="text-3xl text-white" :icon="icon" />
    </div>
    <div class="border-b-[1px] border-[#a5a2a220] flex flex-col items-end pr-5 w-full">
      <p class="text-lg text-[#7b809a] font-medium">{{ heading }}</p>
      <p class="text-2xl font-semibold text-lightBlack pb-5">{{ cardValue }}</p>
    </div>
    <p class="text-base text-[#7b809a] p-5"><span class="text-[#4CAF50] font-bold">+55% </span>than last week</p>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "AnalyticsCard",
  components: {
    Icon,
  },
  props: ["heading", "cardValue", "backGround", "shadow", "icon"],
};
</script>
