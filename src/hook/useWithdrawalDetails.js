import { useState, useEffect } from "react";
import { getWithdrawalById } from "../api/routers/withdrawal"; // função da API
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useWithdrawalDetails(withdrawalId) {
  const [withdrawal, setWithdrawal] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const fetchWithdrawal = async (id) => {
    try {
      setError(null);
      setMessage(null);
      showLoading();

      const response = await getWithdrawalById(id) || [];
      setWithdrawal(response);

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (withdrawalId) {
      fetchWithdrawal(withdrawalId);
    }
  }, [withdrawalId]);

  return { withdrawal, error, message, refetch: () => fetchWithdrawal(withdrawalId) };
}
