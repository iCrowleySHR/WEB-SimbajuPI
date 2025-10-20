import { useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import axios from "axios";
import getErrorMessage from "../utils/getErrorMessage";

export function useReport() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const resetFields = () => {
    setMonth("");
    setYear("");
    setType("");
  };

  const handleSubmit = async () => {
    if (!month || !year || !type) {
      setMessage({ type: "error", text: "Por favor, preencha todos os campos!" });
      return;
    }

    try {
      showLoading();

      const baseURL = import.meta.env.VITE_API_URL; 
      let path = "";

      if (type === "distribution") path = `/report/pdf/distribution?month=${month}&year=${year}`;
      else if (type === "scheduling") path = `/report/pdf/schedulings?month=${month}&year=${year}`;
      else if (type === "withdrawal") path = `/report/pdf/withdrawals?month=${month}&year=${year}`;

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não está logado");

      const response = await axios.get(baseURL + path, {
        responseType: "blob", 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}-${month}-${year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage({ type: "success", text: "Relatório gerado com sucesso!" });
      resetFields();
    } catch (error) {
      setMessage({ type: "error", text: "Registro não encontrado ou erro interno." });
    } finally {
      hideLoading();
    }
  };

  return {
    month, setMonth,
    year, setYear,
    type, setType,
    message,
    handleSubmit
  };
}
