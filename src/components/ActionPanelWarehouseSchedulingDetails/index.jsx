import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";


export default function ActionPanelWarehouseSchedulingDetails({ scheduling, refetch }) {
  const navigate = useNavigate();
  return (
    <ActionPanel
      title="Ações do Almoxarifado"
      actions={[
        {
          label: "Cancelar Agendamento",
          color: "red",
          icon: "fa-regular fa-x",
          onClick: () => navigate(`/almoxarifado/agendamento/cancelar/${scheduling.id}`),
        },
        {
          label: "Marcar Como Ausente",
          color: "green",
          icon: "fa-regular fa-user",
          onClick: () => navigate(`/almoxarifado/agendamento/ausente/${scheduling.id}`),
        }
      ]}
    />
  );
}
