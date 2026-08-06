import { useState, useEffect } from "react";
import { getUbsById } from "../api/routers/ubs";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useUbsDetails(ubsId) {
  const { showLoading, hideLoading } = useLoading();

  const [ubs, setUbs] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchUbs = async (id) => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getUbsById(id);

      if (!response || Object.keys(response).length === 0) {
        setMessage("UBS não encontrada.");
        setUbs(null);
        return;
      }

      setUbs(response);

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (ubsId) {
      fetchUbs(ubsId);
    }
  }, [ubsId]);

  return {
    ubs,
    error,
    message,
    refetch: () => fetchUbs(ubsId),
  };
}