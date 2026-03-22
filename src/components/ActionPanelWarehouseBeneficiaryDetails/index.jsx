import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";

export default function ActionPanelWarehouseBeneficiaryDetails({ beneficiary, refetch }) {
  const navigate = useNavigate();

  return (
    <ActionPanel
      title="Ações do Almoxarifado"
      actions={[
        {
          label: "Criar Agendamento",
          color: "blue",
          icon: "fa-regular fa-calendar",
          onClick: () => navigate(`/almoxarifado/agendamento/criar/${beneficiary.id}`),
        },
         {
          label: "Ver Histórico de Retiradas",
          color: "green",
          icon: "fa-solid fa-box",
          onClick: () => navigate(`/almoxarifado/retirada/lista/${beneficiary.cpf}`),
        },
        {
          label: "Ver Histórico de Agendamentos",
          color: "orange",
          icon: "fa-solid fa-calendar-check",
          onClick: () => navigate(`/almoxarifado/agendamento/lista/${beneficiary.cpf}`),
        },
      ]}
    />
  );
}
