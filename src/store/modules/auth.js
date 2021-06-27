import { axiosLogin }  from "../../main.js";

export const state = {
  token: null,
  user: null
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
  }
}

export const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
  }
};

export const actions = {
  
  async login(context, payload) {
    try {
      const response = await axiosLogin.post("auth/login/", payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.authenticated_user));

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
    
    context.commit("setUser", {
      token: null,
      user: null
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      context.commit('setUser', {
        token: token,
        user: user
      })
    }
  }
};