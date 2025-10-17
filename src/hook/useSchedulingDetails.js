import { useState, useEffect } from "react";
import { getSchedulingById } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useSchedulingDetail(schedulingId) {
  const [scheduling, setScheduling] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const fetchScheduling = async (id) => {
    try {
      setError(null);
      setMessage(null);
      showLoading();

      const response = await getSchedulingById(id) || [];
      setScheduling(response);

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (schedulingId) {
      fetchScheduling(schedulingId);
    }
  }, [schedulingId]);

  return { scheduling, error, message, refetch: () => fetchScheduling(schedulingId) };
}
