import { useState, useEffect } from "react";
import { getAllWarehouse } from "../api/routers/user";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import translate from "../utils/translate";

export default function useAllWarehouse(page = 1, searchTerm = "") {
  const { showLoading, hideLoading } = useLoading();

  const [warehouses, setWarehouses] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchAllWarehouse = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getAllWarehouse(searchTerm, page);

      const data = response?.data || [];

      if (data.length === 0) {
        setError("Nenhum perfil de Almoxarifado encontrado.");
      }

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.name || "-",
        email: item.email || "-",
        role: translate(item.role) || "-",
      }));

      setWarehouses(formatted);
      setMeta(response.meta || {});

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };


  useEffect(() => {
    fetchAllWarehouse();
  }, [page, searchTerm]);


  return {
    warehouses,
    meta,
    error,
    message,
    refetch: fetchAllWarehouse,
  };
}