import { useState } from "react";
import { ausentScheduling } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useAusentScheduling(schedulingId, refetch) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const handleCancel = async () => {
    try {
      setError(null);
      setMessage(null);
      showLoading();

      const response = await ausentScheduling(schedulingId);
      setMessage("Agendamento marcado como ausente com sucesso!");

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
