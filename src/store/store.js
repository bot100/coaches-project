import { createStore } from 'vuex';
import coachesModule from './modules/coaches/coaches.js';
import requestsModule from './modules/requests/requests.js';
import authModule from './modules/auth/auth.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
