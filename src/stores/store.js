import { ref, computed } from "vue";
// store.js
import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "main",
  state: () => ({
    token: null,
    userRole: null,
    cart: [],
  }),
  getters: {
    getUserRole() {
      return this.userRole;
    },
    getToken() {
      return this.token;
    },
    getCart() {
      return this.cart;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUserRole(role) {
      this.userRole = role;
    },
    addToCart(item) {
      const existingItem = this.cart.find((product) => product.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.cart.push(item);
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
});
