<template>
    <select class="w-full p-4 rounded-[7px] font-poppins outline-none text-base tracking-[0.5px] bg-lightgrey hover:bg-white hover:border-borderColor hover:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:border-border-color-focus focus:shadow-[0_0_0_4px_rgba(234,76,137,0.1)] focus:bg-white" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option value="">Login as</option>
      <option value="Admin">Admin</option>
      <option value="Brand">Brand</option>
      <option value="Designer">Designer</option>
    </select>
  </template>
  
  <script>
  export default {
    name: "SelectField",
    props: {
      modelValue: {
        type: [String, Number],
        default: "",
      },
    },
  };
  </script>
  
  <style></style>
  