import { useState, useEffect } from "react";
import { disableBeneficiaryById, getBeneficiaryById } from "../api/routers/beneficiary";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";


export function useDisableBeneficiaryAccount(beneficiaryId) {
    const { showLoading, hideLoading } = useLoading();
    const [beneficiary, setBeneficiary] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchBeneficiary = async (id) => {
        try {
            setError("");
            setMessage("");
            showLoading();

            const response = await getBeneficiaryById(id);

            if (!response || Object.keys(response).length === 0) {
                setMessage("Beneficiário não encontrado.");
                setBeneficiary(null);
                return;
            }

            setBeneficiary(response);
        } catch (err) {
            setError(getErrorMessage(err));
            setBeneficiary(null);
        } finally {
            setLoading(false);
            hideLoading();
        }
    };

    const handleDisable = async () => {
        if (!beneficiaryId) return;

        try {
            setError("");
            setMessage("");
            setLoading(true);
            showLoading();

            const response = await disableBeneficiaryById(beneficiaryId);

            setBeneficiary(response);
            setMessage("Conta desativada com sucesso!");
        } catch (err) {
            setError(getErrorMessage(err));
            setBeneficiary(null);
        } finally {
            setLoading(false);
            hideLoading();
        }
    };


    useEffect(() => {
        if (beneficiaryId) fetchBeneficiary(beneficiaryId);
    }, [beneficiaryId]);

    return { beneficiary, error, message, loading, refetch: () => fetchBeneficiary(beneficiaryId), handleDisable };
}
