import { useState } from "react";
import Title from "../../../../components/Title";
import useAllLastCheck from "../../../../hook/useAllLastCheck";
import { useUser } from "../../../../contexts/UserContext";
import Pagination from "../../../../components/Pagination";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import DynamicTable from "../../../../components/DynamicTable";
import translate from "../../../../utils/translate";
import Alert from "../../../../components/Alert";
import useDebounce from "../../../../hook/useDebounce";

export default function SemiannualReassessment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm.trim(), 500);
  const { beneficiaries, error, message, refetch, meta  } = useAllLastCheck(currentPage, debouncedSearch);
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Última verificação", accessor: "lastcheck" },
    { label: "Status Secretaria", accessor: "secretaryStatus" },
  ];

  return (
    <>
      <Title
        title="Reavaliação semestral"
        subtitle="Valide os benefícios dos pacientes, efetuando a reavaliação semestral."
        back
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
          data={beneficiaries}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/beneficiario/detalhes/${row.id}`,
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
