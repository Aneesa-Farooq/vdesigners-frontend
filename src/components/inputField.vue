<template>
    <input class="w-full h-[60px] p-4 rounded-[7px] font-poppins outline-none text-base tracking-[0.5px] bg-lightgrey border border-borderColor  hover:bg-white hover:border-borderColor  hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-border-color-focus focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:bg-white" v-bind="$attrs" :value="modelValue" :placeholder="place_holder" @input="$emit('update:modelValue', $event.target.value)" />
</template>
  
  <script>
  export default {
    name: "InputField",
    props: {
      modelValue: {
        type: [String, Number],
        default: "",
      },
  
      place_holder: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  