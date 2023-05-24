<template>
  <div class="bg-background">
    <div class="h-2/3 overflow-hidden">
      <div class="flex flex-col" v-for="(feedback, index) in feedbackData" :key="index">
        <div class="flex flex-col lg:flex-row lg:gap-6 w-full p-5 bg-white rounded-md mb-3">
          <div class="flex flex-col w-full">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-white h-[100px] w-[100px] overflow-hidden rounded-full">
                <img class="h-auto w-auto" :src="feedback.brandImg" alt="" />
              </div>
              <div>
                <p class="flex items-center text-lg font-semibold text-black">{{ feedback.brandName }}</p>
                <p class="flex items-center text-lg font-normal text-gray-500">{{ feedback.createdAt }}</p>
              </div>
            </div>
            <p class="flex items-center text-xl font-normal text-black">{{ feedback.feedback }}</p>
          </div>
        </div>
      </div>
    </div>

    <p class="flex items-center text-2xl font-bold text-black my-6">Enter your Feedback</p>

    <div class="flex flex-col lg:flex-row lg:gap-6 w-full p-5 bg-white rounded-md mb-3">
      <div class="flex flex-col w-full">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-white h-[100px] w-[100px] overflow-hidden rounded-full">
            <img class="h-auto w-auto" :src="loggedInUser.Img" alt="" />
          </div>
          <div>
            <p class="flex items-center text-lg font-bold text-black">{{ loggedInUser.Name }}</p>
          </div>
        </div>
        <form @submit.prevent="addFeedback" class="mt-6">
          <label for="comment" class="block mb-2">Add a comment:</label>
          <textarea id="comment" v-model="newFeedback" class="w-full p-2 border border-gray-300 rounded-lg mb-4" rows="4" placeholder="Write your comment here..."></textarea>
          <button type="submit" class="decidedBG text-white px-4 py-2 rounded-lg">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";

export default {
  name: "Feedbacks",
  components: {},

  data() {
    return {
      feedbackData: [],
      newFeedback: "",
      loggedInUser: {
        id: "",
        Name: "",
        Img: "",
      },
    };
  },

  mounted() {
    const User = localStorage.getItem("user-info");
    const user1 = JSON.parse(User);
    this.loggedInUser.Img = user1.user.brandImg;
    this.loggedInUser.Name = user1.user.brandName;
    this.loggedInUser.id = user1.user._id;
    this.getFeedbacks();
  },

  methods: {
    getFeedbacks() {
      axios
        .get("https://vdesigners.herokuapp.com/api/admin/getAllfeedback")
        .then((response) => {
          console.log(response.data);
          let data = response.data;
          data.forEach((element) => {
            this.feedbackData.push({
              _id: element._id,
              brandName: element.brandId.brandName,
              brandImg: element.brandId.brandImg,
              feedback: element.feedback,
              createdAt: format(new Date(element.createdAt), "MMM dd, yyyy, hh:mm:ss a"),
            });
          });
          console.log(this.feedbackData);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addFeedback() {
      axios
        .post(`http://localhost:5172/api/admin/postfeedback`, { brandId: this.loggedInUser.id, feedback: this.newFeedback })
        .then((response) => {
          if (response.data) {
            swal("Feedback Added Successfully", "", "success");
            this.newFeedback = "";
            this.feedbackData = [];
            this.getFeedbacks();
          } else {
            swal("Something went wrong", "", "error");
          }
        })
        .catch((error) => {
          console.error(error);
          // handle error
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
