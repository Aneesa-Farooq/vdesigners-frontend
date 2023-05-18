<template>
      <!-- WELCOME CARD -->
      <div class="flex items-center justify-center min-h-[185px] w-full features feature-primary bg-white rounded shadow-[-1px_3px_10px_0_rgba(0,0,0,0.025)] px-8 py-4">
        <div class="h-[100px] w-[100px] rounded-full overflow-hidden">
          <img :src="userImg" alt="" class="w-full h-[100px]" />
        </div>

        <div class="mx-9">
          <p class="self-start block font-poppins font-bold text-2xl text-grey">Welcome Back.</p>
          <p class="self-start block font-poppins font-light text-base text-navIcons">Its's really nice to see you again.</p>
        </div>
        <div class="bg-mediumPink ml-auto hidden md:flex items-center justify-center shadow-[-1px_3px_10px_0_rgba(0,0,0,0.125)] my-4 min-h-[120px] w-3/12 rounded-[10px] p-4">
          <p class="text-white flex flex-[2] font-sm font-thin">Start using our team and project management tools</p>
          <ion-icon class="text-[#fd92a4] flex flex-[1] text-8xl" name="diamond-outline"></ion-icon>
        </div>
      </div>
      <!--  -->
      <!--charts-->
      <div id="charts" class="flex flex-col lg:flex-row md:flex-col mt-3">
        <div class="flex flex-col gap-6 mt-[10px]">
          <div class="px-5 py-5 box-border bg-white border-pink rounded-[10px]">
            <apexchart type="bar" :options="optionsCol" :series="seriesCol"></apexchart>
          </div>
          <div class="box-border bg-white border-pink rounded-[10px] overflow-x-scroll">
            <viewPostTable />
          </div>
        </div>
        <div class="flex flex-col gap-6 mt-[10px]">
          <div class="box-border bg-grey max-h-[240px] p-5 items-center justify-center rounded-[10px] text-white h-1/3">
            <p class="font-poppins font-semibold text-4xl">10</p>
            <p class="font-poppins font-medium text-sm">TOTAL NUMBER OF POSTS</p>
            <div class="mt-5 flex self-end">
              <apexchart height="100" type="line" :options="optionsSparks" :series="seriesSparks"></apexchart>
            </div>
          </div>
          <div class="box-border max-h-[230px] bg-mediumPink p-5 items-center justify-center rounded-[10px] text-white h-1/3">
            <p class="font-poppins font-semibold text-4xl">15</p>
            <p class="font-poppins font-medium text-sm">TOTAL NUMBER OF PROJECTS</p>
            <div class="mt-5 flex self-end">
              <apexchart height="100" type="line" :options="optionsSparks" :series="seriesSparks"></apexchart>
            </div>
          </div>
          <div class="box-border min-h-[480px] bg-grey p-5 items-center justify-center rounded-[10px] text-white h-1/3">
            <p class="font-poppins font-semibold text-4xl">25</p>
            <p class="font-poppins font-medium text-sm">Status of Posts</p>
            <div class="mt-5 flex self-end">
              <progressBar />
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import axios from "axios";
// import Navbar from "../components/navBar.vue";
import progressBar from "../components/progressBar.vue";
import viewPostTable from "../components/viewPostTable.vue";
//import postComponent from "../components/postComponent.vue";
export default {
  name: "DashboardDesigner",
  components: {
    progressBar,
    viewPostTable,
    //postComponent,
  },

  data() {
    return (
      {
        brandData: {},
        userImg: "/img/user.png",
      },
      {
        series: [76, 67, 61, 90],
        chartOptions: {
          chart: {
            height: 390,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: "30%",
                background: "transparent",
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
          labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
          legend: {
            show: true,
            floating: true,
            fontSize: "16px",
            position: "left",
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0,
            },
            itemMargin: {
              vertical: 3,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
      },
      {
        options: {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          },
          fill: {
            colors: ["#F3677F", "#F3677F"],
          },
          colors: ["#F3677F"],
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 35, 50, 49, 60, 70, 91],
          },
        ],

        optionsCol: {
          chart: {
            height: 500,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "25%",
              endingShape: "rounded",
              borderRadius: 5,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          },
          yaxis: {
            title: {
              text: "$ (thousands)",
            },
          },
          fill: {
            colors: ["#F3677F", "rgba(243, 55, 86, 0.25)"],
            opacity: 3,
          },

          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 4,
          },

          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              },
            },
          },
        },

        seriesCol: [
          {
            name: "Net Profit",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
          {
            name: "Net Profit",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
        ],

        optionsSparks: {
          chart: {
            sparkline: {
              enabled: true,
            },
          },
          stroke: {
            width: 2,
            curve: "smooth",
          },
          fill: {
            opacity: 0.5,
          },
          yaxis: {
            min: 0,
          },
          colors: ["#FFF"],

          markers: {
            size: 4,
            colors: ["transparent"],
            opacity: 0.5,
            strokeColors: "#fff",
            strokeWidth: 2,
            strokeOpacity: 0.5,
            strokeDashArray: 0,
            fillOpacity: 1,
            shape: "circle",
            radius: 2,

            hover: {
              sizeOffset: 3,
            },
          },
        },
        seriesSparks: [
          {
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
          },
        ],
      }
    );
  },

  mounted() {
    // document.addEventListener('DOMContentLoaded', () => {
    //   document.getElementById('preloader').style.visibility = 'hidden';
    //   document.getElementById('preloader').style.opacity = '0';

    // });

    let user = localStorage.getItem("user-info");
    console.log(user);
    if (!user) {
      this.$router.push({ name: "Login" });
    }
    this.userImg = JSON.parse(user).user.designerImg;
    console.log(this.userImg, "logged in user", 6767676);

    axios
      .get("https://vdesigners.herokuapp.com/api/admin/getAllbrands")
      .then((response) => {
        // console.log(response.data);
        this.brandData = response.data;
        console.log("Data is printed");
        console.log(this.brandData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
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
  color: #f33757 !important;
}

.features.feature-primary .icon {
  color: #f33757 !important;
  background-color: rgba(47, 85, 212, 0.04) !important;
}

.features.feature-primary .link {
  color: #f33757 !important;
}

.features.feature-primary.key-feature .icon {
  background: linear-gradient(45deg, transparent, rgba(47, 85, 212, 0.1)) !important;
}

.text-danger {
  color: #e43f52 !important;
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
    // width: calc(100vw - 88px);
    // width: calc(100vw - var(--sidebar-width) - 10px);
    width: calc(100vw - var(--sidebar-width));
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 4rem;
    padding-left: 4rem;
    margin-left: auto;
    @media (max-width: 1023px) {
      width: 100vw;
      padding-left: 6rem;
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
