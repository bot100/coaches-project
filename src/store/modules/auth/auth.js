import actions from "./actions.js";
import getters from "./getters.js";

const authModule = {
  state() {
    return {
      token: null,
      userID: null,
      didAutoLogout: false,
    };
  },

  getters,

  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userID = payload.userID;
      state.didAutoLogout = false; // after logout we can again log in therefore reset property
    },

    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },

  actions,
};

export default authModule;

// Account: email: andrezel02@gmail.com, password: 28034q
