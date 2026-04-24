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

export const getAllBeneficiaries = async (page = 1, typeBenefit = "") => {
  let url = `/beneficiary/allbeneficiares?page=${page}`;

  if (typeBenefit) {
    url += `&typeBenefit=${typeBenefit}`;
  }

  const response = await api.get(url);
  return response.data;
};

export const searchBeneficiaries = async (search, page = 1) => {
  const response = await api.get(`/beneficiary/allbeneficiares/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

export const getBeneficiaryById = async (id) => {
  const response = await api.get(`/beneficiary/show/${id}`,);
  return response.data?.data || [];
}

export const getLastCheck = async (page = 1) => {
  const response = await api.get(`/beneficiary/lastcheck?page=${page}`);
  return response.data;
}

export const searchLastCheck = async (search, page = 1) => {
  const response = await api.get(`/beneficiary/lastcheck/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

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

export const getAllBeneficiariesDisabled = async (page = 1) => {
  const response = await api.get(
    `/beneficiary/list/deactivated?page=${page}`
  );

  return response.data; 
};

export const searchBeneficiariesDisabled = async (search, page = 1) => {
  const response = await api.get(`/beneficiary/list/deactivated/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};


