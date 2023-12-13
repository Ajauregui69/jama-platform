<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100 auth-page">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Reset password</h4>
                  <p class="mb-0">
                    You will receive an e-mail in maximum 60 seconds
                  </p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="recover">
                    <div class="mb-3">
                      <input
                        v-model="state.email"
                        type="email"
                        class="form-control"
                        :class="v$.email.$error ? 'is-invalid' : ''"
                        name="companyEmail"
                        placeholder="Company Email"
                      />
                    </div>
                    <div class="text-center">
                      <button
                        type="submit"
                        class="btn btn-primary btn-block w-100"
                        variant="gradient"
                        color="success"
                        full-width
                        size="lg"
                      >
                        Send
                      </button>
                      <div class="card-footer text-center pt-0 px-sm-4">
                        <p class="mt-4 mx-auto">Already have an account?</p>
                        <router-link
                          :to="{ path: '/' }"
                          class="text-success text-gradient font-weight-bold"
                          >Sign in
                        </router-link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="m-3 position-relative image-container h-100 px-7 border-radius-lg d-flex flex-column justify-content-center"
              >
                <div class="position-relative">
                  <img
                    class="max-width-500 w-100 position-relative z-index-2"
                    src="../../assets/images/illustrations/lock.png"
                    alt="lock-svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { useLoading } from "vue3-loading-overlay";
import { toast } from "vue3-toastify";
import axios from "axios";
import store from "../../store";
export default {
  name: "ResetIllustration",
  setup() {
    const state = reactive({
      error: false,
      email: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email },
      };
    });

    const v$ = useValidate(rules, state);
    const notify = toast;

    return {
      state,
      v$,
      notify,
    };
  },
  methods: {
    recover() {
      this.v$.$validate();
      if (this.v$.$errors.length > 0) {
        return;
      } else {
        store.dispatch("setShowLoader")

        axios
          .post(`${import.meta.env.VITE_API_CLIENT}/auth/forgotPassword`, {
            email: this.state.email,
          })
          .then(() => {
            this.notify.success("Password reset link sent to your email.");
            store.dispatch("setHideLoader")
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
            store.dispatch("setHideLoader")
            this.notify.error("Something went wrong please verify your information");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  align-items: center;

  .card {
    box-shadow: none;
  }
  .card-header,
  .card-body,
  .card-footer {
    border: none;
  }
  .image-container {
    background-image: linear-gradient(310deg, #0c2bae 0%, #00a2f8 100%);
    border-radius: 0.75rem;

    img {
      max-width: 500px;
    }
  }
}
</style>
