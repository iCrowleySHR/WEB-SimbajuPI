import ActionButton from "../../../../components/ActionButton";
import BeneficiaryStatusCard from "../../../../components/BeneficiaryStatusCard";
import Title from "../../../../components/Title";

export default function BeneficiaryHome() {

    return (
        <>

            <Title title={"Painel do Beneficiário"} subtitle={"Gerencie seus agendamentos e acompanhe seu histórico"} />

            <BeneficiaryStatusCard
                status="Ativo"
                nextPickup="15/12/2024"
                quantity={120}
                unit="Fraldas/mês"
            />

            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <ActionButton
                    title="Criar Agendamento"
                    description="Agende a sua retirda de fraldas."
                    iconClass="fas fa-calendar-alt"
                    bgColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    to={"/beneficiario/agendamento/criar"}
                />
                <ActionButton
                    title="Histórico de agendamentos"
                    description="Veja seus agendamentos anteriores."
                    iconClass="fas fa-history"
                    bgColor="bg-green-600"
                    hoverColor="hover:bg-green-700"
                    to="/beneficiario/agendamento/historico"
                />
                <ActionButton
                    title="Histórico de retiradas"
                    description="Veja suas retiradas anteriores."
                    iconClass="fas fa-history"
                    bgColor="bg-green-600"
                    hoverColor="hover:bg-green-700"
                    to="/beneficiario/retirada/historico"
                />
                <ActionButton
                    title="Cancelar Agendamento"
                    description="Cancele seu agendamento."
                    iconClass="fas fa-xmark"
                    bgColor="bg-red-800"
                    hoverColor="hover:bg-red-900"
                    to={"/beneficiario/agendamento/cancelaveis"}
                />

                <ActionButton
                    title="Seus dados"
                    description="Veja seus dados e status."
                    iconClass="fas fa-user"
                    bgColor="bg-blue-600"
                    hoverColor="hover:bg-blue-700"
                    to={"/beneficiario/dados"}
                />
            </div>
        </>
    );
}
