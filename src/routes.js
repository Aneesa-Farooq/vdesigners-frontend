import { createRouter, createWebHistory } from "vue-router";
import DashboardSuperAdmin from "./screens/DashboardSuperAdmin.vue";
import Login from "./screens/Login.vue";
import Signup from "./screens/Signup.vue";
import User from "./screens/user.vue";
import viewBrands from "./screens/viewBrands.vue";

const routes = [
  {
    name: "Signup",
    path: "/",
    component: Signup,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    path: "/user/:pageName",
    component: User,
    children: [

      { name:"Admin", path: "dbAdmin", component: DashboardSuperAdmin },

      {name:"ViewBrands", path: "viewBrands", component: viewBrands },

      // { path: "posts", component: UserPosts }

    ],
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
