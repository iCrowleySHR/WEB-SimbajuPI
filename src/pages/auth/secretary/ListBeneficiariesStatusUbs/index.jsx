import { useState } from "react";
import Pagination from "../../../../components/Pagination";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import { filterByNameOrCpf } from "../../../../utils/filterByNameOrCpf";
import Alert from "../../../../components/Alert";
import useListBeneficiariesStatusUbs from "../../../../hook/useListBeneficiariesStatusUbs";
import translate from "../../../../utils/translate";
import { useUser } from "../../../../contexts/UserContext";

export default function ListBeneficiariesStatusUbs() {
    const [currentPage, setCurrentPage] = useState(1);
    const { beneficiaries, error, message, refetch, meta  } = useListBeneficiariesStatusUbs(currentPage);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useUser();

    const columns = [
        { label: "Id", accessor: "id" },
        { label: "Beneficiário", accessor: "beneficiaryName" },
        { label: "CPF", accessor: "cpf" },
        { label: "Email", accessor: "email" },
        { label: "Tipo de benefício", accessor: "typeBenefit" },
        { label: "Status da UBS", accessor: "ubsStatus" },
    ];

    let filtered = filterByNameOrCpf(beneficiaries, searchTerm);

    return (
        <>
            <Title
                title="Status da UBS"
                subtitle="Acompanhe a lista de beneficiarios ativos com o status diferente de Ativado da UBS."
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
                    data={filtered}
                    columns={columns}
                    actions={[
                        {
                            label: "Ver detalhes",
                            getPath: (row) => `/${translate(user.role).toLowerCase()}/beneficiario/detalhes/${row.id}`,
                        },
                        {
                            label: "Desativar conta",
                            getPath: (row) => `/${translate(user.role).toLowerCase()}/beneficiario/desabilitar-conta/${row.id}`
                        }
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
