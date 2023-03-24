import axios from "axios";

// Configurez une instance Axios pour interagir avec l'API NocoDB
const apiClient = axios.create({
  baseURL: "https://noco-db-production-5570.up.railway.app/api/v1/auth/user",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Fonction pour envoyer une requête de login et obtenir un token d'accès
export async function login(email, password) {
  try {
    const response = await apiClient.post("/signin", {
      email: email,
      password: password,
    });

    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error("Erreur lors de la connexion.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error.message);
    throw error;
  }
}

// Fonction pour récupérer les informations d'un utilisateur à partir de son token d'accès
export async function getUserInfo(token) {
  try {
    const response = await apiClient.get("/me?project_id=p_d4r1oly0famlge", {
      headers: {
        "xc-auth": token,
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error(
        "Erreur lors de la récupération des informations de l'utilisateur."
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error.message
    );
    throw error;
  }
}
