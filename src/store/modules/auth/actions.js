let timer;
export default {
  async login(context, payload) {
    const link =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8QlgivzvJwSZz_B_3Yy1eN0nf6lO6rQM';
    return context.dispatch('functionBody', {
      ...payload,
      link,
    });
  },

  async signup(context, payload) {
    const link =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8QlgivzvJwSZz_B_3Yy1eN0nf6lO6rQM';
    return context.dispatch('functionBody', {
      ...payload,
      link,
    });
  },

  async functionBody(context, payload) {
    try {
      const response = await fetch(payload.link, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json) {
        console.log(response, json);
        const error = new Error(
          response.message || 'Failed to authenticate. Check your login data.'
        );
        throw error;
      }

      const expiresIn = +json.expiresIn * 1000;
      // const expiresIn = 20000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', json.idToken);
      localStorage.setItem('userID', json.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        token: json.idToken,
        userID: json.localId,
      });
    } catch (error) {
      throw new Error(
        'Failed to authenticate. Your password or email is invalid.'
      );
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userID: null,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) return;

    setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userID) {
      context.commit('setUser', {
        token,
        userID,
      });
    }
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
