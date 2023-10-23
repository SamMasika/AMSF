import axios from "axios";

export default {
  namespaced: true,
  state: {
    access_token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.access_token && state.user;
    },
    user(state) {
      return state.user;
    },
   
    firstname(state) {
      return state.user ? state.user.fname : null;
    },
    lastName(state) {
      return state.user ? state.user.lname : null;
    },
    userName(state)  {
      console.log(state.user ? state.user.name : null)
      return state.user ? state.user.data : null
    }
  },
  mutations: {
    SET_TOKEN(state, access_token) {
      state.access_token = access_token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      let response = await axios.post("/login", credentials);
      return dispatch("attempt", response.data.access_token);
    },
    async attempt({ commit, state }, access_token) {
      if (access_token) {
        commit("SET_TOKEN", access_token);
      }
      if (!state.access_token) {
        return;
      }
      try {
        let response = await axios.get("/user");
        commit("SET_USER", response.data);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
    logout({ commit }) {
      return axios.get("/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    },
  },
};
