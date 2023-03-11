<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AreaChart",
  components: {},

  data() {
    return {
      brandData: [],
      series: [
        {
          name: "Designers",
          data: [11, 12, 45, 32]
        },
        {
          name: "series2",
          data: [90, 1, 70, 30],
        },
        {
          name: "series3",
          data: [50, 2, 5, 32],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: "smooth",
          colors: ["#0398E2", "#94E189", "#8C8EF4"],
          width: 2,
        },
        xaxis: {
          categories: [],
        },
        fill: {
          colors: ["#0398E2", "#94E189", "#8C8EF4"],
          opacity: 0.3,
          type: "solid",
          pattern: {
            strokeWidth: 2,
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: "top",
          horizontalAlign: "center",
          fontSize: "14px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 500,
          labels: {
            colors: undefined,
            useSeriesColors: false,
          },
          markers: {
            width: 16,
            height: 16,
            fillColors:["#0398E2", "#94E189", "#8C8EF4"] ,
            radius: 12,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
      },
    };
  },

  mounted() {
    axios
      .get("https://vdesigners.herokuapp.com/api/admin/getAllbrands")
      .then((response) => {
        // console.log(response.data);
        this.brandData = response.data;
        console.log("Data is printed");
        console.log(this.brandData);

        const categories = [];
        for (var i = 0; i < this.brandData.length; i++) {
          categories.push(this.brandData[i].brandName);
        }
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            categories: categories,
          },
        };

        // const data = [];
        // for (var i = 0; i < this.brandData.length; i++) {
        //   data.push(this.brandData[i].countDesigner);
        // }
        // this.series = [
        //     {
        //       data: data,
        //     }
        //   ];

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

<style></style>
