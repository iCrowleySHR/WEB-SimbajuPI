import { useState, useEffect } from "react";
import { sanitizeNumeric, sanitizeLetters } from "../utils/sanitize";
import { getMyBeneficiaryData, updateResponsibleData } from "../api/routers/beneficiary";
import getErrorMessage from "../utils/getErrorMessage";
import { maskTelephone } from "../utils/mask";

export function useResponsibleSettings(userId) {
  const [nameResponsible, setNameResponsible] = useState("");
  const [emailResponsible, setEmailResponsible] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneResponsible, setTelephoneResponsible] = useState("");
  const [messageResponsible, setMessageResponsible] = useState(null);
  const [loading, setLoading] = useState(false);

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    if (!userId) return;

    async function fetchResponsible() {
      try {
        setLoading(true);
        const data = await getMyBeneficiaryData();

        setOriginalData(data);

        setNameResponsible(data.nameResponsible || "");
        setEmailResponsible(data.emailResponsible || "");
        setTelephone(maskTelephone(data.telephone) || "");
        setTelephoneResponsible(maskTelephone(data.telephoneResponsible) || "");
      } catch (error) {
        setMessageResponsible({ type: "error", text: getErrorMessage(error) });
      } finally {
        setLoading(false);
      }
    }

    fetchResponsible();
  }, [userId]);

  const handleResponsibleUpdate = async () => {
    if (!nameResponsible || !emailResponsible || !telephone || !telephoneResponsible) {
      setMessageResponsible({ type: "error", text: "Todos os campos são obrigatórios." });
      return;
    }

    try {
      setLoading(true);

      const payload = {};

      if (nameResponsible !== originalData.nameResponsible) {
        payload.nameResponsible = sanitizeLetters(nameResponsible);
      }
      if (emailResponsible !== originalData.emailResponsible) {
        payload.emailResponsible = emailResponsible;
      }
      if (sanitizeNumeric(telephone) !== sanitizeNumeric(originalData.telephone)) {
        payload.telephone = sanitizeNumeric(telephone);
      }
      if (sanitizeNumeric(telephoneResponsible) !== sanitizeNumeric(originalData.telephoneResponsible)) {
        payload.telephoneResponsible = sanitizeNumeric(telephoneResponsible);
      }

      if (Object.keys(payload).length === 0) {
        setMessageResponsible({ type: "info", text: "Nenhuma alteração detectada." });
        return;
      }

      await updateResponsibleData(payload);

      setOriginalData(prev => ({ ...prev, ...payload }));

      setMessageResponsible({ type: "success", text: "Dados do responsável atualizados com sucesso!" });
    } catch (error) {
      setMessageResponsible({ type: "error", text: getErrorMessage(error) });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    nameResponsible,
    setNameResponsible,
    emailResponsible,
    setEmailResponsible,
    telephone,
    setTelephone,
    telephoneResponsible,
    setTelephoneResponsible,
    messageResponsible,
    loading,
    handleResponsibleUpdate,
  };
}
