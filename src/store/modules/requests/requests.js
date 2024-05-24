import actions from './actions.js';

const requestsModule = {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },

  getters: {
    stateRequests(state, _, _2, rootGetters) {
      const coachID = rootGetters.userID;
      return state.requests.filter((request) => request.coachID === coachID);
    },

    hasRequests(_, getters) {
      return getters.stateRequests && getters.stateRequests.length > 0;
    },
  },

  mutations: {
    addRequest(state, payLoad) {
      state.requests.push(payLoad);
    },

    setRequests(state, payLoad) {
      state.requests = payLoad;
    },
  },

  actions,
};

export default requestsModule;
