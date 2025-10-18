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

export const getLastCheck = async () => {
  const response = await api.get(`/beneficiary/lastcheck`,);
  return response.data?.data || [];
}

export const updatePrescription = async (id, data) => {
  const response = await api.patch(`/beneficiary/secretary/update/${id}`, data);
  return response.data?.data || [];
}

export const disableBeneficiaryById = async (id) => {
  const response = await api.patch(`/beneficiary/deactivate/${id}`);
  return response.data?.data || [];
}

export const activedBeneficiaryById = async (id) => {
  const response = await api.patch(`/beneficiary/activate/${id}`);
  return response.data?.data || [];
}

export const getAllBeneficiariesDisabled = async () => {
  const response = await api.get(`beneficiary/list/deactivated`);
  return response.data?.data || [];
}




