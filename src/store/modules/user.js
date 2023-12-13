import axios from "axios";
import { useCookies } from "vue3-cookies";
import router from "../../router/index";

const { cookies } = useCookies();

const state = {
  profile: {},
};

const getters = {};

const mutations = {
  setProfile: (state) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "token_value"
    )}`;
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/auth/profile`)
      .then((r) => {
        state.profile = r.data
      })
      .catch((e) => {
        console.log(e);
        // router.push('/');
      });
  },
};

const actions = {
  profile: (context) => {
    context.commit("setProfile")
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
