import { createRouter, createWebHistory } from "vue-router";
import DashboardSuperAdmin from "./screens/DashboardSuperAdmin.vue";
import Login from "./screens/Login.vue";
import Signup from "./screens/Signup.vue";
import User from "./screens/user.vue";
import ViewBrands from "./screens/viewBrands.vue";
import AddBrand from "./screens/addBrand.vue";
import ViewDesigners from "./screens/viewDesigners.vue";
import CreatePost from "./screens/createPost.vue";
import ViewPosts from "./screens/viewPosts.vue";
import Feedbacks from "./screens/feedbacks.vue";
import Subscriptions from "./screens/subscriptions.vue";
import Editor from "./screens/Editor.vue";

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

      {name:"ViewBrands", path: "viewBrands", component: ViewBrands },

      {name:"AddBrand", path: "addBrand", component: AddBrand },

      {name:"ViewDesigners", path: "viewDesigners", component: ViewDesigners },

      {name:"CreatePost", path: "createPost", component: CreatePost },

      {name:"ViewPosts", path: "viewPosts", component: ViewPosts },

      {name:"Feedbacks", path: "feedbacks", component: Feedbacks },

      {name:"Subscriptions", path: "subscriptions", component: Subscriptions },

      {name:"Editor", path: "editor", component: Editor },


      // { path: "posts", component: UserPosts }

    ],
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
