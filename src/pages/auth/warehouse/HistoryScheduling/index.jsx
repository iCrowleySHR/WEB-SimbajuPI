import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useAllScheduling from "../../../../hook/useAllScheduling";

export default function HistoryScheduling() {
  const [filterStatus, setFilterStatus] = useState("Todos");
  const { schedulings, error, message, refetch } = useAllScheduling(filterStatus);

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora", accessor: "dateTime" },
    { label: "Status", accessor: "status" },
    { label: "Almoxarifado", accessor: "warehouse" },
  ];

  const statuses = ["Todos", "Agendado", "Concluído", "Ausente", "Cancelado"];

  return (
    <>
      <Title
        title="Histórico de agendamentos"
        subtitle="Acompanhe a lista de todos os agendamentos."
        back="true"
      />
      
      <div className="flex gap-2 justify-center mb-4">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1 rounded-lg transition ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      <div className="mt-4">
        <DynamicTable
          data={schedulings}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/almoxarifado/agendamento/detalhes/${row.id}`,
            },
          ]}
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
