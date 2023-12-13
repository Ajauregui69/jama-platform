import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const state = {
  programs: [],
  meta: {},
  program: {},
  programReport: {},
  assets: [],
  vulns: [],
  rewards: [],
  options: [],
  selectedVulns: []
};
const getters = {
  getRewards(state) {
    return state.rewards
  }
};
const mutations = {
  setPrograms: (state, payload) => {
    state.programs = [];
    const apiUrl = payload
      ? `${import.meta.env.VITE_API_CLIENT}/programs?${payload}`
      : `${import.meta.env.VITE_API_CLIENT}/programs?`;

    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "token_value"
    )}`;
    axios
      .get(apiUrl)
      .then((r) => {
        state.programs = r.data.data;
        state.meta =r.data.meta;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  getProgramDetail(state, payload) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
      "token_value"
    )}`;
    axios.get(`${import.meta.env.VITE_API_CLIENT}/programs/${payload}`).then(r => {
      state.assets = r.data.assets
      state.program = r.data.program
      state.programReport = r.data.programReport
      state.rewards = r.data.rewards
      state.selectedVulns = r.data.vulns
      state.vulns = []
      r.data.vulns.forEach((e) => {
        state.vulns.push(e.id);
      });
    }).catch(e => {
      console.log(e)
    })
  },
  getVulns(state) {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/vulns`)
      .then((r) => {
        r.data.forEach((element) => {
          state.options.push({ label: element.name, value: element.id });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
const actions = {
  index: (context, payload) => {
    context.commit("setPrograms", payload);
  },
  show: (context, payload) => {
    context.commit("getProgramDetail", payload)
  },
  vulns: (context) => {
    context.commit("getVulns")
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
