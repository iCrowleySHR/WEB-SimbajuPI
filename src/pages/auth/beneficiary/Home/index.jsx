import ActionButton from "../../../../components/ActionButton";
import BeneficiaryStatusCard from "../../../../components/BeneficiaryStatusCard";
import StatsCard from "../../../../components/StatsCard";
import Title from "../../../../components/Title";

export default function BeneficiaryHome() {
    const showNewBeneficiary = () => {
        console.log("Novo Beneficiário");
    };

    const showBeneficiaryList = () => {
        console.log("Lista de Beneficiários");
    };

    const showReports = () => {
        console.log("Relatórios");
    };

    return (
        <>

            {/* Título */}
            <Title title={"Painel do Beneficiário"} subtitle={"Gerencie seus agendamentos e acompanhe seu histórico"} />

            <BeneficiaryStatusCard
                status="Ativo"
                nextPickup="15/12/2024"
                quantity={120}
                unit="Fraldas/mês"
            />

            {/* Botões de Ação */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <ActionButton
                    title="Reagendar Retirada"
                    description="Altere a data da sua próxima retirada."
                    iconClass="fas fa-calendar-alt"
                    bgColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    onClick={showNewBeneficiary}
                />
                <ActionButton
                    title="Histórico"
                    description="Veja suas retiradas anteriores."
                    iconClass="fas fa-history"
                    bgColor="bg-green-600"
                    hoverColor="hover:bg-green-700"
                    to="/login"
                />
                <ActionButton
                    title="Cancelar retirada"
                    description="Cancele sua retirada."
                    iconClass="fas fa-xmark"
                    bgColor="bg-red-800"
                    hoverColor="hover:bg-red-900"
                    onClick={showReports}
                />
            </div>
        </>
    );
}
