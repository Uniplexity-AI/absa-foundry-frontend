import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('authToken') || null,
    userEmail: localStorage.getItem('userEmail') || null
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('authToken', token)
    },

    CLEAR_TOKEN(state) {
      state.token = null
      localStorage.removeItem('authToken')
    },

    SET_USER_EMAIL(state, email) {
      state.userEmail = email
      localStorage.setItem('userEmail', email)
    },

    CLEAR_USER_EMAIL(state) {
      state.userEmail = null
      localStorage.removeItem('userEmail')
    }
  },

  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    clearToken({ commit }) {
      commit('CLEAR_TOKEN')
    },

    saveUserEmail({ commit }, email) {
      commit('SET_USER_EMAIL', email)
    },

    clearUserEmail({ commit }) {
      commit('CLEAR_USER_EMAIL')
    },

    logout({ dispatch }) {
      dispatch('clearToken')
      dispatch('clearUserEmail')
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    // isAuthenticated: (state) => !!state.token,  // Checks if token exists
    getToken: (state) => state.token,
    getUserEmail: (state) => state.userEmail
  }, 

  methods: {
    protectRoute(to, from, next) {
      const isAuthenticated = getters.isAuthenticated
      if (!isAuthenticated) {
        next({ name: 'Login' })  // Redirect to login if not authenticated
      } else {
        next()  // Proceed to the route if authenticated
      }
    }
  },
})
