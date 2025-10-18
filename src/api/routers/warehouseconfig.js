import api from "../api.js";

export const getAllConfig = async () => {
    const response = await api.get("/warehouseConfig");
    return response.data?.data || [];
};

export const getConfigAtive = async () => {
    const response = await api.get("/warehouseConfig/active");
    return response.data?.data || [];
};

export const updateWarehouseConfig = async (id, data) => {
    const response = await api.put(`/warehouseConfig/update/${id}`, data);
    return response.data?.data || [];
};