import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import getErrorMessage from "../utils/getErrorMessage";
import {
    getBeneficiaryById,
    updatePrescription as apiUpdatePrescription
} from "../api/routers/beneficiary";
import { getAllUbs } from "../api/routers/ubs";

export function useBeneficiaryWithPrescription(beneficiaryId) {
    const { showLoading, hideLoading } = useLoading();

    const [beneficiary, setBeneficiary] = useState(null);

    const [typeBenefit, setTypeBenefit] = useState("");
    const [prescriptionTimeDays, setPrescriptionTimeDays] = useState("");
    const [prescriptionQuantity, setPrescriptionQuantity] = useState("");

    const [ubsId, setUbsId] = useState("");
    const [ubsList, setUbsList] = useState([]);

    const [message, setMessage] = useState(null);

    /**
     * Busca o beneficiário
     */
    const fetchBeneficiary = async (id) => {
        try {
            setMessage(null);
            showLoading();

            const data = await getBeneficiaryById(id);

            if (!data) {
                setBeneficiary(null);
                setTypeBenefit("");
                setPrescriptionTimeDays("");
                setPrescriptionQuantity("");
                setUbsId("");

                setMessage({
                    type: "error",
                    text: "Beneficiário não encontrado."
                });

                return;
            }

            setBeneficiary(data);

            setTypeBenefit(data.typeBenefit || "");

            setPrescriptionTimeDays(
                data.prescriptionTimeDays || ""
            );

            setPrescriptionQuantity(
                data.prescriptionQuantity ?? ""
            );

            setUbsId(
                data.ubsId
                    ? String(data.ubsId)
                    : data.ubs?.id
                        ? String(data.ubs.id)
                        : ""
            );

        } catch (err) {
            setMessage({
                type: "error",
                text: getErrorMessage(err)
            });
        } finally {
            hideLoading();
        }
    };

    /**
     * Busca todas as UBS, independente da paginação da API
     */
    const loadUbs = async () => {
        try {
            const firstPage = await getAllUbs("", 1);

            const lastPage = firstPage?.meta?.last_page ?? 1;

            let allUbs = [
                ...(firstPage?.data ?? [])
            ];

            for (let page = 2; page <= lastPage; page++) {
                const response = await getAllUbs("", page);

                allUbs = [
                    ...allUbs,
                    ...(response?.data ?? [])
                ];
            }

            setUbsList(allUbs);

            console.log("Total de UBS:", allUbs.length);

        } catch (error) {
            console.error("Erro ao buscar UBS:", error);
        }
    };

    /**
     * Atualiza a prescrição
     */
    const updatePrescription = async () => {
        try {
            setMessage(null);
            showLoading();

            if (!beneficiaryId) {
                throw new Error("ID do beneficiário não definido");
            }

            if (!beneficiary) {
                throw new Error("Beneficiário não carregado");
            }

            const updatedFields = {};

            if (typeBenefit !== beneficiary.typeBenefit) {
                updatedFields.typeBenefit = typeBenefit;
            }

            if (
                prescriptionTimeDays !==
                beneficiary.prescriptionTimeDays
            ) {
                updatedFields.prescriptionTimeDays =
                    prescriptionTimeDays;
            }

            if (
                prescriptionQuantity !==
                beneficiary.prescriptionQuantity
            ) {
                updatedFields.prescriptionQuantity =
                    prescriptionQuantity;
            }

            const currentUbsId =
                beneficiary.ubsId ??
                beneficiary.ubs?.id ??
                "";

            if (Number(ubsId) !== Number(currentUbsId)) {
                updatedFields.ubsId = ubsId || null;
            }

            if (Object.keys(updatedFields).length === 0) {
                setMessage({
                    type: "info",
                    text: "Nenhum campo foi alterado."
                });

                return;
            }

            await apiUpdatePrescription(
                beneficiaryId,
                updatedFields
            );

            const updatedData =
                await getBeneficiaryById(beneficiaryId);

            if (updatedData) {
                setBeneficiary(updatedData);

                setTypeBenefit(
                    updatedData.typeBenefit || ""
                );

                setPrescriptionTimeDays(
                    updatedData.prescriptionTimeDays || ""
                );

                setPrescriptionQuantity(
                    updatedData.prescriptionQuantity ?? ""
                );

                setUbsId(
                    updatedData.ubsId
                        ? String(updatedData.ubsId)
                        : updatedData.ubs?.id
                            ? String(updatedData.ubs.id)
                            : ""
                );
            }

            setMessage({
                type: "success",
                text: "Prescrição atualizada com sucesso!"
            });

        } catch (err) {
            setMessage({
                type: "error",
                text: getErrorMessage(err)
            });
        } finally {
            hideLoading();
        }
    };

    /**
     * Busca o beneficiário quando o ID muda
     */
    useEffect(() => {
        if (beneficiaryId) {
            fetchBeneficiary(beneficiaryId);
        }
    }, [beneficiaryId]);

    /**
     * Busca todas as UBS ao montar o hook
     */
    useEffect(() => {
        loadUbs();
    }, []);

    return {
        beneficiary,

        typeBenefit,
        setTypeBenefit,

        prescriptionTimeDays,
        setPrescriptionTimeDays,

        prescriptionQuantity,
        setPrescriptionQuantity,

        ubsId,
        setUbsId,

        ubsList,

        message,

        refetch: () => fetchBeneficiary(beneficiaryId),

        updatePrescription
    };
}