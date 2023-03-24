<script setup>
import { getProducts } from "@/services/api.js";
import { useStore } from "@/stores/store.js";
</script>

<template>
  <div>
    <h1>Liste des produits</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.Title }} - {{ product.prices }} €
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const token = useStore().getToken;
    const products = await getProducts(token);
    this.products = products.list;
    console.log(products);
  },
};
</script>
