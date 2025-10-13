import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useTodaySchedulings from "../../../../hook/useTodaySchedulings";

export default function TodaySchedulings() {
  const { schedulings, error, message, refetch } = useTodaySchedulings();

const columns = [
  { label: "ID", accessor: "id" },
  { label: "Beneficiário", accessor: "beneficiaryName" },
  { label: "CPF", accessor: "cpf" },
  { label: "Data e Hora", accessor: "dateTime" },
  { label: "Status", accessor: "status" },
  { label: "Almoxarifado", accessor: "warehouse" },
];

  return (
    <>
      <Title
        title="Agendamentos de Hoje"
        subtitle="Veja os agendamentos marcados para o dia de hoje."
        back="true"
      />

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
