
import axios from "axios";

const API_CONFIG_URL =
  "https://icrowleyshr.github.io/linkapiSDF/link.json";

async function getApiUrl() {
  const source = import.meta.env.VITE_API_SOURCE || "link_json";

  // Opção 1: utilizar link.json
  if (source === "link") {
    try {
      const response = await axios.get(API_CONFIG_URL, {
        timeout: 10000,
      });

      const link = response.data?.link;

      if (typeof link === "string" && link.trim()) {
        const url = link.trim();

        return /^https?:\/\//i.test(url)
          ? url
          : `https://${url}`;
      }

      throw new Error("URL inválida no link.json");
    } catch (error) {
      console.warn("Falha no link.json:", error);

      // Fallback para o .env
      const envUrl = import.meta.env.VITE_API_URL;

      if (envUrl?.trim()) {
        return envUrl.trim();
      }

      throw error;
    }
  }

  // Opção 2: utilizar diretamente o .env
  if (source === "env") {
    const envUrl = import.meta.env.VITE_API_URL;

    if (envUrl?.trim()) {
      return envUrl.trim();
    }

    throw new Error("VITE_API_URL não configurada.");
  }

  throw new Error(`Fonte de API inválida: ${source}`);
}

const apiUrlPromise = getApiUrl();

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (!config.baseURL) {
      config.baseURL = await apiUrlPromise;
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (
        error.response.status === 401 ||
        error.response.data?.message === "Unauthenticated."
      )
    ) {
      console.warn("Sessão expirada. Fazendo logout...");

      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
