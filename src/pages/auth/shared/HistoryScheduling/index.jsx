import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useAllScheduling from "../../../../hook/useAllScheduling";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import StatusFilter from "../../../../components/StatusFilters";
import { useUser } from "../../../../contexts/UserContext";
import Pagination from "../../../../components/Pagination";
import translate from "../../../../utils/translate";
import Alert from "../../../../components/Alert";

export default function HistoryScheduling() {
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { schedulings, meta, error, message, refetch } = useAllScheduling(currentPage, filterStatus);
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora", accessor: "dateTime" },
    { label: "Status", accessor: "status" },
    { label: "Almoxarifado", accessor: "warehouse" },
  ];

  const statuses = ["Todos", "Agendado", "Concluido", "Ausente", "Cancelado"];

  let filtered = schedulings.filter(
    (item) => filterStatus === "Todos" || item.status === filterStatus
  );

  filtered = filterByNameOrCpf(filtered, searchTerm);


  return (
    <>
      <Title
        title="Histórico de agendamentos"
        subtitle="Acompanhe a lista de todos os agendamentos."
        back="true"
      />

      <StatusFilter
        statuses={statuses}
        currentStatus={filterStatus}
        onChange={(status) => {
          setFilterStatus(status);
          setCurrentPage(1);
        }}
      />

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Pesquisar por nome ou CPF..."
      />


      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      <div className="mt-4">
        <DynamicTable
          data={schedulings}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/agendamento/detalhes/${row.id}`,
            },
          ]}
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
