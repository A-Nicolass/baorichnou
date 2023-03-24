<script setup>
import { login, getUserInfo } from "@/services/api.js";
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
        const token = await login(this.email, this.password);
        const userInfo = await getUserInfo(token);
        console.log(token, userInfo);

        // Stockez le token et les informations de l'utilisateur dans le store Pinia
        if (userInfo.roles.owner) {
          this.$router.push("/chief");
        } else if (userInfo.roles.editor) {
          this.$router.push("/client");
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
