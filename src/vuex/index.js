import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {},
  login: false,
  loginUuid: null
}
const mutations = {
  setUserInfo (state, userInfo) {
    if (userInfo) {
      state.login = true
    } else {
      state.login = false
    }
    state.userInfo = userInfo || {}
  },
  setLoginUuid (state, loginUuid) {
    if (loginUuid) {
      state.login = true
    } else {
      state.login = false
    }
    state.loginUuid = loginUuid || null
  }
}
export default new Vuex.Store({
  state,
  mutations
})
