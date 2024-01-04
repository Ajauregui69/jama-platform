import axios from "axios";

const state = {
  users: []
};
const getters = {};
const mutations = {
  hackers: (state) => {
    axios
      .get(`${import.meta.env.VITE_API_JAMA}/users/hackers`)
      .then((r) => {
        state.users = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  companies: (state) => {
    axios
      .get(`${import.meta.env.VITE_API_JAMA}/users/company`)
      .then((r) => {
        state.users = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
const actions = {
  hackers: (context) => {
    context.commit("hackers");
  },
  companies: (context) => {
    context.commit("companies");
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
