import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {},
  login: false,
  userid: null
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
  setUserid (state, userid) {
    if (userid) {
      state.login = true
    } else {
      state.login = false
    }
    state.userid = userid || null
  }
}
export default new Vuex.Store({
  state,
  mutations
})
