<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100 auth-page">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto singup-form"
            >
              <div class="card card-plain">
                <div class="card-header pb-0 text-left">
                  <h4 class="font-weight-bolder">Sign Up</h4>
                  <p class="mb-0">Enter your information to Sing Up</p>
                </div>
                <div class="card-body pb-3">
                  <form
                    ref="formContainer"
                    role="form"
                    @submit.prevent="signUp"
                  >
                    <div class="row">
                      <div class="col-6">
                        <label>Last Name</label>
                        <input
                          v-model="state.lastName"
                          type="text"
                          class="form-control"
                          :class="v$.lastName.$error ? 'is-invalid' : ''"
                          name="lastName"
                          placeholder="Last Name"
                        />
                      </div>
                      <div class="col-6">
                        <label>Name</label>
                        <input
                          v-model="state.name"
                          type="text"
                          class="form-control"
                          :class="v$.name.$error ? 'is-invalid' : ''"
                          name="name"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <label>Company Email</label>
                    <input
                      v-model="state.email"
                      type="email"
                      class="form-control"
                      :class="v$.email.$error ? 'is-invalid' : ''"
                      name="companyEmail"
                      placeholder="Company Email"
                    />
                    <label>Password</label>

                    <input
                      v-model="state.password.password"
                      type="password"
                      class="form-control"
                      :class="v$.password.password.$error ? 'is-invalid' : ''"
                      name="password"
                      placeholder="Password"
                      @input="validatePassword"
                    />

                    <label>Confirm Password</label>
                    <input
                      v-model="state.password.confirmPassword"
                      type="password"
                      class="form-control"
                      :class="
                        v$.password.confirmPassword.$error ? 'is-invalid' : ''
                      "
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <div class="password-rules">
                      <ul>
                        <li
                          v-for="rule in passwordRules"
                          :key="rule.rule"
                          :class="{
                            valid: rule.isValid,
                            invalid: !rule.isValid,
                          }"
                        >
                          <span v-if="rule.isValid" class="icon tick">✔</span>
                          <span v-else class="icon cross">✘</span>
                          <span>{{ rule.text }}</span>
                        </li>
                      </ul>
                    </div>

                    <div class="form-check">
                      <input
                        id="terms"
                        :checked="state.terms"
                        class="form-check-input"
                        type="checkbox"
                        name="terms"
                        @change="setTerms"
                      />
                      <label for="terms" class="custom-control-label">
                        I agree the
                        <a
                          target="_blank"
                          href="https://jamasecurity.com/terms-conditions/"
                          class="text-dark font-weight-bolder"
                          >Terms and Conditions</a
                        >
                      </label>
                    </div>
                    <span v-if="v$.terms.$error" class="font-weight-bolder"
                      >Please check terms and conditions</span
                    >
                    <div class="text-center">
                      <button
                        class="btn btn-primary btn-block w-100"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-sm-4 px-1">
                  <p class="mb-4 mx-auto">Already have an account?</p>
                  <router-link
                    :to="{ path: '/' }"
                    class="text-success text-gradient font-weight-bold"
                    >Sign in
                  </router-link>
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
                    src="../../assets/images/illustrations/jama_empresa.svg"
                    alt="rocket"
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
import { defineComponent } from "vue";
import { useLoading } from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import { reactive, computed, ref } from "vue";
import useValidate from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import axios from "axios";
import { toast } from 'vue3-toastify';
import store from "../../store";

export default defineComponent({
  name: "Signup",
  components: {},
  setup() {
    const fullPage = ref(true);
    let formContainer = ref(null);
    const passwordRules = reactive([
      { rule: "length", text: "At least 8 characters long", isValid: false },
      { rule: "digit", text: "Contains at least one digit", isValid: false },
      {
        rule: "lowercase",
        text: "Contains at least one lowercase letter",
        isValid: false,
      },
      {
        rule: "uppercase",
        text: "Contains at least one uppercase letter",
        isValid: false,
      },
      {
        rule: "special",
        text: "Contains at least one special character (!@#$%^&*)",
        isValid: false,
      },
    ]);
    const state = reactive({
      title: "",
      error: false,
      lastName: "",
      name: "",
      email: "",
      password: {
        password: "",
        confirmPassword: "",
      },
      terms: false,
    });

    const strongPassword = helpers.withParams(
      { type: "strongPassword" },
      (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value)
    );

    const rules = computed(() => {
      return {
        lastName: { required },
        name: { required },
        email: { required, email },
        password: {
          password: {
            required,
            strongPassword,
          },
          confirmPassword: {
            required,
            sameAs: sameAs(state.password.password),
          },
        },
        terms: { required, sameAs: sameAs(true) },
      };
    });

    const v$ = useValidate(rules, state);

    const notify = toast

    return {
      state,
      v$,
      fullPage,
      formContainer,
      passwordRules,
      notify
    };
  },

  methods: {
    signUp() {
      this.v$.$validate();
      if (this.v$.$errors.length > 0) {
        return;
      } else {
        store.dispatch("setShowLoader")
        axios
          .post(`${import.meta.env.VITE_API_JAMA}/auth/singup`, {
            email: this.state.email,
            password: this.state.password.password,
            company_user_name: this.state.name,
            last_name: this.state.lastName,
          })
          .then((r) => {
            this.notify.success("Thanks for joining JAMA Security");
            store.dispatch("setHideLoader")
            this.$router.push("/")
          })
          .catch((e) => {
            console.log(e);
            store.dispatch("setHideLoader")
            this.notify.error(e.response.data.message);
          });
      }
    },
    validatePassword() {
      const { passwordRules } = this;

      let password = this.state.password.password;

      passwordRules.forEach((rule) => {
        switch (rule.rule) {
          case "length":
            rule.isValid = password.length >= 8;
            break;
          case "digit":
            rule.isValid = /\d/.test(password);
            break;
          case "lowercase":
            rule.isValid = /[a-z]/.test(password);
            break;
          case "uppercase":
            rule.isValid = /[A-Z]/.test(password);
            break;
          case "special":
            rule.isValid = /[!@#$%^&*]/.test(password);
            break;
          default:
            rule.isValid = false;
            break;
        }
      });
    },
    setTerms(e) {
      this.state.terms = e.target.checked;
    },
  },
});
</script>

<style lang="scss" scoped>
span {
  color: red;
  font-size: 12px;
}

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
  .password-rules {
    margin: 10px 10px;
    ul {
      li {
        .icon {
          margin-right: 5px;
        }
        .tick {
          color: green;
        }
        .cross {
          color: red;
        }
        span {
          color: black;
        }
      }
    }
  }
}
</style>
