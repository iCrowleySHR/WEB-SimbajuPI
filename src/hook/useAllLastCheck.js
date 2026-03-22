import { useState, useEffect } from "react";
import { getLastCheck } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllLastCheck(page = 1) {
  const { showLoading, hideLoading } = useLoading();

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllLastCheck = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getLastCheck(page);

      const data = response?.data || [];

      if (data.length === 0) {
        setMessage("Nenhum registro encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName: item?.user?.name || "-",
        cpf: item.cpf ? maskCpf(item.cpf) : "-",
        lastcheck: item.status?.lastCheck
          ? new Date(item.status.lastCheck).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-",
        secretaryStatus: item.status?.secretaryStatus,
      }));

      setBeneficiaries(formatted);
      setMeta(response?.meta || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllLastCheck();
  }, [page]); // 🔥 importante

  return {
    beneficiaries,
    meta,
    error,
    message,
    refetch: fetchAllLastCheck,
  };
}