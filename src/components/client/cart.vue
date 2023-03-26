<template>
  <div>
    <h2>Panier</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.name }} - {{ item.price }} € x {{ item.quantity }}
        <button @click="removeFromCart(item)">Supprimer</button>
      </li>
    </ul>
    <button @click="submitOrder">Valider la commande</button>
  </div>
</template>

<script>
import { useStore } from "@/stores/store.js";
import { createOrder } from "@/services/api.js";

export default {
  computed: {
    cartItems() {
      return useStore().getCart;
    },
  },
  methods: {
    removeFromCart(item) {
      useStore().removeFromCart(item);
    },
    async submitOrder() {
      const token = useStore().getToken;
      const order = {
        items: this.cartItems,
      };

      try {
        await createOrder(token, order);
        useStore().clearCart();
        alert("Commande passée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la validation de la commande:", error.message);
        alert("Erreur lors de la validation de la commande.");
      }
    },
  },
};
</script>