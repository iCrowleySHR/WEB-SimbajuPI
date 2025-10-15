import { useState, useEffect } from "react";
import { getMyWithdrawals } from "../api/routers/withdrawal";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useMyHistoryWithdrawls() {
  const { showLoading, hideLoading } = useLoading();
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchMyWithdrawals = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const data = await getMyWithdrawals() || [];

      if (data.length === 0) {
        setMessage("Nenhum registro encontrado.");
      }


      console.log(data)

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName: item.scheduling?.beneficiary?.user?.name || "-",
        cpf: item.scheduling?.beneficiary?.cpf ? maskCpf(item.scheduling.beneficiary.cpf) : "-",
        dateTimeWithdrawal: item.dateTime
          ? new Date(item.dateTime).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
          : "-",
        quantityDiapers: item.quantityDiapers,
        quantityPackage: item.quantityPackage,
        typeDiaper: item.typeDiaper

      }));

      setWithdrawals(formatted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchMyWithdrawals();
  }, []);

  return { withdrawals, error, message, refetch: fetchMyWithdrawals };
}
