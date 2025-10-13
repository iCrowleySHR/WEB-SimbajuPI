import { useState, useEffect } from "react";
import { getAllBeneficiaries } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllBeneficiaries() {
  const { showLoading, hideLoading } = useLoading();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllBeneficiaries = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const data = await getAllBeneficiaries() || [];

      if (data.length === 0) {
        setMessage("Nenhum beneficiário encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName: item.user?.name || "-",
        cpf: item.cpf ? maskCpf(item.cpf) : "-",
        email: item.user?.email || "-",
        typeBenefit: item.typeBenefit || "-",
      }));

      setBeneficiaries(formatted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllBeneficiaries();
  }, []);

  return { beneficiaries, error, message, refetch: fetchAllBeneficiaries };
}
