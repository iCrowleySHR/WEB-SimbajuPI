import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import { getAllConfig, updateWarehouseConfig } from "../api/routers/warehouseconfig";

export function useWarehouseConfig() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const { showLoading, hideLoading } = useLoading();

    const fetchWarehouseConfig = async () => {
        try {
            setError(null);
            setMessage(null);
            showLoading();

            const response = await getAllConfig();
            setData(response || []);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    const updateConfig = async (id, newData) => {
        try {
            setError(null);
            setMessage(null);
            showLoading();

            const response = await updateWarehouseConfig(id, newData);

            setData((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...response } : item))
            );

            await fetchWarehouseConfig()

            setMessage({ type: "success", text: "Configuração atualizada com sucesso!" });

        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchWarehouseConfig();
    }, []);

    return { data, error, message, refetch: fetchWarehouseConfig, updateConfig };
}
