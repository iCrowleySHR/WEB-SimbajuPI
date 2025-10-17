import { useState, useEffect } from "react";
import { getBeneficiaryById, getMyBeneficiaryData } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";

export function useBeneficiaryDetail(beneficiaryId) {
  const { showLoading, hideLoading } = useLoading();
  const [beneficiary, setBeneficiary] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchBeneficiary = async (id) => {
    try {
      setError("");
      setMessage("");
      showLoading();

      let response;
      if (id) {
        response = await getBeneficiaryById(id);
      } else {
        response = await getMyBeneficiaryData();
      }

      if (!response) {
        setMessage("Beneficiário não encontrado.");
        setBeneficiary(null);
        return;
      }

      setBeneficiary(response);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchBeneficiary(beneficiaryId);
  }, [beneficiaryId]);

  return { 
    beneficiary, 
    error, 
    message, 
    refetch: () => fetchBeneficiary(beneficiaryId) 
  };
}
