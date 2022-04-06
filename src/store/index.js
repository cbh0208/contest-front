import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{
      isLogin: window.localStorage.getItem("token") ? true : false,
      type:window.localStorage.getItem('type')
    }
  },
  getters: {
  },
  mutations: {
    setIsLogin(state, payload) {
      state.user.isLogin = payload
    },
    setType(state,payload){
      state.user.type=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
