import { useState } from "react";
import { cancelScheduling } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useCancelScheduling(schedulingId, refetch) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleCancel = async () => {
    try {
      setError(null);
      setMessage(null);
      showLoading();

      const response = await cancelScheduling(schedulingId);
      setMessage("Agendamento cancelado com sucesso!");

      if (refetch) refetch();

      return response;
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  return { handleCancel, error, message };
}
