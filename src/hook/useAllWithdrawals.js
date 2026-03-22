import { useState, useEffect } from "react";
import {
  getAllWithdrawals,
  searchWithdrawals,
} from "../api/routers/withdrawal";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllWithdrawals(page = 1, search = "") {
  const { showLoading, hideLoading } = useLoading();

  const [withdrawals, setWithdrawals] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllWithdrawals = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = search
        ? await searchWithdrawals(search, page)
        : await getAllWithdrawals(page);

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
        dateTimeScheduling: item.scheduling?.dateTime
          ? new Date(item.scheduling.dateTime).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })
          : "-",
      }));

      setWithdrawals(formatted);
      setMeta(response.meta || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllWithdrawals();
  }, [page, search]);

  return {
    withdrawals,
    meta,
    error,
    message,
    refetch: fetchAllWithdrawals,
  };
}