<template>
  <div class="py-4 mb-4 flex items-center justify-between">
    <p class="self-start block font-poppins font-medium text-3xl text-black ml-12">{{ title }}</p>
    <div class="flex items-center gap-4">
      <ion-icon class="text-2xl rounded-full p-1 text-[#FFB62E] hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)]" name="moon-outline"></ion-icon>
      <button @click="updateProfile" class="flex items-center justify-center h-[34px] w-[34px]">
        <img src="/img/uploadProfile.png" alt="" class="h-full w-full rounded-full hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1" />
      </button>
      <ion-icon class="text-2xl rounded-full text-navIcons hover:border-[#EDEDED] cursor-pointer hover:bg-white hover:shadow-[-1px_3px_10px_0_rgba(0,0,0,0.1)] p-1" name="notifications-outline"></ion-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: ["title"],
  methods: {
    updateProfile() {
      (async () => {
        try {
          const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
              accept: "image/*",
              "aria-label": "Upload your profile picture",
            },
          });

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              Swal.fire({
                title: "Your uploaded picture",
                imageUrl: e.target.result,
                imageAlt: "The uploaded picture",
              });
              console.log(e.target.result);
            };
            reader.readAsDataURL(file);

            const user = localStorage.getItem("user-info");
            console.log(user);
            const id = JSON.parse(user)._id;
            console.log(id);
            const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/admin/updateProfile/${id}`, {
              adminImg: file,
            });
            console.log(111112222233333, someRes);
            if (someRes.status == "200") {
              swal("Updated!", {
                icon: "success",
                button: true,
              }).then(() => {
                this.$emit("close");
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
  },
};
</script>
