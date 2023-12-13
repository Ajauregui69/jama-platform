
import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const state = {
    payment: {},




};

const getters = {

};

const mutations = {
    getPayments(state) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
            "token_value"
        )}`;
        axios.get(`${import.meta.env.VITE_API_CLIENT}/payments`).then(r => {

            state.payments = r.data.payments

        }).catch(e => {
            console.log(e)
        })
    },

};

const actions = {
    show: (context) => {
        context.commit("getPayments")
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
