import api from "../api.js";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token); 
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
};

export const changePasswordTemporary = async (data) => {
  const response = await api.post("/auth/temporary-password", data);
  return response.data;
};

