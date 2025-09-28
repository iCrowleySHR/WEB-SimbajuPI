import { useState } from "react";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";
import { PatientTable } from "../../../../components/PatientTableUBS/PatientTable";

export default function UbsHome() {
  const [patients, setPatients] = useState([
    {
      name: "Maria Silva Santos",
      cpf: "123.456.789-00",
      status: "ativo",
    },
    {
      name: "João Oliveira",
      cpf: "987.654.321-00",
      status: "ativo",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleStatusChange = (cpf, newStatus) => {
    setPatients((prev) =>
      prev.map((p) => (p.cpf === cpf ? { ...p, status: newStatus } : p))
    );
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cpf.includes(search)
  );

  return (
    <>
      <Title
        title={"Painel da UBS"}
        subtitle={"Validação e acompanhamento de pacientes."}
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Pacientes da UBS"
          value="64"
          iconClass="fas fa-users"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pacientes Ativos"
          value="49"
          iconClass="fas fa-clipboard-check"
          iconColor="#ff9100"
        />
        <StatsCard
          title="Pacientes Desativados"
          value="15"
          iconClass="fas fa-exclamation-triangle"
          iconColor="#ab000b"
        />
      </div>

      <div id="ubsDashboard" className="fade-in">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            <i className="fas fa-hospital mr-2 text-blue-600"></i>
            Validação de Status dos Pacientes
          </h3>

          <div className="mb-4">
            <input
              type="text"
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou CPF..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <PatientTable
            patients={filteredPatients} 
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </>
  );
}
