import api from "../api.js";

export const getAllUbs = async (search, page = 1) => {
  const response = await api.get(`/ubs/allubs`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

export const getUbsById = async (id) => {
  const response = await api.get(`/ubs/show/${id}`,);
  return response.data?.data || [];
}


export const createUbs = async (data) => {
  const response = await api.post("/ubs/store", data);
  return response.data;
};