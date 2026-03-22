import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";
import { suspensionsUbs } from "../api/routers/status";

export default function useListBeneficiariesStatusUbs(page = 1) {
  const { showLoading, hideLoading } = useLoading();

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchBeneficiariesWithStatus = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

    const response = await suspensionsUbs(page);

    const data = response?.data?.data || [];

    if (data.length === 0) {
    setMessage("Nenhum registro encontrado.");
    }

    const formatted = data.map((item) => ({
    id: item.id,
    beneficiaryName: item.user?.name || "-",
    cpf: item.cpf ? maskCpf(item.cpf) : "-",
    email: item.user?.email || "-",
    typeBenefit: item.typeBenefit || "-",
    ubsStatus: item.status?.ubsStatus || "-",
    }));

    setBeneficiaries(formatted);
    setMeta(response?.data || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchBeneficiariesWithStatus();
  }, [page]); // 🔥 importante

  return {
    beneficiaries,
    meta,
    error,
    message,
    refetch: fetchBeneficiariesWithStatus,
  };
}