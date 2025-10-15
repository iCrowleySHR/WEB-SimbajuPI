import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useAllWitdrawals from "../../../../hook/useAllWithdrawals";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import { filterByDateRange } from "../../../../utils/filterByDateRange";
import { useUser } from "../../../../contexts/UserContext";
import translate from "../../../../utils/translate";
import Alert from "../../../../components/Alert";

export default function HistoryWithdrawal() {
  const [searchTerm, setSearchTerm] = useState("");
  const { withdrawals, error, message, refetch } = useAllWitdrawals();
  const { user } = useUser();
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora da retirada", accessor: "dateTimeWithdrawal" },
    { label: "Data e Hora do agendamento", accessor: "dateTimeScheduling" },
  ];

  let filtered = filterByNameOrCpf(withdrawals, searchTerm);


  return (
    <>
      <Title
        title="Histórico de retiradas"
        subtitle="Acompanhe a lista de todas as retiradas."
        back="true"
      />

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar por nome ou CPF..."
      />


            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

      <div className="mt-4">
        <DynamicTable
          data={filtered}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/retirada/detalhes/${row.id}`,
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
