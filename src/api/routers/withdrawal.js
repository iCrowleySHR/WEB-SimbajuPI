import api from "../api.js";

export const getAllWithdrawals = async () => {
    const response = await api.get("/withdrawal");
    return response.data?.data || [];
};

export const getWithdrawalById = async (id) => {
    const response = await api.get(`/withdrawal/show/${id}`);
    console.log(response)
    return response.data?.data || [];
};

