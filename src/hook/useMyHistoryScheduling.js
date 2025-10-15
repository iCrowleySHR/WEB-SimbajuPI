import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getMySchedulings } from "../api/routers/scheduling";
import { maskCpf } from "../utils/mask";

export default function useMyHistoryScheduling() {
    const { showLoading, hideLoading } = useLoading();
    const [schedulings, setSchedulings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchMySchedulings = async () => {
        try {
            setError("");
            setMessage("");
            showLoading();

            const data = await getMySchedulings() || [];

            if (data.length === 0) {
                setMessage("Nenhum registro encontrado.");
            }

            console.log(data)

            const formatted = data.map((item) => ({
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
