import { createApp } from 'vue'
import App from './App.vue'
import { format } from 'date-fns';
import router from './routes'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueApexCharts from 'vue3-apexcharts'

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatDate: (value, formatString = 'MM/dd/yyyy') => {
    return format(new Date(value), formatString);
  },
  toUpperCase: (value) => {
    return value.toUpperCase();
  },
  capitalizeWords: (value) => {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
};


app.use(vue3GoogleLogin, {
    clientId:
      "573677170788-bciffigkm91at8qpl53a7ps59mnmsv00.apps.googleusercontent.com", })
.component('EasyDataTable', Vue3EasyDataTable)
.use(VueSweetalert2)
.use(VueApexCharts)
.use(router)
.mount('#app')
