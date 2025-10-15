import { useState } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import { useUser } from "../../../../contexts/UserContext";
import Alert from "../../../../components/Alert";
import useAllBeneficiariesDisabled from "../../../../hook/useAllBeneficiariesDisable";

export default function BeneficiariesDisabled() {
  const { beneficiaries, error, message, refetch, handleActivated } = useAllBeneficiariesDisabled();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Email", accessor: "email" },
    { label: "Tipo de benefício", accessor: "typeBenefit" },
  ];

  let filtered = filterByNameOrCpf(beneficiaries, searchTerm);

  return (
    <>
      <Title
        title="Lista de beneficiarios desativados"
        subtitle="Acompanhe a lista."
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
