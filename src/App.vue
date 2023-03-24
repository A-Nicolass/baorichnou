<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/client">Client</RouterLink>
      <RouterLink to="/chief">Chief</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
