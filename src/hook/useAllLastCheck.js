import { useState, useEffect } from "react";
import { getLastCheck } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllLastCheck() {
  const { showLoading, hideLoading } = useLoading();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllLastCheck = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const data = await getLastCheck() || [];

      if (data.length === 0) {
        setMessage("Nenhum registro encontrado.");
      }
console.log(data)
      const formatted = data.map((item) => ({
        
        id: item.id,
        beneficiaryName: item?.user?.name || "-",
        cpf: maskCpf(item.cpf) || "-",
        lastcheck: item.status?.lastCheck
          ? new Date(item.status?.lastCheck).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
          : "-",
        secretaryStatus: item.status?.secretaryStatus
      }));

      setBeneficiaries(formatted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllLastCheck();
  }, []);

  return { beneficiaries, error, message, refetch: fetchAllLastCheck };
}
