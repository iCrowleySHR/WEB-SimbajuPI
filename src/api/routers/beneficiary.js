import api from "../api.js";

export const createBeneficiary = async (userData) => {
  const response = await api.post("/beneficiary/store", userData);
  return response.data;
} 