import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import Alert from "../../../../components/Alert";
import useMyHistoryScheduling from "../../../../hook/useMyHistoryScheduling";
import formatDate from "../../../../utils/formatDate";

export default function MyHistoryScheduling() {
    const { schedulings, error, message, refetch } = useMyHistoryScheduling();
    const columns = [
        { label: "Nome", accessor: "beneficiaryName" },
        { label: "CPF", accessor: "cpf" },
        { label: "Data e Hora", accessor: "dateTime" },
        { label: "Status", accessor: "schedulingStatus" },
    ];

    return (
        <>
            <Title
                title="Histórico de Agendamentos"
                subtitle="Acompanhe a lista de todos os agendamentos."
                back="true"
            />

            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div className="mt-4">
                <DynamicTable
                    data={schedulings}
                    columns={columns}
                />
            </div>

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
