import { useState } from "react";
import Pagination from "../../../../components/Pagination";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable";
import SearchInputBeneficiary from "../../../../components/SearchInputBeneficiary";
import Alert from "../../../../components/Alert";
import useAllUbs from "../../../../hook/useAllUbs";
import translate from "../../../../utils/translate";
import useDebounce from "../../../../hook/useDebounce";
import { useUser } from "../../../../contexts/UserContext";

export default function ListUbs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    ubsUsers,
    error,
    message,
    meta,
  } = useAllUbs(currentPage, debouncedSearch);

  const { user } = useUser();

  const columns = [
    {
      label: "Id",
      accessor: "id",
    },
    {
      label: "Nome",
      accessor: "name",
    },
    {
      label: "Email",
      accessor: "email",
    },
    {
      label: "Tipo do Perfil",
      accessor: "role",
    },
  ];

  return (
    <>
      <Title
        title="Lista de UBS"
        subtitle="Lista de usuários UBS cadastrados."
        back="true"
      />

      <SearchInputBeneficiary
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Pesquisar por nome ou email..."
      />

      {message && (
        <Alert
          type="success"
          message={message}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
        />
      )}

      <div className="mt-4">
        <DynamicTable
          data={ubsUsers}
          columns={columns}
          actions={[
            {
              label: "Ver detalhes",
              getPath: (row) =>
                `/${translate(user.role).toLowerCase()}/ubs/detalhes/${row.id}`,
            },
          ]}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        lastPage={meta?.last_page || 1}
        onPageChange={setCurrentPage}
      />
    </>
  );
}