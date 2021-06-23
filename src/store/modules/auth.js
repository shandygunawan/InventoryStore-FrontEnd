import axios from "axios";

export const state = {
  token: null,
  username: null
};

export const getters = {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  }
}

export const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.username = payload.username;
  }
};

export const actions = {
  
  async login(context, payload) {
    try {
      const response = await axios.post("api/token/", payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      localStorage.setItem('token', response.data.access);
      localStorage.setItem('username', response.data.username);

      context.commit("setUser", {
        token: response.data.access,
        username: response.data.username
      })
    } catch (err) {
      throw new Error(err.response.data.detail);
    }
  },
  signup() {},
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    context.commit("setUser", {
      token: null,
      username: null
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      context.commit('setUser', {
        token: token,
        username: username
      })
    }
  }
};