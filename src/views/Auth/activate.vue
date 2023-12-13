<template>
  <main ref="fullPage" class="mt-0 main-content"></main>
</template>

<script>
import { ref } from "vue";
import { useLoading } from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import axios from "axios";
import { toast } from "vue3-toastify";
import store from "../../store";

export default {
  name: "Activate",
  components: {},
  setup() {
    const fullPage = ref(true);
    let formContainer = ref(null);
    let loader = useLoading();
    const notify = toast;
    return {
      loader,
      fullPage,
      formContainer,
      notify,
    };
  },
  computed: {
    token() {
      return this.$route.params.token;
    },
  },
  mounted() {
    store.dispatch("setShowLoader")

    axios
      .post(`${import.meta.env.VITE_API_CLIENT}/auth/activate/` + this.token)
      .then((r) => {
        store.dispatch("setHideLoader")
        this.notify.success("The user has been activated");
        this.$router.push({ path: "/" });
      })
      .catch((e) => {
        console.log(e);
        store.dispatch("setHideLoader")
        this.notify.error("Please verify the Token");
        this.$router.push({ path: "/" });
      });
  },
};
</script>

<style lang="scss" scoped></style>
