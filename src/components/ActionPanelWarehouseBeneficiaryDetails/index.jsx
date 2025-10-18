import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";

export default function ActionPanelWarehouseBeneficiaryDetails({ beneficiary, refetch }) {
  const navigate = useNavigate();

  return (
    <ActionPanel
      title="Ações do almoxarifado"
      actions={[
        {
          label: "Criar Agendamento",
          color: "blue",
          icon: "fa-regular fa-calendar",
          onClick: () => navigate(`/almoxarifado/agendamento/criar/${beneficiary.id}`),
        }
      ]}
    />
  );
}
