import { useState, useEffect } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import useAllBeneficiaries from "../../../../hook/useAllBeneficiaries";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { useUser } from "../../../../contexts/UserContext";
import translate from "../../../../utils/translate";
import Alert from "../../../../components/Alert";
import useDebounce from "../../../../hook/useDebounce";
import Pagination from "../../../../components/Pagination";

export default function AllBeneficiaries() {
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const { beneficiaries, meta, error, message, refetch } = useAllBeneficiaries(currentPage, debouncedSearch);
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Email", accessor: "email" },
    { label: "Tipo de benefício", accessor: "typeBenefit" },
  ];


  return (
    <>
      <Title
        title="Todos os Beneficiários"
        subtitle="Veja todos os beneficiários cadastrados."
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
