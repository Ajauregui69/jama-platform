const state = {
    loader: false
}

const getters = {
    getLoader(state){
        return state.loader
    }
}

const mutations = {
    showLoader(state){
        state.loader = true
    },
    hideLoader(state){
        state.loader = false
    }
}

const actions = {
    setShowLoader(context){
        context.commit('showLoader')
    },
    setHideLoader(context){
        context.commit('hideLoader')
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}