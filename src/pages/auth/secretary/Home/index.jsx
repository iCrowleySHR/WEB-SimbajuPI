import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";
import CreateAdminAccountModal from "../../../../components/Modal/CreateAdminAccountModal";

export default function SecretaryHome() {
    const [isModalOpen, setIsModalOpen] = useState(false);


  const showBeneficiaryList = () => {
    console.log("Lista de Beneficiários");
  };

  const showModalCreateAdminAccount = () => {
    setIsModalOpen(true);
  }

  const showReports = () => {
    console.log("Relatórios");
  };

  return (
    <>

      {/* Título */}
      <Title title={"Painel da Secretaria de Saúde"} subtitle={"Gerencie beneficiários e monitore o programa."} />

      {/* Cards de Estatísticas */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Beneficiários"
          value="1,247"
          iconClass="fas fa-users"
          iconColor="#2563EB"
        />
        <StatsCard
          title="Ativos"
          value="1,198"
          iconClass="fas fa-check-circle"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pendentes"
          value="49"
          iconClass="fas fa-clock"
          iconColor="#CA8A04"
        />
        <StatsCard
          title="Este Mês"
          value="143,640"
          iconClass="fas fa-box"
          iconColor="#7C3AED"
          extra="fraldas distribuídas"
        />
      </div>

      {/* Botões de Ação */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <ActionButton
          title="Novo Beneficiário"
          description="Cadastrar novo paciente no sistema."
          iconClass="fas fa-user-plus"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          to={"/secretaria/novo-beneficiario"}
        />
        <ActionButton
          title="Lista de Beneficiários"
          description="Visualizar e gerenciar cadastros."
          iconClass="fas fa-list"
          bgColor="bg-green-600"
          hoverColor="hover:bg-green-700"
          to={"/secretaria/lista-beneficiarios"}
        />
        <ActionButton
          title="Relatórios"
          description="Gerar relatórios e estatísticas."
          iconClass="fas fa-chart-bar"
          bgColor="bg-purple-600"
          hoverColor="hover:bg-purple-700"
          onClick={showReports}
        />
        <ActionButton
          title="Criar Contas Administrativas"
          description="Criar acessos para UBS ou Almoxarifados."
          iconClass="fa fa-users"
          bgColor="bg-yellow-600"
          hoverColor="hover:bg-yellow-700"
          onClick={showModalCreateAdminAccount}
        />
        <ActionButton
          title="Validar Beneficio"
          description="Valide os benefícios dos pacientes junto a UBS."
          iconClass="fa fa-users"
          bgColor="bg-pink-600"
          hoverColor="hover:bg-pink-700"
          onClick={showReports}
        />

        
      </div>
       <CreateAdminAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
