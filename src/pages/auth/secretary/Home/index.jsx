import { useState } from "react";
import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";
import CreateAdminAccountModal from "../../../../components/Modal/CreateAdminAccountModal";

export default function SecretaryHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalCreateAdminAccount = () => {
    setIsModalOpen(true);
  }

  return (
    <>

      {/* Título */}
      <Title title={"Secretaria de Saúde"} subtitle={"Gerencie beneficiários e monitore o programa."} />

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
          bgColor="bg-blue-400"
          hoverColor="hover:bg-blue-500"
          to={"/secretaria/novo-beneficiario"}
        />
        <ActionButton
          title="Lista de Beneficiários"
          description="Visualizar e gerenciar cadastros."
          iconClass="fas fa-list"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          to={"/secretaria/beneficiario/lista"}
        />
        <ActionButton
          title="Beneficiários desativados"
          description="Acompanhe a lista de beneficiados desativados"
          iconClass="fas fa-xmark"
          bgColor="bg-blue-800"
          hoverColor="hover:bg-blue-900"
          to={"/secretaria/beneficiario/desativados"}
        />
        <ActionButton
          title="Relatórios"
          description="Gerar relatórios e estatísticas."
          iconClass="fas fa-chart-bar"
          bgColor="bg-purple-600"
          hoverColor="hover:bg-purple-700"
          to={"/secretaria/relatorios"}
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
          title="Reavaliação semestral"
          description="Valide os benefícios dos pacientes, efetuando a reavaliação semestral."
          iconClass="fa fa-users"
          bgColor="bg-pink-600"
          hoverColor="hover:bg-pink-700"
          to={"/secretaria/beneficiario/ultima-veriricacao"}
        />

        <ActionButton
          title="Histórico de agendamentos"
          description="Acompanhe a lista de todos os agendamentos."
          iconClass="fas fa-history"
          bgColor="bg-green-600"
          hoverColor="hover:bg-green-700"
          to={"/secretaria/agendamento/lista"}
          />
        <ActionButton
          title="Histórico de retiradas"
          description="Acompanhe a lista de retiradas"
          iconClass="fas fa-calendar-check"
          bgColor="bg-green-800"
          hoverColor="hover:bg-green-900"
          to={"/secretaria/retirada/lista"}
        />


        <ActionButton
          title="Status da UBS"
          description="Acompanhe a lista de beneficiarios ativos com o status diferente de Ativado da UBS."
          iconClass="fas fa-plus"
          bgColor="bg-pink-800"
          hoverColor="hover:bg-pink-900"
          to={"/secretaria/beneficiario/status/suspensoes/ubs"}
        />


      </div>
      <CreateAdminAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
