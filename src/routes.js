import { createRouter, createWebHistory } from "vue-router";
import DashboardSuperAdmin from "./screens/DashboardSuperAdmin.vue";
import Login from "./screens/Login.vue";
import Signup from "./screens/Signup.vue";
import User from "./screens/user.vue";
import ViewBrands from "./screens/viewBrands.vue";
import AddBrand from "./screens/addBrand.vue";
import UpdateBrand from "./screens/updateBrand.vue";
import ViewDesigners from "./screens/viewDesigners.vue";
import AddDesigner from "./screens/addDesigner.vue";
import UpdateDesigner from "./screens/updateDesigner.vue";
import CreatePost from "./screens/createPost.vue";
import ViewPosts from "./screens/viewPosts.vue";
import Feedbacks from "./screens/feedbacks.vue";
import Subscriptions from "./screens/subscriptions.vue";
import Editor from "./screens/editor.vue";
import ThreeD from "./screens/3d.vue";
import Checkout from "./screens/checkout.vue";
import PatternGeneration from "./screens/patternGeneration.vue";
import ViewPayments from "./screens/viewPayments.vue";
import DashboardDesigner from "./screens/DashboardDesigner.vue";
import CreatePostD from "./screens/createPostD.vue";
import ViewPostsD from "./screens/viewPostsD.vue";
import ViewPost from "./screens/viewPost.vue"

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
    path: "/user/:pageName/:type",
    component: User,
    children: [

      { name:"Admin", path: "dbAdmin", component: DashboardSuperAdmin },

      {name:"ViewBrands", path: "viewBrands", component: ViewBrands },

      {name:"AddBrand", path: "addBrand", component: AddBrand },

      {name:"UpdateBrand", path: "updateBrand", component: UpdateBrand },

      {name:"ViewDesigners", path: "viewDesigners", component: ViewDesigners },

      {name:"AddDesigner", path: "addDesigner", component: AddDesigner},

      {name:"UpdateDesigner", path: "updateDesigner", component: UpdateDesigner },

      {name:"CreatePost", path: "createPost", component: CreatePost },

      {name:"ViewPosts", path: "viewPosts", component: ViewPosts },

      {name:"Feedbacks", path: "feedbacks", component: Feedbacks },

      {name:"Subscriptions", path: "subscriptions", component: Subscriptions },

      {name:"Editor", path: "editor", component: Editor },

      {name:"ThreeD", path: "3d", component: ThreeD },

      {name:"Checkout", path: "checkout/:priceId/:price/:plan", component: Checkout },

      {name:"PatternGeneration", path: "patternGeneration", component: PatternGeneration },

      {name:"ViewPayments", path: "viewPayments", component: ViewPayments },

      { name:"DashboardDesigner", path: "dbDesigner", component: DashboardDesigner },


      // { path: "posts", component: UserPosts }

    ],
  },

  // {
  //   path: "/designer/:pageName",
  //   component: Designer,
  //   children: [
      

  //     {name:"PatternGeneration", path: "patternGeneration", component: PatternGeneration },

  //     {name:"Editor", path: "editor", component: Editor },

  //     {name:"ThreeD", path: "3d", component: ThreeD },

  //     {name:"CreatePostD", path: "createPostd", component: CreatePostD },

  //     {name:"ViewPostsD", path: "viewPostsd", component: ViewPostsD },

  //     {name:"ViewPost", path: "viewPost/:id", component: ViewPost },

  //   ]
  // },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
