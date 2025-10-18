import { useEffect, useState } from "react";
import { makeScheduling } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getAllBeneficiaries } from "../api/routers/beneficiary";

export function useScheduling(defaultId = null) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [id, setId] = useState(defaultId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchBeneficiaries() {
      showLoading();
      try {
        const data = await getAllBeneficiaries();
        setBeneficiaries(data);

        if (defaultId) {
          const found = data.find(b => String(b.id) === String(defaultId));
          if (found) setId(found.id); 
        }
      } catch (error) {
        setMessage({ type: "error", text: getErrorMessage(error) });
      } finally {
        hideLoading();
      }
    }

    fetchBeneficiaries();
  }, [defaultId]);

  const handleMakeScheduling = async () => {
    if (!id || !date || !time) return;

    showLoading();
    try {
      const dateTime = `${date} ${time}:00`;
      await makeScheduling({ beneficiaryId: id, dateTime }); 
      setMessage({ type: "success", text: "Agendamento criado com sucesso!" });
      setId("");
      setDate("");
      setTime("");
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
    } finally {
      hideLoading();
    }
  };

  return {
    beneficiaries,
    id,
    setId,
    date,
    setDate,
    time,
    setTime,
    message,
    handleMakeScheduling,
  };
}
