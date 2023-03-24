import { ref, computed } from "vue";
// store.js
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "main",
  state: () => ({
    token: null,
    userRole: null,
  }),
  getters: {
    getUserRole() {
      return this.userRole;
    },
    getToken() {
      return this.token;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserRole(role) {
      this.userRole = role;
    },
  },
});
