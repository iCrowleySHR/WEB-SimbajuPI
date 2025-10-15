import { useState, useEffect } from "react";
import { activedBeneficiaryById, getAllBeneficiariesDisabled } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllBeneficiariesDisabled() {
  const { showLoading, hideLoading } = useLoading();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllBeneficiariesDisabled = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const data = await getAllBeneficiariesDisabled() || [];

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
  const handleActivated = async (id) => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await activedBeneficiaryById(id);

      setMessage("Conta reativada com sucesso!");
      setBeneficiaries((prev) =>
        prev.map((b) => (b.id === id ? response : b))
      );
      await fetchAllBeneficiariesDisabled();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllBeneficiariesDisabled();
  }, []);

  return { beneficiaries, error, message, refetch: fetchAllBeneficiariesDisabled, handleActivated };
}
