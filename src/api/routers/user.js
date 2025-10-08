import api from "../api.js";

export const getMyData = async () => {
  const response = await api.get("/users");
  return response.data;
};



