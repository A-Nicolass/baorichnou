<script setup>
import { useStore } from "@/stores/store.js";
import { createOrder } from "@/services/api.js";
import { getProducts } from "@/services/api.js";
import ProductItem from "@/components/client/ProductItem.vue";
</script>

<template>
  <div>
    <h1>Liste des produits</h1>
    <ul>
      <ProductItem
        v-for="(product, idx) in products"
        :key="idx"
        :product="product"
        @add-to-cart="addToCart"
      />
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      quantities: {},
    };
  },
  async created() {
    const token = useStore().getToken;
    const products = await getProducts(token);
    this.products = products.list;
    this.products.forEach((product) => {
      this.quantities[product.id] = 1;
    });
  },

  methods: {
    addToCart({ product, quantity }) {
      if (quantity > 0) {
        useStore().addToCart({
          id: product.id,
          name: product.Title,
          price: product.prices,
          quantity: quantity,
        });
      } else {
        alert("Veuillez sélectionner une quantité valide.");
      }
    },
  },
};
</script>
