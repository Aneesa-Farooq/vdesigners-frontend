<template>
  <div class="sidebar" :class="{ close: isSidebarClosed }">
    <div
      class="bg-white inline-flex items-center justify-center top-7 -right-4 absolute translate-x-full p-2 rounded-full">
      <button :class="`${isSidebarClosed ? '' : 'f-hidden'}`"
        class="bx bx-chevrons-right cursor-pointer text-[25px] text-[#64748b]" @click="toggleSidebar"></button>
      <button :class="`${isSidebarClosed ? 'f-hidden' : ''}`"
        class="bx bx-chevrons-left cursor-pointer text-[25px] text-[#64748b]" @click="toggleSidebar"></button>
    </div>

    <ul class="nav-links">
      <li v-for="(item, index) in menuItems" :key="index">
        <div v-if="item.hasOwnProperty('submenu')" class="iocn-link" @click="toggleSubMenu">
          <a href="#">
            <i :class="`${item.icon}`" class="bx"></i>
            <span class="link_name">{{ index + 1 }}. {{ item.name }}</span>
          </a>
          <i class="bx bxs-chevron-down arrow"></i>
        </div>
        <router-link v-else :to="item.path">
          <i :class="`${item.icon}`" class="bx"></i>
          <span class="link_name">{{ index + 1 }}. {{ item.name }}</span>
        </router-link>

        <ul v-if="item.hasOwnProperty('submenu')" class="sub-menu" :class="{ showMenu: isSubMenuOpen }">
          <li><a class="link_name" href="#">{{ item.name }}</a></li>
          <li><router-link :to="item.submenu[0].path">{{ index + 1 }}.1. {{ item.submenu[0].name }}</router-link></li>
          <li><router-link :to="item.submenu[1].path">{{ index + 1 }}.2. {{ item.submenu[1].name }}</router-link></li>
        </ul>
        <ul v-else class="sub-menu">
          <li><a class="link_name" href="#">{{ item.name }}</a></li>
        </ul>
      </li>

      <li>
        <a @click="logout">
          <i class="bx bx-log-out"></i>
          <span class="link_name">Logout</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    userType: String,
  },
  data() {
    return {
      number: 1,
      isSidebarClosed: true,
      isSubMenuOpen: false,
      menuItems: [],
      forAdmin: [
        {
          name: "Dashboard",
          path: "/user/Dashboard/admin/dbAdmin",
          icon: "bx-category",
        },
        {
          name: "Brands",
          icon: "bx-user",
          submenu: [
            {
              name: "Add Brand",
              path: "/user/Register Brand/admin/addBrand",
            },
            {
              name: "View Brands",
              path: "/user/Brands/admin/viewBrands",
            },
          ],
        },
        {
          name: "Designer",
          icon: "bx-user",
          submenu: [
            {
              name: "Add Designer",
              path: "/user/Register Designer/admin/addDesigner",
            },
            {
              name: "View Designers",
              path: "/user/Designers/admin/viewDesigners",
            },
          ],
        },
        {
          name: "Posts",
          icon: "bx-images",
          submenu: [
            {
              name: "Create Posts",
              path: "/user/Create a new post/admin/createPost",
            },
            {
              name: "View Posts",
              path: "/user/Posts/admin/viewPosts",
            },
          ],
        },
        {
          name: "Pattern Generation",
          path: "/user/AI/admin/patternGeneration",
          icon: "bx-layer",
        },
        {
          name: "Editor",
          path: "/user/Editor/admin/editor",
          icon: "bx-edit",
        },
        {
          name: "3D",
          path: "/user/3D/admin/3d",
          icon: "bx-layer",
        },
        {
          name: "Feedbacks",
          path: "/user/Feedbacks/admin/feedbacks",
          icon: "bx-like",
        },
        {
          name: "Subscription",
          path: "/user/Subscription plans/admin/subscriptions",
          icon: "bx-dollar-circle",
        },
        {
          name: "Payments",
          path: "/user/Payments/admin/viewPayments",
          icon: "bx-wallet",
        }
      ],
      forBrand: [
        {
          name: "Dashboard",
          path: "/user/Dashboard/brand/dbBrand",
          icon: "bx-category",
        },
        {
          name: "Designer",
          icon: "bx-user",
          submenu: [
            {
              name: "Add Designer",
              path: "/user/Register Designer/brand/addDesigner",
            },
            {
              name: "View Designers",
              path: "/user/Designers/brand/viewDesigners",
            },
          ],
        },
        {
          name: "Posts",
          icon: "bx-images",
          path: "/user/Posts/brand/viewPosts",
        },
        {
          name: "Feedbacks",
          icon: "bx-like",
          path: "/user/Feedbacks/brand/feedbacks",
        },
        {
          name: "Subscriptions",
          icon: "bx-dollar-circle",
          path: "/user/Subscription plans/brand/subscriptions",
        }
      ],
      forDesigner: [
        {
          name: "Dashboard",
          path: "/user/Dashboard/designer/dbDesigner",
          icon: "bx-category",
        },
        {
          name: "Posts",
          icon: "bx-images",
          submenu: [
            {
              name: "Create Posts",
              path: "/user/Create a new post/designer/createPost",
            },
            {
              name: "View Posts",
              path: "/user/Posts/designer/viewPosts",
            },
          ],
        },
        {
          name: "Pattern Generation",
          icon: "bx-layer",
          path: "/user/AI/designer/patternGeneration",
        },
        {
          name: "Editor",
          icon: "bx-edit",
          path: "/user/Editor/designer/editor",
        },
        {
          name: "3D",
          icon: "bx-layer",
          path: "/user/3D/designer/3d",
        }
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarClosed = !this.isSidebarClosed;
      localStorage.setItem("is_closed", this.isSidebarClosed);
      if (this.isSidebarClosed) {
        document.documentElement.style.setProperty("--sidebar-width", "78px");
      } else {
        document.documentElement.style.setProperty("--sidebar-width", "260px");
      }
    },
    toggleSubMenu(event) {
      this.isSubMenuOpen = !this.isSubMenuOpen;
      event.currentTarget.parentElement.classList.toggle("showMenu");
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    applyImportantStyleToClass(className, property, value) {
      var style = document.createElement('style');
      var cssRule = `.${className} { ${property}: ${value} !important; }`;

      if (style.styleSheet) {
        // For Internet Explorer
        style.styleSheet.cssText = cssRule;
      } else {
        // For other browsers
        style.appendChild(document.createTextNode(cssRule));
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    },
  },
  mounted() {
    if (this.userType === "admin") {
      this.menuItems = this.forAdmin;

      this.applyImportantStyleToClass("sidebar", "background-color", "#20c997")
      this.applyImportantStyleToClass("sub-menu", "background-color", "#20c997")
    } else if (this.userType === "designer") {
      this.menuItems = this.forDesigner;

      this.applyImportantStyleToClass("sidebar", "background-color", "#F3677F")
      this.applyImportantStyleToClass("sub-menu", "background-color", "#F3677F")
    } else {
      this.menuItems = this.forBrand;

      this.applyImportantStyleToClass("sidebar", "background-color", "#20c997")
      this.applyImportantStyleToClass("sub-menu", "background-color", "#20c997")
    }

    if (localStorage.getItem("is_closed") === "true") {
      this.isSidebarClosed = true;
      document.documentElement.style.setProperty("--sidebar-width", "78px");
    } else {
      this.isSidebarClosed = false;
      document.documentElement.style.setProperty("--sidebar-width", "260px");
    }
  },
};
</script>

<style scoped>
.bg-admin-submenu {
  background-color: #20c997 !important;
}

.bg-designer-submenu {
  background-color: #F3677F !important;
}

.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width);
  /* background: #20c997; */
  z-index: 100;
  transition: all 0.5s ease;
}

