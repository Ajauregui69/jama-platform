import axios from "axios";

const state = {
    companyUserName: "",
    lastName: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    home_addres: "",
    country: "",
    city: "",
    postal_code: "",
    about_me: "",
    config:{},
};

const getters = {

};

const mutations = {

    setConfig: (state) => {
        axios
          .get(`${import.meta.env.VITE_API_CLIENT}/usersconfig`)
          .then((r) => {
            state.config = r.data.userConfig;
          })
          .catch((e) => {
            console.log(e);
          });
      },

    setBio: (state, value) => {
        state.bio = value;
    },
    setFirstname: (state, value) => {
        state.companyUserName = value;
    },
    setLastname: (state, value) => {
        state.lastName = value;
    },
    setLinkedin: (state, value) => {
        state.linkedin = value;
    },
    setGithub: (state, value) => {
        state.github = value;
    },
    setTwitter: (state, value) => {
        state.twitter = value;
    },
    setCountry: (state, value) => {
        state.country = value;
    },
    setAddres: (state, value) => {
        state.home_addres = value;
    },
    setCity: (state, value) => {
        state.city = value;
    },
    setPostal: (state, value) => {
        state.postal_code = value;
    },
    setAbout: (state, value) => {
        state.about_me = value;
    },

};

const actions = {
    config: (context) => {
        context.commit("setConfig");
      },
    userconfiguration: (context, payload) => {
        context.commit("createconfiguration", payload)
    },
    show: (context, payload) => {
        context.commit("setBio", payload.userConfig.bio);
        context.commit("setFirstname", payload.companyUserName);
        context.commit("setLastname", payload.lastName);
        context.commit("setLinkedin", payload.userConfig.linkedin);
        context.commit("setGithub", payload.userConfig.github);
        context.commit("setTwitter", payload.userConfig.twitter);
        context.commit("setCountry", payload.userConfig.country);
        context.commit("setAddres", payload.userConfig.home_addres);
        context.commit("setCity", payload.userConfig.city);
        context.commit("setPostal", payload.userConfig.postal_code);
        context.commit("setAbout", payload.userConfig.about_me);

    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
