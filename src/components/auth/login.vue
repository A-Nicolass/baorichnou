<script setup>
import { login, getUserInfo } from "@/services/api.js";
import { useStore } from "@/stores/store.js";
</script>

<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitLogin() {
      try {
        // Appel à l'API pour se connecter et récupérer le token
        const token = await login(this.email, this.password);
        // set token to store
        useStore().setToken(token);
        const userInfo = await getUserInfo(token);
        useStore().setUserRole(userInfo.roles);
        console.log(token, userInfo);

        // Stockez le token et les informations de l'utilisateur dans le store Pinia
        if (userInfo.roles.owner) {
          this.$router.push("/chief");
          this.$store.setUserRole("owner");
        } else if (userInfo.roles.editor) {
          this.$router.push("/client");
          this.$store.setUserRole("editor");
        } else {
          // Vous pouvez également gérer d'autres rôles ou un cas d'erreur ici
          this.errorMessage =
            "Vous n'avez pas les autorisations nécessaires pour accéder à cette application.";
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici le style CSS pour le formulaire de connexion */
</style>