.sidebar.close {
  width: var(--sidebar-width);
}

.sidebar .logo-details {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidebar .logo-details>a {
  font-size: 30px;
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
}

.sidebar .logo-details .logo_name {
  font-size: 22px;
  color: white;
  font-weight: 600;
  transition: 0.3s ease;
  transition-delay: 0.1s;
}

.sidebar.close .logo-details .logo_name {
  transition-delay: 0s;
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links {
  height: 100%;
  padding: 10px 0 150px 0;
  overflow: auto;
}

.sidebar.close .nav-links {
  overflow: visible;
}

.sidebar .nav-links::-webkit-scrollbar {
  display: none;
}

.sidebar .nav-links li {
  position: relative;
  list-style: none;
  transition: all 0.4s ease;
}

.sidebar .nav-links li:hover {
  background: #b6dfb894;
}

.sidebar .nav-links li .iocn-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar.close .nav-links li .iocn-link {
  display: block;
}

.sidebar .nav-links li i {
  height: 50px;
  min-width: 78px;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 20px;
  font-weight: 100;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar .nav-links li.showMenu i.arrow {
  transform: rotate(-180deg);
}

.sidebar.close .nav-links i.arrow {
  display: none;
}

.sidebar .nav-links li a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.sidebar .nav-links li a .link_name {
  font-size: 18px;
  font-weight: 400;
  color: white;
  transition: all 0.4s ease;
}

.sidebar.close .nav-links li a .link_name {
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links li .sub-menu {
  padding: 6px 6px 14px 80px;
  margin-top: -10px;
  /* background:#20c997; */
  display: none;
}

.sidebar .nav-links li.showMenu .sub-menu {
  display: block;
}

.sidebar .nav-links li .sub-menu a {
  color: white;
  font-size: 17px;
  padding: 7px 16px;
  white-space: nowrap;
  opacity: 1;
  transition: all 0.3s ease;
}

.sidebar .nav-links li .sub-menu a:hover {
  opacity: 1;
}

.sidebar.close .nav-links li .sub-menu {
  position: absolute;
  left: 100%;
  top: -10px;
  margin-top: 0;
  padding: 10px 20px;
  border-radius: 0 6px 6px 0;
  opacity: 0;
  display: block;
  pointer-events: none;
  transition: 0s;
}

.sidebar.close .nav-links li:hover .sub-menu {
  top: 0;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
}

.sidebar .nav-links li .sub-menu .link_name {
  display: none;
}

.sidebar.close .nav-links li .sub-menu .link_name {
  font-size: 18px;
  opacity: 1;
  display: block;
}

.sidebar .nav-links li .sub-menu.blank {
  opacity: 1;
  pointer-events: auto;
  padding: 3px 20px 6px 16px;
  opacity: 0;
  pointer-events: none;
}

.sidebar .nav-links li:hover .sub-menu.blank {
  top: 50%;
  transform: translateY(-50%);
}

.sidebar .profile-details {
  position: fixed;
  bottom: 0;
  width: var(--sidebar-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f6f9;
  padding: 12px 0;
  transition: all 0.5s ease;
}

.sidebar.close .profile-details {
  background: none;
}

.sidebar.close .profile-details {
  width: var(--sidebar-width);
}

.sidebar .profile-details .profile-content {
  display: flex;
  align-items: center;
}

.sidebar .profile-details img {
  height: 52px;
  width: 52px;
  object-fit: cover;
  border-radius: 16px;
  margin: 0 14px 0 12px;
  background: #f4f6f9;
  transition: all 0.5s ease;
}

.sidebar.close .profile-details img {
  padding: 10px;
}

.sidebar .profile-details .profile_name,
.sidebar .profile-details .job {
  color: #1e293b;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
}

.sidebar.close .profile-details i,
.sidebar.close .profile-details .profile_name,
.sidebar.close .profile-details .job {
  display: none;
}

.sidebar .profile-details .job {
  font-size: 12px;
}

.f-hidden {
  display: none !important;
}

@media screen and (max-width: 700px) {
  .sidebar {
    position: fixed;
    width: var(--sidebar-width);
  }

  .sidebar.close {
    transform: translateX(-78px);
    width: var(--sidebar-width);
  }

  .sidebar .profile-details {
    width: var(--sidebar-width);
  }

  .sidebar.close .profile-details {
    background: none;
  }

  .sidebar.close .profile-details {
    width: var(--sidebar-width);
  }
}</style>
