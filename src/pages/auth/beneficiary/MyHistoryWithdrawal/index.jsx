import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import Alert from "../../../../components/Alert";
import Pagination from "../../../../components/Pagination";
import useMyHistoryWithdrawls from "../../../../hook/useMyHistoryWithdrawls";

export default function MyHistoryWithdrawal() {
    const [currentPage, setCurrentPage] = useState(1);
    const { withdrawals, meta, error, message, refetch } = useMyHistoryWithdrawls(currentPage);

    const columns = [
        { label: "Beneficiário", accessor: "beneficiaryName" },
        { label: "CPF", accessor: "cpf" },
        { label: "Data e Hora da retirada", accessor: "dateTimeWithdrawal" },
        { label: "Quantidade de fraldas", accessor: "quantityDiapers" },
        { label: "Quantidade de pacotes", accessor: "quantityPackage" },
        { label: "Tamanho da fralda", accessor: "typeDiaper" },
    ];

    return (
        <>
            <Title
                title="Histórico de retiradas"
                subtitle="Acompanhe a lista de todas as retiradas."
                back="true"
            />

            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div className="mt-4">
                <DynamicTable
                    data={withdrawals}
                    columns={columns}
                />
            </div>
            <Pagination
                currentPage={currentPage}
                lastPage={meta?.last_page || 1}
                onPageChange={setCurrentPage}
            />

            <div className="text-center mt-6">
                <button
                    onClick={refetch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Atualizar
                </button>
            </div>
        </>
    );
}
