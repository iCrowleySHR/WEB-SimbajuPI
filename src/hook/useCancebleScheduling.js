import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getMySchedulings } from "../api/routers/scheduling";
import { maskCpf } from "../utils/mask";

export default function useCancebleListScheduling() {
    const { showLoading, hideLoading } = useLoading();
    const [schedulings, setSchedulings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const cancellableStatuses = ["agendado"];

    const fetchMySchedulings = async () => {
        try {
            setError("");
            setMessage("");
            showLoading();

            const data = await getMySchedulings() || [];

            const filtered = data.filter(item =>
                cancellableStatuses.includes(item.schedulingStatus?.trim().toLowerCase())
            );

            if (filtered.length === 0) {
                setMessage("Nenhum registro encontrado.");
            }

            const formatted = filtered.map((item) => ({
                id: item.id,
                beneficiaryName: item.beneficiary?.user?.name || "-",
                cpf: item.beneficiary?.cpf ? maskCpf(item.beneficiary.cpf) : "-",
                dateTime: item.dateTime
                    ? new Date(item.dateTime).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
                    : "-",
                schedulingStatus: item.schedulingStatus,
            }));

            setSchedulings(formatted);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchMySchedulings();
    }, []);

    return { schedulings, error, message, refetch: fetchMySchedulings };
}
