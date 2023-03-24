<template>
  <div class="bg-background">
    <div class="flex gap-4 justify-between items-center">
      <router-link to="/user/Register Brand/{{userType}}/addBrand" class="flex items-center p-5 justify-center h-[35px] bg-Green text-white font-[700] text-sm cursor-pointer rounded-[20px]"><Icon class="text-lg mr-2 text-white" icon="material-symbols:add" />Add User</router-link>
      <input class="py-3 px-5 text-base text-slate-300 font-poppins rounded-full border border-[#d8dbdd] focus:outline-Green" type="text" v-model="searchValue" placeholder="Enter value to be searched" />
    </div>
    <br />

    <EasyDataTable buttons-pagination :rows-per-page="5" show-index :headers="headers" :items="brandData" header-text-direction="center" body-text-direction="center" theme-color="#F3677F" fixed-header table-class-name="customize-table" :search-value="searchValue" :filter-options="filterOptions" :sort-by="sortBy" :sort-type="sortType" :loading="loading" height="100vh">
      <template #loading>
        <img src="/img/loading.gif" class="w-28 h-28" />
      </template>

      <template #item-brandName="{ brandName, brandImg }">
        <div class="player-wrapper">
          <img class="avator" :src="brandImg" alt="" />
          <p>{{ brandName }}</p>
        </div>
      </template>

      <template #item-operation="item">
        <div class="operation-wrapper flex items-center justify-center">
          <Icon icon="tabler:trash" class="operation-icon" @click="deleteBrand(item._id)"></Icon>
          <router-link to="/user/Update Brand/{{userType}}/updateBrand"><Icon icon="material-symbols:edit-square-outline" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
          <button
            @click="
              toggleModal();
              storeBrand(item);
            "
          >
            <Icon icon="ic:outline-remove-red-eye" class="operation-icon"></Icon>
          </button>
        </div>
      </template>

      <template #item-status="item">
        <div class="operation-wrapper flex items-center justify-center">
          <button :class="`${item.status ? '' : 'hidden'}`" class="flex items-center p-2 justify-center h-[35px] bg-green-600 text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(item, false)"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Block user</button>
          <button :class="`${!item.status ? '' : 'hidden'}`" class="flex items-center p-2 justify-center w-[105px] h-[35px] bg-[#FA5252] text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(item, true)"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Unblock</button>
        </div>
      </template>
    </EasyDataTable>
    <ViewDetail @close="toggleModal" :modalActive="modalActive">
      <div class="flex flex-col w-full max-w-[800px] bg-white rounded-[15px] h-full items-center justify-center my-3">
        <div class="relative w-2/4 flex justify-center items-center rounded-t-lg border-[2px]">
          <img :src="formValues.image" alt="" />
        </div>
        <div class="flex flex-col w-full">
          <p class="lg:text-2xl w-full text-Green mt-2 mb-2 font-bold">{{ formValues.brandName }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-black font-bold self-start"><Icon class="lg:w-[20px] lg:first-letter:h-[22px] mx-1 text-Green" icon="mdi:envelope-outline" />{{ formValues.email }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-gray-700 font-semibold self-start"><Icon class="lg:w-[20px] lg:h-[22px] text-Green" icon="ic:outline-phone-in-talk" />{{ formValues.contact }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-gray-700 font-semibold self-start"><Icon class="lg:w-[20px] lg:h-[22px] text-Green" icon="material-symbols:location-on-outline" />{{ formValues.location }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-gray-700 font-semibold self-start"><Icon class="lg:w-[20px] lg:h-[22px] text-Green" icon="bi:currency-dollar" />{{ formValues.plan }}</p>
        </div>
      </div>
    </ViewDetail>
  </div>
</template>

<script>
import axios from "axios";
import { Icon } from "@iconify/vue";
import swal from "sweetalert";
import ViewDetail from "../components/viewDetail.vue";
import { ref, computed } from "vue";

export default {
  name: "ViewBrands",
  components: {
    Icon,
    ViewDetail,
  },

  data() {
    return {
      formValues: {
        email: "",
        location: "",
        brandName: "",
        contact: "",
        plan: "",
        image: "",
      },
      blocked: false,
      loading: true,
      sortBy: "brandName",
      sortType: "asc",
      showDesignerFilter: false,
      designerCriteria: [20, 30],
      searchValue: "",
      headers: [
        { text: "Name", align: "start", width: 200, sortable: true, value: "brandName" },
        { text: "Contact", width: 200, value: "brandContactnumber", sortable: true },
        { text: "Email", value: "brandEmail", width: 200, sortable: true },
        { text: "Address", value: "brandAddress", width: 200, sortable: true },
        { text: "Subscription Plan", value: "subscriptionplan", width: 170, sortable: true },
        {
          text: "No of Designers",
          value: "countDesigner",
          sortable: true,
          width: 150,
        },
        { text: "Status", value: "status", width: 150 },
        { text: "Operations", value: "operation", width: 150 },
      ],
      brandData: [],
      filterOptionsArray: [],
      userType: ""
    };
  },

  setup() {
    const statusCriteria = ref("all");
    const showStatusFilter = ref(false);

    const subscriptionCriteria = ref("all");
    const showSubFilter = ref(false);

    const filterOptions = computed(() => {
      const filterOptionsArray = [];
      if (statusCriteria.value !== "all") {
        filterOptionsArray.push({
          field: "status",
          comparison: "=",
          criteria: statusCriteria.value,
        });
      }

      if (subscriptionCriteria.value !== "all") {
        filterOptionsArray.push({
          field: "subscriptionplan",
          comparison: "=",
          criteria: subscriptionCriteria.value,
        });
      }
      return filterOptionsArray;
    });

    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, toggleModal, showStatusFilter, statusCriteria, filterOptions };
  },

  mounted() {
    this.userType = this.$route.params.type;
    this.getData();
  },
  methods: {
    getData() {
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

    async changeStatus(brand, status) {
      try {
        console.log(brand);
        console.log(status);
        const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/brands/updateStatus/${brand._id}`, {
          status: status,
        });
        console.log(someRes);
        if (someRes.status === 200) {
          swal("Status Updated!", "Brand status has been updated!", "success");
          this.getData();
        } else {
          swal("Status Not Updated!", "Brand status has not been updated!", "error");
        }
      } catch (err) {
        console.log(err);
      }
    },
    storeBrand(brand) {
      this.formValues.brandName = brand.brandName;
      this.formValues.email = brand.brandEmail;
      this.formValues.contact = brand.brandContactnumber;
      this.formValues.location = brand.brandAddress;
      this.formValues.plan = brand.subscriptionplan;
      this.formValues.image = brand.brandImg;
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
                  this.getData();
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

.status-selector {
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

.easy-data-table__rows-selector ul.select-items li.selected[data-v-4ca5de3a] {
  background-color: #20c997 !important;
}
</style>

<style lang="scss" scoped>
.home {
  background-color: rgba(0, 176, 234, 0.5);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content {
    display: flex;
    flex-direction: column;
    h1,
    p {
      margin-bottom: 16px;
    }
    h1 {
      font-size: 32px;
    }
    p {
      font-size: 18px;
    }
  }
}
</style>
