import api from "../api.js";

export const getMyData = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await api.patch("/users/update", userData);
  return response.data;
} 

export const createWarehouse = async (data) => {
  const response = await api.post("/users/warehouse", data);
  return response.data;
};

export const createUbs = async (data) => {
  const response = await api.post("/users/ubs", data);
  return response.data;
};

