import { useState, useEffect } from "react";
import { getMyWithdrawals } from "../api/routers/withdrawal";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useMyHistoryWithdrawls(page = 1) {
  const { showLoading, hideLoading } = useLoading();

  const [withdrawals, setWithdrawals] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchMyWithdrawals = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getMyWithdrawals(page);

      const data = response?.data || [];

      if (data.length === 0) {
        setMessage("Nenhum registro encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName:
          item.scheduling?.beneficiary?.user?.name || "-",
        cpf: item.scheduling?.beneficiary?.cpf
          ? maskCpf(item.scheduling.beneficiary.cpf)
          : "-",
        dateTimeWithdrawal: item.dateTime
          ? new Date(item.dateTime).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-",
        quantityDiapers: item.quantityDiapers,
        quantityPackage: item.quantityPackage,
        typeDiaper: item.typeDiaper,
      }));

      setWithdrawals(formatted);
      setMeta(response?.meta || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchMyWithdrawals();
  }, [page]); // 🔥 importante

  return {
    withdrawals,
    meta,
    error,
    message,
    refetch: fetchMyWithdrawals,
  };
}