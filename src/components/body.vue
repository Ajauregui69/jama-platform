<template>
  <div>
    <!-- <div class="page-wrapper" id="pageWrapper" :class="{'horizontal-wrapper':sidebar=='horizontal-wrapper','compact-wrapper':sidebar=='compact-sidebar1'}"> -->
    <div class="page-wrapper" id="pageWrapper" :class="layoutobj">
      <div class="page-header" :class="{ close_icon: !togglesidebar }">
        <Header @clicked="sidebar_toggle" />
      </div>

      <div class="page-body-wrapper">
        <!-- <div class="bg-overlay" :class="{active: activeoverlay }" @click="removeoverlay()"></div> -->
        <div
          class="sidebar-wrapper"
          :class="[{ close_icon: !togglesidebar }]"
          :sidebar-layout="svg == 'stroke-svg' ? 'stroke-svg' : 'fill-svg'"
        >
          <Sidebar @clicked="sidebar_toggle" />
        </div>
        <div class="page-body" @click="hidesecondmenu()">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
      </div>
      <TapTop />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { layoutClasses } from "../components/constants/layout";
import Header from "./header/index.vue";
import Sidebar from "./sidebar/index.vue";
import TapTop from "./tapTop.vue";
import store from "../store"

export default {
  name: "mainpage",
  props: ["sidebar_toggle_var"],
  components: {
    Header,
    Sidebar,
    TapTop,
  },
  data() {
    return {
      loading: true,
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      horizontal_Sidebar: true,
      resized: false,
      layoutobj: {},
    };
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.data,
      layout: (state) => state.layout.layout,
      togglesidebar: (state) => state.menu.togglesidebar,
      activeoverlay: (state) => state.menu.activeoverlay,
      svg: (state) => state.layout.svg,
    }),
    ...mapGetters({
      sidebar: "layout/sidebar",
    }),
    layoutobject: {
      get: function () {
        return JSON.parse(
          JSON.stringify(
            layoutClasses.find(
              (item) => Object.keys(item).pop() === this.layout.settings.layout
            )
          )
        )[this.layout.settings.layout];
      },
      set: function () {
        this.layoutobj = layoutClasses.find(
          (item) => Object.keys(item).pop() === this.layout.settings.layout
        );
        this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[
          this.layout.settings.layout
        ];
        return this.layoutobj;
      },
    },
  },
  watch: {
    $route() {
      this.menuItems.filter((items) => {
        if (items.path === this.$route.path)
          this.$store.dispatch("menu/setActiveRoute", items);
        if (!items.children) return false;
        items.children.filter((subItems) => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch("menu/setActiveRoute", subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch("menu/setActiveRoute", subSubItems);
          });
        });
      });
      this.layoutobj = layoutClasses.find(
        (item) => Object.keys(item).pop() === this.layout.settings.layout
      );

      if (
        (window.innerWidth < 991 &&
          this.layout.settings.layout === "LosAngeles") ||
        (window.innerWidth < 991 &&
          this.layout.settings.layout === "Singapore") ||
        (window.innerWidth < 991 && this.layout.settings.layout === "Barcelona")
      ) {
        const newlayout = JSON.parse(
          JSON.stringify(this.layoutobj).replace(
            "horizontal-wrapper",
            "compact-wrapper"
          )
        );

        this.layoutobj = JSON.parse(JSON.stringify(newlayout))[
          this.layout.settings.layout
        ];
      } else {
        this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[
          this.layout.settings.layout
        ];
      }
    },
    sidebar_toggle_var: function () {
      this.resized =
        this.width <= 991 ? !this.sidebar_toggle_var : this.sidebar_toggle_var;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch("layout/set");
    this.layout.settings.layout = this.$route.query.layout
      ? this.$route.query.layout
      : "Dubai";
    this.layoutobj = layoutClasses.find(
      (item) => Object.keys(item).pop() === this.layout.settings.layout
    );
    this.layoutobj = JSON.parse(JSON.stringify(this.layoutobj))[
      this.layout.settings.layout
    ];
  },
  methods: {
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value;
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value;
    },
    handleResize() {
      this.$store.dispatch("menu/resizetoggle");
    },
    removeoverlay() {
      this.$store.state.menu.activeoverlay = false;
      if (window.innerWidth < 991) {
        this.$store.state.menu.togglesidebar = false;
      }
      this.menuItems.filter((menuItem) => {
        menuItem.active = false;
      });
    },
    hidesecondmenu() {
      if (this.layoutobject.split(" ").includes("compact-sidebar")) {
        this.menuItems.filter((menuItem) => {
          menuItem.active = false;
        });
      }
      if (window.innerWidth < 991) {
        this.$store.state.menu.togglesidebar = false;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("user/profile");
    store.dispatch("dashboard/dashboard");
    next();
  },
};
</script>
