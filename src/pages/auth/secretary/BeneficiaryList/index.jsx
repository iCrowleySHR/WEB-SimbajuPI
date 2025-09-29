import { useState, useMemo } from "react";
import DynamicTable from "../../../../components/DynamicTable";
import Title from "../../../../components/Title";

export default function BeneficiartyList() {
  const [search, setSearch] = useState("");

  const dados = [
    {
      id: 1,
      Nome: "João Silva",
      CPF: "123.456.789-00",
      "Data de Nascimento": "1990-05-20",
      "Status do Benefício": "Ativo",
      "Situação UBS": "Pendente",
      "Situação Secretaria": "Ativo",
    },
    {
      id: 2,
      Nome: "Maria Souza",
      CPF: "987.654.321-00",
      "Data de Nascimento": "1985-10-15",
      "Status do Benefício": "Inativo",
      "Situação UBS": "Inativo",
      "Situação Secretaria": "Inativo",
    },
  ];

  const filteredData = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return dados.filter(
      (b) =>
        b.Nome.toLowerCase().includes(lowerSearch) ||
        b.CPF.includes(lowerSearch)
    );
  }, [search, dados]);

  return (
    <>
      <Title
        title={"Lista de Beneficiários"}
        subtitle={"Veja todos os beneficiários cadastrados no sistema."}
        back={true}
      />

      {/* Campo de pesquisa */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por Nome ou CPF"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <DynamicTable
        data={filteredData}
        actions={[
          {
            label: "Alterar Situação",
            getPath: (row) => `/secretaria/detalhes-beneficiario/${row.id}`,
          },
        ]}
      />
    </>
  );
}
