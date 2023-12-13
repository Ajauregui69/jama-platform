import { createStore } from "vuex";

import layout from "./modules/layout";
import menu from "./modules/menu";
import chat from "./modules/chat";
import product from "./modules/product";
import todo from "./modules/todo";
import contact from "./modules/contact";
import jobs from "./modules/jobs";
import courses from "./modules/courses";
import common from "./modules/common";
import tags from "./modules/tags";
import bootsrap from "./modules/bootsrap";
import user from "./modules/user";
import programs from "./modules/programs";
import reports from "./modules/reports";
import userconfig from "./modules/userconfig";
import dashboard from "./modules/dashboard";
import payments from "./modules/payments";
import loader from "./modules/loader"


export default createStore({
  state: { langIcon: "", langLangauge: "", isActive: false },
  getters: {
    langIcon: (state) => {
      return state.langIcon;
    },
    langLangauge: (state) => {
      return state.langLangauge;
    },
  },
  mutations: {
    changeLang(state, payload) {
      localStorage.setItem("currentLanguage", payload.id);
      localStorage.setItem("currentLanguageIcon", payload.icon);
      state.langIcon = payload.icon || "flag-icon-us";
      state.langLangauge = payload.id || "EN";
    },
    change(state) {
      state.isActive = !state.isActive;
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit("changeLang", payload);
    },
  },
  modules: {
    alert,
    layout,
    chat,
    menu,
    todo,
    tags,
    jobs,
    courses,
    common,
    contact,
    bootsrap,
    user,
    programs,
    reports,
    userconfig,
    dashboard,
    payments,
    loader
  },
});
