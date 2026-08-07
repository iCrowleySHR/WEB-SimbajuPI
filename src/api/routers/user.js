import api from "../api.js";

export const getMyData = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/show/${id}`);
  return response.data?.data;
};

export const updateUser = async (userData) => {
  const response = await api.patch("/users/update", userData);
  return response.data;
} 

export const createWarehouse = async (data) => {
  const response = await api.post("/users/warehouse", data);
  return response.data;
};


export const getAllWarehouse = async (search, page = 1) => {
  const response = await api.get(`/users/allwarehouse`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

