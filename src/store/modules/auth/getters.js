export default {
  userID(state) {
    return state.userID;
  },

  token(state) {
    console.log(state);
    return state.token;
  },

  isAuthenticated(state) {
    return !!state.token;
  },

  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
