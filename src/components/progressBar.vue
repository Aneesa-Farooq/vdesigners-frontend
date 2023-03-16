<template>
  <div id="chart">
    <apexchart
      type="radialBar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ProgressBar",
  components: {},
  data() {
    return (
      {
        postData: [],
        Pending: [],
        Accepted: [],
        Rejected: [],
        countPost: "",
        countPending: 0,
        countAccepted: 0,
        countRejected: 0,
      },
      {
        series: [44, 55, 67, 83],
        chartOptions: {
          chart: {
            height: 350,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 249;
                  },
                },
              },
            },
          },
          labels: ["Apples", "Oranges", "Bananas", "Berries"],
        },
      }
    );
  },
  mounted() {
    axios
      .get(
        "https://vdesigners.herokuapp.com/api/pattern/getonePosts?designerId=63ff3d6cf4dc279c6e0edc03"
      )
      .then((response) => {
        // console.log(response.data);
        this.postData = response.data;
        console.log("Data is printed");
        console.log(this.postData);
        this.countPost = this.postData.length;
        console.log(this.countPost);
        for (var i = 0; i < this.countPost; i++) {
          if (this.postData[i].status == "pending") {
            this.countPending++;
          }
          console.log(this.countPending);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
