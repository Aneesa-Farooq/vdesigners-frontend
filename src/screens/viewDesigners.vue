<template>
  <div class="bg-background">
    <div class="flex gap-4 justify-between items-center">
      <router-link to="/user/Register Designer/{{userType}}/addDesigner" class="flex items-center p-5 justify-center h-[35px] decidedBG text-white font-[700] text-sm cursor-pointer rounded-[20px]"><Icon class="text-lg mr-2 text-white" icon="material-symbols:add" />Add User</router-link>
      <input class="py-3 px-5 text-base text-slate-800 font-poppins rounded-full border border-[#d8dbdd] focus:outline-Green" type="text" v-model="searchValue" placeholder="Enter value to be searched" />
    </div>
    <br />

    <EasyDataTable buttons-pagination show-index :rows-per-page="5" :headers="headers" :items="designerData" header-text-direction="center" body-text-direction="center" theme-color="#F3677F" fixed-header table-class-name="customize-table" :search-value="searchValue" :filter-options="filterOptions" :sort-by="sortBy" :sort-type="sortType" :loading="loading" height="100vh">
      <template #loading>
        <img src="/img/loading.gif" class="w-28 h-28" />
      </template>

      <template #item-designerName="{ designerName, designerImg }">
        <div class="player-wrapper">
          <img class="avator" :src="designerImg" alt="" />
          {{ designerName }}
        </div>
      </template>

      <template #item-brandName="{ brandName, brandImg }">
        <div class="player-wrapper">
          <img class="avator" :src="brandImg" alt="" />
          {{ brandName }}
        </div>
      </template>

      <template #item-operation="item">
        <div class="operation-wrapper flex items-center justify-center">
          <Icon icon="tabler:trash" class="operation-icon" @click="deleteDesigner(item._id)"></Icon>
          <router-link :to="`/user/Update Designer/${userType}/updateDesigner`"><Icon icon="material-symbols:edit-square-outline" class="operation-icon" @click="storeBrand(item)"></Icon></router-link>
          <button
            @click="
              toggleModal();
              storeBrand(item);
            "
          >
            <Icon icon="ic:outline-remove-red-eye" class="operation-icon" @click="storeBrand(item)"></Icon>
          </button>
        </div>
      </template>

      <template #item-status="item">
        <div class="operation-wrapper flex items-center justify-center">
          <button :class="`${item.status == 'true' ? '' : 'hidden'}`" class="flex items-center p-2 justify-center h-[35px] bg-green-600 text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(item, false)"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Block user</button>
          <button :class="`${item.status == 'false' ? '' : 'hidden'}`" class="flex items-center p-2 justify-center w-[105px] h-[35px] bg-[#FA5252] text-white font-[700] text-sm cursor-pointer rounded-[7px] transition duration-[0.5s]" @click="changeStatus(item, true)"><Icon class="w-[15px] h-[15px] mr-2 text-white" icon="mdi:ban" />Unblock</button>
        </div>
      </template>
    </EasyDataTable>

    <ViewDetail @close="toggleModal" :modalActive="modalActive">
      <div class="flex flex-col w-full max-w-[800px] bg-white rounded-[15px] h-full items-center justify-center my-3">
        <div class="relative w-2/4 flex justify-center items-center rounded-t-lg border-[2px]">
          <img :src="formValues.image" alt="" />
        </div>
        <div class="flex flex-col w-full">
          <p class="lg:text-2xl w-full text-Green mt-2 mb-2 font-bold">{{ formValues.designerName }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-black font-bold self-start"><Icon class="lg:w-[20px] lg:first-letter:h-[22px] mx-1 text-Green" icon="material-symbols:work-outline" />{{ formValues.brandName }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-black font-bold self-start"><Icon class="lg:w-[20px] lg:first-letter:h-[22px] mx-1 text-Green" icon="mdi:envelope-outline" />{{ formValues.email }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-black font-bold self-start"><Icon class="lg:w-[20px] lg:first-letter:h-[22px] mx-1 text-Green" icon="bx:images" />{{ formValues.posts }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-black font-bold self-start"><Icon class="lg:w-[20px] lg:first-letter:h-[22px] mx-1 text-Green" icon="material-symbols:folder-copy-outline-sharp" />{{ formValues.projects }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-gray-700 font-semibold self-start"><Icon class="lg:w-[20px] lg:h-[22px] text-Green" icon="ic:outline-phone-in-talk" />{{ formValues.contact }}</p>
          <p class="lg:text-xl mb-2 w-full flex items-center gap-2 text-gray-700 font-semibold self-start"><Icon class="lg:w-[20px] lg:h-[22px] text-Green" icon="material-symbols:location-on-outline" />{{ formValues.location }}</p>
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
import { ref } from "vue";

export default {
  name: "ViewDesigners",
  components: {
    Icon,
    ViewDetail,
  },

  data() {
    return {
      formValues: {
        designerName: "",
        brandName: "",
        email: "",
        location: "",
        posts: "",
        projects: "",
        contact: "",
        image: "",
      },
      blocked: false,
      loading: true,
      sortBy: "designerName",
      sortType: "asc",
      showDesignerFilter: false,
      designerCriteria: [20, 30],
      searchValue: "",
      headers: [
        { text: "Name", align: "start", sortable: true, value: "designerName", width: 200 },
        { text: "Brand", sortable: true, value: "brandName", width: 200 },
        { text: "Email", sortable: true, value: "designerEmail", width: 200 },
        { text: "Projects", sortable: true, value: "countProject", width: 100 },
        { text: "Contact", sortable: true, value: "designerContactnumber", width: 200 },
        { text: "Address", sortable: true, value: "designerAddress", width: 200 },
        { text: "Status", sortable: true, value: "status", width: 150 },
        { text: "Operations", sortable: true, value: "operation", width: 200 },
      ],
      designerData: [],
      filterOptionsArray: [],
      userType: "",
      loggedinuser: "",
    };
  },

  setup() {
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, toggleModal };
  },

  mounted() {
    const User = localStorage.getItem("user-info");
    const user1 = JSON.parse(User);
    this.userType = this.$route.params.type;
    this.loggedinuser = user1.user._id;
   
    if (this.userType == "admin") {
      this.getData();
    } else if (this.userType == "brand") {
      this.getOneBrandDesigner();
    }
  },

  methods: {
    getData() {
      this.designerData = [];
      axios
        .get("https://vdesigners.herokuapp.com/api/designers/getAlldesigners")
        .then((response) => {
          console.log(response.data);
          let Data = response.data;
          for (let i = 0; i < Data.length; i++) {
            this.designerData.push({
              designerName: Data[i].designerName,
              brandName: Data[i].brandId.brandName,
              brandImg: Data[i].brandId.brandImg,
              designerImg: Data[i].designerImg,
              designerEmail: Data[i].designerEmail,
              designerContactnumber: Data[i].designerContactnumber,
              designerAddress: Data[i].designerAddress,
              status: Data[i].status,
              countProject: Data[i].countProject,
              _id: Data[i]._id,
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getOneBrandDesigner() {
      this.designerData = [];
      axios
        .get(`https://vdesigners.herokuapp.com/api/designers/getbranddesigner/?brandId=${this.loggedinuser}`)
        .then((response) => {
          console.log("designer response",response.data);
          let Data = response.data.Allbranddesigners
;
          for (let i = 0; i < Data.length; i++) {
            this.designerData.push({
              designerName: Data[i].designerName,
              brandName: Data[i].brandId.brandName,
              brandImg: Data[i].brandId.brandImg,
              designerImg: Data[i].designerImg,
              designerEmail: Data[i].designerEmail,
              designerContactnumber: Data[i].designerContactnumber,
              designerAddress: Data[i].designerAddress,
              status: Data[i].status,
              countProject: Data[i].countProject,
              countPost: Data[i].countPost,
              _id: Data[i]._id,
            });
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async changeStatus(designer, status) {
      try {
        const someRes = await axios.put(`https://vdesigners.herokuapp.com/api/designers/updateStatus/${designer._id}`, {
          status: status,
        });
        console.log(someRes);
        if (someRes.status === 200) {
          swal("Status Updated!", "Account status has been updated!", "success");
          this.getData();
        } else {
          swal("Status Not Updated!", "Account status has not been updated!", "error");
        }
      } catch (err) {
        console.log(err);
      }
    },

    storeBrand(designer) {
      this.formValues.brandName = designer.designerName;
      this.formValues.email = designer.designerEmail;
      this.formValues.contact = designer.designerContactnumber;
      this.formValues.location = designer.designerAddress;
      this.formValues.brandName = designer.brandName;
      this.formValues.posts = designer.countPost;
      this.formValues.projects = designer.countProject;
      this.formValues.image = designer.designerImg;
      console.log("designer should be stored");
      localStorage.setItem("designer-to-update", JSON.stringify(designer));
    },
    deleteDesigner(id) {
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
            .delete(`https://vdesigners.herokuapp.com/api/designers/deletedesigner/${id}`)
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
