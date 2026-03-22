import { useState, useEffect } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useAllWithdrawals from "../../../../hook/useAllWithdrawals";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { useUser } from "../../../../contexts/UserContext";
import translate from "../../../../utils/translate";
import useDebounce from "../../../../hook/useDebounce";
import Pagination from "../../../../components/Pagination";
import Alert from "../../../../components/Alert";
import { useParams } from "react-router-dom";

export default function HistoryWithdrawal() {
  const { search } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { withdrawals, meta, error, message, refetch } = useAllWithdrawals(currentPage, debouncedSearch);
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Data e Hora da retirada", accessor: "dateTimeWithdrawal" },
    { label: "Data e Hora do agendamento", accessor: "dateTimeScheduling" },
  ];

  useEffect(() => {
  if (search) {
    setSearchTerm(search);
    setCurrentPage(1);
  }
}, [search]);

  return (
    <>
      <Title
        title="Histórico de retiradas"
        subtitle="Acompanhe a lista de todas as retiradas."
        back="true"
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
          data={withdrawals}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/retirada/detalhes/${row.id}`,
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
