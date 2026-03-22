import api from "../api.js";

export const getTodaySchedulings = async () => {
    const response = await api.get("/scheduling/today");
    return response.data?.data || [];
};

export const getAllSchedulings = async (page = 1) => {
    const response = await api.get(`/scheduling?page=${page}`);
    return response.data; 
};

export const getSchedulingsFilters = async (status = "Todos", page = 1) => {
    const response = await api.get(`/scheduling/status/${status}?page=${page}`);
    return response.data; 
};

export const searchSchedulings = async (search, page = 1) => {
  const response = await api.get(`/scheduling/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

export const getSchedulingById = async (id) => {
    const response = await api.get(`/scheduling/show/${id}`);
    return response.data?.data || [];
};

export const getMySchedulings = async (page = 1) => {
    const response = await api.get(`/scheduling/my?page=${page}`);
    return response.data;
};

export const getAvailableFutureSchedules = async (date) => {
    const response = await api.get(`/scheduling/available/future?date=${date}`);
    return response.data?.schedules || [];
};

export const cancelScheduling = async (id) => {
    const response = await api.get(`/scheduling/cancel/${id}`);
    return response.data?.data || [];
};

export const ausentScheduling = async (id) => {
    const response = await api.get(`/scheduling/update/${id}`);
    return response.data?.data || [];
};

export const makeScheduling = async (data) => {
    const response = await api.post(`scheduling/store`, data);
    return response.data?.data || [];
};




