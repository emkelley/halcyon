import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    logs: [],
  },
  getters: {
    logs: (state) => state.logs,
  },
  mutations: {
    pushLog(state, log) {
      state.logs.push(log);
    },
    purgeLogs(state) {
      state.logs = [];
    },
  },
  plugins: [vuexLocal.plugin],
});
