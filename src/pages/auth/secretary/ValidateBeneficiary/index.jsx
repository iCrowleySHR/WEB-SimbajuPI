import { useState, useMemo } from "react";
import Title from "../../../../components/Title";
import DynamicTable from "../../../../components/DynamicTable"; 
import { format, differenceInMonths } from "date-fns";

export default function ValidateBeneficiary() {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Mock de beneficiários
  const beneficiaries = [
    { id: 1, nome: "Maria Silva", cpf: "123.456.789-00", statusUbs: "Ativo", verificadoEm: "2024-01-10T00:00:00Z" },
    { id: 2, nome: "João Souza", cpf: "987.654.321-00", statusUbs: "Desativado", verificadoEm: "2023-02-15T00:00:00Z" },
    { id: 3, nome: "Ana Oliveira", cpf: "111.222.333-44", statusUbs: "Ativo", verificadoEm: "2025-04-01T00:00:00Z" },
  ];

  // Filtragem e mapeamento
  const filteredData = useMemo(() => {
    return beneficiaries
      .filter(b => {
        const lowerSearch = search.toLowerCase();
        return b.nome.toLowerCase().includes(lowerSearch) || b.cpf.includes(lowerSearch);
      })
      .filter(b => !filterDate || new Date(b.verificadoEm) >= new Date(filterDate))
      .map(b => {
        const monthsDiff = differenceInMonths(new Date(), new Date(b.verificadoEm));
        return {
          ...b,
          verificadoEm: `${format(new Date(b.verificadoEm), "dd/MM/yyyy")} ${monthsDiff > 6 ? "⚠️ Mais de 6 meses" : ""}`
        };
      });
  }, [search, filterDate, beneficiaries]);

  const columns = ["nome", "cpf", "statusUbs", "verificadoEm"];

  const actions = [
    {
      label: "Ver detalhes",
      getPath: (row) => `/secretaria/detalhes-beneficiario/${row.id}`, // usa o id correto
    },
  ];

  return (
    <>
      <Title
        title="Validar Benefício"
        subtitle="Registre no sistema novos beneficiários."
        back
      />

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou CPF"
          className="border rounded px-3 py-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <DynamicTable data={filteredData} columns={columns} actions={actions} />
    </>
  );
}
