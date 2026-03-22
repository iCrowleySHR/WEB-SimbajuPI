import api from "../api.js";

export const updateSecretaryStatus = async (id, data) => {
  const response = await api.put(`/status/secretary/${id}`, data);
  return response.data?.data || [];
}

export const updateUbsStatus = async (id, data) => {
  const response = await api.put(`/status/ubs/${id}`, data);
  return response.data?.data || [];
}


export const suspensionsUbs = async (page = 1) => {
  const response = await api.get(`/status/suspensions/ubs?page=${page}`);
  return response.data;
}

export const searchSuspensionsUbs = async (search, page = 1) => {
  const response = await api.get(`/status/suspensions/ubs/search`, {
    params: {
      search,
      page,
    },
  });

  return response.data;
};

export const uploadFileSecretary = async (id, formData) => {
  const response = await api.post(
    `/status/documentions/secretary/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data?.data || [];
};

export const uploadFileUbs = async (id, formData) => {
  const response = await api.post(
    `/status/documentions/ubs/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data?.data || [];
};