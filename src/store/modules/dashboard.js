import axios from "axios";

const state = {
  dashboard: []
};
const getters = {};
const mutations = {
  sbBySeverity: (state) => {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/dashboard`)
      .then((r) => {
        state.dashboard = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
const actions = {
  dashboard: (context) => {
    context.commit("sbBySeverity");
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
