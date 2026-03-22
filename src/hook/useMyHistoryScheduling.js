import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getMySchedulings } from "../api/routers/scheduling";
import { maskCpf } from "../utils/mask";

export default function useMyHistoryScheduling(page = 1) {
  const { showLoading, hideLoading } = useLoading();

  const [schedulings, setSchedulings] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchMySchedulings = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getMySchedulings(page);

      const data = response?.data || [];

      if (data.length === 0) {
        setMessage("Nenhum registro encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName: item.beneficiary?.user?.name || "-",
        cpf: item.beneficiary?.cpf
          ? maskCpf(item.beneficiary.cpf)
          : "-",
        dateTime: item.dateTime
          ? new Date(item.dateTime).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-",
        schedulingStatus: item.schedulingStatus,
      }));

      setSchedulings(formatted);
      setMeta(response?.meta || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchMySchedulings();
  }, [page]); // 🔥 importante

  return {
    schedulings,
    meta,
    error,
    message,
    refetch: fetchMySchedulings,
  };
}