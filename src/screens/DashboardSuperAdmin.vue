<template>
  <div class="bg-background">
    <!-- CARDS -->
    <div class="w-full grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-5 mb-7">
      <AnalyticsCard heading="Total Brands" :cardValue="totalDesigners" backGround="bg-gradient-primary" shadow="shadow-primary" icon="mdi:users" />
      <AnalyticsCard heading="Total Designers" :cardValue="totalDesigners" backGround="bg-gradient-success" shadow="shadow-success" icon="mdi:user" />
      <AnalyticsCard heading="Total Revenue" cardValue="Rs.100" backGround="bg-gradient-dark" shadow="shadow-dark" icon="ph:currency-dollar-bold" />
      <AnalyticsCard heading="Total Patterns" :cardValue="totalProjects" backGround="bg-gradient-info" shadow="shadow-info" icon="ic:baseline-snippet-folder" />
    </div>
    <!-- charts -->
    <div id="charts" class="flex flex-col lg:flex-row md:flex-col mt-3">
      <div class="flex flex-col gap-6 mt-[10px]">
        <div class="p-7 features feature-primary shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] box-border bg-white rounded">
          <BubbleChart />
        </div>
        <div class="p-7 features feature-primary shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] box-border bg-white rounded">
          <AreaChart />
        </div>
      </div>
      <!-- Right Cards -->
      <div class="flex flex-col gap-6 mt-[10px]">
        <div class="flex flex-[1] bg-white features feature-primary shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] p-5 items-center justify-center rounded h-1/3">
          <ProgressBar :tposts="totalPosts" :tprojects="totalProjects" :tdesigners="totalDesigners" :tbrands="totalBrands"/>
        </div>

        <!-- List of Registered brands -->
        <div class="flex flex-col flex-[1] justify-center bg-white features feature-primary shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] gap-5 p-7 rounded h-1/3">
          <div class="flex justify-between">
            <p class="font-poppins font-semibold tracking-normal text-sm text-grey">Registered Brands</p>
            <router-link to="/viewBrands" class="text-sm font-medium tracking-wide text-Green hover:opacity-60">View All</router-link>
          </div>
          <div v-for="(brand, index) in slicedData" :key="index" class="flex items-center justify-center">
            <div class="h-[50px] w-[50px] rounded-full overflow-hidden">
              <img :src="brand.brandImg" alt="" class="w-full" />
            </div>
            <div class="flex flex-col m-3">
              <p class="font-poppins font-semibold text-sm text-grey">{{ brand.brandName }}</p>
              <p class="font-poppins font-medium text-xs text-navIcons">{{ brand.brandEmail }}</p>
            </div>
            <router-link class="ml-auto" to="/viewDetailsB"><Icon class="text-2xl text-Green hover:opacity-60" icon="material-symbols:arrow-right-alt-rounded" @click="storeBrand(brand)" /></router-link>
          </div>
        </div>
        <!----------END----------- -->
      </div>
      <!-- Right Cards end-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import AreaChart from "../components/areaChart.vue";
import BubbleChart from "../components/bubbleChart.vue";
import AnalyticsCard from "../components/analyticsCard.vue";
import ProgressBar from "../components/progressBar.vue";

export default {
  name: "DashboardSuperAdmin",
  components: {
    Icon,
    AreaChart,
    BubbleChart,
    AnalyticsCard,
    ProgressBar,
  },

  data() {
    return {
      totalBrands: 0,
      totalDesigners: 0,
      totalRevenue: 0,
      totalProjects: 0,
      totalPosts: 0,
      slicedData: [],
      brandData: [],
    };
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    console.log(user);
    if (!user) {
      this.$router.push({ name: "Login" });
    }

    axios
      .get("https://vdesigners.herokuapp.com/api/admin/getAllbrands")
      .then((response) => {
        // console.log(response.data);
        this.brandData = response.data;
        this.totalBrands = this.brandData.length;
        this.slicedData = this.brandData.slice(0, 4);
        console.log("Data is printed");
        console.log(this.brandData);
        console.log(this.slicedData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://vdesigners.herokuapp.com/api/designers/getAlldesigners")
      .then((response) => {
        this.totalDesigners = response.data.length;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://vdesigners.herokuapp.com/api/project/getProjects`)
      .then((response) => {
        this.totalProjects = response.data.length;
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("https://vdesigners.herokuapp.com/api/pattern/getPosts")
      .then((response) => {
        // console.log(response.data);
        this.totalPosts = response.data.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    storeBrand(brand) {
      localStorage.setItem("brand-to-update", JSON.stringify(brand));
    },
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
  background: linear-gradient(45deg, transparent, rgba(47, 85, 212, 0.1)) !important;
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

.bg-gradient-primary {
  background-image: linear-gradient(195deg, #ec407a 0%, #d81b60 100%);
}
.shadow-primary {
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(233 30 99) !important;
}

.bg-gradient-dark {
  background-image: linear-gradient(195deg, #42424a 0%, #191919 100%);
}
.shadow-dark {
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(64 64 64 / 40%) !important;
}

.bg-gradient-success {
  background-image: linear-gradient(195deg, #50cab0 0%, #20c997 100%);
}
.shadow-success {
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(76 175 80 / 40%) !important;
}

.bg-gradient-info {
  background-image: linear-gradient(195deg, #49a3f1 0%, #1a73e8 100%);
}
.shadow-info {
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(0 188 212 / 40%) !important;
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
    // width: calc(100vw - var(--sidebar-width) - 10px);
    width: calc(100vw - var(--sidebar-width));
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
  }
  @media (max-width: 700px) {
    main {
      // width: calc(100vw - 10px);
      width: calc(100vw);
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
