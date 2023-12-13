import axios from "axios";
const state = {
  reports: [],
  report: {},
  reportReply: {},
  reportsAll: 0,
  reportsTriaged: 0,
  reportsDuplicated: 0,
  reportsNew: 0,
  reportsPendingPay: 0,
  reportsPaid: 0,
  evidenceFiles: [],
  assets: "",
  weakness: "",
  severity: "",
  rating: "",
  title: "",
  description: "",
  impact: "",
};
//severity is the number
//rating is the level (low,medium.high)
const saveStateToLocalStorage = (state) => {
  localStorage.setItem("appState", JSON.stringify(state));
};
const getters = {};

const mutations = {
  reportsList: (state, value) => {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/reports/${value}`)
      .then((r) => {
        state.reports = r.data.reports;
        state.reportsAll = r.data.reportsAll;
        state.reportsDuplicated = r.data.reportsDuplicated;
        state.reportsTriaged = r.data.reportsTriaged;
        state.reportsNew = r.data.reportsNew;
        state.reportsPendingPay = r.data.reportsPendingPay;
        state.reportsPaid = r.data.reportsPaid;

        saveStateToLocalStorage(state);

      })
      .catch((e) => {
        console.log(e);
      });
  },
  reportDetail: (state, value) => {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/report/${value}`)
      .then((r) => {
        state.report = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  reportReply: (state) => {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/reply`)
      .then((r) => {
        state.reportReply = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  setAsset: (state, value) => {
    state.assets = value;
  },
  setWeak: (state, value) => {
    state.weakness = value;
  },
  setSeverity: (state, value) => {
    state.severity = value;
  },
  setRating: (state, value) => {
    state.rating = value;
  },
  setTitle: (state, value) => {
    state.title = value;
  },
  setDes: (state, value) => {
    state.description = value;
  },
  setImp: (state, value) => {
    state.impact = value;
  },
  setEvidenceFiles(state, files) {
    state.evidenceFiles = files;
  },
};

const actions = {
  report: (context, payload) => {
    context.commit("createReport", payload);
  },
  index: (context, payload) => {
    context.commit("reportsList",payload);
  },
  show: (context, payload) => {
    context.commit("reportDetail", payload);
  },
  reply: (context) => {
    context.commit("reportReply");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
