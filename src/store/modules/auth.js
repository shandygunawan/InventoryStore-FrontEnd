import axios from "axios";

export const state = {
  token: null,
  role: null
};

export const getters = {
  token(state) {
    return state.token;
  },
  role(state) {
    return state.role;
  },
  isAuthenticated(state) {
    return !!state.token;
  }
}

export const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.role = payload.role;
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
      localStorage.setItem('role', response.data.role);

      context.commit("setUser", {
        token: response.data.access,
        role: response.data.role
      })
    } catch (err) {
      throw new Error(err.response.data.detail);
    }
  },
  signup() {},
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    context.commit("setUser", {
      token: null,
      role: null
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      context.commit('setUser', {
        token: token,
        role: role
      })
    }
  }
};