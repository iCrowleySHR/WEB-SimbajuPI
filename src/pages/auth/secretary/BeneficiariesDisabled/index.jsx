import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { useUser } from "../../../../contexts/UserContext";
import Alert from "../../../../components/Alert";
import Pagination from "../../../../components/Pagination";
import useDebounce from "../../../../hook/useDebounce";
import useAllBeneficiariesDisabled from "../../../../hook/useAllBeneficiariesDisable";

export default function BeneficiariesDisabled() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { beneficiaries, meta, error, message, refetch, handleActivated } = useAllBeneficiariesDisabled(currentPage, debouncedSearch);
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
        title="Lista de beneficiarios desativados"
        subtitle="Acompanhe a lista."
        back="true"
      />

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // 🔥 importante
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
              label: "Reativar conta",
              onClick: (row) => {
                const confirm = window.confirm(
                  `Tem certeza que deseja reativar a conta de ${row.beneficiaryName}?`
                );
                if (confirm) {
                  handleActivated(row.id);
                }
              },
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
