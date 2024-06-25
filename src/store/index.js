import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    log: {
      auth: false
    },
    conf: {
      dark_mode: true
    }
  },
  mutations: {
    LOGIN: (state, data) => {
      state.log = data;
    },
    LOGOUT: state => {
      state.log = {
        auth: false
      };
    },
    DARKMODE: state => {
      state.conf.dark_mode = !state.conf.dark_mode;
    },
  },
  actions: {
    logInAction: (context, data) => {
      context.commit('LOGIN', data);
    },
    logOutAction: context => {
      context.commit('LOGOUT');
    },
    darkModeAction: context => {
      context.commit('DARKMODE');
    },
  },
  getters: {
    getLog: state => {
      return state.log;
    },
    getDarkMode: state => {
      return state.conf.dark_mode;
    }
  },
  plugins: [createPersistedState()],
})
