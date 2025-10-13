import { useState } from "react";
import Title from "../../../../components/Title";
import useAllLastCheck from "../../../../hook/useAllLastCheck";
import { useUser } from "../../../../contexts/UserContext";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import DynamicTable from "../../../../components/DynamicTable";
import translate from "../../../../utils/translate";

export default function SemiannualReassessment() {
  const { beneficiaries, error, message, refetch } = useAllLastCheck();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Beneficiário", accessor: "beneficiaryName" },
    { label: "CPF", accessor: "cpf" },
    { label: "Última verificação", accessor: "lastcheck" },
    { label: "Status Secretaria", accessor: "secretaryStatus" },
  ];

  const filteredBeneficiaries = filterByNameOrCpf(beneficiaries, searchTerm);
  return (
    <>
      <Title
        title="Reavaliação semestral"
        subtitle="Valide os benefícios dos pacientes, efetuando a reavaliação semestral."
        back
      />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-gray-500 text-center mt-4">{message}</p>}

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar por nome ou CPF..."
      />

      <div className="mt-4">
        <DynamicTable
          data={filteredBeneficiaries}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) => `/${translate(user.role).toLowerCase()}/beneficiario/detalhes/${row.id}`,
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
