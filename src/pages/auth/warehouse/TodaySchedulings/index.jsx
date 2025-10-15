import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useTodaySchedulings from "../../../../hook/useTodaySchedulings";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import Alert from "../../../../components/Alert";

export default function TodaySchedulings() {
  const { schedulings, error, message, refetch } = useTodaySchedulings();
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora", accessor: "dateTime" },
    { label: "Status", accessor: "status" },
    { label: "Almoxarifado", accessor: "warehouse" },
  ];


  const filteredSchedulings = filterByNameOrCpf(schedulings, searchTerm);

  return (
    <>
      <Title
        title="Agendamentos de Hoje"
        subtitle="Veja os agendamentos marcados para o dia de hoje."
        back="true"
      />

            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar por nome ou CPF..."
      />

      <div className="mt-4">
        <DynamicTable
          data={filteredSchedulings}
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
