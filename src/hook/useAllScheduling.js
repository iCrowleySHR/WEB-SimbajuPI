import { useEffect, useState } from "react";
import { getAllSchedulings, getSchedulingsFilters } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllScheduling(status = "Todos") {
  const { showLoading, hideLoading } = useLoading();
  const [schedulings, setSchedulings] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllSchedulings = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      let data = [];
      if (status === "Todos") {
        data = await getAllSchedulings() || [];
      } else {
        data = await getSchedulingsFilters(status) || [];
      }

      if (data.length === 0) {
        setMessage("Nenhum agendamento encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        beneficiaryName: item.beneficiary?.nameResponsible || "-",
        cpf: item.beneficiary?.cpf ? maskCpf(item.beneficiary.cpf) : "-",
        dateTime: new Date(item.dateTime).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        status: item.schedulingStatus,
        warehouse: item.userWarehouse?.name || "-",
      }));

      setSchedulings(formatted);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllSchedulings();
  }, [status]);

  return { schedulings, error, message, refetch: fetchAllSchedulings };
}
