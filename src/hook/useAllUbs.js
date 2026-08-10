import { useState, useEffect } from "react";
import { getAllUbs } from "../api/routers/ubs";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import translate from "../utils/translate";

export default function useAllUbs(
    page = 1,
    searchTerm = "",
    fetchAll = false
) {
    const { showLoading, hideLoading } = useLoading();

    const [ubsUsers, setUbsUsers] = useState([]);
    const [meta, setMeta] = useState({});
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const formatUbs = (data) => {
        return data.map((item) => ({
            id: item.id,
            name: item.user?.name || "-",
            email: item.user?.email || "-",
            role: translate(item.user?.role) || "-",
        }));
    };

    const fetchAllUbs = async () => {
        try {
            setError("");
            setMessage("");
            showLoading();

            // Busca apenas a página solicitada
            if (!fetchAll) {
                const response = await getAllUbs(searchTerm, page);

                const data = response?.data || [];

                if (data.length === 0) {
                    setError("Nenhum perfil de UBS encontrado.");
                }

                setUbsUsers(formatUbs(data));
                setMeta(response?.meta || {});

                return;
            }

            // Busca a primeira página para descobrir quantas páginas existem
            const firstPage = await getAllUbs(searchTerm, 1);

            const firstData = firstPage?.data || [];
            const lastPage = firstPage?.meta?.last_page || 1;

            let allUbs = [...firstData];

            // Busca as páginas restantes
            for (let currentPage = 2; currentPage <= lastPage; currentPage++) {
                const response = await getAllUbs(
                    searchTerm,
                    currentPage
                );

                allUbs = [
                    ...allUbs,
                    ...(response?.data || [])
                ];
            }

            if (allUbs.length === 0) {
                setError("Nenhum perfil de UBS encontrado.");
            }

            setUbsUsers(formatUbs(allUbs));

            setMeta({
                ...firstPage.meta,
                current_page: 1,
                last_page: lastPage,
                total: firstPage?.meta?.total ?? allUbs.length,
            });

        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchAllUbs();
    }, [page, searchTerm, fetchAll]);

    return {
        ubsUsers,
        meta,
        error,
        message,
        refetch: fetchAllUbs,
    };
}