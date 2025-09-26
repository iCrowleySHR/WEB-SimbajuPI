import ActionButton from "../../../../components/ActionButton";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";

export default function WarehouseHome() {
    return (
        <>
            <Title title={"Painel do Almoxarifado"} subtitle={"Controle de estoque e distribuição."} />

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Estoque Total"
                    value="25"
                    iconClass="fas fa-boxes"
                    iconColor="#2563EB"
                    extra="fraldas"
                />
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
                      title="Registrar Entrada com Agendamento"
                      description="Registre a chegada do material já com a data de agendamento do beneficiado."
                      iconClass="fas fa-plus"
                      bgColor="bg-blue-600"
                      hoverColor="hover:bg-blue-700"
                    />

                    <ActionButton
                      title="Registrar Entrega"
                      description="Confirmar retirada de insumo mediante a beneficio."
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
                    />

                    <ActionButton
                      title="Lista de Agendamento"
                      description="Acompanhe a lista de agendamento."
                      iconClass="fas fa-hand-holding"
                      bgColor="bg-purple-600"
                      hoverColor="hover:bg-purple-700"
                    />
            </div>
        </>
    );
}
