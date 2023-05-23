<template>
  <div class="bg-background">
    <div class="flex justify-between items-center">
      <input class="py-3 px-5 text-base text-slate-800 font-poppins rounded-full border border-[#d8dbdd] focus:outline-pink" type="text" v-model="searchValue" placeholder="Enter value to be searched" />
    </div>
    <br />

    <EasyDataTable buttons-pagination show-index :headers="headers" :items="feedbackData" header-text-direction="center" body-text-direction="center" theme-color="#F3677F" fixed-header table-class-name="customize-table" :search-value="searchValue" :filter-options="filterOptions" :sort-by="sortBy" :sort-type="sortType" :loading="loading" height="100vh">
      <template #loading>
        <img src="/img/loading.gif" class="w-28 h-28" />
      </template>
<!-- 
      <template #item-brandName="{ designerName, brandImg }">
        <div class="player-wrapper">
          <img class="avator" :src="brandImg" alt="" />
          {{ brandName }}
        </div>
      </template> -->

      <template #item-operation="item">
        <div class="operation-wrapper flex items-center justify-center">
          <Icon icon="tabler:trash" class="operation-icon" @click="deleteBrand(item._id)"></Icon>
          <router-link to="/UpdateDesigner"><Icon icon="material-symbols:edit-square-outline" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
          <router-link to="/viewDetailsD"><Icon icon="ic:outline-remove-red-eye" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
        </div>
      </template>

    </EasyDataTable>
    
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import swal from "sweetalert";

export default {
  name: "Feedbacks",
  components: {
    Icon,
    
  },

  data() {
    return {
      blocked: false,
      loading: true,
      //sortBy: "brandName",
      sortType: "asc",
      showDesignerFilter: false,
      designerCriteria: [20, 30],
      searchValue: "",
      headers: [
        { text: "Brand Name", align: "start", sortable: true, value: "brandId" },
        //{ text: "Brand", value: "brandId.brandName" },
        { text: "Feedback", sortable: true, value: "feedback" },
        { text: "Time", sortable: true, value: "createdAt" },
        { text: "Operations", sortable: true, value: "operation" },
      ],
      feedbackData: [],
      filterOptionsArray: [],
    };
  },

  mounted() {
    axios
      .get("https://vdesigners.herokuapp.com/api/admin/getAllfeedback")
      .then((response) => {
        console.log(response.data);
        this.feedbackData = response.data;
        console.log(this.feedbackData);
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    storeBrand(designer) {
      localStorage.setItem("designer-to-update", JSON.stringify(designer));
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
            .delete(`https://vdesigners.herokuapp.com/api/admin/deleteDesigner/${id}`)
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








