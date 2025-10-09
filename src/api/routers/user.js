import api from "../api.js";

export const getMyData = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await api.patch("/users/update", userData);
  return response.data;
} 