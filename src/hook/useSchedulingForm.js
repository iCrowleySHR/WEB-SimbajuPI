import { useEffect, useState } from "react";
import { getAllBeneficiaries, getMyBeneficiaryData } from "../api/routers/beneficiary";
import { getAvailableFutureSchedules, makeScheduling } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useSchedulingForm(userRole, defaultId = null) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [id, setId] = useState(defaultId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    async function fetchAllBeneficiaries() {
      showLoading();
      try {
        if (userRole === "warehouse") {
          let allBeneficiaries = [];
          let page = 1;
          let totalPages = 1;

          // Busca todas as páginas
          do {
            const response = await getAllBeneficiaries(page);
            allBeneficiaries = [...allBeneficiaries, ...response.data];
            totalPages = response.meta.last_page;
            page++;
          } while (page <= totalPages);

          setBeneficiaries(allBeneficiaries);

          // seleciona o defaultId, se existir
          if (defaultId) {
            const found = allBeneficiaries.find(b => String(b.id) === String(defaultId));
            if (found) setId(found.id);
          }
        } else if (userRole === "beneficiary") {
          const beneficiary = await getMyBeneficiaryData();
          setId(beneficiary.id);
          setBeneficiaries([beneficiary]);
        }
      } catch (error) {
        setMessage({ type: "error", text: getErrorMessage(error) });
      } finally {
        hideLoading();
      }
    }

    fetchAllBeneficiaries();
  }, [userRole, defaultId]);

  useEffect(() => {
    if (!date) {
      setAvailableTimes([]);
      return;
    }

    const timeout = setTimeout(async () => {
      showLoading();
      try {
        const times = await getAvailableFutureSchedules(date);
        setAvailableTimes(times);
        setMessage({ type: "success", text: "Data com horários disponíveis" });
      } catch (error) {
        setMessage({ type: "error", text: getErrorMessage(error) });
      } finally {
        hideLoading();
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [date]);

  const handleMakeScheduling = async () => {
    if (!id || !date || !time) return;
    showLoading();
    try {
      const dateTime = `${date} ${time}:00`;
      await makeScheduling({ beneficiaryId: id, dateTime });
      setMessage({ type: "success", text: "Agendamento criado com sucesso!" });
      setDate("");
      setTime("");
      if (userRole !== "beneficiary") setId("");
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error) });
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return { beneficiaries, id, setId, date, setDate, time, setTime, availableTimes, message, handleMakeScheduling };
}