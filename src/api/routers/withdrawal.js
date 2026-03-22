import api from "../api.js";

export const getAllWithdrawals = async (page = 1) => {
    const response = await api.get(`/withdrawal?page=${page}`);
    return response.data; 
};

export const searchWithdrawals = async (search, page = 1) => {
  const response = await api.get(`/withdrawal/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

export const getWithdrawalById = async (id) => {
    const response = await api.get(`/withdrawal/show/${id}`);
    return response.data?.data || [];
};

export const getMyWithdrawals = async (page = 1) => {
    const response = await api.get(`/withdrawal/my?page=${page}`);
    return response.data; 
};

export const storeWithdrawal = async (data) => {
    const response = await api.post(`/withdrawal`, data);
    return response.data?.data || [];
};
