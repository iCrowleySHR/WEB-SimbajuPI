import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";
import { suspensionsUbs } from "../api/routers/status";

export default function useListBeneficiariesStatusUbs() {
    const { showLoading, hideLoading } = useLoading();
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchBeneficiariesWithStatus = async () => {
        try {
            setError("");
            setMessage("");
            showLoading();

            const data = await suspensionsUbs() || [];

            if (data.length === 0) {
                setMessage("Nenhum registro encontrado.");
            }


            const formatted = data.map((item) => ({
                id: item.id,
                beneficiaryName: item.user?.name || "-",
                cpf: item.cpf ? maskCpf(item.cpf) : "-",
                email: item.user?.email,
                typeBenefit: item.typeBenefit,
                ubsStatus: item.status.ubsStatus

            }));


            setBeneficiaries(formatted);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchBeneficiariesWithStatus();
    }, []);

    return { beneficiaries, error, message, refetch: fetchBeneficiariesWithStatus };
}
