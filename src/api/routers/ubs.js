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