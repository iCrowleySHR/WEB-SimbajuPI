import api from "../api.js";

export const createBeneficiary = async (userData) => {
  const response = await api.post("/beneficiary/store", userData);
  return response.data;
}

export const getMyBeneficiaryData = async () => {
  const response = await api.get("/beneficiary");
  return response.data.data;
}

export const updateResponsibleData = async (userData) => {
  const response = await api.patch("/beneficiary/update", userData);
  return response.data;
}

export const getAllBeneficiaries = async () => {
  const response = await api.get("/beneficiary/allbeneficiares",);
  return response.data?.data || [];
}

export const getBeneficiaryById = async (id) => {
  const response = await api.get(`/beneficiary/show/${id}`,);
  return response.data?.data || [];
}


