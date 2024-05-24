import actions from './actions.js';

const coachesModule = {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          fullName: 'John Konan',
          moneyInHour: 39,
          tags: ['frontend'],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          id: 'c2',
          fullName: 'Michel Lum',
          moneyInHour: 34,
          tags: ['frontend', 'backend'],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          id: 'c3',
          fullName: 'Melvin Connor',
          moneyInHour: 23,
          tags: ['frontend', 'backend', 'devops'],
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ],
    };
  },

  getters: {
    getAccessToCoaches(state) {
      return state.coaches;
    },

    checkExistCoach(state) {
      return state.coaches && state.coaches.length !== 0;
    },

    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.getAccessToCoaches;
      const userID = rootGetters.userID;
      return coaches.some((coach) => coach.id === userID);
    },

    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) return true;
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
  },

  mutations: {
    newCoach(state, payLoad) {
      state.coaches.push(payLoad);
    },

    setCoaches(state, payLoad) {
      state.coaches = payLoad; // re-write coaches array
    },

    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },

  actions,
};

export default coachesModule;
