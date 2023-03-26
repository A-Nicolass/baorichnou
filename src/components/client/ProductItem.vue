<template>
  <li>
    {{ product.Title }} - {{ product.prices }} €
    <input type="number" min="1" v-model="quantity" />
    <button @click="addToCartHandler">Ajouter au panier</button>
  </li>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
    };
  },
  props: {
    product: Object,
  },
  methods: {
    addToCartHandler() {
      this.$emit("add-to-cart", {
        product: this.product,
        quantity: parseInt(this.quantity),
      });
    },
  },
};
</script>
