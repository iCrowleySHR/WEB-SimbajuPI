import api from "../api.js";

export const getMyLocate = async () => {
  const response = await api.get("/location/mylocation");
  return response.data.data;
};

export const updateLocate = async (data) => {
  const response = await api.patch("/location/update",data);
  return response.data;
};

