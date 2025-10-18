import { useState, useEffect } from "react";
import { getTodaySchedulings } from "../api/routers/scheduling";
import { storeWithdrawal } from "../api/routers/withdrawal";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

export function useWithdrawalForm() {
  const [schedulings, setSchedulings] = useState([]);
  const [selectedSchedulingId, setSelectedSchedulingId] = useState("");
  const [brand, setBrand] = useState("");
  const [typeDiaper, setTypeDiaper] = useState("");
  const [quantityDiapers, setQuantityDiapers] = useState("");
  const [quantityPackage, setQuantityPackage] = useState("");
  const [responsibleWithdrawal, setResponsibleWithdrawal] = useState("");
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate(); // hook correto para navegar

  useEffect(() => {
    async function fetchTodaySchedulings() {
      showLoading();
      try {
        const data = await getTodaySchedulings();
        setSchedulings(data);
      } catch (error) {
        setMessage({ type: "error", text: getErrorMessage(error) });
      } finally {
        hideLoading();
      }
    }
    fetchTodaySchedulings();
  }, []);

  const handleSubmit = async () => {
    const scheduling = schedulings.find(
      (s) => String(s.id) === String(selectedSchedulingId)
    );

    if (!scheduling) {
      setMessage({ type: "error", text: "Selecione um agendamento válido." });
      return;
    }

    showLoading();
    try {
      const now = new Date();
      const brasilTime = new Date(now.getTime() - 3 * 60 * 60 * 1000 + 1 * 60 * 1000);

      const year = brasilTime.getFullYear();
      const month = String(brasilTime.getMonth() + 1).padStart(2, "0");
      const day = String(brasilTime.getDate()).padStart(2, "0");
      const hours = String(brasilTime.getHours()).padStart(2, "0");
      const minutes = String(brasilTime.getMinutes()).padStart(2, "0");
      const seconds = "00";

      const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      const withdrawalJson = {
        schedulingId: scheduling.id,
        dateTime,
        brand,
        typeDiaper,
        quantityDiapers: Number(quantityDiapers),
        quantityPackage: Number(quantityPackage),
        responsibleWithdrawal,
      };

      await storeWithdrawal(withdrawalJson);

      setMessage({
        type: "success",
        text: "Retirada registrada com sucesso!",
      });

      // aguarda 1 segundo e navega para criar novo agendamento
      setTimeout(() => {
        navigate(`/almoxarifado/agendamento/criar/${scheduling.beneficiary.id}`);
      }, 1000);

      setSelectedSchedulingId("");
      setBrand("");
      setTypeDiaper("");
      setQuantityDiapers("");
      setQuantityPackage("");
      setResponsibleWithdrawal("");

      const updated = await getTodaySchedulings();
      setSchedulings(updated);
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  return {
    schedulings,
    selectedSchedulingId,
    setSelectedSchedulingId,
    brand,
    setBrand,
    typeDiaper,
    setTypeDiaper,
    quantityDiapers,
    setQuantityDiapers,
    quantityPackage,
    setQuantityPackage,
    responsibleWithdrawal,
    setResponsibleWithdrawal,
    message,
    handleSubmit,
  };
}
