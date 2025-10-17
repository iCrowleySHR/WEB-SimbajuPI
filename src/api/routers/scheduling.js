import api from "../api.js";

export const getTodaySchedulings = async () => {
    const response = await api.get("/scheduling/today");
    return response.data?.data || [];
};

export const getAllSchedulings = async () => {
    const response = await api.get("/scheduling");
    return response.data?.data || [];
};

export const getSchedulingsFilters = async (status) => {
    const response = await api.get(`/scheduling/status/${status}`);
    return response.data?.data || [];
};

export const getSchedulingById = async (id) => {
    const response = await api.get(`/scheduling/show/${id}`);
    return response.data?.data || [];
};

export const getMySchedulings = async () => {
    const response = await api.get(`/scheduling/my`);
    return response.data?.data || [];
};

export const cancelScheduling = async (id) => {
    const response = await api.get(`/scheduling/cancel/${id}`);
    return response.data?.data || [];
};

