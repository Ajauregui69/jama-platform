<template>
  <li class="profile-nav onhover-dropdown pe-0 py-0">
    <div class="media profile-media">
      <!--<img class="b-r-10" :src="user.user_image" alt="" />-->
      <img class="profile-img rounded-circle" :src="user.user_image" />
      <div class="media-body">
        <span>{{ `${user.company_user_name} ${user.last_name}` }}</span>
        <p class="mb-0 font-roboto">
          {{ user.role }} <i class="middle fa fa-angle-down"></i>
        </p>
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div">
      <li>
        <router-link :to="'/users/profile'"
          ><vue-feather type="user"></vue-feather
          ><span>Account </span></router-link
        >
      </li>
      <li>
        <router-link :to="'/reports/all'"
          ><vue-feather type="mail"></vue-feather
          ><span>Inbox</span></router-link
        >
      </li>
      <li>
        <router-link :to="'/users/edit'"
          ><vue-feather type="settings"></vue-feather
          ><span>Settings</span></router-link
        >
      </li>
      <li>
        <a @click="logout"
          ><vue-feather type="log-in"></vue-feather><span>Log out</span></a
        >
      </li>
    </ul>
  </li>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { mapState } from "vuex";

export default {
  name: "Profile",
  setup() {
    const { cookies } = useCookies();

    return {
      cookies,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.profile,
    }),
  },
  methods: {
    logout: function () {
      this.$router.replace("/");
      this.cookies.remove("token_value");
    },
  },
};
</script>

<style lang="scss">
.profile-nav {
  .profile-img {
    width: 30px;
    height: 30px;
    background-position: center;
    background-size: cover;
  }
}
</style>
