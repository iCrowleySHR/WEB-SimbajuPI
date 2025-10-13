import { useEffect, useState } from "react";
import { getTodaySchedulings } from "../api/routers/scheduling";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { maskCpf } from "../utils/mask";

export default function useTodaySchedulings() {
    const { showLoading, hideLoading } = useLoading();
    const [schedulings, setSchedulings] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchTodaySchedulings = async () => {
        try {
            setError("");
            setMessage("");
            showLoading();

            const data = await getTodaySchedulings() || [];

            if (data.length === 0) {
                setMessage("Nenhum agendamento encontrado para hoje.");
            }

            const formatted = data.map((item) => ({
                id: item.id,
                beneficiaryName: item.beneficiary?.user?.name || "-",
                cpf: item.beneficiary?.cpf ? maskCpf(item.beneficiary.cpf) : "-",
                dateTime: new Date(item.dateTime).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                }),
                status: item.schedulingStatus,
                warehouse: item.userWarehouse?.name || "-",
            }));

            setSchedulings(formatted);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchTodaySchedulings();
    }, []);

    return { schedulings, error, message, refetch: fetchTodaySchedulings };
}
