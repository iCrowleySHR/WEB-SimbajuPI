import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";

export default function WarehouseHome() {
  return (
    <>
      <Title title={"Painel do Almoxarifado"} subtitle={"Controle de estoque e distribuição."} />

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <StatsCard
          title="Distribuídas Hoje"
          value="5"
          iconClass="fas fa-truck"
          iconColor="#16A34A"
        />
        <StatsCard
          title="Pendentes"
          value="49"
          iconClass="fas fa-calendar-day"
          iconColor="#ff6400"
        />
        <StatsCard
          title="Agendamento Atrasados"
          value="0"
          iconClass="fas fa-exclamation-triangle"
          iconColor="#ab000b"
          extra="fraldas distribuídas"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <ActionButton
          title="Primeiro Agendamento"
          description="Registre o primeiro agendamento"
          iconClass="fas fa-plus"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
        />

        <ActionButton
          title="Registrar Retirada e Próximo Agendamento"
          description="Confirmar retirada de insumo do paciente e próxima retirada."
          iconClass="fas fa-hand-holding"
          bgColor="bg-green-600"
          hoverColor="hover:bg-green-700"
        />

        <ActionButton
          title="Lista de Beneficiários Ativos"
          description="Confirmar retirada de insumo mediante a beneficio."
          iconClass="fas fa-list"
          bgColor="bg-yellow-600"
          hoverColor="hover:bg-yellow-700"
          to={"/almoxarifado/beneficiario/lista"}
        />

        <ActionButton
          title="Agendamento marcados para hoje"
          description="Acompanhe a lista de agendamento para hoje."
          iconClass="fas fa-hand-holding"
          bgColor="bg-purple-600"
          hoverColor="hover:bg-purple-700"
          to={"/almoxarifado/agendamento/hoje"}
        />

        <ActionButton
          title="Histórico de agendamentos"
          description="Acompanhe a lista de todos os agendamentos."
          iconClass="fas fa-calendar-check"
          bgColor="bg-blue-600"
          hoverColor="hover:bg-blue-700"
          to={"/almoxarifado/agendamento/historico"}
        />
      </div>
    </>
  );
}
