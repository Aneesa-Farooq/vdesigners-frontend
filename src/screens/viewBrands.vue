<template>
  <body class="bg-background">
    <div class="flex justify-between items-center">
      <router-link to="/" class="flex items-center p-5 justify-center h-[35px] bg-pink text-white font-[700] text-sm cursor-pointer rounded-[20px]"><Icon class="text-lg mr-2 text-white" icon="material-symbols:add" />Add User</router-link>
      <input class="py-3 px-5 text-base text-slate-300 font-poppins rounded-full border border-[#d8dbdd] focus:outline-pink" type="text" v-model="searchValue" placeholder="Enter value to be searched" />
    </div>
    <br />

    <EasyDataTable buttons-pagination show-index :headers="headers" :items="brandData" header-text-direction="center" body-text-direction="center" theme-color="#F3677F" fixed-header table-class-name="customize-table" :search-value="searchValue" :filter-options="filterOptions" :sort-by="sortBy" :sort-type="sortType" :loading="loading" height="100vh">
      <!-- <template #header-countDesigner="header">
            <div class="filter-column">
              <img src="/img/halfLogo.png" class="filter-icon" @click.stop="showDesignerFilter = !showDesignerFilter" />
              {{ header.text }}
              <div class="filter-menu filter-age-menu" v-if="showDesignerFilter">
                <Slider v-model="designerCriteria" :merge="merge" :format="format" class="slider-red" />
              </div>
            </div>
          </template> -->

      <template #loading>
        <img src="/img/Loading_Table.gif" class="w-28 h-28" />
      </template>

      <!-- <template #header-subscriptionplan="header">
            <div class="filter-column">
              <img src="/img/halfLogo.png" class="filter-icon" @click.stop="showSubscriptionFilter = !showSubscriptionFilter" />
              {{ header.text }}
              <div class="filter-menu filter-sport-menu" v-if="showSubscriptionFilter">
                <select class="favouriteSport-selector" v-model="subsCriteria" name="favouriteSport">
                  <option value="swimming">swimming</option>
                  <option value="basketball">basketball</option>
                  <option value="running">running</option>
                  <option value="football">football</option>
                  <option value="all">all</option>
                </select>
              </div>
            </div>
          </template> -->

      <!-- <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
            <button :disabled="isFirstPage" @click="prevPage"><ion-icon class="text-slate-500" name="arrow-back-circle-outline"></ion-icon></button>
            <button :disabled="isLastPage" @click="nextPage"><ion-icon name="arrow-forward-circle-outline"></ion-icon></button>
          </template> -->

      <template #item-brandName="{ brandName, brandImg }">
        <div class="player-wrapper">
          <img class="avator" :src="brandImg" alt="" />
          {{ brandName }}
        </div>
      </template>

      <template #item-operation="item">
        <div class="operation-wrapper flex">
          <Icon icon="tabler:trash" class="operation-icon" @click="deleteBrand(item._id)"></Icon>
          <router-link to="/"><Icon icon="material-symbols:edit-square-outline" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
          <router-link to="/viewDetailsB"><Icon icon="ic:outline-remove-red-eye" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
        </div>
      </template>

      <template #item-status="item">
        <div class="operation-wrapper">
          <button :class="`${item.status ? 'hidden' : ''}`" class="flex items-center p-2 justify-center h-[35px] bg-green-600 text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="blocked = !blocked"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Block user</button>
          <button :class="`${item.status ? '' : 'hidden'}`" class="flex items-center p-2 justify-center h-[35px] bg-[#FA5252] text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="blocked = !blocked"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Unblock</button>
        </div>
      </template>
    </EasyDataTable>
  </body>
</template>

<script>
import axios from "axios";
//import Slider from "@vueform/slider";
import { Icon } from "@iconify/vue";
//import "@vueform/slider/themes/default.css";
import swal from "sweetalert";

export default {
  name: "ViewBrands",
  components: {
    Icon,
    //Slider,
  },

  data() {
    return {
      blocked: false,
      loading: true,
      sortBy: "brandName",
      sortType: "asc",
      showDesignerFilter: false,
      designerCriteria: [20, 30],
      searchValue: "",
      headers: [
        { text: "Name", align: "start", sortable: true, value: "brandName" },
        { text: "Contact", value: "brandContactnumber" },
        { text: "Email", value: "brandEmail" },
        { text: "Address", value: "brandAddress", width: 200 },
        { text: "Subscription Plan", value: "subscriptionplan", width: 150 },
        {
          text: "No of Designers",
          value: "countDesigner",
          sortable: true,
          width: 150,
        },
        { text: "Status", value: "status", width: 150 },
        { text: "Operations", value: "operation" },
      ],
      brandData: [],
      filterOptionsArray: [],
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
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

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

    storeBrand(brand) {
      localStorage.setItem("brand-to-update", JSON.stringify(brand));
    },
    deleteBrand(id) {
      console.log(id);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this account!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`https://vdesigners.herokuapp.com/api/admin/deleteBrand/${id}`)
            .then((response) => {
              console.log(response.status);
              if (response.status == "200") {
                swal("Deleted!", {
                  icon: "success",
                  button: true,
                }).then(() => {
                  this.$emit("close");
                  location.reload();
                });
              } else {
                swal("Something went wrong!", {
                  icon: "error",
                  button: true,
                }).then(() => {
                  this.$emit("close");
                });
              }
            })

            .catch((error) => {
              console.log(error.response.status);
              swal("Something went wrong!", {
                icon: "error",
                button: true,
              }).then(() => {
                this.$emit("close");
              });
            });
        }
      });
    },
  },
};
</script>

<style>
.swal-button--confirm {
  padding: 13px 35px;
  border-radius: 5px;
  background-color: #41b983;
  font-size: 12px;
  border: 1px solid #41b983;
  text-shadow: 0px -1px 0px rgba(34, 182, 91, 0.897);
}

.swal-button--confirm:hover {
  background-color: rgb(243, 55, 86) !important;
}

.customize-table {
  --easy-table-border: 1px solid #e7edf3;
  --easy-table-row-border: 1px solid #e7edf3;

  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: rgba(39, 40, 41, 0.75);

  --easy-table-body-item-padding: 10px 25px;

  --easy-table-footer-font-color: #41b983;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 25px;
  --easy-table-footer-height: 60px;

  --easy-table-rows-per-page-selector-width: 100px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-loading-mask-background-color: #41b983;

  --easy-table-body-row-font-color: #616161;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;
  --easy-table-loading-mask-background-color: white;

  --easy-table-buttons-pagination-border: 0px;
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
  color: #41b983;
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
  --slider-connect-bg: #41b983;
  --slider-tooltip-bg: #41b983;
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
.buttons-pagination .item.button.active[data-v-4c681fa2] {
  background-color: #41b983 !important;
}
.vue3-easy-data-table__header th.sortable.none .sortType-icon[data-v-0c3a2656] {
  opacity: 0.5 !important;
  transition: 0.5s ease;
}
</style>