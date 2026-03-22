import { useEffect, useState } from "react";
import {
  getAllSchedulings,
  getSchedulingsFilters,
  searchSchedulings,
} from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useAllScheduling(page = 1, status = "Todos", search = "") {
  const { showLoading, hideLoading } = useLoading();

  const [schedulings, setSchedulings] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllSchedulings = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      let response;


      if (search) {
        response = await searchSchedulings(search, page);
      } else if (status === "Todos") {
        response = await getAllSchedulings(page);
      } else {
        response = await getSchedulingsFilters(status, page);
      }

      const data = response?.data || [];

      if (data.length === 0) {
        setMessage("Nenhum agendamento encontrado.");
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
        status: item.schedulingStatus,
        warehouse: item.userWarehouse?.name || "-",
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
    fetchAllSchedulings();
  }, [page, status, search]); // 🔥 importante

  return {
    schedulings,
    meta,
    error,
    message,
    refetch: fetchAllSchedulings,
  };
}