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
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="signIn">
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
                    <div class="mb-3">
                      <input
                        v-model="state.password.password"
                        type="password"
                        class="form-control"
                        :class="v$.password.password.$error ? 'is-invalid' : ''"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <vsud-switch id="rememberMe" name="rememberMe">
                      Remember me
                    </vsud-switch>

                    <div class="text-center">
                      <button
                        class="btn btn-primary btn-block w-100"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <span class="mx-auto mb-4 text-sm"> Forgot password? </span>
                  <router-link
                    :to="{ path: '/recover' }"
                    class="text-success text-gradient font-weight-bold"
                    >Reset Password</router-link
                  >
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <span class="mx-auto mb-4 text-sm">
                    Don't have an account?
                  </span>
                  <router-link
                    class="text-success text-gradient font-weight-bold"
                    :to="{ path: '/signup' }"
                    >Signup</router-link
                  >
                </div>
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="image-container position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
              >
                <div class="position-relative">
                  <img
                    class="max-width-500 w-100 position-relative z-index-2"
                    src="../../assets/images/illustrations/jama_dragon.svg"
                    alt="chat-img"
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
import { useCookies } from "vue3-cookies";
import { reactive, computed, ref } from "vue";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import VsudSwitch from "../../components/VsudSwitch.vue";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
import store from "../../store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {
  name: "SigninIllustration",
  components: {
    VsudSwitch,
  },
  setup() {
    const fullPage = ref(true);
    let formContainer = ref(null);
    const { cookies } = useCookies();
    const state = reactive({
      error: false,
      email: "",
      password: {
        password: "",
      },
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        password: {
          password: {
            required,
            minLength: minLength(6),
          },
        },
      };
    });

    const v$ = useValidate(rules, state);

    const notify = toast

    return {
      state,
      v$,
      fullPage,
      formContainer,
      cookies,
      notify 
    };
  },
  methods: {
    signIn() {
      this.v$.$validate();
      if (this.v$.$errors.length > 0) {
        return;
      } else {
        store.dispatch("setShowLoader")
        axios
          .post(`${import.meta.env.VITE_API_CLIENT}/auth/login`, {
            email: this.state.email,
            password: this.state.password.password,
          })
          .then((r) => {
            this.cookies.set("token_value", r.data.token);
            this.notify.success("Welcome!");
            store.dispatch("setHideLoader")
            this.$router.push("/app");
          })
          .catch((e) => {
            console.log(e);
            store.dispatch("setHideLoader")
            this.notify.error("Invalid credentials");
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
