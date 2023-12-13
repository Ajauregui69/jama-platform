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
                  <p class="mb-0">Here you can change the password</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="newPassword">
                    <div class="mb-3">
                      <input
                        v-model="state.password.password"
                        type="password"
                        class="form-control mb-3"
                        :class="v$.password.password.$error ? 'is-invalid' : ''"
                        @input="validatePassword"
                        name="password"
                        placeholder="Password"
                      />
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
                    </div>
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
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useLoading } from "vue3-loading-overlay";
import store from "../../store";

export default {
  name: "ResetIllustration",
  setup() {
    const notify = toast;
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
    const strongPassword = helpers.withParams(
      { type: "strongPassword" },
      (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value)
    );
    const state = reactive({
      error: false,
      email: "",
      password: {
        password: "",
        confirmPassword: "",
        strongPassword,
      },
    });

    const rules = computed(() => {
      return {
        password: {
          password: {
            required,
            minLength: minLength(8),
          },
          confirmPassword: {
            required,
            sameAs: sameAs(state.password.password),
          },
        },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
      passwordRules,
      notify,
    };
  },
  methods: {
    newPassword() {
      this.v$.$validate();
      if (this.v$.$errors.length > 0) {
        return;
      } else {
        store.dispatch("setShowLoader")
        axios
          .put(`${import.meta.env.VITE_API_CLIENT}/auth/newpassword`, {
            token: this.$route.params.token,
            password: this.state.password.password,
          })
          .then((r) => {
            store.dispatch("setHideLoader")
            this.notify.success("Password changed successfully!");
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
            store.dispatch("setHideLoader")
            this.notify.error(e.message);
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
          font-size: 12px;
        }
      }
    }
  }
}
</style>
