<template>
  <!-- List of Registered posts -->
  <div
    class="flex flex-col flex-[1] justify-center bg-white features feature-primary shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] gap-5 p-7 rounded h-1/3"
  >
    <div class="flex justify-between">
      <p class="font-poppins font-semibold tracking-normal text-sm text-grey">
        Registered posts
      </p>
      <router-link
        to="/viewposts"
        class="text-sm font-medium tracking-wide text-pink hover:opacity-60"
        >View All</router-link
      >
    </div>
    <div
      v-for="(post, index) in slicedData"
      :key="index"
      class="flex items-center justify-center"
    >
      <div class="h-[50px] w-[50px] rounded-full overflow-hidden">
        <img src="/img/profile.jpg" alt="" class="w-full" />
      </div>
      <div class="flex flex-row m-3">
        <p class="font-poppins font-semibold text-sm text-grey">
          {{ post.patternName }}
        </p>
        <p class="font-poppins font-medium text-xs text-navIcons">
          {{ post.category }}
        </p>
        <p class="font-poppins font-medium text-xs text-navIcons">
          {{ post.status }}
        </p>
      </div>
      <router-link class="ml-auto" to="/viewDetailsB"
        ><Icon
          class="text-2xl text-pink hover:opacity-60"
          icon="material-symbols:arrow-right-alt-rounded"
          @click="storepost(post)"
      /></router-link>
    </div>
  </div>
  <!----------END----------- -->
</template>
<script>
import "sweetalert2/dist/sweetalert2.css";
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "postComponent",
  data() {
    return {
      slicedData: [],
      postData: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://vdesigners.herokuapp.com/api/pattern/getonePosts?designerId=63ff3d6cf4dc279c6e0edc03"
      )
      .then((response) => {
        // console.log(response.data);
        this.postData = response.data;
        this.slicedData = this.postData.slice(0, 4);
        console.log("Data is printed");
        console.log(this.postData);
        console.log(this.slicedData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#scrollable-brands-container::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}

#scrollable-brands-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

#scrollable-brands-container::-webkit-scrollbar-thumb {
  background: #f4f6f9;
  border-radius: 10px;
}

#scrollable-brands-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#scrollable-brands-container {
  width: inherit;
}

.features.feature-primary .title:hover {
  color: #5dc697 !important;
}

.features.feature-primary .icon {
  color: #5dc697 !important;
  background-color: rgba(47, 85, 212, 0.04) !important;
}

.features.feature-primary .link {
  color: #5dc697 !important;
}

.features.feature-primary.key-feature .icon {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(47, 85, 212, 0.1)
  ) !important;
}

.text-danger {
  color: #e43f52 !important;
}

.text-success {
  color: #41b983 !important;
}

a.text-danger:hover,
a.text-danger:focus {
  color: #e1293e !important;
}
</style>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --lightgrey: #f4f6f9;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #fff;
  --pink: #41b983;
  --mediumPink: #41b983;
  --sidebar-width: calc(2rem + 32px);
  --bgSidebar: white;
  --iconColor: #a9abac;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    width: calc(100vw - 88px);
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 4rem;
    padding-left: 4rem;
    margin-left: auto;

    @media (max-width: 1023px) {
      width: 100vw;
      padding-left: 6rem;
    }
  }
}

#charts {
  width: 100% !important;
}
#charts > div:first-child {
  width: 67% !important;
}
#charts > div:last-child {
  width: calc(33% - 1.5rem) !important;
  margin-left: 1.5rem;
}

@media (max-width: 1023px) {
  #charts > div:first-child {
    width: 100% !important;
    margin-bottom: 1.5rem;
  }
  #charts > div:last-child {
    width: 100% !important;
    margin-left: 0;
  }
}
</style>
