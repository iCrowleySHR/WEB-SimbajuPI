import ActionButton from "../../../../components/ActionButton";
import BeneficiaryStatusCard from "../../../../components/BeneficiaryStatusCard";
import ContainerActionButton from "../../../../components/ContainerActionButton";
import SubtitleHome from "../../../../components/SubtitleHome";
import Title from "../../../../components/Title";

export default function BeneficiaryHome() {

    return (
        <>

            <Title title={"Beneficiário"} subtitle={"Gerencie seus agendamentos e acompanhe seu histórico"} />

            {/* <BeneficiaryStatusCard
                status="Ativo"
                nextPickup="15/12/2024"
                quantity={120}
                unit="Fraldas/mês"
            /> */}

            <SubtitleHome>Agendamentos</SubtitleHome>
            <ContainerActionButton>
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
                    title="Cancelar Agendamento"
                    description="Veja seu agendamento e cancele quando quiser."
                    iconClass="fas fa-xmark"
                    bgColor="bg-red-800"
                    hoverColor="hover:bg-red-900"
                    to={"/beneficiario/agendamento/cancelaveis"}
                />

            </ContainerActionButton>

            <SubtitleHome>Retiradas</SubtitleHome>
            <ContainerActionButton>
                <ActionButton
                    title="Histórico de retiradas"
                    description="Veja suas retiradas anteriores."
                    iconClass="fas fa-history"
                    bgColor="bg-yellow-600"
                    hoverColor="hover:bg-yellow-700"
                    to="/beneficiario/retirada/historico"
                />
            </ContainerActionButton>

            <SubtitleHome>Informações da Conta</SubtitleHome>
            <ContainerActionButton>
                <ActionButton
                    title="Seus dados"
                    description="Veja seus dados e status."
                    iconClass="fas fa-user"
                    bgColor="bg-purple-600"
                    hoverColor="hover:bg-purple-700"
                    to={"/beneficiario/dados"}
                />
            </ContainerActionButton>
        </>
    );
}
