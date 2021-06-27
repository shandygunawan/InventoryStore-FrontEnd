import axios  from "axios";

let timer_logout;

export const state = {
  token: null,
  user: null,
  did_auto_logout: false,
};

export const getters = {
  token(state) {
    return state.token;
  },
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.did_auto_logout;
  }
}

export const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
    state.did_auto_logout = false;
  },
  setAutoLogout(state) {
    state.did_auto_logout = true;
  }
};

export const actions = {
  
  async login(context, payload) {
    try {
      const response = await axios.post("auth/login/", payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const expiresIn = 3600 * 1000;
      const token_expiration = new Date().getTime() + expiresIn;

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.authenticated_user));
      localStorage.setItem('token_expiration', token_expiration);

      timer_logout = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit("setUser", {
        token: response.data.access,
        user: response.data.authenticated_user
      })
    } catch (err) {
      throw new Error(err.response.data.detail);
    } 

  },
  signup() {},
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiration');

    clearTimeout(timer_logout);

    context.commit("setUser", {
      token: null,
      user: null
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const token_expiration = localStorage.getItem('token_expiration');

    const expiresIn = +token_expiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer_logout = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && user) {
      context.commit('setUser', {
        token: token,
        user: user
      })
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};