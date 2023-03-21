<template>
  <div class="bg-white ">
    <div class="flex h-full">
      <div class="flex flex-col flex-[4] h-full mb-6 mx-6">
        <div>
          <p class="self-start block font-poppins font-medium text-2xl text-grey pt-5 mb-5">Posts</p>
        </div>
        <router-link to="/viewPost" class="text-sm font-medium tracking-wide text-pink hover:opacity-60"> View All </router-link>
        <EasyDataTable show-index :headers="headers" :items="slicedData" header-text-direction="center" body-text-direction="center" theme-color="#F3677F" fixed-header table-class-name="customize-table" :search-value="searchValue" :filter-options="filterOptions" :sort-by="sortBy" :sort-type="sortType" :loading="loading" height="200vh">
          <template #header-countDesigner="header">
            <div class="filter-column">
              <img src="/img/halfLogo.png" class="filter-icon" @click.stop="showDesignerFilter = !showDesignerFilter" />
              {{ header.text }}
              <div class="filter-menu filter-age-menu" v-if="showDesignerFilter">
                <Slider v-model="designerCriteria" :merge="merge" :format="format" class="slider-red" />
              </div>
            </div>
          </template>

          <template #loading>
            <img src="/img/Loading_Table.gif" class="w-28 h-28" />
          </template>

          <template #header-subscriptionplan="header">
            <div class="filter-column">
              <img src="/img/halfLogo.png" class="filter-icon" @click.stop="showSubscriptionFilter = !showSubscriptionFilter" />
              {{ header.text }}
              <div class="filter-menu filter-sport-menu" v-if="showSubscriptionFilter">
              </div>
            </div>
          </template>

          <template #item-patternName="{ patternName, image }">
            <div class="player-wrapper">
              <img class="avator" :src="image" alt="" />
              {{ patternName }}
            </div>
          </template>

          <template #item-operation="item">
            <div class="operation-wrapper">
              <router-link to="/"><ion-icon name="eye-outline" class="operation-icon" @click="storeBrand(item)"></ion-icon></router-link>
            </div>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import swal from "sweetalert";
export default {
  name: "viewPostTable",
  components: {
    // Sidebar,
    // Navbar,
    
  },

  data() {
    return {
      loading: true,
      sortBy: "patternName",
      sortType: "asc",
      showDesignerFilter: false,
      designerCriteria: [20, 30],
      // merge: 10,
      // format: {
      //   prefix: '$',
      //   decimals: 2
      // },
      searchValue: "",
      headers: [
        { text: "Title", align: "start", sortable: true, value: "patternName" },
        { text: "Category", value: "category" },
        { text: "Status", value: "status" },
        { text: "", value: "operation" },
      ],
      postData: [],
      slicedData: [],
      filterOptionsArray: [],
    };
  },

  mounted() {
    axios
      .get("https://vdesigners.herokuapp.com/api/pattern/getonePosts?designerId=63ff3d6cf4dc279c6e0edc03")
      .then((response) => {
        // console.log(response.data);
        this.postData = response.data;
        this.slicedData = this.postData.slice(0, 4);
        console.log("Data is printed");
        console.log(this.postData);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    //     storeBrand(brand) {
    //       localStorage.setItem("brand-to-update", JSON.stringify(brand));
    //     },
    //     deleteBrand(id) {
    //       swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this file!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //       }).then((willDelete) => {
    //         if (willDelete) {
    //           axios
    //             .delete(`https://vdesigners.herokuapp.com/api/admin/deleteBrand/${id}`)
    //             .then((response) => {
    //               console.log(response.status);
    //             })
    //             .catch((error) => {
    //               console.log(error.response.status);
    //             });
    //           swal("Deleted!", {
    //             icon: "success",
    //             button: true,
    //           }).then(() => {
    //             location.reload();
    //           });
    //         }
    //       });
    //     },
    //   },
  },
};
</script>
<style>
.swal-button--confirm {
  padding: 13px 35px;
  border-radius: 5px;
  background-color: #f3677f;
  font-size: 12px;
  border: 1px solid #f3677f;
  text-shadow: 0px -1px 0px rgba(243, 55, 86, 0.25);
}

.swal-button--confirm:hover {
  background-color: rgb(243, 55, 86) !important;
}

.customize-table {
  --easy-table-border: 1px solid #e7edf3;
  --easy-table-row-border: 1px solid #e7edf3;

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #f33757;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-font-color: #f33757;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 25px;
  --easy-table-footer-height: 60px;

  --easy-table-rows-per-page-selector-width: 100px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-loading-mask-background-color: #f33757;

  --easy-table-body-row-font-color: #616161;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;
  --easy-table-loading-mask-background-color: white;
}

.filter-column {
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
}
.filter-icon {
  cursor: pointer;
  display: inline-block;
  width: 15px !important;
  height: 15px !important;
  margin-right: 4px;
}
.filter-menu {
  padding: 15px 30px;
  z-index: 1;
  position: absolute;
  top: 30px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}
.filter-age-menu {
  height: 40px;
}
.slider {
  margin-top: 36px;
}
.favouriteSport-selector {
  width: 100%;
}

.operation-wrapper .operation-icon {
  width: 20px;
  font-size: 50px;
  cursor: pointer;
  color: #f6052d;
  margin-right: 5px;
}

.avator {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}

.player-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}

.slider-red {
  --slider-connect-bg: #ef4444;
  --slider-tooltip-bg: #ef4444;
  --slider-handle-ring-color: #ef444430;
}

.buttons-pagination .item[data-v-4c681fa2]:last-of-type {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}

.buttons-pagination .item[data-v-4c681fa2]:first-of-type {
  border-top-left-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
}
</style>
