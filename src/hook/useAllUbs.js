import { useState, useEffect } from "react";
import { getAllUbs } from "../api/routers/ubs";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import translate from "../utils/translate";

export default function useAllUbs(page = 1, searchTerm = "") {
  const { showLoading, hideLoading } = useLoading();

  const [ubsUsers, setUbsUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllUbs = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getAllUbs(searchTerm, page);

      const data = response?.data || [];

      if (data.length === 0) {
        setError("Nenhum perfil de UBS encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.user?.name || "-",
        email: item.user?.email || "-",
        role: translate(item.user?.role) || "-",
      }));

      setUbsUsers(formatted);
      setMeta(response.meta || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchAllUbs();
  }, [page, searchTerm]);

  return {
    ubsUsers,
    meta,
    error,
    message,
    refetch: fetchAllUbs,
  };
}